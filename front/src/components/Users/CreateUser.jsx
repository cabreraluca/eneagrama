import React, { useContext, useEffect } from 'react'
import {Dropdown, Form} from "semantic-ui-react"
import { useFormik } from 'formik';
import {createUserInitialValues, createUserValidationSchema} from './CreateUserForm'
import { User } from '../../api';
import { Button, Dialog, Select, Option } from '@material-tailwind/react';
import { UserPlusIcon } from '@heroicons/react/24/solid';
import "./User.css"

const userController = new User();

export const CreateUser = (props) => {
    const {accessToken, fetchUsers, companies, role, user} = props;
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


    const formik = useFormik({
        initialValues: createUserInitialValues(),
        validationSchema: createUserValidationSchema(),
        validateOnChange: false,
        onSubmit: async (formValue, {resetForm}) =>{ 
            console.log(formValue)           
            const nameUpper = formValue.firstname.charAt(0).toUpperCase() + formValue.firstname.slice(1);
            const lastNameUpper = formValue.lastname.charAt(0).toUpperCase() + formValue.lastname.slice(1);
            formValue.firstname = nameUpper;
            formValue.lastname = lastNameUpper;

            try {
                if(role === "company"){
                    formValue.company = user._id;
                    formValue.role = "user";
                } 
                await userController.createUser(accessToken, formValue);
                fetchUsers()
                handleOpen()
                resetForm();
            } catch (error) {
                console.log(error)
            }
        }
    })

  return (
            <div>
                <Button className="flex items-center gap-3" size="sm" onClick={()=> handleOpen()}>
                    <UserPlusIcon strokeWidth={2} className="h-4 w-4" /> Agregar un usuario
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
                            <label htmlFor="password">Contraseña</label>
                            <Form.Input id="password" className='inputsRegister' name="password" type='password'placeholder="Contraseña" onChange={formik.handleChange} value={formik.values.password} error={formik.errors.password}/>
                        </section>
                        <section>
                            <label htmlFor="repeatPassword">Repita la contraseña</label>
                            <Form.Input id="repeatPassword" className='inputsRegister' name="repeatPassword" type='password' placeholder="Repetir contraseña" onChange={formik.handleChange} value={formik.values.repeatPassword} error={formik.errors.repeatPassword}/>
                        </section>
                        {role === 'admin' ? <Form.Dropdown
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
                        <Form.Button type='submit' primary fluid loading={formik.isSubmitting}>
                            Crear usuario
                        </Form.Button>               
                    </Form>
                </Dialog>
            </div>
  )
}
