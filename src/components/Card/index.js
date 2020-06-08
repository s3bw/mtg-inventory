import React from "react";

import { GalleryCard, Button } from "tabler-react";


class Card extends React.Component {
    render () {
        const item = this.props.card

        return (
            <GalleryCard>
                <GalleryCard.Image
                src={item.image_url}
                alt={`${item.name}`}
                />
                <GalleryCard.Footer>
                    <Button.List>
                        <Button color="dark" icon="copy" right>
                            {item.count}
                        </Button>
                        <Button color="dark" icon="book-open">
                            0
                        </Button>
                    </Button.List>
                </GalleryCard.Footer>
            </GalleryCard>
        )
    }
}

export default Card;
