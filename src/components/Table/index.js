import React from "react";

import { Page, Grid } from "tabler-react";

import Card from "../Card";

import styles from "./style.module.css";



// TODO: Add filtering
function Table(props) {

    var creatures = (props.creatures === undefined) ? [] : props.creatures;
    var artifacts = (props.artifacts === undefined) ? [] : props.artifacts;
    var enchantments = (props.enchantments === undefined) ? [] : props.enchantments;
    var instants = (props.instants === undefined) ? [] : props.instants;
    var lands = (props.lands === undefined) ? [] : props.lands;
    var sorcery = (props.sorcery === undefined) ? [] : props.sorcery;

    return (
        <div>
            <CardType sub_title="Creatures" items={creatures} />
            <CardType sub_title="Artifacts" items={artifacts} />
            <CardType sub_title="Enchantments" items={enchantments} />
            <CardType sub_title="Instants" items={instants} />
            <CardType sub_title="Lands" items={lands} />
            <CardType sub_title="Sorcery" items={sorcery} />
        </div>
    )
}


function CardType(props) {
    return (
        <div>
            <h4 className={styles.heading1}>{props.sub_title}</h4>

            <Grid.Row className="row-cards">
            {props.items.map((item, key) => (
                <Grid.Col className={styles.column} key={key}>
                    <Card card={item} />
                </Grid.Col>
                ))}
            </Grid.Row>
        </div>
    );
}

export default Table;
