import React from 'react'

export const Result = ({result}) => {
  const {area, puntaje} = result;
  return (
    <div>
        <p className='text-[1.2rem]'>Area {area}: {puntaje}</p>
    </div>
  )
}
