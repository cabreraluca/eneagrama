import React, {useState} from 'react'
import { Tab } from "semantic-ui-react"
import { Login } from '../../../components/Auth';
import { RegisterForm } from '../../../components/Auth';
export function Auth() {
  const [active, setActive] = useState(0);

  const openLogin = () => setActive(0);
  const panes = [
    {
      menuItem: "Entrar",
      render: () =>(
        <Tab.Pane>
          <Login />
        </Tab.Pane>
      )
    },
     {
       menuItem: "Nuevo usuario",
       render: () =>(
         <Tab.Pane>
           <RegisterForm openLogin={openLogin}/>
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
