import React from "react";

import { Card, colors, Table } from "tabler-react";

import C3Chart from "react-c3js";


function Dashboard() {
    const pie = {
            data: {
                columns: [
                    ["green", 25],
                    ["white", 15],
                    ["blue", 10],
                    ["black", 0],
                    ["red", 0],
                ],
                type: "pie",
                colors: {
                    green: colors["green"],
                    white: colors["gray-lightest"],
                    blue: colors["blue"],
                    black: colors["black"],
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
            count: 12
        },
        {
            card_type: "Artifact",
            count: 3
        },
        {
            card_type: "Enchantment",
            count: 3
        },
        {
            card_type: "Instant",
            count: 3
        },
        {
            card_type: "Land",
            count: 3
        },
        {
            card_type: "Sorcery",
            count: 3
        },
        {
            card_type: "Total",
            count: 15
        }
    ]

    const mana_curve = {
        data: {
            columns: [
                ["data2", 2, 4, 8, 4, 2, 1, 0, 1, 4],
            ],
            type: "bar",
            colors: {
                data2: colors["blue"],
            },
            names: {
                data1: "Mana Cost",
            },
            axis: {
                x: {
                    type: "catagory",
                    categories: ["0", "1", "2", "3", "4", "5", "6", "7", "+8"]
                }
            }
        }
    }

    return (
        <div style={{width: "700px"}}>

            <Card>
                <Card.Header>mana breakdown</Card.Header>
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

            <Table>
                <Table.Header>
                    <Table.ColHeader>card type</Table.ColHeader>
                    <Table.ColHeader>count</Table.ColHeader>
                </Table.Header>
                <Table.Body>
                    {types.map((item, key) => (
                    <Table.Row>
                        <Table.Col>{item.card_type}</Table.Col>
                        <Table.Col>{item.count}</Table.Col>
                    </Table.Row>
                    ))}
                </Table.Body>
            </Table>

            <Card>
                <Card.Header>colour breakdown</Card.Header>
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
