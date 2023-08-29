import { createContext, useState } from "react"

export const QuestionsContext = createContext()

export const QuestionsProvider = ({children}) =>{
    
    const [select, setSelect] = useState([]);
    const [questionsAnswered, setQuestionsAnswered] = useState(0);
    const [indexAnswer, setIndexAnswer] = useState(0);
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
        <QuestionsContext.Provider 
        value={{
            select, 
            setSelect, 
            resultadoQuest, 
            questionsAnswered, 
            setQuestionsAnswered, 
            indexAnswer, 
            setIndexAnswer}}>
            {children}
        </QuestionsContext.Provider>
    )

}