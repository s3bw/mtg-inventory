import { ADD_TO_DECK, REMOVE_FROM_DECK } from '../actions/action-types/deck-actions'


const initState = {
    items: [
        {
            id: 2,
            image_url: "https://img.scryfall.com/cards/border_crop/front/b/7/b7391a75-bc22-47dc-a818-7a5d3ea076c8.jpg?1573504745",
            name: "Angelic Gift",
            inStock: 2,
            inDeck: 0,
            card_type: "Creature"

        },
        {
            id: 1,
            image_url: "https://img.scryfall.com/cards/border_crop/front/c/1/c128272d-4611-477c-84b9-081bddcc7188.jpg?1562933799",
            name: "Victim of Night",
            inStock: 1,
            inDeck: 0,
            card_type: "Instant"
        },
        {
            id: 3,
            image_url: "https://img.scryfall.com/cards/border_crop/front/0/0/00f8ec3c-d2cb-477c-a7e8-ff497df646d6.jpg?1563899954",
            name: "Temple of Epiphany",
            inStock: 1,
            inDeck: 0,
            card_type: "Land",
        }
    ],
    addedItems: [],
    total: 0
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
