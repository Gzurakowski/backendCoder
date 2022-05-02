import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import AuthContext from "./authContext";
import useAxiosFunction from "../hooks/useAxiosFunction";

const AuthProvider = ({children}) => {
    const navigate = useNavigate()
    
    const [res, error, loading, fetch] = useAxiosFunction()
    
    const [token, setToken] = useState(null)
    
    const handleLogin = async (username) => {
        await fetch({url:'/api/login', method:'POST', data:{username:username}})
        console.log(res.username)
        setToken(res.username)
        navigate('/private/content')
    }
    
    const handleLogout = async () => {
        await fetch({url:'/api/logout', method:'GET'})
        setToken(null)
        navigate('/login')
    }
    
    const handleInit = async () => {
        const response = await fetch({url:'/api/login', method:'GET'})
        console.log(response)
        if(response?.username){
            setToken(res.username)
            navigate('/private/content')
        }
    }
    
    
    const value = {
        token, 
        onLogin:handleLogin,
        onLogout:handleLogout,
        onInit:handleInit
    }
    
    
    
    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
    
}


const fakeAuth = () =>
  new Promise((resolve) => {
    setTimeout(() => resolve('2342f2f1d131rf12'), 250);
  });
  
export default AuthProvider