import React from "react";

import { connect } from "react-redux";

import { Table } from "../components";


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

class Inventory extends React.Component {
    // TODO: Data will need to be grouped.
    // var groupedData = _.groupBy(data, function(d){return d.division});
    // TODO: Add filtering toggle

    render () {
        var typeGrouped = groupBy(this.props.items, "card_type")

        return (
        <div style={styles.page}>
            <h1 style={{color: "#fff"}}>Inventory</h1>
            <Table creatures={typeGrouped.Creature}
                   instants={typeGrouped.Instant}
                   lands={typeGrouped.Land}
                   sorcery={typeGrouped.Sorcery}
            />
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
        items: state.items,
        addedItems: state.addedItems
    }
}

export default connect(mapStateToProps)(Inventory);
