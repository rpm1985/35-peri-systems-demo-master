import React from "react";
import ProjectsSection from "../Project/ProjectsSection";
import { Container } from "@chakra-ui/layout";

const AdminBoard = () => {
    return (
        <Container maxW="6xl" marginTop={12} marginBottom={12}>
            <ProjectsSection />
        </Container>
    );
};

export default AdminBoard;
