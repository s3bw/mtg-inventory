import React from 'react';

import "tabler-react/dist/Tabler.css";
import { Nav } from "tabler-react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import { Inventory, Deck } from "./pages";


function Header () {
    return (
        <Nav>
            <Nav.Item value="Inventory" to="/" />
            <Nav.Item value="Deck" to="/deck" />
        </Nav>
    )
}


function App() {
  return (
    <Router>
        <Header />
        <Switch>
            <Route path="/deck" component={Deck} />
            <Route path="/" component={Inventory} />
        </Switch>
    </Router>

  );
}

export default App;
