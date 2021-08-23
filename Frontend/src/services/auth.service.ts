// Authentication Service, authorization
import axios from "axios";

// The Port that the Frontend connects to send to backend "5000", authorises users.
const API_URL = "http://localhost:8081/api/auth/";

const register = (
    firstname: string,
    lastname: string,
    email: string,
    password: string,
    roles: string[]
) => {
    return axios.post(API_URL + "signup", {
        firstname,
        lastname,
        email,
        password,
        roles,
    });
};

interface User {
    firstname: string;
    lastname: string;
    email: string;
    password: string;
    roles: string[];
}

const registerUser = (user: User) => {
    return axios.post(`${API_URL}signup`, {
        ...user,
    });
};

const login = (email: string, password: string) => {
    return axios
        .post(API_URL + "signin", {
            email,
            password,
        })
        .then((response) => {
            if (response.data.accessToken) {
                localStorage.setItem("user", JSON.stringify(response.data));
            }
            return response.data;
        });
};

const logout = () => {
    localStorage.removeItem("user");
};

const getCurrentUser = () => {
    return JSON.parse(localStorage.getItem("user") as string);
};

const isUserAuthenticated = () => {
    const user = JSON.parse(localStorage.getItem("user") as string);

    return !!user;
};

const isAdmin = () => {
    const user = getCurrentUser();
    try {
        return user.roles.includes("ROLE_ADMIN");
    } catch (err) {
        return false;
    }
};

const deleteUser = (email: string) => {
    return axios.delete(`${API_URL}delete/${email}`);
};

const updateUser = (
    oldEmail: string,
    firstname: string,
    lastname: string,
    email: string,
    roles: any
) => {
    return axios.patch(`${API_URL}patch/${oldEmail}`, {
        firstname,
        lastname,
        email,
        roles,
    });
};

const AuthService = {
    register,
    registerUser,
    login,
    logout,
    getCurrentUser,
    isAdmin,
    isUserAuthenticated,
    deleteUser,
    updateUser,
};

export default AuthService;
