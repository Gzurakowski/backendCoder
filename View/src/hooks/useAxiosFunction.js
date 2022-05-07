import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import axiosInstance from "../AxiosInstance";

const useAxiosFunction = () => {
    const [loading, setLoading] = useState(false)
    const [response, setResponse] = useState({}) 
    const [error, setError] = useState('')
    const [controller, setController] = useState(null)
    
    const navigate = useNavigate()
    
    const axiosFetch = async (configObj) => {
        const {
            method = 'get',
            url,
            requestConfig = {},
            data = {}
            
        } = configObj
        
        try{
            setLoading(true)
            const ctrl = new AbortController()
            setController(ctrl)
            const res = await axiosInstance[method.toLowerCase()](url, {
                ...requestConfig,
                data:data,
                signal: ctrl.signal 
            })
            console.log(res)
            setResponse(res.data)
            console.log(response)
            return res.data
        }catch(error) {
            setError(error)
        }finally{
            setLoading(false)
        }
        
    }
    useEffect(() => {
    
      return () => {
        controller?.abort()
      }
    }, [controller])
    
    useEffect(() => {
        const Unauthorized = () => {
            console.log('unauthorized')
            if(error?.response?.status === 401) navigate('/login')
            console.log(error)
        }
        console.log('efect')
        Unauthorized()
        
    }, [error])
    
    
    return [response, error, loading, axiosFetch]
}

export default useAxiosFunction 