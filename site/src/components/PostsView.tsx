import React from 'react';
import {State} from "../store";
import {connect} from "react-redux";
import {Post} from "../store/posts/types";
import {postsSelector} from "../store/posts/selectors";
import PostView from "./PostView";

type PostsViewProps = {
    posts?: Post[]
};

function PostsView({posts}: PostsViewProps) {
    if (!posts) {
        return <div>No posts</div>
    }

    return (
        <div>
            {posts.map(post => <PostView post={post}/>)}
        </div>
    );
}

const mapState = (state: State) => ({
    posts: postsSelector(state)
});

const mapDispatch = {};

const connector = connect(mapState, mapDispatch);

export default connector(PostsView);