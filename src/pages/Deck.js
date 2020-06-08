import React from "react";

import { connect } from "react-redux";

import { Table, Dashboard } from "../components";


class Deck extends React.Component {
    // TODO: Pass card data

    render() {
        console.log(this.props.addedItems)
        var typeGrouped = groupBy(this.props.items, "card_type")

        return (
            <div style={{
                    display: "flex",
                }}>
                <Table title="Deck"
                    creatures={typeGrouped.Creature}
                    instants={typeGrouped.Instant}
                    lands={typeGrouped.Land}
                    sorcery={typeGrouped.Sorcery}
                />
                <Dashboard />
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
