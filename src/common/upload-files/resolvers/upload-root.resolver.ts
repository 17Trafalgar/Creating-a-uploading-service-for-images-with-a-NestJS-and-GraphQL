import { UploadFileResultsType } from '../model/result/upload-file-result.type';
import { Field, Mutation, ObjectType, Resolver, Query } from '@nestjs/graphql';
import { DeleteFileResultsType } from '../model/result/delete-file-result.type';
import { GetFilesResultsType } from '../model/result/get-file-result.type';

@ObjectType()
export class UploadMutationType {
    @Field(() => UploadFileResultsType, { description: 'Upload file' })
    uploadFileToCDN: UploadFileResultsType;

    @Field(() => UploadFileResultsType, { description: 'Upload files' })
    uploadFilesToCDN: UploadFileResultsType;

    @Field(() => DeleteFileResultsType, { description: 'Delete file' })
    deleteFile: DeleteFileResultsType;
}

@ObjectType()
export class FilesQueryType {
    @Field(() => GetFilesResultsType, { description: 'Get data of image' })
    getFiles: GetFilesResultsType;
}

@Resolver()
export class UploadRootResolver {
    @Mutation(() => UploadMutationType, { description: 'Upload mutation' })
    uploadMutations() {
        return {};
    }
    @Query(() => FilesQueryType, { description: 'Files queries' })
    filesQueries() {
        return {};
    }
}
