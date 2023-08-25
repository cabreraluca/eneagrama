import { createContext, useState } from "react"

export const ContextPrueba = createContext()

export const PruebaProvider = ({children}) =>{
    
    const [select, setSelect] = useState([]);
    const resultadoQuest = [
        {
            "area": 1,
            "puntaje": 0
        },
        {
            "area": 2,
            "puntaje": 0
        },
        {
            "area": 3,
            "puntaje": 0
        },
        {
            "area": 4,
            "puntaje": 0
        },
        {
            "area": 5,
            "puntaje": 0
        },
        {
            "area": 6,
            "puntaje": 0
        },
        {
            "area": 7,
            "puntaje": 0
        },
        {
            "area": 8,
            "puntaje": 0
        },
        {
            "area": 9,
            "puntaje": 0
        }
    ];

    return (
        <ContextPrueba.Provider value={{select, setSelect, resultadoQuest}}>
            {children}
        </ContextPrueba.Provider>
    )

}