import { ADD_TO_DECK, REMOVE_FROM_DECK } from './action-types/deck-actions'

//add deck action
export const addToDeck = (id) => {
    return {
        type: ADD_TO_DECK,
        id
    }
}

//remove deck action
export const removeFromDeck = (id) => {
    return {
        type: REMOVE_FROM_DECK,
        id
    }
}
