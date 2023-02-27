import { InputType, Field } from '@nestjs/graphql';
import { GraphQLUpload } from 'graphql-upload';
import { IUpload } from '../interface/upload.interface';

@InputType()
export class CreateFileInput {
    @Field(() => GraphQLUpload)
    file: IUpload;
}
