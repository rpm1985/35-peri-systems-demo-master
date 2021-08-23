import axios from "axios";
require("regenerator-runtime");

function getUsersWithRoleID(roleId) {
    return axios
        .get("http://localhost:8081/api/users/getUsersWithRoleID/" + roleId)
        .then(function (response) {
            return response.data.data;
        })
        .catch(function (error) {
            console.log(error);
        });
}
function getUserByID(userId) {
    return axios
        .get("http://localhost:8081/api/users/getUserByID/" + userId)
        .then(function (response) {
            return response.data.data;
        })
        .catch(function (error) {
            console.log(error);
        });
}

function getDesignerRoleID() {
    return axios
        .get("http://localhost:8081/api/users/getDesignerRoleID")
        .then(function (response) {
            return response.data.data[0]._id;
        })
        .catch(function (error) {
            console.log(error);
        });
}

function getTechnicalLeadRoleID() {
    return axios
        .get("http://localhost:8081/api/users/getTechnicalLeadRoleID")
        .then(function (response) {
            return response.data.data[0]._id;
        })
        .catch(function (error) {
            console.log(error);
        });
}

const getUsers = async (query, page) => {
    const searchTerm = query !== "" ? `&query=${query}` : "";

    return await axios
        .get(`http://localhost:8081/api/users?page=${page}${searchTerm}`)
        .then(function (res) {
            return res.data;
        });
};

const UserService = {
    getUsersWithRoleID,
    getUserByID,
    getDesignerRoleID,
    getUsers,
    getTechnicalLeadRoleID,
};

export default UserService;
