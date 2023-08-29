import * as Yup from "yup"
export function registerInitialValues() {
    return{
        email: "",
        password:"",
        repeatPassword:"",
        termsAccepted: false
    };
}

export function registerValidationSchema(){
    return Yup.object({
        email: Yup.string()
            .email("El email no es valido")
            .required("Campo obligatorio"),
        password: Yup.string().required("Campo obligatorio"),
        repeatPassword: Yup.string()
            .required("Campo obligatorio")
            .oneOf([Yup.ref("password")], "Las contraseñas deben ser iguales"),
        termsAccepted: Yup.bool().isTrue(true)
    })
}