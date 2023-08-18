import React from 'react'

export const Quest = ({quest}) => {
    const {area, question} = quest;
    return (
        <div>
            <p>{question}</p>
        </div>
    )
}
