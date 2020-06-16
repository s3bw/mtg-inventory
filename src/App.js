import React from 'react';
import { Link } from "react-router-dom";

import { connect } from "react-redux";
import "tabler-react/dist/Tabler.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import { Inventory, Deck, Libraries } from "./pages";
import APIClient from "./ApiClient";
import { initState } from "./components/actions/deckActions";


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

const defaultDeck = {
    id: 0,
    name: "Untitled Deck",
}


class App extends React.Component {

    state = {
        // Start without any items
        dataLoaded: false
    }

    _setStateAsync (state) {
        return new Promise((resolve) => {
            this.props.initState(state)
            this.setState({dataLoaded: true})
        });
    }

    async componentDidMount () {
        this.apiClient = new APIClient();

        if (this.props.items === undefined || this.props.items.length === 0) {
            const items = await this.apiClient.fetchInventory()
            const decks = await this.apiClient.fetchDecks()
            let activeDeck = (decks.length > 0) ? decks[0] : defaultDeck;
            var selectedItems = [];

            if (activeDeck.id !== 0) {
                const deckCards = await this.apiClient.fetchDeck(activeDeck.id)
                var nItems = items.length

                for (var i = 0; i < nItems; i++) {
                    let item = items[i]
                    let selectedItem  = deckCards.find(card=> card.id === item.id)

                    if (selectedItem) {
                        item.inDeck = selectedItem.quantity
                        selectedItems.push(item)
                    } else {
                        item.inDeck = 0
                    }

                }
            }

            console.log("Calling the API again!")
            console.log(selectedItems)
            await this._setStateAsync({
                // Data is loaded into initial items
                items: items,
                addedItems: selectedItems,
                decks: decks,
                activeDeck: activeDeck,
            });
        }
    }

    renderApp = (loaded) => {
        // If cards are not defined they have not
        // been loaded
        if (!loaded) {
            return <div>Loading...</div>;
        }
        return (
            <Switch>
                <Route exact path="/" component={Inventory} />
                <Route path="/deck" component={Deck} />
                <Route path="/libraries" component={Libraries} />
            </Switch>
        )
    }


    render () {
        return (
            <Router>
                <Header />
                {this.renderApp(this.state.dataLoaded)}
            </Router>
        );
    }
}

const mapDispatchToProps = (dispatch) => {
    return{
        initState: (data) => {dispatch(initState(data))},
    }
}


const mapStateToProps = (state)=>{
    return {
        items: state.items,
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
