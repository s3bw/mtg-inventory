import React from 'react';
import { Link } from "react-router-dom";

import "tabler-react/dist/Tabler.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import { Inventory, Deck, Libraries } from "./pages";


const styles = {
    navHeader: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        backgroundColor: "#3e3e3e",
    },
    navContainer: {
        display: "flex",
        marginTop: "8px",
        width: "300px",
        justifyContent: "space-between",
    },
}



function Header () {
    return (
        <nav style={styles.navHeader}>
            <div style={styles.navContainer}>
                <Link to="/"><h4>Inventory</h4></Link>
                <Link to="/deck"><h4>Deck</h4></Link>
                <Link to="/libraries" ><h4>Libraries</h4></Link>
            </div>
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
                    <Route path="/libraries" component={Libraries} />
                </Switch>
            </Router>
        );
    }
}

export default App;
