import React, { useEffect, useState, useContext } from "react";
import { useAuth } from "../../hooks";
import { User } from "../../api";
import { useNavigate } from "react-router-dom";
import { Button, button} from "@material-tailwind/react";
import { UserView } from "./UserView";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { PencilIcon, UserPlusIcon } from "@heroicons/react/24/solid";
import {
  Card,
  CardHeader,
  Input,
  Typography,
  CardBody,
  Chip,
  CardFooter,
  Tabs,
  TabsHeader,
  Tab,
  IconButton,
  Tooltip,
} from "@material-tailwind/react";
import { CreateUser } from "./CreateUser";

const userController = new User();

export const Users = () => {
  const { accessToken } = useAuth();
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [query, setQuery] = useState("");
  const TABLE_HEAD = ["Nombre", "Email", "Estado",  "Rol", "Detalles", ""];

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

  const inputChange = (e) =>{
    setSearch(e.target.value);
  }

  useEffect(() => {
    const filterResult = search.replace(/ /g, "");
    console.log(filterResult)
    let filtrado = users.filter((item) => item.firstname.replace(/ /g, "").toLowerCase().concat(item.lastname.toLowerCase()).includes(filterResult.toLowerCase()));
    setSearchResults(filtrado);
  }, [search, users]);
  
  const onDelete =  async (userId) =>{
    await userController.deleteUser(accessToken, userId);
    fetchUsers();
  };
  return (
    <Card className="h-[100%] w-[full]">
      <CardHeader floated={false} shadow={false} className="rounded-none">
        <div className="mb-8 flex items-center justify-between gap-8">
          <div>
            <Typography variant="h5" color="blue-gray">
              Lista de usuarios
            </Typography>
            <Typography color="gray" className="mt-1 font-normal">
              Vea la información de todos los usuarios.
            </Typography>
          </div>
          <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
            <CreateUser  fetchUsers={fetchUsers} accessToken={accessToken}/>
          </div>
        </div>
        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          <Tabs value="all" className="w-full md:w-max">
            <TabsHeader className="flex gap-4 bg-transparent">
            <Button variant="outlined" size="sm" onClick={() => setQuery("finished")}>Finalizados</Button>
            <Button variant="outlined" size="sm" onClick={() => setQuery("started")}>Comenzados</Button>
            <Button variant="outlined" size="sm" onClick={() => setQuery("")}>Todos</Button>
            </TabsHeader>
          </Tabs>
          <div className="w-full md:w-72">
            <Input
              value={search}
              onChange={inputChange}
              label="Búsqueda por nombre"
              icon={<MagnifyingGlassIcon className="h-5 w-5" />}
            />
          </div>
        </div>
      </CardHeader>
      <CardBody className="px-0 h-[55vh] 2xl:h-[65vh] overflow-y-scroll mt-2">
        <table className="w-full min-w-max table-auto text-left">
          <thead>
            <tr className="h-[2rem]">
              {TABLE_HEAD.map((head) => (
                <th
                  key={head}
                  className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4"
                >
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal leading-none opacity-70"
                  >
                    {head}
                  </Typography>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {searchResults.length === 0 && search !== "" && <h2 className="w-[100vw] text-center pt-6 text-[1.6rem]">No se encontraron resultados</h2>}
            {searchResults.length > 0 ? searchResults.map((user) => <UserView key={user._id} user={user} fullUsers={searchResults} index={searchResults.indexOf(user)}/>) : search === "" && users?.map((user) => <UserView key={user._id} user={user} fullUsers={users} index={users.indexOf(user)}/>)}
          </tbody>
        </table>
      </CardBody>
      <CardFooter className="flex items-center justify-end border-t border-blue-gray-50 p-4">
        <Typography variant="small" color="blue-gray" className="font-bold p-2 text-md">
          Total de usuarios: {users.length}
        </Typography>
      </CardFooter>
    </Card>
  )
}
