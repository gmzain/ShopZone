import { useEffect, useState } from "react";
import { createContext } from "react";
import io from 'socket.io-client'

export const AppContext = createContext()

export const AppProvider = ({children})=>{

    const [viewOrder , setViewOrder] = useState(false)
    const [socket , setSocket] = useState(null)

    useEffect(() => {
      const newSocket = io("http://localhost:5000");
      setSocket(newSocket);
      return () => {
        newSocket.disconnect();
      };
    }, []);

    return <AppContext.Provider value={{viewOrder , setViewOrder , socket , setSocket}}>
        {children}
    </AppContext.Provider>
}