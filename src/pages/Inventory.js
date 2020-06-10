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
    sideBarContainer: {
        "max-width": "150px",
        "min-width": "150px"
    },
    sideBar: {
        position: "fixed",
    }
}

class FilterCards extends React.Component {
    state = {
        filters: []
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
    state = {
        sort: "",
    }

    toggleSort = (e) => {
        var newSort = e.target.value
        this.setState({
            sort: newSort
        })
        this.props.onChange(newSort)
    }

    render() {
        return (
            <div>
            <h4>Sort</h4>
                <Form.SelectGroup label="Sort">
                    <Form.SelectGroupItem
                        label="cmc"
                        name="cmc"
                        value="cmc"
                        onClick={this.toggleSort}
                        checked={this.state.sort === "cmc"}
                    />
                    <Form.SelectGroupItem
                        label="edhrec"
                        name="edhrec"
                        value="edhrec"
                        onClick={this.toggleSort}
                        checked={this.state.sort === "edhrec"}
                    />
                </Form.SelectGroup>
            </div>
        )
    }
}

class Inventory extends React.Component {
    state = {
        initItems: this.props.items,
        display: this.props.items,
    }

    toggleFilter = (filter) => {
        let cards = this.state.initItems

        // If there are filters remove cards
        // that don't match the identity given
        // in the filters
        if (filter.length > 0) {
            cards = cards.filter((card) => {
                var remain = filter.every(r=> card.color_identity.includes(r))
                return remain
            })
        }

        this.setState({
            display: cards
        })
    }

    toggleSorter = (sort) => {
        let cards = this.state.display

        if (sort !== this.props.sort) {
            cards.sort(compareFunc(sort))
        }

        this.setState({
            display: cards,
            sort: sort
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
                    artifacts={typeGrouped.Artifact}
                    enchantments={typeGrouped.Enchantment}
                    lands={typeGrouped.Land}
                    sorcery={typeGrouped.Sorcery}
                />
                <div style={styles.sideBarContainer}>
                    <div style={styles.sideBar}>
                        <FilterCards onChange={this.toggleFilter}/>
                        <SortCards onChange={this.toggleSorter} />
                    </div>
                </div>
            </div>
        </div>
        )
    }
}


// Returns a compare function which compares
// objects by given attribute. Used for sorting
var compareFunc = function(sortBy) {
    return function(a, b) {
        if (a[sortBy] < b[sortBy]) {
            return -1;
        }
        if (a[sortBy] > b[sortBy]) {
            return 1;
        }
        return 0;
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

const mapStateToProps = (state) => {
    return {
        sort: state.sort,
        items: state.items,
        addedItems: state.addedItems
    }
}

export default connect(mapStateToProps)(Inventory);
