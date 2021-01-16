import axios from 'axios';
import { toast } from 'react-toastify'



export const BookStoreLogin = async (username:string, password:string) => {
    let credentials = {
        username,
        password
    }

    try{
        let res = await axios.post("http://localhost:8080/login/verify", credentials);
            return res.data
            
    }catch(e){
        toast.error("Please Use a Valid Account or Register!")
    }

}