import { ADD_TO_DECK, REMOVE_FROM_DECK } from '../actions/action-types/deck-actions'

import json from "./data.json";


const initState = {
    items: json,
    addedItems: [],
    total: 0,
}

const deckReducer = (state = initState, action) => {

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
