import React, { useEffect } from 'react'
import useAxiosFunction from '../hooks/useAxiosFunction'
import Producto from './Producto'

function MostrarProductos({refresh}) {
    
    const [data, error, loading, axiosFetch] = useAxiosFunction()
    
    useEffect(() => {
        const getProducts =  () => {
            axiosFetch({
                method:"GET",
                url:"/api/productos"
            })
        }
        getProducts()
    },[refresh]) 
  return (
    <div>
        {data && 
            <table className='w-full mt-4'>
                <thead>
                    <tr>
                        <th>Nombre</th>
                        <th>Precio</th>
                        <th>Imagen</th>
                    </tr>
                </thead>
                <tbody>
                    {data?.productos?.map(prod => {
                        return(
                            <tr className='text-center border-2 hover:border-b-orange-500'>
                                <td>{prod.nombre}</td>
                                <td>{prod.precio}</td>
                                <td className='flex justify-center'><img className='w-20 h-20' src={prod.url}/></td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        }
    </div>
  )
}

export default MostrarProductos