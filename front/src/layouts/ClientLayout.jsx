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
    <div>
      <header>
          <nav>
            <button onClick={() => {navigate('/')}}>
              <img src="https://integraeneagrama.com/wp-content/uploads/2020/06/logo.png" alt="" />
            </button>
            <ul>
              <li>
                <button onClick={() => {navigate(`/user/${user._id}`)}}>Mis resultados</button>
              </li>
              <li>
                <Logout />
              </li>
            </ul>
          </nav>
      </header>
          <div>
            {children}
          </div>
    </div> 
    
  )
}
