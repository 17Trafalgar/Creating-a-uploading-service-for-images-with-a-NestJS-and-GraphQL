import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CdnInputType {
    @Field(() => String)
    cdn_bucket: string;
}
