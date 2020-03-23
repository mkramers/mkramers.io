import React from 'react'
import { Route, Switch } from 'react-router'
import MainPage from '../components/MainPage'
import NavBar from '../components/NavBar'

const routes = (
    <div className="bp3-dark wrapper">
        <NavBar />
        <Switch>
            <Route exact path="/" component={MainPage} />
        </Switch>
    </div>
)

export default routes