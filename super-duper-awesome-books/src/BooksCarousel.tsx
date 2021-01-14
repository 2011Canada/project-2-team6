import React from 'react'
import CardDeck from './CardDeck'
import Carousel from 'react-bootstrap/Carousel'

interface IBook {
    bookId: string;
    imgUrl: string;

}

export default class BooksCarousel extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
    }


    render() {
         let decks = this.props.booklist

        return (
            <Carousel>
                { {decks.list.map((deck) => (
                    <Carousel.Item style={{ 'height': "300px" }} >
                        <CardDeck />
                    </Carousel.Item  >
                 ))} 
                }
            </Carousel>


        )

  

            }
}  