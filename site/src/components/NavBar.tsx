import {Alignment, Button, Classes, Navbar, NavbarDivider, NavbarGroup, NavbarHeading} from "@blueprintjs/core";
import React from "react";
import {useAuth0} from "../auth0/react-auth0-spa";
import {connect} from "react-redux";
import {push} from 'connected-react-router'
import Can from "./Can";

type NavBar = {
    goHome: () => void,
    createPost: () => void,
    editPosts: () => void
};

function NavBar({goHome, createPost, editPosts}: NavBar) {
    const {isAuthenticated, loginWithRedirect, logout, user} = useAuth0();

    let role = null;
    if (user) {
        role = user["https://demo.mkramers.io"];
    }

    return (
        <Navbar>
            <NavbarGroup align={Alignment.LEFT}>
                <NavbarHeading><a onClick={() => goHome()}>mkramers.io</a></NavbarHeading>
                {isAuthenticated &&
                (
                    <Can
                        action="posts:create"
                        role={role}
                        yes={() =>
                            <>
                                <NavbarDivider/>
                                <NavbarGroup align={Alignment.RIGHT}>
                                    <Button className={Classes.MINIMAL} icon="new-text-box" text="Create Post"
                                             onClick={createPost}/>
                                    <Button className={Classes.MINIMAL} icon="edit" text="Edit Posts"
                                             onClick={editPosts}/>
                                </NavbarGroup>
                            </>
                        }
                        no={() => ""}/>
                )}
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