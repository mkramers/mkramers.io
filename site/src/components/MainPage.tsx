import React, {useEffect} from 'react';
import "./MainPage.css";
import {connect} from "react-redux";
import PostView from "./PostView";
import {State} from "../store";
import {thunkLoadPosts} from "../store/posts/thunks";
import {NonIdealState, Spinner} from "@blueprintjs/core";
import {LoadStatus} from "../store/LoadStatus";

type MainPageProps = {
    loadPosts: () => void,
    apiInitialized: LoadStatus
    postsLoaded: LoadStatus
};

function MainPage({loadPosts, apiInitialized, postsLoaded}: MainPageProps) {
    useEffect(() => {
        if (apiInitialized === LoadStatus.SUCCESS) {
            loadPosts();
        }
    }, [apiInitialized]);

    let busyContent = <Spinner size={80}/>;

    let content;
    if (apiInitialized === LoadStatus.PENDING) {
        content = busyContent;
    }
    else {
        switch (postsLoaded) {
            case LoadStatus.SUCCESS:
                content = <PostView/>;
                break;
            case LoadStatus.PENDING:
                content = busyContent;
                break;
            case LoadStatus.FAILURE:
                content = <NonIdealState
                    title="Error"
                    description={"Failed to connect to api!"}
                />;
                break;
            default:
                throw new Error("LoadStatus not supported");
        }
    }

    return (
        <div className="main">
            {content}
        </div>
    );
}

const mapState = (state: State) => ({
    apiInitialized: state.app.apiInitialized,
    postsLoaded: state.posts.postsLoaded
});

const mapDispatch = {
    loadPosts: () => thunkLoadPosts(),
};

const connector = connect(mapState, mapDispatch);

export default connector(MainPage);
