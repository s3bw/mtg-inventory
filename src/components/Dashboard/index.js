import React from "react";

import { Card, colors, Table } from "tabler-react";

import C3Chart from "react-c3js";


function computeGraphData(array) {
    var data = {
        card_types: {
            "Creature": 0,
            "Instant": 0,
            "Enchantment": 0,
            "Sorcery": 0,
            "Land": 0,
            "Artifact": 0,
            "Total": 0,
        },
        card_mana: {
            "0": 0,
            "1": 0,
            "2": 0,
            "3": 0,
            "4": 0,
            "5": 0,
            "6": 0,
            "7": 0,
            "+8": 0,
        },
        card_colors: {
            "B": 0,
            "U": 0,
            "W": 0,
            "R": 0,
            "G": 0,
        },
    };

    array.forEach(item => {
        var nitems = item.inDeck

        // Compute number of cards by type
        data.card_types[item.card_type] += (1 * nitems)
        data.card_types["Total"] += (1 * nitems)

        // Compute the distribution of mana cost
        var cmc = Math.ceil(item.cmc);
        if (cmc < 8) {
            data.card_mana[String(cmc)] += (1 * nitems)
        } else {
            data.card_mana["+8"] += (1 * nitems)
        }

        // Compute number of cards by color
        item.color_identity.forEach(color => {
            data.card_colors[color] += (1 * nitems)
        })

    })
    return data
}



function Dashboard(props) {
    var graphData = computeGraphData(props.items)

    const pie = {
            data: {
                columns: [
                    ["green", graphData.card_colors["G"]],
                    ["white", graphData.card_colors["W"]],
                    ["blue", graphData.card_colors["U"]],
                    ["black", graphData.card_colors["B"]],
                    ["red", graphData.card_colors["R"]],
                ],
                type: "pie",
                colors: {
                    green: colors["green"],
                    white: colors["gray-lightest"],
                    blue: colors["blue"],
                    black: "#0a0c0e",  // Black
                    red: colors["red"],
                },
                names: {
                    grean: "green",
                    white: "white",
                    blue: "blue",
                    black: "black",
                    red: "red",
                },
            },
            axis: {},
        }

    const types = [
        {
            card_type: "Creature",
            count: graphData.card_types["Creature"]
        },
        {
            card_type: "Artifact",
            count: graphData.card_types["Artifact"]
        },
        {
            card_type: "Enchantment",
            count: graphData.card_types["Enchantment"]
        },
        {
            card_type: "Instant",
            count: graphData.card_types["Instant"]
        },
        {
            card_type: "Land",
            count: graphData.card_types["Land"]
        },
        {
            card_type: "Sorcery",
            count: graphData.card_types["Sorcery"]
        },
        {
            card_type: "Total",
            count: graphData.card_types["Total"]
        }
    ]

    const mana_curve = {
        data: {
            columns: [
                [
                    "cmc",
                    graphData.card_mana["0"],
                    graphData.card_mana["1"],
                    graphData.card_mana["2"],
                    graphData.card_mana["3"],
                    graphData.card_mana["4"],
                    graphData.card_mana["5"],
                    graphData.card_mana["6"],
                    graphData.card_mana["7"],
                    graphData.card_mana["+8"],
                ],
                [
                    "dist",
                    graphData.card_mana["0"],
                    graphData.card_mana["1"],
                    graphData.card_mana["2"],
                    graphData.card_mana["3"],
                    graphData.card_mana["4"],
                    graphData.card_mana["5"],
                    graphData.card_mana["6"],
                    graphData.card_mana["7"],
                    graphData.card_mana["+8"],
                ],
            ],
            type: "bar",
            types: {
                dist: "spline",
            },
            colors: {
                cmc: colors["gray-light"],
                dist: "#0a0c0e",
            },
            names: {
                cmc: "Card Count",
            },
            axis: {
                x: {
                    type: "category",
                    categories: ["0", "1", "2", "3", "4", "5", "6", "7", "+8"]
                },
            }
        }
    }

    return (
        <div style={{width: "400px"}}>

            <Card>
                <Card.Header>Mana Breakdown</Card.Header>
                <Card.Body>
                    <C3Chart
                        data={mana_curve.data}
                        axis={mana_curve.axis}
                        legend={{
                            show: false,
                        }}
                        padding={{
                            bottom: 0,
                            top: 0,
                        }}
                    />
                </Card.Body>
            </Card>

            <Card>
                <Table>
                    <Table.Header style={{color: "#fff"}}>
                        <Table.ColHeader style={{color: "#fff"}}>card type</Table.ColHeader>
                        <Table.ColHeader>count</Table.ColHeader>
                    </Table.Header>
                    <Table.Body>
                        {types.map((item, key) => (
                        <Table.Row color="pink">
                            <Table.Col color="pink">{item.card_type}</Table.Col>
                            <Table.Col>{item.count}</Table.Col>
                        </Table.Row>
                        ))}
                    </Table.Body>
                </Table>
            </Card>

            <Card>
                <Card.Header>Colour Breakdown</Card.Header>
                <Card.Body>
                    <C3Chart
                        data={pie.data}
                        axis={pie.axis}
                        legend={{
                            show: false,
                        }}
                        padding={{
                            bottom: 0,
                            top: 0,
                        }}
                    />
                </Card.Body>
            </Card>

        </div>
    );
}

export default Dashboard;
