import React from 'react';
import { Link } from "react-router-dom";

import "tabler-react/dist/Tabler.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import { Inventory, Deck } from "./pages";


function Header () {
    return (
        <nav>
            <Link to="/" >Inventory</Link>
            <Link to="/deck" >Deck</Link>
        </nav>
    )
}


class App extends React.Component {
    render () {
        return (
            <Router>
                <Header />
                <Switch>
                    <Route exact path="/" component={Inventory} />
                    <Route path="/deck" component={Deck} />
                </Switch>
            </Router>
        );
    }
}

export default App;
