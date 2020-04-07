import React from 'react'
import {Route, Switch} from 'react-router'
import MainPage from '../components/MainPage'
import CreatePost from "../components/CreatePost";
import PostsEditor from "../components/PostsEditor";
import SelectedPostView from "../components/SelectedPostView";

const routes = (
    <Switch>
        <Route exact path="/" component={MainPage}/>
        <Route exact path="/create" component={CreatePost}/>
        <Route exact path="/editPosts" component={PostsEditor}/>
        <Route path="/post/:id" component={SelectedPostView}/>
    </Switch>
);

export default routes