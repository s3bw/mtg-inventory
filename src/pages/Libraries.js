import React from "react";

import { connect } from "react-redux";

import { DeckCard } from "../components";


const styles = {
    page: {
        display: "flex",
        "padding-top": "10px",
        "padding-left": "10px",
        "padding-right": "10px",
        "flex-direction": "column",
    },
    content: {
        display: "flex",
        "flex-direction": "row",
        "justify-content": "space-between",
    },
    sideBar: {
        "max-width": "400px",
        "min-width": "400px"
    },
    h4: {
        color: "#fff",
    },
}


class Libraries extends React.Component {

    render() {
        let decks = this.props.decks

        return (
            <div style={styles.page}>
                <h1 style={{color: "#fff"}}>Libraries</h1>
                <div style={styles.content}>
                    <div>
                        <h4 style={styles.h4}>Decks</h4>
                        {decks.map((deck, key) => (
                                <DeckCard deck={deck} />
                            ))}
                    </div>

                    {/* Placeholder sidebar*/}
                    <div style={styles.sideBar}>
                        <h4 style={styles.h4}></h4>
                    </div>

                </div>
            </div>
        )
    }
}


const mapStateToProps = (state)=>{
    return {
        // items: state.items,
        items: state.addedItems,
        activeDeck: state.activeDeck,
        decks: state.decks
    }
}

export default connect(mapStateToProps)(Libraries);
