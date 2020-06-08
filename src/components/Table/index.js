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

    return (
        <div>
            <Page.Header title={props.title} />
            <CardType sub_title="Creatures" items={props.creatures} />
            <CardType sub_title="Instants" items={props.instants} />
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
