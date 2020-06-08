import React from "react";

import json from "./data.json";
import { Table } from "../components";


function Inventory() {
    // TODO: Add filtering toggle
    return (
        <Table title="Inventory"
            creatures={json.creatures}
            instants={json.instants}
        />
    )
}

export default Inventory;
