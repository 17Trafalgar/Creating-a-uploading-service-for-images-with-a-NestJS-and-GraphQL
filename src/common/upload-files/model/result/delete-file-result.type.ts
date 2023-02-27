import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType('DeleteFile')
export class DeleteFileResultsType {
    @Field(() => Boolean)
    success: boolean;

    @Field(() => String)
    message: string;
}
