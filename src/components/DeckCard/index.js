import React from "react";

import { connect } from "react-redux";
import { Card, Button } from "tabler-react";

import { editDeck, deleteDeck } from "../actions/deckActions";

import APIClient from "../../ApiClient";
import styles from "./style.module.css";


async function fetchInventoryAndDeck(id, apiClient, deckCards) {
    const items = await apiClient.fetchInventory()

    var selectedItems = [];
    var nItems = items.length
    for (var i = 0; i < nItems; i++) {
        let item = items[i]
        let selectedItem = deckCards.find(card=> card.id === item.id)

        if (selectedItem) {
            item.inDeck = selectedItem.quantity
            selectedItems.push(item)
        } else {
            item.inDeck = 0
        }
    }
    return {
        items: items,
        addedItems: selectedItems,
    }
}




class DeckCard extends React.Component {

    apiClient = new APIClient();

    state = {
        deleting: false
    }

    handleEditDeck = async (id) => {
        let deckCards = await this.apiClient.fetchDeck(id)
        let data = await fetchInventoryAndDeck(id, this.apiClient, deckCards)

        let deckToEdit = this.props.decks.find(item => item.id === id)
        data.activeDeck = deckToEdit

        this.props.editDeck(data);
    }

    handleDeleteToggle = () => {
        this.setState({
            deleting: true
        })
    }

    handleDeleteDeck = async (id) => {
        // Check if the active deck is being deleted
        if (id === this.props.activeDeck.id && this.props.decks.length > 1) {
            // Set to a new appropriate active deck.
            let deckCards = await this.apiClient.fetchDeck(id)
        } else if (id === this.props.activeDeck.id && this.props.decks.length === 1 ){
            // Set to default deck
            let deckCards = await this.apiClient.fetchDeck(id)
        } else {
            let deckCards = this.props.selectedItems
        }

        let data = await fetchInventoryAndDeck(id, this.apiClient, deckCards)

        this.props.deleteDeck(data);
        this.setState({
            deleting: false
        })
    }

    render () {
        const item = this.props.deck

        let button;
        if (this.state.deleting) {
            button = (
                <Button color="danger"
                    onClick={() => {this.handleDeleteDeck(item.id)}}
                >Confirm?</Button>
            )
        } else {
            button = (
                <Button outline color="danger"
                    onClick={this.handleDeleteToggle}
                >Delete</Button>
            )
        }

        return (
            <Card className={styles.deckCard}>
                <div className={styles.deckCardContent}>
                    <div>{item.name}</div>
                    <div className={styles.deckCardBtns}>
                        <Button color="dark"
                            onClick={() => {this.handleEditDeck(item.id)}}
                        >Edit</Button>
                        {button}
                    </div>
                </div>
            </Card>
        )
    }
}


const mapDispatchToProps = (dispatch) => {
    return{
        editDeck: (data) => {dispatch(editDeck(data))},
        deleteDeck: (id) => {dispatch(deleteDeck(id))}
    }
}

const mapStateToProps = (state)=>{
    return {
        // items: state.items,
        items: state.addedItems,
        decks: state.decks,
        activeDeck: state.activeDeck
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(DeckCard);
