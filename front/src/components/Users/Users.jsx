import React, { useEffect, useState } from "react";
import { useAuth } from "../../hooks";
import { User } from "../../api";
import { useNavigate } from "react-router-dom";

const userController = new User();

export const Users = () => {
  const { accessToken } = useAuth();
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [query, setQuery] = useState("");
  
  useEffect(() => {
    const fetchUsers = async () => {
      if (query === "") {
        const usersList = await userController.getUsers(accessToken);
        setUsers(usersList);
      } else {
        const usersList = await userController.filterUsers(accessToken, query);
        setUsers(usersList);
      }
    };
    fetchUsers();
  }, [accessToken, query]);

  return (
    <div>
      <div>
        <button>Agregar usuario</button>
      </div>
      <div>
        <button onClick={() => setQuery("finished")}>Finalizado</button>
        <button onClick={() => setQuery("started")}>Empezado</button>
      </div>
      {users?.map((user) => (
        <article key={user.email}>
          <p>Email: {user.email}</p>
          {/* <p>Results: {user.results[0]}</p> */}
          <p>{user.results.length > 0 ? "Test finalizado" : ""}</p>
          <button onClick={() => navigate(`/user/${user._id}`)}>Ver más</button>
        </article>
      ))}
    </div>
  );
};
