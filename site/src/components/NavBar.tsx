import {Alignment, Button, Classes, Navbar, NavbarDivider, NavbarGroup, NavbarHeading} from "@blueprintjs/core";
import React from "react";
import {connect} from "react-redux";
import {push} from 'connected-react-router'
import Can from "./Can";
import {POSTS_CREATE, POSTS_DELETE} from "../AuthRules";
import {useAuth0} from "../auth0/react-auth0-spa";

type NavBar = {
    goHome: () => void,
    createPost: () => void,
    editPosts: () => void
};

function NavBar({goHome, createPost, editPosts}: NavBar) {
    const {isAuthenticated, loginWithRedirect, logout} = useAuth0();

    let createPostsButton = <Can
        action={POSTS_CREATE}
        yes={() =>
            <Button className={Classes.MINIMAL} icon="new-text-box" text="Create Post"
                    onClick={createPost}/>}
    />;

    let editPostsButton = <Can
        action={POSTS_DELETE}
        yes={() =>
            <Button className={Classes.MINIMAL} icon="edit" text="Edit Posts"
                    onClick={editPosts}/>}
    />;

    return (
        <Navbar>
            <NavbarGroup align={Alignment.LEFT}>
                <NavbarHeading><a onClick={() => goHome()}>mkramers.io</a></NavbarHeading>
                <>
                    <NavbarDivider/>
                    <NavbarGroup>
                        {createPostsButton}
                        {editPostsButton}
                    </NavbarGroup>
                </>
            </NavbarGroup>
            <NavbarGroup align={Alignment.RIGHT}>
                <div>
                    {!isAuthenticated && (
                        <Button onClick={() => loginWithRedirect({})}>Log in</Button>
                    )}

                    {isAuthenticated && <Button onClick={() => logout()}>Log out</Button>}
                </div>
            </NavbarGroup>
        </Navbar>
    );
}

const mapState = () => ({});

const mapDispatch = {
    goHome: () => push('/'),
    createPost: () => push('/create'),
    editPosts: () => push('/editPosts')
};

const connector = connect(mapState, mapDispatch);

export default connector(NavBar);