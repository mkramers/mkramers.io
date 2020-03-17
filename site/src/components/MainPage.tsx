import React, {useEffect} from 'react';
import NavBar from "./NavBar";
import "./MainPage.css";
import PostList from "./PostList";
import {connect} from "react-redux";
import PostView from "./PostView";
import {RootState} from "../store";
import {thunkLoadPosts} from "../store/posts/thunks";
import {Spinner} from "@blueprintjs/core";

type MainPageProps = {
    loadPosts: () => void,
    postsLoaded: Boolean
};

function MainPage({loadPosts, postsLoaded}: MainPageProps) {
    useEffect(() => {
        loadPosts();
    }, [loadPosts]);

    let content = <div className="page-main">
        <div className='left-column'>
            <PostList/>
        </div>
        <div className='right-column'>
            <PostView/>
        </div>
    </div>;

    return (
        <div className="bp3-dark wrapper">
            <NavBar/>
            {postsLoaded && content}
            {!postsLoaded && <div className="busy-indicator-container">
                <Spinner size={80} />
            </div>}
        </div>
    );
}

const mapState = (state: RootState) => ({
    postsLoaded: state.main.postsLoaded
});

const mapDispatch = {
    loadPosts: () => thunkLoadPosts()
};

const connector = connect(mapState, mapDispatch);

export default connector(MainPage);
