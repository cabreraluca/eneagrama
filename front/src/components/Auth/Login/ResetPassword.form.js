import * as Yup from "yup";

export function emailInitialValues(email){
    return {
        email: email || ""
    };
}

export function emailValidationSchema(){
    return Yup.object({
        email: Yup.string().email().required("Campo obligatorio"),
    })
}
