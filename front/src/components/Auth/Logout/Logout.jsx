import React from 'react'
import {useNavigate} from "react-router-dom";
import { useAuth } from '../../../hooks';
import {
  Button,
} from "@material-tailwind/react";
export const Logout = () => {
    const {logout} = useAuth();
    const navigate = useNavigate();
    const onLogout = () => {
        logout()
        navigate("/")
    }
  return (
        <Button size="sm" fullWidth className='bg-orange-800' onClick={onLogout}>
              Cerrar sesión
        </Button>
  )
}

