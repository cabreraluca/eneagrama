import React from 'react'

export const Result = ({result}) => {
  const {area, puntaje} = result;
  return (
    <div>
        <p>Area {area}: {puntaje}</p>
    </div>
  )
}
