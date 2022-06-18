import React, { useState, useEffect } from 'react'
import useAuth from '../hooks/useAuth'

function SignUp() {
    const {onSignUp, toLogin} = useAuth()
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [address, setAddress] = useState("")
    
    // useEffect(() => {
    //     onInit().then(() => setLoading(false))
        
    // }, [])
    
    
    return (
        <>
            <div className='bg-red-300 w-full min-h-screen flex flex-col items-center'>
                <div className='w-1/2 bg-white mt-36 rounded-2xl p-5 flex flex-col'>
                    <h1 className='text-2xl font-bold'>SignUp</h1>
                    <div>
                        <label>Username:</label>
                        <input type="text" className='w-100 border-2 my-3 ml-2 px-2 rounded-full' onChange={e => setUsername(e.target.value)}></input>
                    </div>
                    <div>
                        <label>Address:</label>
                        <input type="text" className='w-100 border-2 my-3 ml-2 px-2 rounded-full' onChange={e => setAddress(e.target.value)}></input>
                    </div>
                    <div>
                        <label>Password:</label>
                        <input type="password" className='w-100 border-2 my-3 ml-2 px-2 rounded-full' onChange={e => setPassword(e.target.value)}></input>
                    </div>
                    <button onClick={() => onSignUp(username, password, address)} className='bg-green-500 rounded-full text-white hover:bg-green-600'>SignUp</button>
                    <hr/>
                    <button onClick={() => toLogin()} className='bg-gray-500 rounded-full text-white hover:bg-gray-600 w-1/4 self-center'>Login</button>
                </div>
            </div>
        </>
    )
}

export default SignUp