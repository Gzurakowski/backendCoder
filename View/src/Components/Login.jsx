import React, { useState, useEffect } from 'react'
import useAuth from '../hooks/useAuth'

function Login() {
    const {onLogin, onInit, toSignUp} = useAuth()
    const [loading, setLoading] = useState(true)
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    
    useEffect(() => {
        onInit().then(() => setLoading(false))
        
    }, [])
    
    
    return (
        <>
            {!loading && 
            <div className='bg-red-300 w-full min-h-screen flex flex-col items-center'>
                <div className='w-1/2 bg-white mt-36 rounded-2xl p-5 flex flex-col'>
                    <h1 className='text-2xl font-bold'>Login</h1>
                    <div>
                        <label>Username:</label>
                        <input type="text" className='w-100 border-2 my-3 ml-2 px-2 rounded-full' onChange={e => setUsername(e.target.value)}></input>
                    </div>
                    <div>
                        <label>Password:</label>
                        <input type="password" className='w-100 border-2 my-3 ml-2 px-2 rounded-full' onChange={e => setPassword(e.target.value)}></input>
                    </div>
                    <button onClick={() => onLogin(username, password)} className='bg-green-500 rounded-full text-white hover:bg-green-600'>Login</button>
                    <hr/>
                    <button onClick={() => toSignUp()} className='bg-gray-500 rounded-full text-white hover:bg-gray-600 w-1/4 self-center'>SignUp</button>
                </div>
            </div>
            }
        </>
    )
}

export default Login