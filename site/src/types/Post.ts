import {normalize, NormalizedSchema, schema} from 'normalizr';

export interface Post {
    id: number,
    author: string;
    title: string;
    content: string;
}

export interface NormalizedObjects<T> {
    byId: { [key: string]: T };
    allIds: number[];
}

type entityKeys = "posts";

export function normalizePosts(posts: Post[]) {
    const postSchema: schema.Entity<Post> = new schema.Entity("posts", {}, {idAttribute: 'id'});
    const postsSchema = new schema.Array(postSchema);

    const normalizedData = normalizeResponse<Post>(posts, postsSchema);
    let normalizedPosts = {byId: normalizedData.entities.posts, allIds: normalizedData.result};

    return normalizedPosts;
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