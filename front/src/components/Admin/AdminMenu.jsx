import React from 'react'
import {Menu, Icon} from "semantic-ui-react";
import {Link, useLocation} from "react-router-dom";
import { useAuth } from '../../hooks';


export function AdminMenu() {
    const {pathname} = useLocation();
    const {user:{role}} = useAuth();
    const isAdmin = role === "admin";

    const isActive = (path) =>{
        if(path === pathname) return true;
        return false;
    }
  return (
    <Menu fluid vertical icon text className='admin-menu'>
        {isAdmin && (
         <>   
        <Menu.Item as={Link} to="/admin/users" active={isActive("/admin/users")}>
            <Icon name='user outline' />
            Usuarios
        </Menu.Item>
        <Menu.Item as={Link} to="/admin/" active={isActive("/admin/")}>
            <Icon name='home outline' />
            Home
        </Menu.Item>
        </>
        )}
    </Menu>
  )
}
