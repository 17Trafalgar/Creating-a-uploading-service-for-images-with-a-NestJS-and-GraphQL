import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType('UploadFile')
export class UploadFileResultsType {
    @Field(() => [String])
    urls: string[];

    @Field(() => [String])
    ids: string[];
}
