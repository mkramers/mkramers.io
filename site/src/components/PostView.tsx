import React from 'react';
import {Post} from "../types/Post";
import {connect} from "react-redux";
import {State} from "../store";
import {Card, Elevation, NonIdealState} from "@blueprintjs/core";
import "./PostView.css";
import getReactFromMarkdown from "../util/getReactElementFromMarkdown";

type PostViewProps = {
    post?: Post
};

function PostView({post}: PostViewProps) {
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
                <h3><a href="/#">{post.title}</a></h3>
                {contentElement}
            </Card>
        </div>
    );
}

const mapState = (state: State) => ({
    post: state.main.selectedPostId !== undefined ? state.main.posts.byId[state.main.selectedPostId] : undefined
});

const mapDispatch = {};

const connector = connect(mapState, mapDispatch);

export default connector(PostView);