import {normalize, NormalizedSchema, schema} from "normalizr";
import {Post} from "./types";

type entityKeys = "posts";

export function normalizePosts(posts: Post[]) {
    const postSchema: schema.Entity<Post> = new schema.Entity("posts", {}, {idAttribute: 'postId'});
    const postsSchema = new schema.Array(postSchema);

    const normalizedData = normalizeResponse<Post>(posts, postsSchema);
    return {byId: normalizedData.entities.posts, allIds: normalizedData.result};
}

export const normalizeResponse = <T>(
    responseData: T[],
    schema: schema.Array
): NormalizedSchema<
    {
        [k in entityKeys]: {
        [key: string]: T;
    }
    },
    number[]
    > => {
    return normalize(responseData, schema);
};