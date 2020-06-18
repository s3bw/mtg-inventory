import React from "react";

import { connect } from "react-redux";
import { Button, Form } from "tabler-react";

import styles from "./style.module.css";
import { createDeck, updateDeck } from "../actions/deckActions";
import APIClient from "../../ApiClient";


class SaveDeck extends React.Component {

    apiClient = new APIClient();

    handleSave = (event) => {
        event.preventDefault();
        console.log(this.props.activeDeck)
        console.log(this.props.addedItems)

        let arr = this.props.addedItems
        let deckItems = arr.reduce(
            (a, o) => (
                a.push({'id': o.id, 'quantity': o.inDeck}),
                a
            ), []
        )

        let resp = this.apiClient.updateDeck(
            this.props.activeDeck.id,
            {
              name: this.props.activeDeck.name,
              items: deckItems
            }
        )
        console.log(resp)
        this.props.updateDeck(event);
    }

    handleSaveAs = (event) => {
        event.preventDefault();
        console.log("Save As:", event.target.deckname.value)
        this.props.createDeck(event);
    }

    onSubmit(e) {
        e.preventDefault();
    }

    render () {
        return (
            <div className={styles.deckTitle}>
                <Form className={styles.formStyle} onSubmit={this.handleSaveAs}>
                    <Form.Input name="deckname" placeholder={this.props.activeDeck.name}
                        className={styles.formInput}/>
                    <div className={styles.deckActions}>
                        <Button color="dark"
                            onClick={this.handleSave}
                            >Save</Button>
                        <Button color="dark" type="submit"
                            >Save As</Button>
                    </div>
                </Form>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        addedItems: state.addedItems,
        activeDeck: state.activeDeck
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        createDeck: (items) => {dispatch(createDeck(items))},
        updateDeck: (items) => {dispatch(updateDeck(items))},
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SaveDeck);
