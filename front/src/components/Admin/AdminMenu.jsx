import React from 'react'
import { useNavigate} from "react-router-dom";
import { useAuth } from '../../hooks';
import { ArrowLeftIcon } from "@heroicons/react/24/solid";
import { Button } from '@material-tailwind/react';


export const AdminMenu = () => {
    const {user:{role}} = useAuth();
    const isAdmin = role === "admin" || "company";
    const navigate = useNavigate();

  return (
    <nav className='w[100vw] text-center m-2 flex gap-4'>
        {isAdmin && (
         <>   
         
        <Button onClick={() => {navigate('/home')}} size="sm" className='bg-orange-800 w-[15%] 2xl:w-[10%] flex items-center justify-center gap-2'><ArrowLeftIcon className='h-[1.1rem]'/>Volver a la app</Button>
        <Button onClick={() => {navigate('/admin/users')}} size="sm" className='bg-orange-800 w-[15%] 2xl:w-[10%]'>Usuarios</Button>
        </>
        )}
    </nav>
  )
}
