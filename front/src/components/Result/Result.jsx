import React from 'react'

export const Result = ({result}) => {
  const {area, puntaje} = result;
  console.log(puntaje)
  return (
    <div>
        <p>Area {area}: {puntaje}</p>
    </div>
  )
}
