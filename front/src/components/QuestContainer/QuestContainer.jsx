import React, {useEffect, useState, useContext} from 'react'
import data from '../../data/preguntas.json'
import { Quest } from '../Quest/Quest';
import { ContextPrueba } from '../../Context/ContextPrueba';
import { Result } from '../Quest/Result';

export const QuestContainer = () => {

    const {select, resultadoQuest} = useContext(ContextPrueba);
    const [quest, setQuest] = useState([]);
    const [testComplete, setTestComplete] = useState(false);

    useEffect(() => {
      setQuest(data.test)
    }, [])

    
    const submitChange = (event) =>{
        event.preventDefault();
        setQuest([]);
        for (const item of select) {
            resultadoQuest[item.area-1] += +1;
        }
        setTestComplete(true)
        console.log(resultadoQuest)
    }


    return (
        <div>
            <form>
                {quest.map((item) => <Quest quest={item}/>)}
                {!testComplete ? <input type="submit" onClick={submitChange}/> : <></>}
            </form>
            {testComplete ? <div><h2>Terminaste el quest, tus resultados son: {<Result result={resultadoQuest}/>}</h2></div> : <></>}
        </div>
    )
}
