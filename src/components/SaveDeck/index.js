import React from "react";

import { connect } from "react-redux";
import { Button, Form, Alert } from "tabler-react";

import styles from "./style.module.css";
import { changeActiveDeck } from "../actions/deckActions";
import APIClient from "../../ApiClient";


function defaultAlert(message, color) {
    return (
        <Alert type={color}>
            <strong>Message: </strong>{message}
        </Alert>
    )
}


class SaveDeck extends React.Component {

    state = {
        alert: defaultAlert(`Editing ${this.props.activeDeck.name}`, "secondary")
    }

    apiClient = new APIClient();

    handleSave = async (event) => {
        event.preventDefault();
        // Filter items to include only id and quantity
        let arr = this.props.addedItems
        let deckItems = arr.reduce(
            (a, o) => (
                a.push({'id': o.id, 'quantity': o.inDeck}),
                a
            ), []
        )

        let resp = await this.apiClient.updateDeck(
            this.props.activeDeck.id,
            {
              name: this.props.activeDeck.name,
              items: deckItems
            }
        )

        this.setState({alert: defaultAlert(`${resp.message}, deck saved!`, "success")})
    }

    handleSaveAs = async (event) => {
        event.preventDefault();
        // Filter items to include only id and quantity
        let arr = this.props.addedItems
        let deckName = event.target.deckname.value
        let deckItems = arr.reduce(
            (a, o) => (
                a.push({'id': o.id, 'quantity': o.inDeck}),
                a
            ), []
        )

        let resp = await this.apiClient.createDeck({
            name: deckName,
            items: deckItems
        })

        // TODO: Handle errors
        // e.g.
        // - Decks of the same name
        // - Deck name not long enough.

        this.setState({alert: defaultAlert(`${deckName}, created!`, "success")})
        // TODO: This will require recalculating stock
        // same as Delete and Edit
        this.props.changeActiveDeck({id: resp.id, name: deckName});
    }

    onSubmit(e) {
        e.preventDefault();
    }

    render () {
        return (
            <div>
                {this.state.alert}
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
        changeActiveDeck: (items) => {dispatch(changeActiveDeck(items))},
        // updateDeck: (items) => {dispatch(updateDeck(items))},
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SaveDeck);
