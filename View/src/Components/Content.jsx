import React, { useEffect } from 'react'

function Content() {
    
    const {token} = useAuth()  
    
    useEffect(() => {
        if(!token){
            <Navigate to='/login' />
        }
        
        console.log(token)
    }, [token])
    return (
        <div>
            <Navigation />
            {token && <h1 className='text-4xl font-mono ring-offset-indigo-500'>Bienvenido {token}</h1>}
        </div>
    )
}

import useAuth from '../hooks/useAuth'
import { Navigate, NavLink } from 'react-router-dom';

const Navigation = () => {
  const {token, onLogout} = useAuth()
  
  return (
    <nav className='mt-5 flex w-100 justify-end'>
     
      
      {token && 
      <button onClick={() => onLogout()} className='bg-red-500 hover:bg-red-400 p-2 mx-2 '>Logout</button>}
    </nav>
  );
};

export default Content