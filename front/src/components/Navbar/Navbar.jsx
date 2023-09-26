import React from "react";
import {
  Navbar,
  Typography,
  Button,
  IconButton,
  Collapse,
} from "@material-tailwind/react";
import { Logout } from "../Auth";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks";


 
export const NavbarDefault = () => {
  const [openNav, setOpenNav] = React.useState(false);
  const navigate = useNavigate();
  const {user} = useAuth();
  const {logout} = useAuth();
  const onLogout = () => {
    logout()
    navigate("/")
}
 
  React.useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setOpenNav(false),
    );
  }, []);
 
  const navList = (
    <ul className="mb-4 mt-2 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="p-1 font-normal"
        onClick={() => {navigate(`/user/result/${user._id}`)}}
      >
        <a href="#" className="flex items-center">
          Mis resultados
        </a>
      </Typography>
      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="p-1 font-normal"
        onClick={() => {navigate(`/user/${user._id}`)}}
      >
        <a href="#" className="flex items-center">
          Cuenta
        </a>
      </Typography>
      {user.role === "admin" || "company" ? 
                <Typography
                as="li"
                variant="small"
                color="blue-gray"
                className="p-1 font-normal"
                onClick={() => {navigate(`/admin/users`)}}
              >
                <a href="#" className="flex items-center">
                  Usuarios
                </a>
              </Typography> : ""}
    </ul>
  );
 
  return (
    <Navbar className="mx-auto max-w-[100vw] py-2 px-4 lg:px-8 lg:py-4 rounded-none">
      <div className="container mx-auto flex items-center justify-between text-blue-gray-900">
        <Typography
          as="a"
          href="/home"
          className="mr-4 cursor-pointer py-1.5 font-medium"
        >
          <img src="https://integraeneagrama.com/wp-content/uploads/2020/06/logo.png" alt="logo" style={{width: "10rem"}}/>
        </Typography>
        <div className="flex items-center justify-between">
            <div className="hidden lg:flex lg:items-center lg:justify-evenly">
                {navList}
                <Button size="sm" className='bg-orange-800 ml-6' onClick={onLogout}>
                    Cerrar sesión
                </Button>
            </div>     
            <IconButton
              variant="text"
              className="ml-auto h-6 w-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
              ripple={false}
              onClick={() => setOpenNav(!openNav)}
            >
              {openNav ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  className="h-6 w-6"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              )}
            </IconButton>
        </div>
      </div>
      <Collapse open={openNav}>
        <div className="container mx-auto">
            {navList}
            <Button size="sm" fullWidth className='bg-orange-800' onClick={onLogout}>
              Cerrar sesión
            </Button>
        </div>
      </Collapse>
    </Navbar>
  );
}