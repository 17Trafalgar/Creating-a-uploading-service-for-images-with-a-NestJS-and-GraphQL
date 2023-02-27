import { PrismaService } from '../../services/prisma.service';
import { Injectable } from '@nestjs/common';
import { CdnService } from './cdn.service';
import { IUpload } from '../model/interface/upload.interface';
import { CdnBucket } from '../../config/buckets';
import { UploadFileResultsType } from '../model/result/upload-file-result.type';
import { DeleteFileResultsType } from '../model/result/delete-file-result.type';
import { GetFilesResultsType } from '../model/result/get-file-result.type';

@Injectable()
export class FileUploadService {
    buckets = new CdnBucket();
    constructor(
        private prisma: PrismaService,
        private cdnService: CdnService,
    ) {}

    async uploadFileToCDN(
        file: IUpload,
    ): Promise<UploadFileResultsType | void> {
        return this.cdnService.upload([file]);
    }

    async uploadFilesToCDN(
        files: IUpload[],
    ): Promise<UploadFileResultsType | void> {
        return this.cdnService.upload(files);
    }

    async deleteFromCDN(id: string): Promise<DeleteFileResultsType> {
        return this.cdnService.delete(
            id,
            JSON.parse(this.buckets.getBucket())
                .map((item: { name: string }) => item.name)
                .toString(),
        );
    }

    async getFiles(cdn_bucket: string): Promise<GetFilesResultsType> {
        return {
            files: this.cdnService.getFiles(cdn_bucket),
        } as unknown as GetFilesResultsType;
    }
}
