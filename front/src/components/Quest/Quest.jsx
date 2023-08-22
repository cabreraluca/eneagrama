import React, { useContext, useState } from 'react'
import { ContextPrueba } from '../../context/ContextPrueba';


export const Quest = ({quest}) => {
    const {select, setSelect} = useContext(ContextPrueba);
    const {id, area, question} = quest;


    const handleChange = (event) =>{
        const {value, checked} = event.target;
        console.log(value, checked)
        if (checked) {
            setSelect([...select, {"id": value, "area": area}])
        } else {
            setSelect(select.filter((oldValues) => oldValues !== value))
        }
    }


    return (
        <div>
            <input onChange={handleChange} value={id} type="checkbox"/>{question}
        </div>
    )
}
