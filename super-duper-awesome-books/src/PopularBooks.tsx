import React from 'react'
import BooksCarousel from './BooksCarousel';
import axios from './axiosconfig';



export default class PopularBooks extends React.Component<any,any> {
    constructor(props: any){
        super(props);

    this.state = {
        list: []
    }
}

componentDidMount(){
this.retrievePopularBooks();
}

    async retrievePopularBooks(){
        
        try {
        
        let response: any = await axios.post("/popular/books");
        let data: any = response.data
    this.setList(data)
    }
        
     catch(e){
            console.log(e.stack)
        }

    }
    
    setList(value: any) {
        this.setState({
            list: value
        });
    }

    render() {
        return <BooksCarousel booklist={this.state.list}/>

    }
}  