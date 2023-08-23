import React, { useEffect, useState } from "react";
import { useAuth } from "../../hooks";
import { User } from "../../api";

const userController = new User();

export const Users = () => {
  const { accessToken } = useAuth();

  const [user, setUsers] = useState([]);

  const fetchUsers = async () => {
    const x = await userController.getUsers(accessToken);
    console.log(x);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return <div>Users</div>;
};
