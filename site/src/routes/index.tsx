import React from 'react'
import {Route, Switch} from 'react-router'
import MainPage from '../components/MainPage'
import "../components/MainPage.css";
import NavBar from '../components/NavBar'
import PostList from "../components/PostList";
import CreatePost from "../components/CreatePost";

const routes = (
    <div className="bp3-dark wrapper">
        <NavBar/>
        <Switch>
            <div className="page-main">
                <div className='left-column'>
                    <PostList/>
                </div>
                <div className='right-column'>
                    <Route exact path="/" component={MainPage}/>
                    <Route exact path="/create" component={CreatePost}/>
                </div>
            </div>
        </Switch>
    </div>
)

export default routes