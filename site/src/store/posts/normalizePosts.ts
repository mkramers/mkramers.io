import {denormalize, normalize, NormalizedSchema, schema} from "normalizr";
import postsSchema from "./postsSchema";
import {Post} from "./types";
import {NormalizedObjects} from "../util/NormalizedObject";

type entityKeys = "posts";

export function normalizePosts(posts: Post[]) {
    let normalized = normalizeResponse(posts, postsSchema);
    let {entities, result} = normalized;
    return {byId: entities.posts, allIds: result};
}

export const normalizeResponse = <T>(
    responseData: T[],
    schema: schema.Array
): NormalizedSchema<{
    [k in entityKeys]: {
        [key: string]: T;
    }
},
    number[]> => {
    return normalize(responseData, schema);
};

export function denormalizeAllPosts(normalizedPosts: NormalizedObjects<Post>): { [key: string]: Post } {
    let {byId, allIds: result} = normalizedPosts;
    let denormalizedPosts = denormalizePosts(byId, result);
    return denormalizedPosts;
}

export function denormalizePosts(byId: { [key: string]: Post}, result: number[]): { [key: string]: Post } {
    let entities = {posts: byId};
    let denormalizedPosts = denormalize(result, postsSchema, entities);
    return denormalizedPosts;
}