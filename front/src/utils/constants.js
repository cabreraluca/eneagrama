const SERVER_IP = "localhost:3977";

export const Env = {
    BASE_PATH: `http://${SERVER_IP}`,
    BASE_API: `http://${SERVER_IP}/api/v1`,
    API_ROUTES: {
        REGISTER: "auth/register",
        LOGIN: "auth/login",
        REFRESH_ACCESS_TOKEN: "auth/refresh_access_token",
        USER_ME: "user/me",
        USER: "user",
        USERS: "users",
        USER_TOKEN: "userToken",
        RESET_PASSWORD: "auth/resetpassword",
        FILTER_USERS: "filterUsers"
    },
    JWT: {
        ACCESS: "access",
        REFRESH: "refresh"
    }
}
