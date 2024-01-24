import React, {createContext,useReducer,useEffect } from 'react';

const initialState = {
    user: null,
};

// Create the AuthContext using useReducer
export const AuthContext = React.createContext();

// Define reducer function to handle state changes
const authReducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN':
      return {
        user: action.payload,
      };
    case 'LOGOUT':
      return {
        user: null,
      };
    default:
      return state;
  }
};




export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);
  
  useEffect(()=>{
    const user=JSON.parse(localStorage.getItem('user'))
    if(user){
      console.log(user)
      dispatch({type:'LOGIN',payload:user})
    }
  },[])

  console.log('AuthContext state',state);
  return (
    <AuthContext.Provider value={{ ...state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};


