import { useState } from "react";
import { useAuthContext } from "./useAuthContext";
import axios from 'axios';

export const useLogin=()=>{
    const [error,setError]=useState([]);
    const [isLoading,setIsLoading]=useState(null);
    const { dispatch }=useAuthContext();
    
    const login=(email,password)=>{
        setIsLoading(true)
        setError(null)
        return axios.post('http://localhost:3000/users/login', { email, password })
          .then(response => {
            console.log("login info: "+JSON.stringify(response.data))
            localStorage.setItem('user', JSON.stringify(response.data));
            dispatch({type:'LOGIN',payload:response.data})
            setIsLoading(false)
            return response.data;
          })
          .catch(error => {
            console.log("login error: "+ error.response.data);
            setIsLoading(false);
            setError(error.response.data);
          });
    }
    return {login,isLoading,error}
}