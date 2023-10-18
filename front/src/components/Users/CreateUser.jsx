import React, { useContext, useEffect, useState } from 'react'
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
    const [formCompanyValue, setFormCompanyValue] = useState("")

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
                    <Form onSubmit={formik.handleSubmit} className='mx-auto h-[100%] formNewUser'>
                        <section className='flex flex-col mb-2 w-[100%]'>
                            <label htmlFor="email" className='font-semibold'>Email</label>
                            <Form.Input id="email" className='bg-white w-[100%] rounded-md p-1 inputUpdateUser' name="email" placeholder="Correo electronico" onChange={formik.handleChange} value={formik.values.email} error={formik.errors.email}/>
                        </section>
                        {formCompanyValue !== 'company' ? <section className='flex flex-col mb-2 w-[100%]'>
                            <label htmlFor="firstname" className='font-semibold'>Nombre</label>
                            <Form.Input id="firstname" className='bg-white w-[100%] rounded-md p-1 inputUpdateUser' name="firstname" placeholder= "Nombre" onChange={formik.handleChange} value={formik.values.firstname} error={formik.errors.firstname}/>
                        </section> : ""}
                        {formCompanyValue !== 'company' ? <section className='flex flex-col mb-2 w-[100%]'>
                            <label htmlFor="lastname" className='font-semibold'>Apellido</label>
                            <Form.Input id="lastname" className='bg-white w-[100%] rounded-md p-1 inputUpdateUser' name="lastname" placeholder= "Apellido" onChange={formik.handleChange} value={formik.values.lastname} error={formik.errors.lastname}/>
                        </section> : ""}
                        <section className='flex flex-col mb-2 w-[100%]'>
                            <label htmlFor="password" className='font-semibold'>Contraseña</label>
                            <Form.Input id="password" className='bg-white w-[100%] rounded-md p-1 inputUpdateUser' name="password" type='password'placeholder="Contraseña" onChange={formik.handleChange} value={formik.values.password} error={formik.errors.password}/>  
                        {role !== 'company' ? <section>
                            <label htmlFor="companyName">Nombre de empresa</label>
                            <Form.Input id="companyName" className='inputsRegister' name="companyName" placeholder="Nombre de empresa" onChange={formik.handleChange} value={formik.values.companyName} error={formik.errors.companyName}/>
                        </section> : ""}
                        <section>
                            <label htmlFor="password">Contraseña</label>
                            <Form.Input id="password" className='inputsRegister' name="password" type='password'placeholder="Contraseña" onChange={formik.handleChange} value={formik.values.password} error={formik.errors.password}/>
                        </section>
                        <section className='flex flex-col mb-2 w-[100%]'>
                            <label htmlFor="repeatPassword" className='font-semibold'>Repita la contraseña</label>
                            <Form.Input id="repeatPassword" className='bg-white w-[100%] rounded-md p-1 inputUpdateUser' name="repeatPassword" type='password' placeholder="Repetir contraseña" onChange={formik.handleChange} value={formik.values.repeatPassword} error={formik.errors.repeatPassword}/>
                        </section>
                        <section className='flex flex-col gap-2 mb-2 w-[100%]'>
                            {role === 'admin' ? <Select className="bg-white" label="Seleccione el rol"
                                    onChange={(element) => { 
                                    formik.setFieldValue('role', element)
                                    }}>
                                        {roleOptions.map((role) => <Option className="bg-white" key={role.key} value={role.value} >{role.text}</Option>)}
                                </Select> : ""}
                            {role === 'admin' ? <Select label='Seleccione la empresa' onChange={(element) => {
                                formik.setFieldValue("company", element)
                            }}>
                                {companies.map((company) => <Option key={company._id} value={company._id}>{company.companyName}</Option>)}
                            </Select> : ""}
                        </section>
                        {role === 'admin' && formCompanyValue !== "company"? <Form.Dropdown label="Empresa" placeholder="Seleccionar empresa" search selection options={companies.map(company => ({ key: company._id, text: `${company.companyName}`, value: company._id, }))} onChange={(_, data) => formik.setFieldValue("company", data.value)} value={formik.values.company || ""} error={formik.errors.company}/> : ""}
                        <Button size='sm' className='w-[100%]' type='submit'>
                    </Form>
                </Dialog>
            </div>
  )
}
