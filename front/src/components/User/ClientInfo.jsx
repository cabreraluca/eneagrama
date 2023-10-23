import React, { useEffect, useState } from 'react'
import { useAuth } from '../../hooks';
import { useNavigate } from 'react-router-dom';
import { Button} from '@material-tailwind/react';


export const ClientInfo = () => {
    const {user} = useAuth()
    const navigate = useNavigate()
  
  return (
    <section className='w-[100vw] h-[60vh] lg:h-[30vh] flex flex-col m-8 gap-10'>
        <h1 className='text-[2rem] w-[80%] border-b-2 font-semibold'>Información del usuario</h1>
        <div className='flex flex-col gap-4'>
          <h2><span className='font-semibold'>Email</span>: {user.email}</h2>
          <h2><span className='font-semibold'>Nombre completo</span>: {user.firstname} {user.lastname}</h2>
          <Button size='sm' className='w-[50%] lg:w-[15%] bg-indigo-900' onClick={()=> navigate('/reset-password')}>Cambiar contraseña</Button>
        </div>
    </section>
  )
}