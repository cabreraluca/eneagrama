import React, { useEffect, useState } from 'react'
import { User } from '../../api'
import { useLocation } from 'react-router-dom';
import { useAuth } from '../../hooks';
import { Result } from '../Result/Result';

const userController = new User();

export const UserResults = () => {
    const {accessToken} = useAuth()
    const {pathname} = useLocation();
    const id = pathname.replace("/user/result/", "");
    const [user, setUser] = useState({});
    const [userResults, setUserResults] = useState([]);
    const height = user.finished ? "h-[100%]" : "h-[60vh]";
    useEffect(() => {
        const fetchUser = async () => {
          const data = await userController.getUser(accessToken, id);
          setUser(data)
          setUserResults(data.results);
        };
        fetchUser();
      }, [accessToken, pathname]);
  return (
    <div className={`flex flex-col w-[100vw] ${height} items-center justify-center gap-2 mt-4`}>
        <div className='flex flex-col items-center'>
          {!user.finished ? <h1 className='text-center font-bold text-2xl text-red-700'>No has realizado el test.</h1> : <Result results={userResults} flex={"items-center"}/>}
        </div>
    </div>
  )
}
