import React, { useEffect } from 'react'

function Content() {
    
    const {token} = useAuth()
    return (
        <div>
            <Navigation />
            <div className='flex bg-red-300 justify-center mt-3'>
                {token && <h1 className='text-4xl font-mono'>Bienvenido {token}</h1>}
            </div>
            <Productos/>
        </div>
    )
}

import useAuth from '../hooks/useAuth'
import { Navigate, NavLink } from 'react-router-dom';
import FormProductos from './FormProductos';
import Productos from './Productos';

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