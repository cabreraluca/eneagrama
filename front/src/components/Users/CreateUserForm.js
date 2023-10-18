import * as Yup from "yup"
export function createUserInitialValues() {
    return{
        email: "",
        password:"",
        repeatPassword:"",
        firstname: "",
        lastname:"",
        role: "",
        companyName: "",
        company: "",
    };
}

export function createUserValidationSchema(){
    return Yup.object({
        email: Yup.string()
            .email("El email no es valido")
            .required("Campo obligatorio"),
        firstname: Yup.string(),
        lastname: Yup.string(),
        password: Yup.string().required("Campo obligatorio"),
        repeatPassword: Yup.string()
            .required("Campo obligatorio")
            .oneOf([Yup.ref("password")], "Las contraseñas deben ser iguales"),
        companyName: Yup.string(),
        role: Yup.string()
    })
}