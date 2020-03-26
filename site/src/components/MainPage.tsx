import React, {useEffect} from 'react';
import "./MainPage.css";
import PostList from "./PostList";
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

    let busyContent = <div className="busy-indicator-container">
        <Spinner size={80}/>
    </div>;

    if (apiInitialized === LoadStatus.PENDING) {
        return <div>Please log in</div>
    }

    let content;

    switch (postsLoaded) {
        case LoadStatus.SUCCESS:
            content = <div className="page-main">
                <div className='left-column'>
                    <PostList/>
                </div>
                <div className='right-column'>
                    <PostView/>
                </div>
            </div>;
            break;
        case LoadStatus.PENDING:
            content = busyContent;
            break;
        case LoadStatus.FAILURE:
            content = <div className="busy-indicator-container">
                <NonIdealState
                    title="Error"
                    description={"Failed to connect to api!"}
                />
            </div>;
            break;
        default:
            throw new Error("LoadStatus not supported");
    }

    return (
        <div className="page-main">
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
