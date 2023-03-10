import { ProfileSettings } from '../../profile-settings/models/profile-settings.model';
import { Field, ID, ObjectType } from '@nestjs/graphql';
import { ModeratorRoles } from '../../../common/models/enums';
import { User } from '../../user/models/user.model';

@ObjectType()
export class UserProfile {
    @Field(() => ID, {
        description: 'Unique ID of the user-profile',
    })
    id?: string;

    // это поле - для вложенной выдачи связанного User!
    @Field(() => User)
    user: User;

    // это поле - на общем уровне, показывает просто id подключенного Юзера
    @Field()
    user_id: string;

    // ! вернуть это поле после того, как оформлю UserAnime целиком
    // @Field(() => UserAnime)
    // user_anime: UserAnime;

    @Field({ nullable: true })
    about?: string;

    @Field(() => ProfileSettings)
    profile_settings: ProfileSettings;

    @Field(() => ModeratorRoles, { defaultValue: ModeratorRoles.VIEWER })
    moderator_role: string;

    @Field({ defaultValue: false })
    isBlocked: boolean;
}
