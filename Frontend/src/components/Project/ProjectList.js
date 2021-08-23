import { Text } from "@chakra-ui/layout";
import { Box } from "@chakra-ui/react";
import { Table, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/table";
import React, { useEffect, useState } from "react";
import { ProjectTableRow } from "./ProjectTableRow";

const ProjectList = (props) => {
    let count = props.count;
    const [projects, setProjects] = useState([]);

    useEffect(() => {
        if (props.projectsToDisplay !== undefined) {
            setProjects(props.projectsToDisplay);
        }
    }, [props.projectsToDisplay]);

    const returnEngineerName = (engineer) => {
        if (engineer !== null) {
            return engineer.firstname + " " + engineer.lastname;
        } else {
            return "Unassigned";
        }
    };

    if (projects.length > 0) {
        return (
            <Table
                width="100%"
                variant="simple"
                colorScheme="red"
                size={props.projectBreakpoint}
            >
                <Thead>
                    <Tr>
                        <Th>
                            <Text fontSize={props.projectBreakpoint}>
                                Number{" "}
                            </Text>
                        </Th>
                        <Th>
                            <Text fontSize={props.projectBreakpoint}>
                                Name{" "}
                            </Text>
                        </Th>
                        {props.projectBreakpoint !== "sm" ? (
                            <>
                                <Th>
                                    <Text fontSize={props.projectBreakpoint}>
                                        Client
                                    </Text>
                                </Th>
                                <Th>
                                    <Text fontSize={props.projectBreakpoint}>
                                        Design Engineer
                                    </Text>
                                </Th>
                                <Th>
                                    <Text fontSize={props.projectBreakpoint}>
                                        Design Checker
                                    </Text>
                                </Th>
                            </>
                        ) : (
                            <></>
                        )}
                        <Th>
                            <Text fontSize={props.projectBreakpoint}>
                                Date Required
                            </Text>
                        </Th>
                        <Th>
                            <Text fontSize={props.projectBreakpoint}>
                                Status
                            </Text>
                        </Th>
                        {props.inReport ? " " : <Th />}
                    </Tr>
                </Thead>
                <Tbody>
                    {projects.map((project) => (
                        <Tr borderColor="#E2DCCD" key={project.name}>
                            <Td>{project.number}</Td>
                            <Td>{project.name}</Td>

                            {props.projectBreakpoint !== "sm" ? (
                                <>
                                    <Td>{project.client}</Td>
                                    <Td>
                                        {returnEngineerName(
                                            project.engineers.designer_id
                                        )}
                                    </Td>
                                    <Td>
                                        {returnEngineerName(
                                            project.engineers.design_checker_id
                                        )}
                                    </Td>
                                </>
                            ) : (
                                <></>
                            )}
                            <Td>
                                {new Date(
                                    project.date_required
                                ).toLocaleDateString()}
                            </Td>
                            <Td>{project.status.value}</Td>
                            {props.inReport ? (
                                " "
                            ) : (
                                <Td isNumeric>
                                    <ProjectTableRow
                                        count={count}
                                        status_value={project.status.value}
                                        _id={project._id}
                                        updateParent={props.updateParent}
                                        authenticatedRole={
                                            props.authenticatedRole
                                        }
                                        project={project}
                                    />
                                </Td>
                            )}
                        </Tr>
                    ))}
                </Tbody>
            </Table>
        );
    } else {
        return <Box p={4}>No projects found</Box>;
    }
};

export default ProjectList;
