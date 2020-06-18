import {
    ADD_TO_DECK,
    REMOVE_FROM_DECK,
    INIT_ITEMS,
    CREATE_DECK,
    UPDATE_DECK,
} from './action-types/deck-actions'

// Initialise application's state
export const initState = (data) => {
    return {
        type: INIT_ITEMS,
        data
    }
}

// Create deck
export const createDeck = (data) => {
    return {
        type: CREATE_DECK,
        data
    }
}

// Update deck
export const updateDeck = (data) => {
    return {
        type: UPDATE_DECK,
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
