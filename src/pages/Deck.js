import React from "react";

import { connect } from "react-redux";

import { Table, Dashboard } from "../components";

import { Button, Form } from "tabler-react";


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
    deckTitle: {
        display: "flex",
        justifyContent: "space-between",
        marginBottom: "20px"
    },
    deckActions: {
        width: "150px",
        display: "flex",
        justifyContent: "space-between",
    }
}


class Deck extends React.Component {
    render() {
        var typeGrouped = groupBy(this.props.items, "card_type")

        return (
            <div style={styles.page}>
                <h1 style={{color: "#fff"}}>Deck</h1>
                <div style={styles.content}>
                    <Table title="Deck"
                        creatures={typeGrouped.Creature}
                        artifacts={typeGrouped.Artifact}
                        enchantments={typeGrouped.Enchantment}
                        instants={typeGrouped.Instant}
                        lands={typeGrouped.Land}
                        sorcery={typeGrouped.Sorcery}
                    />

                    <div style={styles.sideBar}>

                        <div style={styles.deckTitle}>
                            <Form.Input name="deckname" placeholder={this.props.activeDeck.name} />
                            <div style={styles.deckActions}>
                                <Button color="dark">Save</Button>
                                <Button color="dark">Save As</Button>
                            </div>
                        </div>

                        <Dashboard items={this.props.items}/>
                    </div>

                </div>
            </div>
        )
    }
}

var groupBy = function(xs, key) {
    return xs.reduce(function(rv, x) {
        (rv[x[key]] = rv[x[key]] || []).push(x);
        return rv;
    }, {});
};

const mapStateToProps = (state)=>{
    return {
        // items: state.items,
        items: state.addedItems,
        activeDeck: state.activeDeck
    }
}

export default connect(mapStateToProps)(Deck);
