import React from 'react'
import CardDeck from './CardDeck'
import Carousel from 'react-bootstrap/Carousel'

export default class PopularBooks extends React.Component<any> {
    constructor(props: any){
        super(props);
    }


    render() {

        return (
                    <Carousel>                        
                        <Carousel.Item style={{ 'height': "300px" }} >
                       <CardDeck/>
                        </Carousel.Item  >
                        <Carousel.Item style={{ 'height': "300px" }}>
                        <CardDeck/>
                        </Carousel.Item>
                        <Carousel.Item style={{ 'height': "300px" }}>
                        <CardDeck/>
                        </Carousel.Item>
                    </Carousel>
        
        )

    }
}  