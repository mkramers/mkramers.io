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

export function denormalizePosts(normalizedPosts: NormalizedObjects<Post>) : Post[] {
    let {byId, allIds: result} = normalizedPosts;
    let entities = {posts: byId};
    let denormalizedPosts = denormalize(result, postsSchema, entities);

    let ids = Object.keys(denormalizedPosts);
    return ids.map(id => denormalizedPosts[id]);
}