import React, { useRef, useState } from 'react'
import { Navigate, useNavigate } from 'react-router'
import useAxiosFunction from '../hooks/useAxiosFunction'

function FormProductos({onSubmit}) {
    
    const [res, err, loading, axiosFetch] = useAxiosFunction()
    
    const nameInput = useRef()
    const priceInput = useRef()
    const urlInput = useRef()
    
    
    const [nombre, setNombre] = useState('')
    const [precio, setPrecio] = useState(0)
    const [url, setUrl] = useState('')
    
    const handleSubmit = async () => {
        const producto = {
            nombre:nombre,
            precio:precio,
            url:url
        }
        
        await axiosFetch({
            method:"POST",
            url:'/api/productos',
            data:producto
        })
        
        nameInput.current.value = ""
        priceInput.current.value = ""
        urlInput.current.value = ""
        
        onSubmit()
        
    }
    
  return (
    <div className='flex flex-col mt-4 bg-gray-400'>
        <h1 className='text-4xl text-white mb-4'>Productos</h1>
        <div className='mb-4'>
            <label>Nombre:</label>
            <input type="text" ref={nameInput} onChange={e => setNombre(e.target.value)}/>
        </div>
        <div className='mb-4'>
            <label>Precio:</label>
            <input type="number" ref={priceInput} onChange={e => setPrecio(e.target.value)}/>
        </div>
        <div className='mb-4'>
            <label>URL:</label>
            <input type="text" ref={urlInput} onChange={e => setUrl(e.target.value)}/>
        </div>
        
        <button className='w-4 p-3' onClick={() => handleSubmit()}>Crear</button>
                
    </div>
  )
}

export default FormProductos