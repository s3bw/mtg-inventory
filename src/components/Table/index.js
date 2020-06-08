import React from "react";

import { Page, Grid } from "tabler-react";

import Card from "../Card";

import styles from "./style.module.css";



function Table(props) {

   // TODO: Add filtering

  // const options = (
  //  <React.Fragment>
  //     <Form.Select className="w-auto mr-2">
  //       <option value="asc">Newest</option>
  //       <option value="desc">Oldest</option>
  //     </Form.Select>
  //     {/* TODO: This moves to nav<Form.Input icon="search" placeholder="Search photo" />*/}
  //   </React.Fragment>
  // );
    var creatures = (props.creatures === undefined) ? [] : props.creatures;
    var artifacts = (props.artifacts === undefined) ? [] : props.artifacts;
    var enchantments = (props.enchantments === undefined) ? [] : props.enchantments;
    var instants = (props.instants === undefined) ? [] : props.instants;
    var lands = (props.lands === undefined) ? [] : props.lands;
    var sorcery = (props.sorcery === undefined) ? [] : props.sorcery;

    return (
        <div>
            <Page.Header title={props.title} />
            <CardType sub_title="Creatures" items={creatures} />
            <CardType sub_title="Artifacts" items={artifacts} />
            <CardType sub_title="Enchantments" items={enchantments} />
            <CardType sub_title="Instants" items={instants} />
            <CardType sub_title="Lands" items={lands} />
            <CardType sub_title="Socery" items={sorcery} />
        </div>
    )
}


function CardType(props) {
        // <div className={styles.grid}>
    return (
        <div>
            <Page.Header subTitle={props.sub_title} />

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
