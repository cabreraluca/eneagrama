import * as Yup from "yup";

export function EditUserInitialValues(user){
    return {
        firstname: user?.firstname || "",
        lastname: user?.lastname || "",
        email: user?.email || "",
        role: user?.role || "",
    };
}

export function EditUserValidationSchema(user){
    return Yup.object({
        firstname: Yup.string().required(true),
        lastname: Yup.string().required(true),
        email: Yup.string().email().required(true),
        role: Yup.string().required(true),
    })
}