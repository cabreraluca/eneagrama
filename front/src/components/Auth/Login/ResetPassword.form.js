import * as Yup from "yup";

export function emailInitialValues(){
    return {
        email: ""
    };
}

export function emailValidationSchema(){
    return Yup.object({
        email: Yup.string().email().required("Campo obligatorio"),
    })
}
