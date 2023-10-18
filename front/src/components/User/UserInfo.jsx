import React, { useEffect, useState } from 'react'
import { User } from '../../api'
import { useLocation } from 'react-router-dom';
import { useAuth } from '../../hooks';
import { Result } from '../Result/Result';

const userController = new User();

export const UserInfo = () => {
    const {accessToken} = useAuth()
    const {pathname} = useLocation();
    const id = pathname.replace("/admin/user/", "");
    const [user, setUser] = useState({});
    const [userResults, setUserResults] = useState([]);

    const hStyle = "text-[1.1rem]";
    const infoStyle = "flex items-center justify-between md:w-[50%] 2xl:w-[30%] mb-4";
    const pStyle = "font-normal text-gray-700";

    useEffect(() => {
        const fetchUser = async () => {
          const data = await userController.getUser(accessToken, id);
          console.log(data)
          setUser(data)
          setUserResults(data.results);
        };
        fetchUser();
      }, [accessToken, pathname]);
  return (
    <section className='w-[100%] 2xl:h-[100%] gap-10 flex flex-col justify-center p-8'>
        <div className='border-b-2 pb-2'>
          <h1 className='text-[2rem]'>Información del usuario</h1>
          <h2 className='text-[1rem] text-gray-600'>Detalles personales del usuario</h2>
        </div>
        <div className='flex flex-col gap-2'>
          <div className={infoStyle}>
            <h3 className={hStyle}>Email </h3>
            <p className={pStyle}>{user.email}</p>
          </div>
         <div className={infoStyle}>
           <h3 className={hStyle}>Nombre completo </h3>
           <p className={pStyle}>{user.firstname} {user.lastname}</p>
         </div>
          <div className={infoStyle}>
            <h3 className={hStyle}>Rol </h3>
            <p className={pStyle}>{user.role}</p>
          </div>
          {userResults.length !== 0 ? <div>   {<Result results={userResults} flex={"items-start"}/>}</div> : <h2 className={hStyle}>No hay resultados del test</h2>}
        </div>
    </section>
  )
}