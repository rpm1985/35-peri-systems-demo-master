import React, { useEffect, useRef, useState } from "react";
import { Box, Container, Flex, Heading, Text } from "@chakra-ui/layout";
import Timeline from "../Events/Timeline";
import ProjectService from "../../services/project.service";
import { SeparatedHeading } from "../Util/SeparatedHeading/SeparatedHeading";
import UpdateStatus from "../Events/UpdateStatus";
import AssignEngineers from "../Events/AssigingEngineers/AssignEngineers";

const ProjectDetails = (props) => {
    let projectId = useRef(props.match.params.param1);
    const [project, setProject] = useState(props.project);

    useEffect(() => {
        if (projectId.current !== undefined) {
            ProjectService.getProjectByID(projectId.current).then(
                (projectReturned) => {
                    setProject(projectReturned);
                }
            );
        }
    }, [projectId.current]);

    const updateProjectDisplayed = (project) => {
        setProject(project);
    };

    return (
        <Container maxW="6xl" marginTop={12} marginBottom={12}>
            <SeparatedHeading
                primary="Project Details"
                secondary="Manage or View your Project"
            />

            <Flex bg={"brand.background"} borderRadius="lg" boxShadow="lg">
                {projectId.current ? (
                    <>
                        <Box marginBottom={1}>
                            <Box m={10}>
                                {project ? (
                                    <Box marginBottom={8}>
                                        <Flex>
                                            <Heading w={"100%"}>
                                                {" "}
                                                {project.name}{" "}
                                                <Text color="grey">
                                                    #{project.number}
                                                </Text>{" "}
                                            </Heading>
                                            <UpdateStatus
                                                count={1000}
                                                projectStatus={
                                                    project.status.value
                                                }
                                                projectId={projectId.current}
                                                updateParent={
                                                    updateProjectDisplayed
                                                }
                                                inMenu={false}
                                            />
                                            <AssignEngineers
                                                updateParent={
                                                    updateProjectDisplayed
                                                }
                                                project={project}
                                                inMenu={false}
                                            />
                                        </Flex>
                                    </Box>
                                ) : (
                                    <></>
                                )}
                                <Timeline project={project} />
                            </Box>
                            {project ? (
                                <>
                                    <Box m={10}>
                                        <Box>
                                            <Heading as="h4" size="md">
                                                Due
                                            </Heading>
                                            <Text>
                                                {new Date(
                                                    project.date_required
                                                ).toLocaleDateString()}
                                            </Text>

                                            <Heading as="h4" size="md" mt={3}>
                                                Description
                                            </Heading>
                                            <Text>{project.description}</Text>

                                            <Heading as="h4" size="md" mt={3}>
                                                Client
                                            </Heading>
                                            <Text>{project.client}</Text>

                                            <Heading as="h4" size="md" mt={3}>
                                                System
                                            </Heading>
                                            <Text>{project.system}</Text>

                                            <Heading as="h4" size="md" mt={3}>
                                                Sector
                                            </Heading>
                                            <Text>{project.sector}</Text>
                                            <Heading as="h4" size="md" mt={3}>
                                                Technical Team Lead
                                            </Heading>
                                            <Text>
                                                {project.engineers
                                                    .technical_lead_id
                                                    .firstname +
                                                    " " +
                                                    project.engineers
                                                        .technical_lead_id
                                                        .lastname}
                                            </Text>
                                            <Heading as="h4" size="md" mt={3}>
                                                Design Engineer
                                            </Heading>
                                            <Text>
                                                {project.engineers.designer_id
                                                    .firstname +
                                                    " " +
                                                    project.engineers
                                                        .designer_id.lastname}
                                            </Text>
                                            <Heading as="h4" size="md" mt={3}>
                                                Design Checker
                                            </Heading>
                                            <Text>
                                                {project.engineers
                                                    .design_checker_id
                                                    .firstname +
                                                    " " +
                                                    project.engineers
                                                        .design_checker_id
                                                        .lastname}
                                            </Text>
                                        </Box>
                                    </Box>
                                </>
                            ) : (
                                <> </>
                            )}
                        </Box>
                    </>
                ) : (
                    <></>
                )}
            </Flex>
        </Container>
    );
};

export default ProjectDetails;
