import React from "react";

import { connect } from "react-redux";
import { GalleryCard, Button } from "tabler-react";

import styles from "./style.module.css";
import { addToDeck, removeFromDeck } from "../actions/deckActions";


class Card extends React.Component {

    handleAdd = (id) => {
        this.props.addToDeck(id);
    }

    handleRemove = (id) => {
        this.props.removeFromDeck(id);
    }

    render () {
        const item = this.props.card

        return (
            <GalleryCard className={styles.cardContainer}>
                <GalleryCard.Image src={item.image_url} alt={`${item.name}`} />
                <div className={styles.btnList}>
                    <Button outline className={styles.btns} color="dark" icon="copy" right onClick={() => {this.handleRemove(item.id)}}>
                        '{item.inStock}'
                    </Button>
                    <Button outline className={styles.btns} color="dark" icon="book-open" right onClick={()=>{this.handleAdd(item.id)}}>
                        '{item.inDeck}'
                    </Button>
                </div>
            </GalleryCard>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        items: state.items,
        addedItems: state.addedItems
    }
}

const mapDispatchToProps= (dispatch)=>{
    return{
        addToDeck: (id)=>{dispatch(addToDeck(id))},
        removeFromDeck: (id) => {dispatch(removeFromDeck(id))}
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Card);
