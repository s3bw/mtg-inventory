import { ADD_TO_DECK, REMOVE_FROM_DECK, INIT_ITEMS } from './action-types/deck-actions'


export const initState = (data) => {
    return {
        type: INIT_ITEMS,
        data
    }
}


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
