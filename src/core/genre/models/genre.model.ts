import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Genre {
    @Field(() => ID, {
        description: 'Unique ID of the genre',
    })
    id?: string;

    @Field(() => String, {
        description: 'Name of the genre',
    })
    name: string;
}
