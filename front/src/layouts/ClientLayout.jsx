import React from 'react'
import { Logout } from '../components/Auth';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks';

export const  ClientLayout = (props) => {
    const navigate = useNavigate();
    const {user} = useAuth()
    console.log(user._id)
    const {children} = props;
  return (
    <div className='admin-Layout'>
      <header>
          <button onClick={() => {navigate(`/user/${user._id}`)}}>Mis resultados</button>
          <Logout />
      <header>
          <div className='admin-Layout__right-content'>
            {children}
          </div>
        </header>
      </header>
    </div> 
    
  )
}
