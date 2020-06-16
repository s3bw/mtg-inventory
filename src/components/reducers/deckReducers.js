import { ADD_TO_DECK, REMOVE_FROM_DECK, INIT_ITEMS } from '../actions/action-types/deck-actions'
import { EDIT_DECK, DELETE_DECK } from '../actions/action-types/library-actions'

import json from "./data.json";


const initState = {
    // items: json,
    items: undefined,
    addedItems: undefined,
    activeDeck: undefined,
    decks: undefined
}

const deckReducer = (state = initState, action) => {

    if (action.type === INIT_ITEMS) {

        return {
            ...state,
            items: action.data.items,
            decks: action.data.decks,
            activeDeck: action.data.activeDeck
        }
    }

    // Edit a deck from the deck list
    if (action.type === EDIT_DECK) {
        let selected = state.decks.find(item=> item.id === action.id)

        return {
            ...state,
            activeDeck: selected
        }
    }

    // Delete a deck from the deck list
    if (action.type === DELETE_DECK) {
        let newDecks = state.decks.filter(item=> item.id !== action.id)

        // If the active deck is being deleted
        // default to the initState deck (which
        // is untitled and empty).
        if (action.id === state.activeDeck.id) {
            return {
                ...state,
                activeDeck: initState.activeDeck,
                decks: newDecks,
            }
        }

        return {
            ...state,
            decks: newDecks,
        }

    }

    //INSIDE HOME COMPONENT
    if(action.type === ADD_TO_DECK){
        //check if the action id exists in the addedItems
        let addedItem = state.items.find(item=> item.id === action.id)
        let existed_item = state.addedItems.find(item=> action.id === item.id)

        // Check if there are still cards in inventory
        let cardAvailable = (addedItem.inStock > 0)
        if (!cardAvailable) {
            return state
        }

        addedItem.inStock -= 1
        addedItem.inDeck += 1
        if (existed_item) {
            return {
                ...state,
                items: [...state.items],
                total: state.total + 1
            }

        } else {
            return{
                ...state,
                items: [...state.items],
                addedItems: [...state.addedItems, addedItem],
                total : state.total + 1
            }
        }
    } else if (action.type === REMOVE_FROM_DECK) {
        let removedItem = state.items.find(item=> item.id === action.id)
        // let itemToRemove= state.addedItems.find(item=> action.id === item.id)

        // Check if there are cards in the deck
        let cardAvailable = (removedItem.inDeck > 0)
        if (!cardAvailable) {
            return state
        }

        removedItem.inStock += 1
        removedItem.inDeck -= 1
        if (removedItem.inDeck === 0) {
            let new_items = state.addedItems.filter(item=> action.id !== item.id)
            return{
                ...state,
                items: [...state.items],
                addedItems: new_items,
                total: state.total - 1
            }
        } else {
            return{
                ...state,
                items: [...state.items],
                total: state.total - 1
            }
        }
    }

    else {
        return state
    }
  }

export default deckReducer
