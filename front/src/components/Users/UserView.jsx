import React from 'react'
import { Typography , Chip, Tooltip, IconButton, Button} from "@material-tailwind/react";
import { useNavigate } from 'react-router-dom';
import {EditUser} from './EditUser'

export const UserView = ({user, fullUsers, fetchUsers, accessToken}, index) => {
    const navigate = useNavigate();
    const { firstname, lastname, email, finished, started, role, _id} = user;

    const isLast = index === fullUsers.length - 1;
          const classes = isLast
            ? "p-4"
            : "p-4 border-b border-blue-gray-50";

    return (
            <tr key={firstname}>
              <td className={classes}>
                <div className="flex items-center gap-3">
                  <div className="flex gap-1">
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                    >
                      {firstname}
                    </Typography>
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                    >
                      {lastname}
                    </Typography>
                  </div>
                </div>
              </td>
              <td className={classes}>
                <div className="flex flex-col">
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal"
                  >
                    {email}
                  </Typography>
                </div>
              </td>
              <td className={classes}>
                <div className="w-max">
                  {finished? <Chip
                    variant="ghost"
                    size="sm"
                    value={"Terminado"}
                    color={"green"}
                  /> : ""}
                  {!finished && started? <Chip
                    variant="ghost"
                    size="sm"
                    value={"Comenzado"}
                    color={"yellow"}
                  /> : ""}
                  {!finished && !started? <Chip
                    variant="ghost"
                    size="sm"
                    value={"Sin realizar"}
                    color={"blue-gray"}
                  /> : ""}
                </div>
              </td>
              <td className={classes}>
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-normal"
                >
                  {role}
                </Typography>
              </td>
              <td className={classes}>
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-normal"
                >
                  <Button size='sm' onClick={()=>{navigate(`/admin/user/${_id}`)}}>Ver detalles</Button>
                </Typography>
              </td>
              <td className={classes}>
                <Tooltip content="Edit User">
                  <IconButton variant="text">
                    <EditUser accessToken={accessToken} fetchUsers={fetchUsers} userData={user}/>
                  </IconButton>
                </Tooltip>
              </td>
            </tr>
        ); 
}
