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
         
        <div className='w-[100%] flex justify-between'>
          <Button onClick={() => {navigate('/admin/users')}} size="sm" className='bg-orange-800 w-[40%] 2xl:w-[20%]'>Usuarios</Button>
          <Button onClick={() => {navigate('/home')}} size="sm" className='bg-indigo-800 w-[40%] 2xl:w-[20%] flex items-center justify-center gap-2'><ArrowLeftIcon className='h-[1.1rem]'/>Volver a la app</Button>
        </div>
        </>
        )}
    </nav>
  )
}
