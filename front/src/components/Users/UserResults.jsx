import React, { useEffect, useState } from 'react'
import { User } from '../../api'
import { useLocation } from 'react-router-dom';
import { useAuth } from '../../hooks';

const userController = new User();
export function UserResults() {
    const {accessToken} = useAuth()
    const {pathname} = useLocation();
    const id = pathname.replace("/user/", "");
    const [user, setUser] = useState({});
    const [userResults, setUserResults] = useState([]);
    useEffect(() => {
        const fetchUser = async () => {
          const data = await userController.getUser(accessToken, id);
          setUser(data)
          setUserResults(data.results);
          console.log(userResults)
        };
        fetchUser();
      }, [accessToken, pathname]);
  return (
    <div>
        <p>{user.firstname} {user.lastname}</p>
        {userResults.map((result, index) => (
            <p key={index}>Area {result.area}: {result.puntaje}</p>
        ))}
    </div>
  )
}
