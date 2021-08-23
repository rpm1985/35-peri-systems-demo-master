import React, { useEffect, useState } from "react";
import { Box, Heading } from "@chakra-ui/layout";

const ProjectDetailsCustomer = (props) => {
    const [project, setProject] = useState();

    useEffect(() => {
        if (props.project !== undefined) {
            setProject(props.project);
        }
    }, [props.project]);

    return (
        <Box marginBottom={5}>
            {project ? (
                <>
                    <Box align="center" justify="center">
                        <Heading>{project.name}</Heading>
                        <Heading as="h2" size="lg">
                            (#{project.number})
                        </Heading>
                    </Box>
                    <Box>
                        <Heading as="h4" size="md" marginBottom={5}>
                            Due:{" "}
                            {new Date(
                                project.date_required
                            ).toLocaleDateString()}
                        </Heading>
                        <Heading as="h4" size="md">
                            Description: {project.description}
                        </Heading>
                    </Box>
                </>
            ) : (
                <> </>
            )}
        </Box>
    );
};

export default ProjectDetailsCustomer;
