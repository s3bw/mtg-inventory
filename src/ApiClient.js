import axios from "axios";

import { config } from "./Constants";


const client = axios.create({
    baseURL: config.API_URL,
    json: true
});


class APIClient {

    fetchInventory () {
        return this.perform("get", "/api/v1/inventory");
    }

    addToInventory (card) {
        return this.perform("post", "/api/v1/inventory", card);
    }

    fetchDecks () {
        return this.perform("get", "/api/v1/deck");
    }

    createDeck (deck) {
        return this.perform("post", "/api/v1/deck", deck);
    }

    updateDeck (id, deck) {
        return this.perform("post", `/api/v1/deck/${id}`, deck);
    }

    fetchDeck (id) {
        return this.perform("get", `/api/v1/deck/${id}`);
    }

    deleteDeck (id) {
        return this.perform("delete", `/api/v1/deck/${id}`);
    }

    async perform (method, resource, data) {
        return client({
            method,
            url: resource,
            data,
        }).then((resp) => {
            return resp.data ? resp.data : [];
        });
    }
}

export default APIClient
