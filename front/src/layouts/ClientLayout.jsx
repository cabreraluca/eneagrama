import React from 'react'
import { NavbarDefault } from '../components/Navbar/Navbar';
import { Footer } from '../components/Footer/Footer';

export const  ClientLayout = (props) => {
    const {children} = props;
  return (
    <main className='overflow-hidden' style={{width: "100%"}}>
      <NavbarDefault/>
          <div>
            {children}
          </div>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
        <path fill="#0099ff" fill-opacity="1" d="M0,128L48,133.3C96,139,192,149,288,133.3C384,117,480,75,576,101.3C672,128,768,224,864,245.3C960,267,1056,213,1152,208C1248,203,1344,245,1392,266.7L1440,288L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
      </svg>
      <Footer/>
    </main> 
    
  )
}
