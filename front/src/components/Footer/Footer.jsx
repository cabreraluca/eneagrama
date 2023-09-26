import React from 'react'
import {AiFillInstagram} from 'react-icons/ai'
import {FaFacebookSquare} from 'react-icons/fa'



export const Footer = () => {


  const iconContainerStyle = "flex items-center gap-4 mt-2";
  const iconStyle = "text-[1.3rem] xl:text-[1.5rem] text-white";

  return (
    <footer className='w-[100%] h-[25vh] flex flex-col items-center justify-evenly' style={{backgroundImage: "linear-gradient(#0099ff, #7a52ba)"}}>
        <div className='flex items-center justify-around w-[100vw]'>
          <img src="https://mapapersonal.com/wp-content/uploads/2019/10/icono-mapapersonal.png.webp" alt="logo" className='h-[45%] xl:h-[65%]'/>
          <div className='text-white font-semibold'>
            <div className={iconContainerStyle}>
              <AiFillInstagram className={iconStyle}/>
              <a className='text-lg xl:text-xl' href='https://www.instagram.com/tumapapersonal/' target='_blank'>Instagram</a>
            </div>
            <div className={iconContainerStyle}>
              <FaFacebookSquare className={iconStyle}/>
              <a className='text-lg xl:text-xl' href='https://www.facebook.com/tumapapersonal/' target='_blank'>Facebook</a>
            </div>
          </div>
        </div>
        <p className='text-gray-200 font-semibold text-[.9rem] text-center mt-6 xl:mt-0'>Mapa Personal Web. Todos los derechos reservados 2023.</p>
    </footer>
  )
}
