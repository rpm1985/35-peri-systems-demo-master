import React from "react";
import { Link } from "react-router-dom";
import { MenuItem } from "@chakra-ui/react";
import { ViewIcon } from "@chakra-ui/icons";

const ProjectView = (props) => {
    const projectId = props.project._id;

    return (
        <Link to={"/project/" + projectId}>
            <MenuItem icon={<ViewIcon />}>View</MenuItem>
        </Link>
    );
};

export default ProjectView;
