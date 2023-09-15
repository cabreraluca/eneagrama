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
        console.log(accessToken, data)
        try {
            const url = `${this.baseApi}/${Env.API_ROUTES.USER}`
            console.log(url)
            const params = {
                method: "POST",
                headers: {
                    "Content-Type" : "application/json",
                    Authorization: accessToken
                },
                body: JSON.stringify(data),
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
    async filterUsers(accessToken, param) {
        try {
          const url = `${this.baseApi}/${Env.API_ROUTES.FILTER_USERS}/?${param}=true`;
          console.log(url);
          console.log(param);
          const params = {
            headers: {
              Authorization: accessToken,
            },
          };

          const response = await fetch(url, params);
          const result = await response.json();

          if (response.status !== 200) throw result;

          return result;
        } catch (error) {
          console.log(error);
        }
    }

    async getUserByToken(token){
        try {
            const url = `${this.baseApi}/${Env.API_ROUTES.USER_TOKEN}/${token}`
            const response = await fetch(url);
            const result = await response.json();

            return result;
        } catch (error) {
            console.log(error);
        }
    }
    async updateUser(idUser, userData) {
        try {
            if(!userData.password){
                delete userData.password;
            }
            const formData = new FormData();
            Object.keys(userData).forEach((key)=>{
                formData.append(key, userData[key])
            });
            const url = `${Env.BASE_API}/${Env.API_ROUTES.USER}/${idUser}`;
            const params = {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(userData),
            };

            const response = await fetch(url, params);
            const result = await response.json();

            return result;

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
        } catch (error) {
            console.log(error)
        }
    }

    async getUser(accessToken, idUser) {
        try {
            const url = `${this.baseApi}/${Env.API_ROUTES.USER}/${idUser}`;
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
            const url = `${Env.BASE_API}/${Env.API_ROUTES.USER}/${idUser}`;
            const params = {
                method: "PATCH",
                headers: {
                    Authorization: accessToken,
                    'Content-Type': 'json',
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