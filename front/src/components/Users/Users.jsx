import React, { useEffect, useState } from "react";
import { useAuth } from "../../hooks";
import { User } from "../../api";
import { useNavigate } from "react-router-dom";
import { CreateUser } from "./CreateUser";

const userController = new User();

export const Users = () => {
  const { accessToken } = useAuth();
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [query, setQuery] = useState("");
  const [createUser, setCreateUser] = useState(false);

  const showCreateUser = () =>setCreateUser((prevState) => !prevState);

  const fetchUsers = async () => {
    if (query === "") {
      const usersList = await userController.getUsers(accessToken);
      setUsers(usersList);
    } else {
      const usersList = await userController.filterUsers(accessToken, query);
      setUsers(usersList);
    }
  };
  useEffect(() => {
    fetchUsers();
  }, [accessToken, query]);

  const onDelete =  async (userId) =>{
    await userController.deleteUser(accessToken, userId);
    fetchUsers();
  };

  return (
    <div>
      <div>
        <button onClick={()=> showCreateUser()}>Agregar usuario</button>
        {createUser ? <CreateUser accessToken={accessToken} userController={userController} /> : ""}
      </div>
      <div>
        <button onClick={() => setQuery("finished")}>Finalizado</button>
        <button onClick={() => setQuery("started")}>Empezado</button>
        <button onClick={() => setQuery("")}>Todos</button>
      </div>
        {users?.map((user) => (
          <article key={user.email} style={{border: "1px solid red", margin: "1rem 0"}}>
            <p>Email: {user.email}</p>
            {/* <p>Results: {user.results[0]}</p> */}
            <p>{ user.finished ? "Test finalizado" : ""}</p>
            <p>{ !user.finished && user.started ? "Test comenzado" : ""}</p>
            <p>{ !user.started ? "No empezado" : ""}</p>
            <button onClick={() => navigate(`/user/${user._id}`)}>Ver más</button>
            <button onClick={()=> onDelete(user._id)}>Eliminar</button>
          </article>
        ))}
    </div>
  );
};
