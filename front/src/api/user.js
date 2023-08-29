import {Env} from "../utils/constants"

export class User{
    baseApi = Env.BASE_API;

    async getMe(accessToken) {
        try {
            const url = `${this.baseApi}/${Env.API_ROUTES.USER_ME}`;
            const params = {
                headers: {
                    Authorization: `${accessToken}`
                }
            }
            const response = await fetch(url, params);
            const result = await response.json();

            return result;
        } catch (error) {
            throw error;
        }
    }
    async createUser(accessToken, data){
        try {
            const formData = new FormData();
            Object.keys(data).forEach((key)=>{
                formData.append(key, data[key])
            });
            if (data.fileAvatar){
                formData.append("avatar", data.fileAvatar);
            }
            const url = `${this.baseApi}/${Env.API_ROUTES.USER}`
            const params = {
                method: "POST",
                headers: {
                    Authorization: accessToken
                },
                body: formData,
            };

            const response = await fetch(url, params);
            const result = await response.json();

            if(response.status !== 200){
                console.log("error")
            }else{
                return result
            }
        } catch (error) {
            console.log(error)
        }
    }
    async getUsers(accessToken){
        try {
            const url = `${this.baseApi}/${Env.API_ROUTES.USERS}`,
            params = {
                headers: {
                    Authorization: accessToken,
                }
            }

            const response = await fetch(url, params);
            const result = await response.json();

            if (response.status !== 200) throw result;

            return result;
        } catch (error) {
            console.log(error)
        }
    }
    async updateUser(accessToken, idUser, userData) {
        try {
            const data = userData;
            console.log(data)
            if(!data.password){
                delete data.password;
            }
            const formData = new FormData();
            Object.keys(data).forEach((key)=>{
                formData.append(key, data[key])
            });
            const url = `${Env.BASE_API}/${Env.API_ROUTES.USER}/${idUser}`;
            const params = {
                method: "PATCH",
                headers: {
                    Authorization: accessToken,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data),
            };

            const response = await fetch(url, params);
            const result = await response.json();

        } catch (error) {
            throw error;
        }
    }
    async deleteUser(accessToken, idUser) {
        try {
            const url = `${this.baseApi}/${Env.API_ROUTES.USER}/${idUser}`;
            const params = {
                method: "DELETE",
                headers: {
                    Authorization: accessToken,
                }
            }
            const response = await fetch(url, params);
            const result = await response.json()
            console.log(result)
        } catch (error) {
            console.log(error)
        }
    }

    async getUser(accessToken, idUser) {
        try {
            console.log(accessToken);
            console.log(idUser);
            const url = `${this.baseApi}/${Env.API_ROUTES.USER}/${idUser}`;
            console.log(url)
            const params ={
                method: "GET",
                headers: {
                    Authorization: accessToken,
                }
            }
            const response = await fetch(url, params);
            const result = await response.json()
        
            return result;
        } catch (error) {
            
        }
    } 

    async pushResults(accessToken, idUser, data){
        try {
            const results = data;
            console.log(results);
            console.log(idUser);
            console.log(accessToken);
            const url = `${Env.BASE_API}/${Env.API_ROUTES.USER}/${idUser}`;
            console.log(url);
            const params = {
                method: "PATCH",
                headers: {
                    Authorization: accessToken,
                },
                body: results,
            };

            const response = await fetch(url, params);
            console.log(response)
            console.log(params);
            const result = await response.json();

            console.log(result)
        } catch (error) {
            
        }
    }
}