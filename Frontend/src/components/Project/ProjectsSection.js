import { Box, Flex, HStack } from "@chakra-ui/layout";
import { Button, useBreakpointValue } from "@chakra-ui/react";
import React, { useCallback, useEffect, useRef, useState } from "react";
import AuthService from "../../services/auth.service";
import ProjectFilteringService from "../../services/project.filtering.service";
import PageSection from "../Admin/Register/UserCount/PageSection";
import { SeparatedHeading } from "../Util/SeparatedHeading/SeparatedHeading";
import ProjectFilter from "./ProjectFilter";
import ProjectList from "./ProjectList";
import { Link } from "react-router-dom";

const ProjectsSection = () => {
    let authenticatedUser = AuthService.getCurrentUser();
    let allEngineerProjects = useRef();
    let originalMaxPage = useRef();
    const [projectsDisplayed, setProjectsDisplayed] = useState([]);
    const projectBreakpoint = useBreakpointValue({ base: "sm", lg: "md" });
    const [page, setPage] = useState(1);
    let [maxPage, setMaxPage] = useState(1);
    let count = 0;

    const getProjects = useCallback(() => {
        ProjectFilteringService.getProjectsByEngineerIDAndFilter(
            authenticatedUser.id,
            null,
            page
        ).then(({ data, maxPage }) => {
            allEngineerProjects.current = data;
            originalMaxPage.current = maxPage;
            setProjectDisplayedToAllEngineerProjects();
            setMaxPage(maxPage);
        });
    }, [authenticatedUser.id, page]);

    const setProjectDisplayedToAllEngineerProjects = () => {
        setProjectsDisplayed(allEngineerProjects.current);
    };

    const updateUnfilteredProjects = (projectUpdated) => {
        let indexOfItemToUpdate = allEngineerProjects.current.findIndex(
            (x) => x._id === projectUpdated._id
        );
        allEngineerProjects.current[indexOfItemToUpdate] = projectUpdated;
        setProjectsDisplayed([...allEngineerProjects.current]);
    };

    useEffect(() => {
        getProjects();
    }, [getProjects]);

    return (
        <Flex>
            <Box w="100%">
                <HStack>
                    <Box w={"100%"}>
                        <SeparatedHeading
                            primary="Project View"
                            secondary="Manage Your Projects"
                        />
                    </Box>
                    <Link
                        to={{
                            pathname: "/Report",
                            state: {
                                projects: allEngineerProjects.current,
                                count: count,
                            },
                        }}
                        marginBottom={5}
                    >
                        <Button colorScheme={"blue"}>Create Report</Button>
                    </Link>
                </HStack>

                <Box>
                    <ProjectFilter
                        setMaxPage={setMaxPage}
                        setPage={setPage}
                        page={page}
                        count={count}
                        authenticatedId={authenticatedUser.id}
                        projectsDisplayed={projectsDisplayed}
                        setProjectsParent={setProjectsDisplayed}
                        setProjectDisplayedToAllEngineerProjects={
                            setProjectDisplayedToAllEngineerProjects
                        }
                        originalMaxPage={originalMaxPage.current}
                        projectBreakpoint={projectBreakpoint}
                    />
                </Box>

                <Box borderRadius={8} bg="brand.background">
                    <ProjectList
                        projectsToDisplay={projectsDisplayed}
                        count={count}
                        authenticatedRole={authenticatedUser.roles}
                        updateParent={updateUnfilteredProjects}
                        projectBreakpoint={projectBreakpoint}
                    />
                </Box>

                <PageSection
                    page={page}
                    setPage={setPage}
                    maxPage={maxPage}
                    variant="simple"
                />
            </Box>
        </Flex>
    );
};

export default ProjectsSection;
