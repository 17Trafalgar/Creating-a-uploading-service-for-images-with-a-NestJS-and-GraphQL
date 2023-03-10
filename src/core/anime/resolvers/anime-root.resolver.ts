import { Field, Mutation, ObjectType, Query, Resolver } from '@nestjs/graphql';
import { CreateAnimeResultsType } from '../models/results/create-anime-results.type';
import { UpdateAnimeResultsType } from '../models/results/update-anime-results.type';
import { DeleteAnimeResultsType } from '../models/results/delete-anime-results.type';
import { GetListAnimeResultsType } from '../models/results/get-list-anime-results.type';
import { GetAnimeResultsType } from '../models/results/get-anime-results.type';
import { GetListRelatedAnimeByAnimeIdResultsType } from '../models/results/get-list-related-anime-by-anime-id-results.type';
import { GetListSimilarAnimeByAnimeIdResultsType } from '../models/results/get-list-similar-anime-by-anime-id-results.type';

@ObjectType()
export class AnimeMutationType {
    @Field(() => CreateAnimeResultsType, { description: 'Create anime' })
    createAnime: CreateAnimeResultsType;

    @Field(() => UpdateAnimeResultsType, { description: 'Update anime' })
    updateAnime: UpdateAnimeResultsType;

    @Field(() => DeleteAnimeResultsType, { description: 'Delete anime' })
    deleteAnime: DeleteAnimeResultsType;
}

@ObjectType()
export class AnimeQueryType {
    @Field(() => GetAnimeResultsType, { description: 'Get anime by ID' })
    getAnime: GetAnimeResultsType;

    @Field(() => GetListAnimeResultsType, { description: 'Get anime list' })
    getAnimeList: GetListAnimeResultsType;

    @Field(() => GetListRelatedAnimeByAnimeIdResultsType, {
        description: 'Get Related anime list by anime ID',
    })
    getRelatedAnimeListByAnimeId: GetListRelatedAnimeByAnimeIdResultsType;

    @Field(() => GetListSimilarAnimeByAnimeIdResultsType, {
        description: 'Get Similar anime list by anime ID',
    })
    getSimilarAnimeListByAnimeId: GetListSimilarAnimeByAnimeIdResultsType;
}

@Resolver()
export class AnimeRootResolver {
    @Mutation(() => AnimeMutationType, { description: 'Anime mutations' })
    animeMutations() {
        return {};
    }

    @Query(() => AnimeQueryType, { description: 'Anime queries' })
    animeQueries() {
        return {};
    }
}
