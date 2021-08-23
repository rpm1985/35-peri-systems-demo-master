import axios from "axios";

function getProjectsByEngineerIDAndFilter(userId, params, page) {
    return axios
        .get(
            "http://localhost:8081/api/projects/filter/getProjectsWithDesignEngineersByEngineerID/" +
                userId +
                "/page/" +
                page,
            { params }
        )
        .then(function (response) {
            return response.data;
        })
        .catch(function (error) {
            console.log(error);
        });
}

const ProjectFilteringService = {
    getProjectsByEngineerIDAndFilter,
};

export default ProjectFilteringService;
