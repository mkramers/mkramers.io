import React from 'react';
import {connect} from "react-redux";
import {Button, Card, Elevation, NonIdealState} from "@blueprintjs/core";
import "./PostView.css";
import getReactFromMarkdown from "../util/getReactElementFromMarkdown";
import {Post} from "../store/posts/types";
import {push} from "connected-react-router";

type PostViewProps = {
    post?: Post
    viewPost: (postId: number) => void
};

function PostView({post, viewPost}: PostViewProps) {
    if (!post) {
        return <NonIdealState
            title="No post selected"
            description={"Select a post from the left to view here"}
        />
    }

    let contentElement = getReactFromMarkdown(post.content);

    return (
        <div className="card-wrapper">
            <Card interactive={false} elevation={Elevation.TWO}>
                <Button onClick={() => viewPost(post.id)}>{post.label}</Button>
                {contentElement}
            </Card>
        </div>
    );
}

const mapState = () => ({});

const mapDispatch = {
    viewPost: (postId: number) => push(`/post/${postId}`),
};

const connector = connect(mapState, mapDispatch);

export default connector(PostView);