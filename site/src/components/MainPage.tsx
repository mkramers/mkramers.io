import React from 'react';
import NavBar from "./NavBar";
import "./MainPage.css";
import PostList from "./PostList";
import {Post} from "../types/Post";

function MainPage() {
    let posts: Post[] = [
        {
            author: "mkramers",
            title: "First post",
            content: "hello world"
        },
        {
            author: "mkramers",
            title: "Second post",
            content: "goodbye website"
        }
    ];

    return (
        <div className="bp3-dark wrapper">
            <NavBar/>
            <div className="page-main">
                <div className='left-column'>
                    <PostList posts={posts}/>
                </div>
                <div className='right-column'>
                </div>
            </div>
        </div>
    );
}

export default MainPage;
