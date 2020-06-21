import React from "react";

import { connect } from "react-redux";
import { Card, Button } from "tabler-react";

import { editDeck, deleteDeck } from "../actions/deckActions";

import APIClient from "../../ApiClient";
import styles from "./style.module.css";


async function updateInventory(apiClient, deckCards) {
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
        let data = await updateInventory(this.apiClient, deckCards)

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
        let data;

        if (id !== this.props.activeDeck.id) {
            await this.apiClient.deleteDeck(id)

            data = await updateInventory(this.apiClient, this.props.items)

            data.activeDeck = this.props.activeDeck

        } else if (this.props.decks.length > 1) {
            let newDecks = this.props.decks.filter(item=> item.id !== id)
            let newActiveDeck = newDecks[0]
            let deckCards = await this.apiClient.fetchDeck(newActiveDeck.id)

            await this.apiClient.deleteDeck(id)
            data = await updateInventory(this.apiClient, deckCards)
            data.activeDeck = newActiveDeck

        } else {
            // TODO: No decks exists.
        }
        this.props.deleteDeck(id, data);
        this.setState({
            deleting: false
        })
    }

    render () {
        const item = this.props.deck

        let deleteButton;
        if (this.state.deleting) {
            deleteButton = (
                <Button color="danger"
                    onClick={() => {this.handleDeleteDeck(item.id)}}
                >Confirm?</Button>
            )
        } else {
            deleteButton = (
                <Button outline color="danger"
                    onClick={this.handleDeleteToggle}
                >Delete</Button>
            )
        }

        console.log(this.props.activeDeck)
        console.log(this.props.activeDeck.id)
        let editButton;
        if (this.props.activeDeck.id === item.id) {
            editButton = (
                <Button color="dark" disabled
                >Editing</Button>
            )
        } else {
                editButton = (
                    <Button color="dark"
                        onClick={() => {this.handleEditDeck(item.id)}}
                    >Edit</Button>
                )
        }

        return (
            <Card className={styles.deckCard}>
                <div className={styles.deckCardContent}>
                    <div>{item.name}</div>
                    <div className={styles.deckCardBtns}>
                        {editButton}
                        {deleteButton}
                    </div>
                </div>
            </Card>
        )
    }
}


const mapDispatchToProps = (dispatch) => {
    return{
        editDeck: (data) => {dispatch(editDeck(data))},
        deleteDeck: (id, data) => {dispatch(deleteDeck(id, data))}
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
