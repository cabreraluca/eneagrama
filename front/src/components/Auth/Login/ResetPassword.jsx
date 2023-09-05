import React, { useState, useEffect } from 'react'
import { useAuth } from '../../../hooks';
import { Form } from 'semantic-ui-react';

export function ResetPassword() {
    const [email, setEmail] = useState("");

    const formSubmit = (e) =>{
        e.preventDefault();

        useEffect(() => {
            sendMail({
                from: "no-responder@eneagrama.com",
                to: email,
                subject: "Recuperar contraseña",
                text: `Hemos recibido tu solicitud para restablecer tu contraseña. Para hacerlo, haz click en el siguiente link:
                   http://localhost:3000/reset-password/prueba
                   Si no solicitaste el cambio de contraseña, ignora este mail.
            `,
            });
        }, [email]);
    };
    return (
        <div>
        <h2>Ingresa tu correo electrónico para restablecer tu contraseña</h2>
        <Form onSubmit={formSubmit}>
            <Form.Input
                name='email' 
                placeholder="Correo electronico"
                onChange={(e)=> setEmail(e.value)} 
            />
            <Form.Button type="submit" primary fluid>
                    Enviar correo electrónico
            </Form.Button>
        </Form>
        </div>
    )
}