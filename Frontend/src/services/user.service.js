//Data Service, users
import axios from "axios";
import authHeader from "./auth-header";
import authService from "./auth.service";

const API_URL = "http://localhost:8081/api/auth/";

const getPublicContent = () => {
    return axios.get(API_URL + "all");
};

const getDesignerBoard = () => {
    return axios.get(API_URL + "designer", { headers: authHeader() });
};

const getTechnicalBoard = () => {
    return axios.get(API_URL + "technical", { headers: authHeader() });
};

const getAdminBoard = () => {
    return axios.get(API_URL + "admin", { headers: authHeader() });
};

const getUserRequests = () => {
    const { id } = authService.getCurrentUser()
    return axios.get(`http://localhost:8081/api/users/getRequests/${id}`)
}

const approveRequest = requestId => axios.get(`http://localhost:8081/api/users/approveRequest/${requestId}`) 

const declineRequest = requestId => axios.get(`http://localhost:8081/api/users/declineRequest/${requestId}`) 

export default {
    getPublicContent,
    getDesignerBoard,
    getTechnicalBoard,
    getAdminBoard,
    getUserRequests,
    approveRequest,
    declineRequest
};