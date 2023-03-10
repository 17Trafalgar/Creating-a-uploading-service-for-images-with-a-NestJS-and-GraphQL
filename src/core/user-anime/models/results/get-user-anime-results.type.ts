import { Field, ObjectType } from '@nestjs/graphql';
import { BaseResultsType } from '../../../../common/models/results';
import { UserAnime } from '../user-anime.model';

@ObjectType()
export class GetUserAnimeResultsType extends BaseResultsType {
    @Field(() => UserAnime, {
        nullable: true,
        description: 'UserAnime',
    })
    userAnime: UserAnime | null; // имя для поля - обратить внимание. После тестов удалить коммент
}
