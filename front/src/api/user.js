import {Env} from "../utils/constants"

export class User{
    baseApi = Env.BASE_API;

    async getMe(accessToken) {
        console.log(accessToken)
        try {
            const url = `${this.baseApi}/${Env.API_ROUTES.USER_ME}`;
            const params = {
                headers: {
                    Authorization: `${accessToken}`
                }
            }
            const response = await fetch(url, params);
            console.log(response)
            const result = await response.json();

            return result;
        } catch (error) {
            throw error;
        }
    }
    async createUser(accessToken, data){
        try {
            const url = `${this.baseApi}/${Env.API_ROUTES.USER}`
            const params = {
                method: "POST",
                headers: {
                    "Content-Type" : "application/json",
                    Authorization: accessToken
                },
                body: JSON.stringify(data),
            };

            const response = await fetch(url, params);
            console.log(response)
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
            console.log(result);
        } catch (error) {
            console.log(error)
        }
    }
    async filterUsers(accessToken, param) {
        try {
          const url = `${this.baseApi}/${Env.API_ROUTES.FILTER_USERS}/?${param}=true`;
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

    async getCompanyUsers(companyId){
        try {
            const url = `${this.baseApi}/${Env.API_ROUTES.USERS_BY_COMPANY}/${companyId}`
            const response = await fetch(url);
            const result = await response.json();

            return result 
        } catch (error) {
            console.log(error)
        }
    }

    async filterCompanyUsers(companyId, query){
        try {
            console.log(companyId)
            const url = `${this.baseApi}/${Env.API_ROUTES.FILTER_COMPANY_USERS}/${companyId}/${query}`
            const response = await fetch(url)
            const result = response.json();
            return result;
        } catch (error) {
            console.log(error)
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
        console.log(accessToken)
        console.log(idUser)
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

    async getCompanies(){
        try {
            const url = `${this.baseApi}/${Env.API_ROUTES.COMPANIES}`
            const params = {
                method: "GET",
            }

            const response = await fetch(url, params);
            const result = await response.json();
            return result;
        } catch (error) {
            console.log(error)
        }
        
    }
}