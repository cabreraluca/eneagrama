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
    <section>
        <h1>Informacion del usuario</h1>
        <h2>Email: {user.email}</h2>
        <h2>Nombre completo: {user.firstname} {user.lastname}</h2>
        <h3>Rol: {user.role}</h3>
        {userResults.length !== 0 ? <h3>Resultados: {userResults.map((item) => <Result key={item.area} result={item}/>)}</h3> : <h2>No hay resultados</h2>}
    </section>
  )
}