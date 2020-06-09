import React from "react";

import { connect } from "react-redux";

import { Table, Dashboard } from "../components";


const styles = {
    page: {
        display: "flex",
        "padding-left": "10px",
        "padding-right": "10px",
        "flex-direction": "column",
    },
    content: {
        display: "flex",
        "flex-direction": "row",
        "justify-content": "space-between",
    }
}


class Deck extends React.Component {
    // TODO: Pass card data

    render() {
        var typeGrouped = groupBy(this.props.items, "card_type")

        return (
            <div style={styles.page}>
                <h1 style={{color: "#fff"}}>Deck</h1>
                <div style={styles.content}>
                    <Table title="Deck"
                        creatures={typeGrouped.Creature}
                        instants={typeGrouped.Instant}
                        lands={typeGrouped.Land}
                        sorcery={typeGrouped.Sorcery}
                    />
                    <Dashboard items={this.props.items}/>
                </div>
            </div>
        )
    }
}

var groupBy = function(xs, key) {
    // Example usage
    // var groupedByTeam=groupBy(outJSON, 'team')
    return xs.reduce(function(rv, x) {
        (rv[x[key]] = rv[x[key]] || []).push(x);
        return rv;
    }, {});
};

const mapStateToProps = (state)=>{
    return {
        // items: state.items,
        items: state.addedItems
    }
}

export default connect(mapStateToProps)(Deck);
