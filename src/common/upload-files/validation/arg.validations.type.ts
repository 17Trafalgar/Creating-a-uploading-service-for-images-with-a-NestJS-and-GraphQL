import { GraphQLUpload } from 'graphql-upload';
import { ArgsType, Field } from '@nestjs/graphql';
import { isImage } from './validation-schema-decorator';
import { IUpload } from '../model/interface/upload.interface';

@ArgsType()
export class FileUploadDto {
    @Field(() => GraphQLUpload)
    @isImage({ message: 'Only png,jpeg and gif images are allowed' })
    file: IUpload;
}

@ArgsType()
export class FilesUploadDto {
    @Field(() => [GraphQLUpload])
    @isImage({
        message: 'Only png,jpeg and gif images are allowed',
        each: true,
    })
    files: [IUpload];
}
