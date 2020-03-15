import React from 'react';
import {Alignment, Button, Classes, Navbar, NavbarDivider, NavbarGroup, NavbarHeading} from "@blueprintjs/core";

function App() {
  return (
    <div style={{background: 'red'}}>
        <Navbar>
            <NavbarGroup align={Alignment.LEFT}>
                <NavbarHeading>mkramers</NavbarHeading>
                <NavbarDivider />
                <Button className={Classes.MINIMAL} icon="home" text="Home" />
                <Button className={Classes.MINIMAL} icon="document" text="Files" />
            </NavbarGroup>
        </Navbar>
    </div>
  );
}

export default App;
