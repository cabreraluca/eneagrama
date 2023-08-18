import React from 'react'
import data from '../../data/preguntas.json'
import { Quest } from '../Quest/Quest';

export const QuestContainer = () => {

    const quest = data.test;

    return (
        <div>{quest.map((item) => <Quest quest={item}/>)}</div>
    )
}
