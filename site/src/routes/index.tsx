import React from 'react'
import {Route, Switch} from 'react-router'
import MainPage from '../components/MainPage'
import CreatePost from "../components/CreatePost";

const routes = (
    <Switch>
        <Route exact path="/" component={MainPage}/>
        <Route exact path="/create" component={CreatePost}/>
    </Switch>
)

export default routes