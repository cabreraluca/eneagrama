import React, { useEffect, useState } from "react";
import { useAuth } from "../../hooks";
import { User } from "../../api";

const userController = new User();

export const Users = () => {
  const { accessToken } = useAuth();

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
          <button>Ver más</button>
        </article>
      )}
    </div>
  )
  
};
