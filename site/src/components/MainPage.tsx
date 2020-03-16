import React from 'react';
import NavBar from "./NavBar";
import "./MainPage.css";
import PostList from "./PostList";
import {Post} from "../types/Post";
import {useDispatch} from "react-redux";
import {loadPosts} from "../store/posts/actions";
import PostView from "./PostView";

function MainPage() {
    const dispatch = useDispatch();
    let posts: Post[] = [
        {
            id: 1,
            author: "mkramers",
            title: "First post",
            content: "hello world"
        },
        {
            id: 2,
            author: "mkramers",
            title: "Second post",
            content: "goodbye website"
        }
    ];
    dispatch(loadPosts(posts));

    return (
        <div className="bp3-dark wrapper">
            <NavBar/>
            <div className="page-main">
                <div className='left-column'>
                    <PostList/>
                </div>
                <div className='right-column'>
                    <PostView/>
                </div>
            </div>
        </div>
    );
}

export default MainPage;
