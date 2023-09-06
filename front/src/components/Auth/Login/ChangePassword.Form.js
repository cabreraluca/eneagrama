import * as Yup from "yup";

export function initialValues(){
    return {
        password: "",
        repeatPassword: "",
    };
}

export function passwordValidationSchema(){
    return Yup.object({
        password: Yup.string().required("Campo obligatorio"),
        repeatPassword: Yup.string()
            .required("Campo obligatorio")
            .oneOf([Yup.ref("password")], "Las contraseñas deben ser iguales")
    })
}
