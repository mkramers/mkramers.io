import { createSelector } from 'reselect'
import {State} from "../index";

const getPosts = (state: State) => state.posts.posts.byId;
const getPostIds = (state: State) => state.posts.posts.allIds;

export const postsSelector = createSelector(
    getPosts,
    getPostIds,
    (posts, postIds) => postIds.map(id => posts[id])
);
