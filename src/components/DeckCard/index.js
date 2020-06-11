import React from "react";

import { connect } from "react-redux";
import { Card, Button } from "tabler-react";

import { editDeck, deleteDeck } from "../actions/libraryActions";

import stylesModule from "./style.module.css";


class DeckCard extends React.Component {

    handleEditDeck = (id) => {
        this.props.editDeck(id);
    }

    handleDeleteDeck = (id) => {
        this.props.deleteDeck(id);
    }

    render () {
        const item = this.props.deck

        return (
            <Card className={stylesModule.deckCard}>
                <div className={stylesModule.deckCardContent}>
                    <div>{item.name}</div>
                    <div className={stylesModule.deckCardBtns}>
                        <Button color="dark"
                            onClick={() => {this.handleEditDeck(item.id)}}
                        >Edit</Button>
                        <Button outline color="danger"
                            onClick={() => {this.handleDeleteDeck(item.id)}}
                        >Delete</Button>
                    </div>
                </div>
            </Card>
        )
    }
}


const mapDispatchToProps= (dispatch)=>{
    return{
        editDeck: (id)=>{dispatch(editDeck(id))},
        deleteDeck: (id) => {dispatch(deleteDeck(id))}
    }
}

const mapStateToProps = (state)=>{
    return {
        // items: state.items,
        items: state.addedItems,
        activeDeck: state.activeDeck
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(DeckCard);
