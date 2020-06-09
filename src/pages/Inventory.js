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

class FilterCards extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            filters: []
        }
    }

    handleChange = (e) => {
        var filters = this.state.filters
        var value = e.target.value

        const exists = filters.includes(value)

        // If the filter is already present
        // remove it (toggle)
        if (exists) {
            filters = filters.filter((filter) => {return filter !== value})
            this.setState({
                filters: filters
            })

        } else {
            filters.push(value)
            this.setState({
                filters: filters,
            })
        }
        this.props.onChange(filters)
    }

    render() {
        return (
            <div>
            <h4>Filter</h4>
            <Form.SelectGroup pills>
                <label className={{"selectgroup-item": true}}>
                    <input type="checkbox" className={"selectgroup-input"}
                        onClick={this.handleChange} name="green" value="G"
                    />
                    <span className={"selectgroup-button ms ms-g"}/>
                </label>

                <label className={{"selectgroup-item": true}}>
                    <input type="checkbox" className={"selectgroup-input"}
                        onClick={this.handleChange} name="red" value="R"/>
                    <span className={"selectgroup-button ms ms-r"}/>
                </label>

                <label className={{"selectgroup-item": true}}>
                    <input type="checkbox" className={"selectgroup-input"}
                        onClick={this.handleChange} name="black" value="B"/>
                    <span className={"selectgroup-button ms ms-b"}/>
                </label>

                <label className={{"selectgroup-item": true}}>
                    <input type="checkbox" className={"selectgroup-input"}
                        onClick={this.handleChange} name="white" value="W"/>
                    <span className={"selectgroup-button ms ms-w"}/>
                </label>

                <label className={{"selectgroup-item": true}}>
                    <input type="checkbox" className={"selectgroup-input"}
                    onClick={this.handleChange} name="blue" value="U"/>
                    <span className={"selectgroup-button ms ms-u"}/>
                </label>
            </Form.SelectGroup>
            </div>
        )
    }
}

class SortCards extends React.Component {


    render() {
        return (
            <div>
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
}

class Inventory extends React.Component {
    state = {
        initItems: this.props.items,
        display: this.props.items
    }

    toggleFilter = (filter) => {
        let cards = this.state.initItems

        // If there are filters remove cards
        // that don't match the identity given
        // in the filters
        if (filter.length > 0) {
            cards = cards.filter((card) => {
                var remain = card.color_identity.some(r=> filter.includes(r))
                return remain
            })
        }

        this.setState({
            display: cards
        })
    }

    render () {
        var typeGrouped = groupBy(this.state.display, "card_type")

        return (
        <div style={styles.page}>
            <h1 style={{color: "#fff"}}>Inventory</h1>
            <div style={styles.content}>
                <Table creatures={typeGrouped.Creature}
                    instants={typeGrouped.Instant}
                    lands={typeGrouped.Land}
                    sorcery={typeGrouped.Sorcery}
                />
                <div>
                    <FilterCards onChange={this.toggleFilter}/>
                    <SortCards onChange={this.toggleSorter} />
                </div>
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
