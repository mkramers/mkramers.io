import {Alignment, Button, Classes, Navbar, NavbarDivider, NavbarGroup, NavbarHeading} from "@blueprintjs/core";
import React from "react";

function NavBar() {
    return (
        <Navbar>
            <NavbarGroup align={Alignment.LEFT}>
                <NavbarHeading>mkramers.io</NavbarHeading>
                <NavbarDivider/>
                <Button className={Classes.MINIMAL} icon="home" text="Home"/>
                <Button className={Classes.MINIMAL} icon="new-text-box" text="Create Post"/>
            </NavbarGroup>
        </Navbar>
    );
}

export default NavBar;