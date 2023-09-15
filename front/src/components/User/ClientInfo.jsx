import React, { useEffect, useState } from 'react'
import { useAuth } from '../../hooks';


export const ClientInfo = () => {
    const {user} = useAuth()
  
  return (
    <section>
        <h1>Informacion del usuario</h1>
        <h2>Email: {user.email}</h2>
        <h2>Nombre completo: {user.firstname} {user.lastname}</h2>
        <h3>Rol: {user.role}</h3>
    </section>
  )
}