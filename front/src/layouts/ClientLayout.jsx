import React from 'react'
import { NavbarDefault } from '../components/Navbar/Navbar';

export const  ClientLayout = (props) => {
    const {children} = props;
  return (
    <div style={{width: "100%"}}>
      <NavbarDefault/>
          <div>
            {children}
          </div>
    </div> 
    
  )
}
