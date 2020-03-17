import React from 'react';
import {Post} from "../types/Post";
import {connect} from "react-redux";
import {RootState} from "../store";
import {Card, Elevation} from "@blueprintjs/core";
import "./PostView.css";

type PostViewProps = {
    post?: Post
};

function PostView({post}: PostViewProps) {
    if (!post) {
        return <div>No post selected</div>
    }
    return (
        <div className="card-wrapper">
            <Card interactive={false} elevation={Elevation.TWO}>
                <h3><a href="#">{post.title}</a></h3>
                <p>{post.content}</p>
            </Card>
        </div>
    );
}

const mapState = (state: RootState) => ({
    post: state.main.selectedPostId !== undefined ? state.main.posts.byId[state.main.selectedPostId] : undefined
});

const mapDispatch = {};

const connector = connect(mapState, mapDispatch);

export default connector(PostView);