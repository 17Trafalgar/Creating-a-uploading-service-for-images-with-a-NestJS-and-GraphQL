import { PrismaService } from '../../services/prisma.service';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import CdnClient from '@animakuro/animakuro-cdn';
import { IUpload } from '../model/interface/upload.interface';
import { CdnBucket } from '../../config/buckets';
import { UploadFileResultsType } from '../model/result/upload-file-result.type';
import { DeleteFileResultsType } from '../model/result/delete-file-result.type';
import { Resources } from '@prisma/client';
import { GetFileResultType } from '../model/result/get-file-result.type';
import { IPrismaUploadDB } from '../model/interface/upload-in-db.interface';

@Injectable()
export class CdnService {
    private cdnClient;
    private url: string;
    private buckets = new CdnBucket();
    constructor(
        private configService: ConfigService,
        private prisma: PrismaService,
    ) {
        this.url = this.configService.getOrThrow<string>('CDN_URL');
        this.cdnClient = new CdnClient(this.url, this.buckets.getBucket());
    }

    async upload(files: IUpload[]): Promise<UploadFileResultsType | void> {
        const streams = files.map((file) => {
            return file.createReadStream();
        });
        try {
            const bucket_name = JSON.parse(this.buckets.getBucket())
                .map((item: { name: string }) => item.name)
                .toString();
            const files = await this.cdnClient.uploadFilesFromStreams(
                streams,
                bucket_name,
            );
            const urls = files?.urls || [];
            const ids = files?.ids || [];
            Promise.all(
                urls.map((url: string, i: number) => {
                    const id = ids[i];
                    this.uploadDataInToDB({
                        uploader: 'uploader',
                        file_id: id,
                        cdn_bucket: bucket_name,
                    });
                }),
            );
            return files;
        } catch (error: any) {
            throw new HttpException(
                `Could not save image, ${error.message}`,
                HttpStatus.BAD_REQUEST,
            );
        }
    }
    async delete(
        id: string,
        bucket_name: string,
    ): Promise<DeleteFileResultsType> {
        try {
            const resp = await this.cdnClient.deleteFileById(id, bucket_name);
            if (!resp?.success) {
                throw new HttpException(
                    `Could not delete image`,
                    HttpStatus.BAD_REQUEST,
                );
            } else {
                await this.deleteDataInToDB(id);
                return resp;
            }
        } catch (error: any) {
            throw new HttpException(
                `Could not delete image, ${error.message}`,
                HttpStatus.BAD_REQUEST,
            );
        }
    }

    async uploadDataInToDB(data: IPrismaUploadDB) {
        console.log('uploading into db');
        return this.prisma.resources.create({ data });
    }

    async deleteDataInToDB(file_id: string | undefined): Promise<Resources> {
        console.log('delete from db');
        return this.prisma.resources.delete({ where: { file_id } });
    }

    async getFiles(cdn_bucket: string): Promise<GetFileResultType[]> {
        console.log('get images from db');
        const elems = await this.prisma.resources.findMany({
            where: {
                cdn_bucket,
            },
        });
        return elems.map((e) => ({
            ...e,

            url: `${this.url}${e.cdn_bucket}/${e.file_id}`,
        }));
    }
}
