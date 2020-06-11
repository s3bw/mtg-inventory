import React from "react";

import { connect } from "react-redux";
import { Form } from "tabler-react";

import { Table, FilterCards } from "../components";


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
    sideBarContainer: {
        "max-width": "150px",
        "min-width": "150px"
    },
    sideBar: {
        position: "fixed",
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
