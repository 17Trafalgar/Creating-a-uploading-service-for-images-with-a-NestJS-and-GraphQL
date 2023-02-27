import { ResolveField, Resolver, Args } from '@nestjs/graphql';
import { FilesQueryType, UploadRootResolver } from './upload-root.resolver';
import { FileUploadService } from '../services/file-upload.service';
import { GetFilesResultsType } from '../model/result/get-file-result.type';
import { CdnInputType } from '../model/input/cdn-input.type';

@Resolver(FilesQueryType)
export class FilesQueryResolver extends UploadRootResolver {
    constructor(private readonly FUService: FileUploadService) {
        super();
    }

    @ResolveField(() => GetFilesResultsType)
    async getFiles(
        @Args('cdn_bucket', { description: 'cdn bucket name' })
        { cdn_bucket }: CdnInputType,
    ): Promise<GetFilesResultsType> {
        const elems = await this.FUService.getFiles(cdn_bucket);
        return elems;
    }
}
