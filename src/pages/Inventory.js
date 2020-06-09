import React from "react";

import { connect } from "react-redux";
import { Form, Button } from "tabler-react";

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
    },
}

function FilterCards() {
        // <span className="mana medium s1"></span>
    return (
        <div>
            <h4>Filter</h4>
            <Form.SelectGroup pills>
                <label className={{"selectgroup-item": true}}>
                    <input type="checkbox" className={"selectgroup-input"} name="green" value="sun"/>
                    <span className={"selectgroup-button ms ms-g"}/>
                </label>
                <label className={{"selectgroup-item": true}}>
                    <input type="checkbox" className={"selectgroup-input"} name="green" value="sun"/>
                    <span className={"selectgroup-button ms ms-r"}/>
                </label>
                <label className={{"selectgroup-item": true}}>
                    <input type="checkbox" className={"selectgroup-input"} name="green" value="sun"/>
                    <span className={"selectgroup-button ms ms-b"}/>
                </label>
                <label className={{"selectgroup-item": true}}>
                    <input type="checkbox" className={"selectgroup-input"} name="green" value="sun"/>
                    <span className={"selectgroup-button ms ms-w"}/>
                </label>
                <label className={{"selectgroup-item": true}}>
                    <input type="checkbox" className={"selectgroup-input"} name="green" value="sun"/>
                    <span className={"selectgroup-button ms ms-u"}/>
                </label>
            </Form.SelectGroup>

            <h4>Sort</h4>
            <Form.SelectGroup label="Sort">
                <Form.SelectGroupItem
                    label="cmc"
                    name="size"
                    value="50"
                />
                <Form.SelectGroupItem
                    label="edhrec"
                    name="size"
                    value="50"
                />
            </Form.SelectGroup>
        </div>
    )
}

class Inventory extends React.Component {
    // TODO: Add filtering toggle

    render () {
        var typeGrouped = groupBy(this.props.items, "card_type")

        return (
        <div style={styles.page}>
            <h1 style={{color: "#fff"}}>Inventory</h1>
            <div style={styles.content}>
                <Table creatures={typeGrouped.Creature}
                    instants={typeGrouped.Instant}
                    lands={typeGrouped.Land}
                    sorcery={typeGrouped.Sorcery}
                />
                <FilterCards />
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
        items: state.items,
        addedItems: state.addedItems
    }
}

export default connect(mapStateToProps)(Inventory);
