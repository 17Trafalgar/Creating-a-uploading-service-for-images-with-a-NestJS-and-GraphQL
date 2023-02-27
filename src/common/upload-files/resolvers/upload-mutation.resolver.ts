import { Resolver, Args, ResolveField } from '@nestjs/graphql';
import { FileUploadService } from '../services/file-upload.service';
import { DeleteFileResultsType } from '../model/result/delete-file-result.type';
import {
    FilesUploadDto,
    FileUploadDto,
} from '../validation/arg.validations.type';
import { UploadMutationType, UploadRootResolver } from './upload-root.resolver';
import { UploadFileResultsType } from '../model/result/upload-file-result.type';

@Resolver(UploadMutationType)
export class UploadMutationResolvers extends UploadRootResolver {
    constructor(private readonly FUService: FileUploadService) {
        super();
    }

    @ResolveField(() => UploadFileResultsType)
    async uploadFileToCDN(
        @Args() { file }: FileUploadDto,
    ): Promise<UploadFileResultsType | void> {
        return this.FUService.uploadFileToCDN(await file);
    }

    @ResolveField(() => UploadFileResultsType)
    async uploadFilesToCDN(
        @Args() { files }: FilesUploadDto,
    ): Promise<UploadFileResultsType | void> {
        return this.FUService.uploadFilesToCDN(await Promise.all(files));
    }

    @ResolveField(() => DeleteFileResultsType)
    async deleteFile(
        @Args('id', { type: () => String })
        id: string,
    ): Promise<DeleteFileResultsType> {
        const result = await this.FUService.deleteFromCDN(id);
        return result;
    }
}
