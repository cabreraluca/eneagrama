import { createContext, useState } from "react"

export const ContextPrueba = createContext()

export const PruebaProvider = ({children}) =>{
    
    const [select, setSelect] = useState([]);
    const resultadoQuest = [0,0,0,0,0,0,0,0,0];

    return (
        <ContextPrueba.Provider value={{select, setSelect, resultadoQuest}}>
            {children}
        </ContextPrueba.Provider>
    )

}