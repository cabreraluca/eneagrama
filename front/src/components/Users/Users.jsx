import React, { useEffect, useState } from "react";
import { useAuth } from "../../hooks";
import { User } from "../../api";
import { useNavigate } from "react-router-dom";

const userController = new User();

export const Users = () => {
  const { accessToken } = useAuth();
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  console.log(users)
  
  useEffect(() => {
    const fetchUsers = async () => {
      const x = await userController.getUsers(accessToken);
      setUsers(x)
    };
    fetchUsers();
  }, [accessToken]);

  return (
    <div>
      {users.map((user) => 
        <article key={user.email}>
          <p>Email: {user.email}</p>
          {/* <p>Results: {user.results[0]}</p> */}
          <p>{user.results.length > 0 ? "Test en progreso" : ""}</p>
          <button onClick={()=> navigate(`/user/${user._id}`)}>Ver más</button>
        </article>
      )}
    </div>
  )
  
};
