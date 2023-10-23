import React, { useEffect, useState } from "react";
import { useAuth } from "../../hooks";
import { User } from "../../api";
import { Button, Option, Select, button} from "@material-tailwind/react";
import { UserView } from "./UserView";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import {
  Card,
  CardHeader,
  Input,
  Typography,
  CardBody,
  CardFooter,
  Tabs,
  TabsHeader,
  Dialog
} from "@material-tailwind/react";
import { CreateUser } from "./CreateUser";

const userController = new User();

export const Users = () => {
  const { accessToken, user } = useAuth();
  const {role} = user;
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [companies, setCompanies] = useState([])
  const [searchResults, setSearchResults] = useState([]);
  const [query, setQuery] = useState("");
  const TABLE_HEAD = ["Nombre", "Email", "Estado",  "Rol", "Detalles", ""];
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen((cur) => !cur);
  const [filterByCompany, setFilterByCompany] = useState(false)
  const [companyToSearch, setCompanyToSearch] = useState("")

  const fetchUsers = async () => {
    if(role === "admin"){
      if (query === "" && !companyToSearch) {
        const usersList = await userController.getUsers(accessToken);
        setUsers(usersList);
      } else if (query !== "" && !companyToSearch){
        const usersList = await userController.filterUsers(accessToken, query);
        setUsers(usersList);
      }
      else if(filterByCompany && query === ""){
        const usersList = await userController.getCompanyUsers(companyToSearch)
        setUsers(usersList)
      } else if (filterByCompany && query !== ""){
        const userList = await userController.filterCompanyUsers(companyToSearch, query)
        setUsers(userList)
      }
    }
    if(role === "company"){
      if(query === ""){
        const userList = await userController.getCompanyUsers(user._id);
        setUsers(userList);
      }else{
        const userList = await userController.filterCompanyUsers(user._id, query)
        setUsers(userList)
      }
    }
  };
  const fetchCompanies = async () =>{
    const companiesList = await userController.getCompanies();
    setCompanies(companiesList);
  }

  useEffect(() => {
    fetchUsers();
    fetchCompanies()
  }, [accessToken, query, companyToSearch, filterByCompany]);

  const inputChange = (e) =>{
    setSearch(e.target.value);
  }

  useEffect(() => {
    const filterResult = search.replace(/ /g, "");
    let filtrado = users.filter((item) => item.firstname.replace(/ /g, "").toLowerCase().concat(item.lastname.toLowerCase()).includes(filterResult.toLowerCase()));
    setSearchResults(filtrado);
  }, [search, users]);
  
  
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
            <CreateUser user={user} role={role} companies={companies} fetchUsers={fetchUsers} accessToken={accessToken}/>
          </div>
        </div>
        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          <Tabs value="all" className="w-full md:w-max">
            <TabsHeader className="flex gap-4 bg-transparent">
              <div className="flex flex-wrap lg:flex-nowrap gap-4 w-[100%]">
                <Button variant="outlined" className="w-[45%]" size="sm" onClick={() => setQuery("finished")}>Finalizados</Button>
                <Button variant="outlined" className="w-[45%]" size="sm" onClick={() => setQuery("started")}>Comenzados</Button>
                <Button variant="outlined" className="w-[45%]" size="sm" onClick={() => {setQuery("")}}>Todos</Button>
                {role === 'admin' ? <Button variant="outlined" className="w-[45%]" size="sm" onClick={() => handleOpen()}>Filtrar por empresas</Button> : ""}
              </div>
              <Dialog
                size="xs"
                open={open}
                handler={handleOpen}
                className="bg-transparent shadow-none"
                >
                  <div className="w-[100%] bg-white h-[30vh] flex flex-col items-center justify-center rounded-md">
                    <div className=" border-b-[1px] border-gray-300 w-[70%]">
                      <Typography color="black" className=" font-normal pb-2 text-lg">
                        Seleccione la empresa
                      </Typography>
                    </div>
                    <div className="w-[70%] mt-6">
                      <Select className="bg-white" label="Seleccione el usuario"
                        onChange={(element) => { 
                          setFilterByCompany(true)
                          setCompanyToSearch(element)
                          handleOpen()
                        }}>
                            {companies.map((company) => <Option className="bg-white" key={company._id} value={company._id} >{company.companyName}</Option>)}
                      </Select>
                    </div>
                  </div> 
                </Dialog>
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
            {searchResults.length > 0 ? searchResults.map((user) => <UserView accessToken={accessToken} fetchUsers={fetchUsers} companies={companies} key={user._id} user={user} fullUsers={searchResults} index={searchResults.indexOf(user)}/>) : search === "" && users?.map((user) => <UserView key={user._id} user={user} companies={companies} fullUsers={users} index={users.indexOf(user)}/>)}
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
