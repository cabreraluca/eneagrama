import React, { useContext, useEffect } from 'react'
import {Form} from "semantic-ui-react"
import { useFormik } from 'formik';
import { EditUserInitialValues, EditUserValidationSchema } from './EditUserForm';
import { User } from '../../api';
import { Button, Dialog, Select, Option } from '@material-tailwind/react';
import { PencilIcon } from '@heroicons/react/24/solid';
import "./User.css"
import { useAuth } from '../../hooks';

const userController = new User();

export const EditUser = (props) => {
    const {user} = useAuth()
    const {role} = user;
    const { fetchUsers, userData, accessToken, companies} = props;
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen((cur) => !cur);
    const roleOptions = [{
            key: "admin",
            text: "Administrador",
            value: "admin"
        },
        {
            key: "user",
            text: "Usuario",
            value: "user"
        },
        {
            key: "company",
            text: "Empresa",
            value: "company"
        }
    ];

    const onDelete = async (userId) =>{
        await userController.deleteUser(accessToken, userId);
        handleOpen()
        fetchUsers()
    }

    const onResetResults = async (userId) =>{
        await userController.updateUser(userId, {results: [], finished: false, started: false})
        handleOpen();
        localStorage.removeItem("id");
        localStorage.removeItem("storageResults")
        fetchUsers();
    }
    const formik = useFormik({
        initialValues: EditUserInitialValues(userData),
        validationSchema: EditUserValidationSchema(userData),
        validateOnChange: false,
        onSubmit: async (formValue) =>{
            try {
                console.log(formValue)
                await userController.updateUser(userData._id, formValue);
                fetchUsers()
                handleOpen()
            } catch (error) {
                console.log(error)
            }
        }
    })
  return (
            <div>
                <Button className="flex items-center gap-3" size="sm" onClick={()=> handleOpen()}>
                    <PencilIcon strokeWidth={2} className="h-4 w-4" />
                </Button>
                <Dialog
                size="xs"
                open={open}
                handler={handleOpen}
                className="bg-transparent shadow-none"
                >
                    <Form onSubmit={formik.handleSubmit} className='mx-auto formNewUser'>
                        <section>
                            <label htmlFor="email">Email</label>
                            <Form.Input id="email" className='inputsRegister' name="email" placeholder="Correo electronico" onChange={formik.handleChange} value={formik.values.email} error={formik.errors.email}/>
                        </section>
                        <section>
                            <label htmlFor="firstname">Nombre</label>
                            <Form.Input id="firstname" className='inputsRegister' name="firstname" placeholder= "Nombre" onChange={formik.handleChange} value={formik.values.firstname} error={formik.errors.firstname}/>
                        </section>
                        <section>
                            <label htmlFor="lastname">Apellido</label>
                            <Form.Input id="lastname" className='inputsRegister' name="lastname" placeholder= "Apellido" onChange={formik.handleChange} value={formik.values.lastname} error={formik.errors.lastname}/>
                        </section>
                        <section>
                            {role === 'admin' && !userData.company &&userData.role !== "company"?<Form.Checkbox 
                                id="testEnabled" 
                                className='checkBox inline-block'                 
                                name='termsAccepted' 
                                label="Habilitar test"
                                onChange={(_, data)=> formik.setFieldValue("testEnabled", data.checked)}
                                checked={formik.values.testEnabled}
                                error={formik.errors.testEnabled}
                            /> : ""}
                        </section>
                        {role === 'admin' ?<Form.Dropdown
                            className='prueba'
                            name="role"
                            label="Rol"
                            placeholder="Selecciona un rol"
                            fluid
                            selection
                            options={roleOptions}
                            onChange={(_, data) => formik.setFieldValue('role', data.value)}
                            value={formik.values.role}
                            error={formik.errors.role}
                        /> : ""}
                        {role === 'admin'? <Form.Dropdown label="Empresa" placeholder="Seleccionar empresa" search selection options={companies.map(company => ({ key: company._id, text: `${company.firstname}`, value: company._id, }))} onChange={(_, data) => formik.setFieldValue("company", data.value)} value={formik.values.company || ""} error={formik.errors.company}/> : ""}
                        <section>
                            <Form.Button primary fluid type='button' onClick={() => onDelete(userData._id)}>
                                Eliminar usuario
                            </Form.Button>
                            {userData.started? <Form.Button primary fluid type='button' onClick={() => onResetResults(userData._id)}>
                                Reiniciar test    
                            </Form.Button> : ""} 
                        </section>
                        <Form.Button type='submit' primary fluid>
                            Aplicar
                        </Form.Button>          
                    </Form>
                </Dialog>
            </div>
  )
}
