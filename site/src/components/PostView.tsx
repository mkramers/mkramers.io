import React from 'react';
import {Post} from "../types/Post";
import {connect} from "react-redux";
import {RootState} from "../store";

type PostViewProps = {
    post?: Post
};

function PostView({post}: PostViewProps) {
    if (!post) {
        return <div>No post selected</div>
    }
    return (
        <div>
            <h1>{post.title}</h1>
            <p>{post.content}</p>
        </div>
    );
}

const mapState = (state: RootState) => ({
    post: state.main.selectedPostId !== undefined ? state.main.posts[state.main.selectedPostId] : undefined
});

const mapDispatch = {
};

const connector = connect(mapState, mapDispatch);

export default connector(PostView);