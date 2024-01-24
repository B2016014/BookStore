import { useState } from "react";
import { useAuthContext } from "./useAuthContext";
import axios from 'axios';

export const useSignUp=()=>{
    const [error,setError]=useState([]);
    const [isLoading,setIsLoading]=useState(null);
    const { dispatch }=useAuthContext();
    
    const signup=(username,email,password)=>{
        setIsLoading(true)
        setError(null)
        return axios.post('http://localhost:3000/users/signup', { username, email, password })
          .then(response => {
            localStorage.setItem('user', JSON.stringify(response.data));
            dispatch({type:'LOGIN',payload:response.data})
            console.log(response.data);
            setIsLoading(false)
            return response.data;
          })
          .catch(error => {
            console.log(error.response.data);
            setIsLoading(false);
            setError(error.response.data);
          });
    }
    return {signup,isLoading,error}
}