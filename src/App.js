import React from 'react';

import "tabler-react/dist/Tabler.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import { Inventory, Deck } from "./pages";


function App() {
  return (
    <Router>
        {/*  TODO: Navigation <Header /> */}
        <Switch>
            <Route path="/" component={Inventory} />
            <Route path="/deck" component={Deck} />
        </Switch>
    </Router>

  );
}

export default App;
