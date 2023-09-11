import React, { useEffect, useState } from 'react'
import { useAuth } from '../../hooks';


export const ClientMenu = () => {

    const { user} = useAuth()

  return (
    <section className='w-[100vw] h-[70vh] flex flex-col gap-6 p-6'>
        <div>
            <h1 className='text-2xl'>Informacion del usuario</h1>
            <h2 className='text-md'>Detalles personales.</h2>
        </div>
        <div>
            <p>Nombre completo: {user.firstname} {user.lastname}.</p>
            <p>Rol: {user.role}.</p>
        </div>
    </section>
  )
}