import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import AuthContext from "./authContext";
import useAxiosFunction from "../hooks/useAxiosFunction";

const AuthProvider = ({children}) => {
    const navigate = useNavigate()
    
    const [res, error, loading, fetch] = useAxiosFunction()
    
    const [token, setToken] = useState(null)
    
    const handleLogin = async (username, password) => {
        const res = await fetch({url:'/passport/login', method:'POST', data:{username:username, password:password}})
        console.log(res.username)
        setToken(res.username)
        navigate('/private/content')
    }
    
    const handleLogout = async () => {
        await fetch({url:'/passport/logout', method:'GET'})
        setToken(null)
        navigate('/login')
    }
    
    const handleInit = async () => {
        const response = await fetch({url:'/passport/login', method:'GET'})
        console.log(response)
        if(response?.username){
            setToken(res.username)
            navigate('/private/content')
        }
    }
    
    const handleSignUp = async (username, password, address) => {
        const response = await fetch({url:'/passport/signup', method:'POST', data:{username:username, password:password, address:address}})
        console.log(response)
        if(response?.username){
            setToken(res.username)
            navigate('/private/content')
        }
    }
    
    const toLogin = () => {
        navigate('/login')
    }
    
    const toSignUp = () => {
        navigate('/signup')
    }
    
    
    const value = {
        token, 
        onLogin:handleLogin,
        onLogout:handleLogout,
        onSignUp:handleSignUp,
        onInit:handleInit,
        toLogin,
        toSignUp
    }
    
    
    
    
    
    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
    
}
export default AuthProvider