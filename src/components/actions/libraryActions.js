import { EDIT_DECK, DELETE_DECK } from "./action-types/library-actions";


// Edit selected deck
export const editDeck = (id) => {
    return {
        type: EDIT_DECK,
        id
    }
}

// Delete selected deck
export const deleteDeck = (id) => {
    return {
        type: DELETE_DECK,
        id
    }
}
