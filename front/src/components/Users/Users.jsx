import React, { useEffect, useState } from "react";
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

  const inputChange = (e) =>{
    setSearch(e.target.value);
  }

  useEffect(() => {
    let filtrado = users.filter((item) => item.firstname.toLowerCase().includes(search.toLowerCase()))
    filtrado.length === 0 ? filtrado = users.filter((item) => item.lastname.toLowerCase().includes(search.toLowerCase()))  : "";
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
          {createUser ? <CreateUser accessToken={accessToken} userController={userController} /> : ""}
          <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
            <Button className="flex items-center gap-3" size="sm" onClick={()=> showCreateUser()}>
              <UserPlusIcon strokeWidth={2} className="h-4 w-4" /> Agregar un usuario
            </Button>
          </div>
        </div>
        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          <Tabs value="all" className="w-full md:w-max">
            <TabsHeader className="flex gap-4">
            <Button variant="outlined" size="sm" onClick={() => setQuery("finished")}>Finalizados</Button>
            <Button variant="outlined" size="sm" onClick={() => setQuery("started")}>Comenzados</Button>
            <Button variant="outlined" size="sm" onClick={() => setQuery("")}>Todos</Button>
            </TabsHeader>
          </Tabs>
          <div className="w-full md:w-72">
            <Input
              value={search}
              onChange={inputChange}
              label="Search"
              icon={<MagnifyingGlassIcon className="h-5 w-5" />}
            />
          </div>
        </div>
      </CardHeader>
      <CardBody className="px-0 h-[40rem]">
        <table className="mt-4 w-full min-w-max table-auto text-left">
          <thead>
            <tr>
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
          {/* users.map((user) => <UserView user={user} fullUsers={users} index={users.indexOf(user)}/>) */}
            {searchResults.length === 0 && search !== "" && <h2 className="w-[100vw] text-center pt-6 text-[1.6rem]">No se encontraron resultados</h2>}
            {searchResults.length > 0 ? searchResults.map((user) => <UserView user={user} fullUsers={searchResults} index={searchResults.indexOf(user)}/>) : search === "" && users?.map((user) => <UserView user={user} fullUsers={users} index={users.indexOf(user)}/>)}
          </tbody>
        </table>
      </CardBody>
      <CardFooter className="flex items-center justify-between border-t border-blue-gray-50 p-4">
        <Typography variant="small" color="blue-gray" className="font-normal">
          Page 1 of 10
        </Typography>
        <div className="flex gap-2">
          <Button variant="outlined" size="sm">
            Previous
          </Button>
          <Button variant="outlined" size="sm">
            Next
          </Button>
        </div>
      </CardFooter>
    </Card>
  )
}
