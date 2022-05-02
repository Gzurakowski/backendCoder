import { useState,  useContext } from 'react'
import {Route, Routes, NavLink} from 'react-router-dom'
import Content from './Components/Content'
import Login from './Components/Login'
import ProtectedRoute from './Components/ProtectedRoute'
import AuthProvider from './context/AuthProvider'

function App() {
  
  return (
    <>
      <AuthProvider>
       
        <Routes>
          <Route index  element={<Login />}></Route>
          <Route path='/login' element={<Login />}></Route>
          <Route path='/private' element={<ProtectedRoute/>}>
            
            <Route path="/private/content" element={<Content/>}></Route>
          </Route>
          
        </Routes>
      </AuthProvider>
    </>
  )
}




export default App
