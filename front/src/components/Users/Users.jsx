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
  console.log(users);

  useEffect(() => {
    const fetchUsers = async () => {
      if (query === "") {
        const x = await userController.getUsers(accessToken);
        setUsers(x);
      } else {
        const x = await userController.filterUsers(accessToken, query);
        setUsers(x);
      }
    };
    fetchUsers();
    console.log(query);
  }, [accessToken, query]);

  return (
    <div>
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