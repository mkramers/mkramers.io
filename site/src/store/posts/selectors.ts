import { createSelector } from 'reselect'
import {State} from "../index";
import {denormalizePosts} from "./normalizePosts";

const getPosts = (state: State) => state.posts.posts.byId;
const getPostIds = (state: State) => state.posts.posts.allIds;

export const postsSelector = createSelector(
    getPosts,
    getPostIds,
    (posts, postIds) => {
        let normalizedObjects = {byId: posts, allIds: postIds};
        let denormalizedPosts = denormalizePosts(normalizedObjects);
        return denormalizedPosts;
    }
);
