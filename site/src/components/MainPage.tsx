import React, {useEffect} from 'react';
import "./MainPage.css";
import PostList from "./PostList";
import {connect} from "react-redux";
import PostView from "./PostView";
import {State} from "../store";
import {thunkLoadPosts} from "../store/posts/thunks";
import {NonIdealState, Spinner} from "@blueprintjs/core";
import {LoadStatus} from "../types/Post";
import {useAuth0} from "../auth0/react-auth0-spa";

type MainPageProps = {
    loadPosts: () => void,
    postsLoaded: LoadStatus
};

function MainPage({loadPosts, postsLoaded}: MainPageProps) {
    useEffect(() => {
        loadPosts();
    }, [loadPosts]);

    const {loading} = useAuth0();

    let busyContent = <div className="busy-indicator-container">
        <Spinner size={80}/>
    </div>;

    if (loading) {
        return busyContent;
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
    postsLoaded: state.main.postsLoaded
});

const mapDispatch = {
    loadPosts: () => thunkLoadPosts()
};

const connector = connect(mapState, mapDispatch);

export default connector(MainPage);
