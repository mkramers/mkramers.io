import { createSelector } from 'reselect'
import {State} from "../index";
import {denormalizeAllPosts} from "./normalizePosts";

const getPosts = (state: State) => state.posts.posts.byId;
const getPostIds = (state: State) => state.posts.posts.allIds;
const selectedPostId = (state: State) => state.posts.selectedPostId;

export const postsSelector = createSelector(
    getPosts,
    getPostIds,
    (posts, postIds) => {
        let normalizedObjects = {byId: posts, allIds: postIds};
        let denormalizedPosts = denormalizeAllPosts(normalizedObjects);

        let ids = Object.keys(denormalizedPosts);
        return ids.map(id => denormalizedPosts[id]);
    }
);

export const selectedPostSelector = createSelector(
    getPosts,
    selectedPostId,
    (posts, id) =>
    {
        if (!id) {
            return undefined;
        }

        return posts[id]
    }
);
