import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import useAuth from '../hooks/useAuth'

export default function ProtectedRoute({children}) {
    const {token} = useAuth()
    
    if(!token){
        return <Navigate to="/login" replace/>
    }
  
    return <Outlet/>
}

