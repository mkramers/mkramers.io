import {Alignment, Button, Classes, Navbar, NavbarDivider, NavbarGroup, NavbarHeading} from "@blueprintjs/core";
import React from "react";
import {connect} from "react-redux";
import {push} from 'connected-react-router'
import Can from "./Can";
import {POSTS_CREATE, POSTS_DELETE} from "../AuthRules";
import {useAuth0} from "../auth0/react-auth0-spa";
import {State} from "../store";

type NavBar = {
    goHome: () => void;
    createPost: (parentId?: number) => void;
    editPosts: () => void;
    selectedPostId?: number;
};

function NavBar({goHome, createPost, editPosts, selectedPostId}: NavBar) {
    const {isAuthenticated, loginWithRedirect, logout} = useAuth0();

    let createPostsButton = <Can
        action={POSTS_CREATE}
        yes={() =>
            <Button className={Classes.MINIMAL} icon="new-text-box" text="Create Post"
                    onClick={() => createPost(selectedPostId)}/>}
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

const mapState = (state: State) => ({
    selectedPostId: state.posts.selectedPostId
});

const mapDispatch = {
    goHome: () => push('/'),
    createPost: (parentId?: number) => push(`/create/${parentId}`),
    editPosts: () => push('/editPosts')
};

const connector = connect(mapState, mapDispatch);

export default connector(NavBar);