import React from "react";

import json from "./data.json";

import { Table, Dashboard } from "../components";


function Deck() {
    // TODO: Pass card data
    return (
        <div style={{
                display: "flex",
            }}>
            <Table title="Deck"
                creatures={json.creatures}
                instants={json.instants}
            />
            <Dashboard />
        </div>
    )
}

export default Deck;
