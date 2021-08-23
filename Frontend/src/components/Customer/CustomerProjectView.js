import React, { useEffect, useState } from "react";
import { Box, Container, Flex } from "@chakra-ui/layout";
import { Button } from "@chakra-ui/react";
import Timeline from "../Events/Timeline";
import ProjectService from "../../services/project.service";
import ProjectDetailsCustomer from "../Project/ProjectDetailsCustomer";
import { EmailIcon } from "@chakra-ui/icons";
import UserService from "../../services/users.service";

const CustomerProjectView = (props) => {
    const projectId = props.match.params.param1;
    const [project, setProject] = useState(props.project);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (projectId !== undefined) {
            ProjectService.getProjectByID(projectId).then((projectReturned) => {
                setProject(projectReturned);
            });
        }
    }, [projectId]);

    const handleContactUsButtonClick = () => {
        setLoading(true);
        UserService.getUserByID(project.engineers.sales_engineer_id).then(
            (engineer) => {
                window.location.href =
                    "mailto:" +
                    (engineer !== null ? engineer.email : "info@peri.ltd.uk") +
                    "?subject=" +
                    project.name +
                    " (#" +
                    project.number +
                    ")";
                //3 seconds wait before enabling the button to prevent spamming
                setTimeout(() => {
                    setLoading(false);
                }, 3000);
            }
        );
    };

    return (
        <Container maxW="6xl" marginTop={12} marginBottom={12}>
            <Flex bg={"brand.background"} borderRadius={8} boxShadow="lg">
                {projectId ? (
                    <Box m={10}>
                        <ProjectDetailsCustomer project={project} />
                        <Button
                            leftIcon={<EmailIcon />}
                            isLoading={loading}
                            colorScheme={"blue"}
                            marginBottom={20}
                            onClick={handleContactUsButtonClick}
                        >
                            Contact Us
                        </Button>
                        <Timeline project={project} />
                    </Box>
                ) : (
                    <></>
                )}
            </Flex>
        </Container>
    );
};

export default CustomerProjectView;
