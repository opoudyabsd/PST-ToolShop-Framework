export const HOME_PAGE_URL = process.env.BASE_URL as string
export const API_URL = process.env.API_URL as string
export const API_PATH = {
    user: {
        allUsers: "/users",
        register: "/users/register",
        login: "/users/login"
    }
}