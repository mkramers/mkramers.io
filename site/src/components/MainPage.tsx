import React from 'react';
import "./MainPage.css";
import {connect} from "react-redux";
import PostView from "./PostView";
import {State} from "../store";
import {NonIdealState, Spinner} from "@blueprintjs/core";
import {LoadStatus} from "../store/LoadStatus";

type MainPageProps = {
    apiInitialized: LoadStatus
    postsLoaded: LoadStatus
};

function MainPage({apiInitialized, postsLoaded}: MainPageProps) {
    let busyContent = <div className="busy-indicator">
        <Spinner size={80}/>
    </div>;

    let content;
    if (apiInitialized === LoadStatus.PENDING) {
        content = busyContent;
    } else {
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

const mapDispatch = {};

const connector = connect(mapState, mapDispatch);

export default connector(MainPage);
