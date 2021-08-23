import React, { useCallback, useEffect, useState } from "react";
import { Box, Container, Heading, HStack, Text } from "@chakra-ui/layout";
import ProjectList from "../../Project/ProjectList";
import { SeparatedHeading } from "../../Util/SeparatedHeading/SeparatedHeading";
import { ProjectsCompletedBarChart } from "./ProjectsCompletedBarChart";
import { ProjectsProgressPieChart } from "./ProjectsProgressPieChart";
import { CreatePDFButton } from "./CreatePDFButton";

const Report = (props) => {
    let projects = props.location.state.projects;
    let count = props.location.state.count;
    const [projectsDueThisWeek, setProjectsDueThisWeek] = useState([]);
    const [projectsDueNextWeek, setProjectsDueNextWeek] = useState([]);
    const [
        projectsWithUnassignedEngineers,
        setProjectsWithUnassignedEngineers,
    ] = useState([]);
    const [projectsCompletedOnTime, setProjectsCompletedOnTime] = useState([]);
    const [
        projectsNotCompletedOnTime,
        setProjectsNotCompletedOnTime,
    ] = useState([]);

    const getProjectsCompletedOnTime = useCallback(
        (isOnTime) => {
            let secondCondition = {
                true: function (a, b) {
                    return a < b;
                },
                false: function (a, b) {
                    return a > b;
                },
            };
            return projects
                ? projects.filter(
                      (project) =>
                          project.status.value === "Project Complete" &&
                          secondCondition[isOnTime](
                              new Date(project.status.time_set).getDate(),
                              new Date(project.date_required).getDate()
                          )
                  )
                : [];
        },
        [projects]
    );

    const getProjectsDueBetweenDates = useCallback(
        (dateCommencing, dateEnding) => {
            return projects.filter((project) => {
                let dateRequired = new Date(project.date_required);
                return (
                    dateRequired >= dateCommencing && dateRequired < dateEnding
                );
            });
        },
        [projects]
    );

    const getFirstAndLastDayOfWeek = (aDate) => {
        let datePassed = new Date(aDate);
        let firstDayOfTheWeek = datePassed.getDate() - datePassed.getDay();
        let lastDayOfTheWeek = firstDayOfTheWeek + 6;

        return [
            new Date(datePassed.setDate(firstDayOfTheWeek)),
            new Date(datePassed.setDate(lastDayOfTheWeek)),
        ];
    };

    const getProjectsWithUnassignedEngineers = useCallback(() => {
        return projects.filter(
            (project) =>
                project.engineers.design_checker_id == null ||
                project.engineers.designer_id == null
        );
    }, [projects]);

    const groupProjectsByStatus = () => {
        return projects.reduce(function (r, a) {
            r[a.status.value] = r[a.status.value] || [];
            r[a.status.value].push(a);
            return r;
        }, Object.create(null));
    };

    useEffect(() => {
        let todayDate = new Date();
        let inAWeekDate = new Date().setDate(todayDate.getDate() + 6);
        let [beginningThisWeek, endThisWeek] = getFirstAndLastDayOfWeek(
            todayDate
        );
        let [beginningNextWeek, endNextWeek] = getFirstAndLastDayOfWeek(
            inAWeekDate
        );

        setProjectsCompletedOnTime(getProjectsCompletedOnTime(true));
        setProjectsNotCompletedOnTime(getProjectsCompletedOnTime(false));
        setProjectsDueThisWeek(
            getProjectsDueBetweenDates(beginningThisWeek, endThisWeek)
        );
        setProjectsDueNextWeek(
            getProjectsDueBetweenDates(beginningNextWeek, endNextWeek)
        );
        setProjectsWithUnassignedEngineers(
            getProjectsWithUnassignedEngineers()
        );
    }, [
        projects,
        getProjectsCompletedOnTime,
        getProjectsDueBetweenDates,
        getProjectsWithUnassignedEngineers,
    ]);

    return (
        <Container
            maxW="6xl"
            marginTop={12}
            marginBottom={12}
            id={"report_container"}
            minW="3xl"
        >
            <Box w="100%" h="100%">
                <HStack>
                    <Box w={"100%"}>
                        <SeparatedHeading
                            primary="Report"
                            secondary="Your Projects Report"
                        />
                    </Box>
                    <CreatePDFButton idOfComponent={"report_container"} />
                </HStack>

                <Box p={5} bg={"brand.background"}>
                    <Heading size="md">Projects Progress</Heading>
                    <ProjectsProgressPieChart data={groupProjectsByStatus()} />
                    <Heading size="md">Total Completed Projects</Heading>
                    <Text m={5}>
                        You have completed{" "}
                        {projects
                            ? projectsCompletedOnTime.length +
                              projectsNotCompletedOnTime.length
                            : ""}{" "}
                        projects
                    </Text>
                    <ProjectsCompletedBarChart
                        data={[
                            projectsCompletedOnTime.length,
                            projectsNotCompletedOnTime.length,
                        ]}
                    />
                    <Heading size="md">Projects Due This Week</Heading>
                    <Box borderRadius={3} m={5} bg={"brand.primary"}>
                        {projects ? (
                            <ProjectList
                                key={"projectsDueThisWeek"}
                                projectsToDisplay={projectsDueThisWeek}
                                count={count}
                                projectBreakpoint={"sm"}
                                inReport={true}
                            />
                        ) : (
                            ""
                        )}
                    </Box>
                    <Heading size="md">Projects Due Next Week</Heading>
                    <Box borderRadius={3} m={5} bg={"brand.primary"}>
                        {projects ? (
                            <ProjectList
                                key={"projectsDueNextWeek"}
                                projectsToDisplay={projectsDueNextWeek}
                                count={count}
                                projectBreakpoint={"sm"}
                                inReport={true}
                            />
                        ) : (
                            ""
                        )}
                    </Box>
                    <Heading size="md">
                        Projects With Unassigned Engineers
                    </Heading>
                    <Box borderRadius={3} m={5} bg={"brand.primary"}>
                        {projects ? (
                            <ProjectList
                                key={"projectsWithUnassignedEngineers"}
                                projectsToDisplay={
                                    projectsWithUnassignedEngineers
                                }
                                count={count}
                                projectBreakpoint={"sm"}
                                inReport={true}
                            />
                        ) : (
                            ""
                        )}
                    </Box>
                </Box>
            </Box>
        </Container>
    );
};

export default Report;
