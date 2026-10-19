import { useState } from "react";
import { useEffect } from "react";
import { createContext } from "react";
import io from 'socket.io-client'

export const AppContext = createContext()

export const AppProvider = ({children})=>{

    const [color , setColor] = useState('')
    const [size , setSize] = useState('')
    const [quantity , setQuantity] = useState(1)
    const [productId , setProductId] = useState()
    const [socket , setSocket] = useState(null)

    useEffect(()=>{
        const newSocket = io('http://localhost:5000')
        setSocket(newSocket)
        return ()=>{
            newSocket.disconnect()
        }
    } , [])

    return <AppContext.Provider value={{color , setColor , size , setSize , quantity , setQuantity , productId , setProductId , socket , setSocket}}>
        {children}
    </AppContext.Provider>
}