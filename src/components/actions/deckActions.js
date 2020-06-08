import { ADD_TO_DECK } from './action-types/deck-actions'

//add cart action
export const addToDeck = (id) => {
    return {
        type: ADD_TO_DECK,
        id
    }
}
