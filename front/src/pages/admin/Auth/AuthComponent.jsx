import React, {useState} from 'react'
import { Tab } from "semantic-ui-react"
import { Login } from '../../../components/Auth';
import { RegisterForm } from '../../../components/Auth';
export const AuthComponent = () => {
  const [active, setActive] = useState(0);

  const openLogin = () => setActive(0);
  const panes = [
    {
      menuItem: "Iniciar sesión",
      render: () =>(
        <Tab.Pane>
          <Login />
        </Tab.Pane>
      )
    },
     {
       menuItem: "Registrarse",
       render: () =>(
         <Tab.Pane>
           <RegisterForm/>
         </Tab.Pane>
       )
     }
  ]
  return (
    <div className='auth'>
      <Tab panes={panes} className="auth__forms" active={active} onTabChange={(_, data)=> setActive(data.active)}/>
    </div>
  )
}
