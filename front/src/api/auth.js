import { Env } from "../utils/constants";

export class Auth {
    baseApi = Env.BASE_API;

    async register(data) {
        try {
            const url = `${this.baseApi}/${Env.API_ROUTES.REGISTER}`;
            const params = {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    email: data.email,
                    password: data.password,
                    firstname: data.firstname,
                    lastname: data.lastname
                }),
            };

            const response = await fetch(url, params);
            const result = await response.json();

            if(response.status !== 200) throw result;

            return result;
        } catch (error) {
            throw error;
        }
    }

    async sendPasswordResetEmail(email){
        try {
            console.log(email)
            const url = `${this.baseApi}/${Env.API_ROUTES.RESET_PASSWORD}`
            const params = {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    email: email
                })
            }

            const response = await fetch(url, params);
            const result = await response.json();

            if(response !== 200) throw result;

            return result;
        } catch (error) {
            throw error
        }
    }

    async login(data) {
        try {
            const url = `${this.baseApi}/${Env.API_ROUTES.LOGIN}`
            const params = {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            };
    
            const response = await fetch(url, params);
            const result = await response.json();
    
            if (response.status !== 200) {
                throw result;
            }
            
            return result;
        } catch (error) {
            throw error; 
        }
    }

    async refresAccessToken(refreshToken) {
        try {
            const url = `${this.baseApi}/${Env.API_ROUTES.REFRESH_ACCESS_TOKEN}`;
            const params = {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    token: refreshToken,
                }),
            };

            const response = await fetch(url, params);
            const result = await response.json();

            if(response.status !== 200) throw result;

            return result;
        } catch (error) {
            throw error;
        }
    }


    setAccesstoken(token) {
        localStorage.setItem(Env.JWT.ACCESS, token);
    }

    getAccessToken(){
        return localStorage.getItem(Env.JWT.ACCESS);
    }

    setRefreshToken(token){
        localStorage.setItem(Env.JWT.REFRESH, token);
    }

    getRefreshToken(){
        return localStorage.getItem(Env.JWT.REFRESH);
    }

    removeTokens(){
        localStorage.removeItem(Env.JWT.ACCESS);
        localStorage.removeItem(Env.JWT.REFRESH)
    }
}