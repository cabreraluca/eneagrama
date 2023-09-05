import React from 'react'
import { Button, Icon } from 'semantic-ui-react';
import {useNavigate} from "react-router-dom";
import { useAuth } from '../../../hooks';
export const Logout = () => {
    const {logout} = useAuth();
    const navigate = useNavigate();
    const onLogout = () => {
        logout()
    }
  return (
    <Button icon basic color='red' onClick={onLogout}>
        <Icon name='power off' /> Cerrar sesión
    </Button>
  )
}

