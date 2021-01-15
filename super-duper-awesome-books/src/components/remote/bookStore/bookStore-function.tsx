import axios from 'axios';
import { Redirect } from 'react-router';



export const BookStoreLogin = async (userName:string, password:string) => {
    let credentials = {
        userName,
        password
    }
    console.log(credentials)
    try{
        let res: any = await axios.post("http://localhost:8080/login/verify", credentials);
            console.log(res.data)
            return res.data
               
        

    }catch(e){
        console.log(e);
        if(e.response){
            throw new Error(e.response.data)
        } else {
            throw new Error("OOps Something went wrong?")
        }
        
    }

}