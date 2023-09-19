import React, { useEffect, useState } from 'react'
import { useAuth } from '../../hooks';


export const ClientInfo = () => {
    const {user} = useAuth()
  
  return (
    <section className='w-[100vw] flex flex-col m-8 gap-10'>
        <h1 className='text-[2rem]'>Información del usuario</h1>
        <div className='flex flex-col gap-4'>
          <h2>Email: {user.email}</h2>
          <h2>Nombre completo: {user.firstname} {user.lastname}</h2>
          <h3>Rol: {user.role}</h3>
        </div>
    </section>
  )
}