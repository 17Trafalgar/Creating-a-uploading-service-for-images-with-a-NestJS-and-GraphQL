import { Args, ResolveField, Resolver } from '@nestjs/graphql';
import { CreateUserAnimeInputType } from '../models/inputs/create-user-anime-input.type';
import {
    UserAnimeMutationType,
    UserAnimeRootResolver,
} from './user-anime-root.resolver';
import { CreateUserAnimeResultsType } from '../models/results/create-user-anime-results.type';
import { UpdateUserAnimeResultsType } from '../models/results/update-user-anime-results.type';
import { UpdateUserAnimeInputType } from '../models/inputs/update-user-anime-input.type';
import { DeleteUserAnimeResultsType } from '../models/results/delete-user-anime-results.type';
import { UserAnimeService } from '../services/user-anime.service';

@Resolver(UserAnimeMutationType)
export class UserAnimeMutationResolver extends UserAnimeRootResolver {
    constructor(private userAnimeService: UserAnimeService) {
        super();
    }

    @ResolveField(() => CreateUserAnimeResultsType)
    async createUserAnime(
        @Args() args: CreateUserAnimeInputType,
    ): Promise<CreateUserAnimeResultsType> {
        return await this.userAnimeService.createUserAnime(args);
    }

    @ResolveField(() => UpdateUserAnimeResultsType)
    async updateUserAnime(
        @Args() args: UpdateUserAnimeInputType,
    ): Promise<UpdateUserAnimeResultsType> {
        return await this.userAnimeService.updateUserAnime(args);
    }

    @ResolveField(() => DeleteUserAnimeResultsType)
    async deleteUserAnime(
        @Args("id") id: string,
    ): Promise<DeleteUserAnimeResultsType> {
        return await this.userAnimeService.deleteUserAnime(id);
    }
}
