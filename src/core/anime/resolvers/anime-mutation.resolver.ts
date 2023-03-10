import { Args, Context, ResolveField, Resolver } from '@nestjs/graphql';
import { CreateAnimeInputType } from '../models/inputs/create-anime-input.type';
import { AnimeMutationType, AnimeRootResolver } from './anime-root.resolver';
import { CreateAnimeResultsType } from '../models/results/create-anime-results.type';
import { UpdateAnimeResultsType } from '../models/results/update-anime-results.type';
import { UpdateAnimeInputType } from '../models/inputs/update-anime-input.type';
import { DeleteAnimeResultsType } from '../models/results/delete-anime-results.type';
import { AnimeService } from '../services/anime.service';
import { AnimeApproval, AnimeRelation } from '../../../common/models/enums';

@Resolver(AnimeMutationType)
export class AnimeMutationResolver extends AnimeRootResolver {
    constructor(private animeService: AnimeService) {
        super();
    }

    @ResolveField(() => CreateAnimeResultsType)
    async createAnime(
        @Args() args: CreateAnimeInputType,
    ): Promise<CreateAnimeResultsType> {
        return await this.animeService.createAnime(args);
    }

    @ResolveField(() => UpdateAnimeResultsType)
    async updateAnime(
        @Args() args: UpdateAnimeInputType,
    ): Promise<UpdateAnimeResultsType> {
        return await this.animeService.updateAnime(args);
    }

    @ResolveField(() => UpdateAnimeResultsType)
    async addRelatedAnime(
        @Args('id') id: string,
        @Args({ name: 'relating_animes_add', type: () => [String] })
        relating_animes_add: string[],
        @Args({ name: 'related_status', type: () => [AnimeRelation] })
        related_status: AnimeRelation[],
    ): Promise<UpdateAnimeResultsType> {
        return await this.animeService.addRelatedAnime(
            id,
            relating_animes_add,
            related_status,
        );
    }

    @ResolveField(() => UpdateAnimeResultsType)
    async updateRelatedAnime(
        @Args('id') id: string,
        @Args({ name: 'relating_animes_add', type: () => [String] })
        relating_animes_add: string[],
        @Args({ name: 'related_status', type: () => [AnimeRelation] })
        related_status: AnimeRelation[],
    ): Promise<UpdateAnimeResultsType> {
        return await this.animeService.updateRelatedAnime(
            id,
            relating_animes_add,
            related_status,
        );
    }

    @ResolveField(() => UpdateAnimeResultsType)
    async deleteRelatedAnime(
        @Args('id') id: string,
        @Args({ name: 'relating_animes_remove', type: () => [String] })
        relating_animes_remove: string[],
    ): Promise<UpdateAnimeResultsType> {
        return await this.animeService.deleteRelatedAnime(
            id,
            relating_animes_remove,
        );
    }

    @ResolveField(() => UpdateAnimeResultsType)
    async addSimilarAnime(
        @Args('id') id: string,
        @Args({ name: 'similar_animes_add', type: () => [String] })
        similar_animes_add: string[],
    ): Promise<UpdateAnimeResultsType> {
        return await this.animeService.addSimilarAnime(id, similar_animes_add);
    }

    @ResolveField(() => UpdateAnimeResultsType)
    async updateSimilarAnime(
        @Args('id') id: string,
        @Args({ name: 'similar_animes_add', type: () => [String] })
        similar_animes_add: string[],
        @Args({ name: 'related_status', type: () => [AnimeApproval] })
        status: AnimeApproval[],
    ): Promise<UpdateAnimeResultsType> {
        return await this.animeService.updateSimilarAnime(
            id,
            similar_animes_add,
            status,
        );
    }

    @ResolveField(() => UpdateAnimeResultsType)
    async deleteSimilarAnime(
        @Args('id') id: string,
        @Args({ name: 'similar_animes_remove', type: () => [String] })
        similar_animes_remove: string[],
    ): Promise<UpdateAnimeResultsType> {
        return await this.animeService.deleteSimilarAnime(
            id,
            similar_animes_remove,
        );
    }

    @ResolveField(() => DeleteAnimeResultsType)
    async deleteAnime(
        @Args('id') id: string,
    ): Promise<DeleteAnimeResultsType> {
        return await this.animeService.deleteAnime(id);
    }
}
