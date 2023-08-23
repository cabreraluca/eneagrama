import React from 'react'
import {Menu, Icon} from "semantic-ui-react";
import {Link, useLocation} from "react-router-dom";

export function ClientMenu() {
    const {pathname} = useLocation();

    const isActive = (path) =>{
        if(path === pathname) return true;
        return false;
    }
  return (
    <Menu fluid vertical icon text className='admin-menu'>
        {(
         <>   
        <Menu.Item as={Link} to="/" active={isActive("/")}>
            <Icon name='home' />
            Inicio
        </Menu.Item>
        </>
        )}
        <Menu.Item as={Link} to="/user" active={isActive("/user" )}>
            <Icon name='user' />
            Usuario
        </Menu.Item>
    </Menu>
  )
}