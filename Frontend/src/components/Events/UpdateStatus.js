import React, { useEffect, useRef, useState } from "react";
import {
    Button,
    createStandaloneToast,
    MenuItem,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    Radio,
    RadioGroup,
} from "@chakra-ui/react";

import { useDisclosure } from "@chakra-ui/hooks";
import { VStack } from "@chakra-ui/layout";
import ProjectService from "../../services/project.service";
import { FaEdit } from "react-icons/fa";

const UpdateStatus = (props) => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [statusSelected, setStatusSelected] = useState();
    const [projects, setProjects] = useState();
    let aProject = useRef();
    let count = props.count;

    useEffect(() => {
        setStatusSelected(props.projectStatus.trim());

        if (props.projectId !== undefined) {
            ProjectService.getProjectByID(props.projectId).then((projects) => {
                aProject.current = projects;
                setProjects(aProject.current);
            });
        }
    }, [props.projectStatus, props.projectId]);

    function successStatusToast() {
        const toast = createStandaloneToast();
        toast({
            title: "Status Successfully Updated",
            status: "success",
            duration: 5000,
            position: "top-right",
            isClosable: true,
        });
    }
    function sendNotificationEmail(projects) {
        ProjectService.sendMail(
            projects,
            projects.customer.email,
            projects.customer.name
        ).then(
            () => {
                console.log("mail sent");
            },
            (error) => {
                const resMessage =
                    (error.response &&
                        error.response.data &&
                        error.response.data.message) ||
                    error.message ||
                    error.toString();
                console.log("error sending mail");
            }
        );
    }

    function handleSubmit() {
        const toast = createStandaloneToast();
        if (typeof projects !== "undefined") {
            if (
                statusSelected === "Design Complete" &&
                projects.approved === "APPROVED"
            ) {
                ProjectService.updateProjectStatus(
                    props.projectId,
                    statusSelected
                )
                    .then((updatedProject) =>
                        props.updateParent(updatedProject)
                    )
                    .then(onClose);
                sendNotificationEmail(projects);
                successStatusToast();
            } else if (
                statusSelected === "Design Complete" &&
                projects.approved === "NONE"
            ) {
                ProjectService.updateProjectApproval(props.projectId, "PENDING")
                    .then((updatedProject) =>
                        props.updateParent(updatedProject)
                    )
                    .then(onClose);

                toast({
                    title: "Approval Request Sent",
                    description:
                        "Approval required by design checker before marked as complete.",
                    status: "warning",
                    duration: 7000,
                    position: "top-right",
                    isClosable: true,
                });
            } else if (
                statusSelected === "Design Complete" &&
                projects.approved === "PENDING"
            ) {
                toast({
                    title: "Approval Request Sent",
                    description:
                        "Approval required by design checker before marked as complete.",
                    status: "warning",
                    duration: 7000,
                    position: "top-right",
                    isClosable: true,
                });
            } else {
                ProjectService.updateProjectStatus(
                    props.projectId,
                    statusSelected
                )
                    .then((updatedProject) =>
                        props.updateParent(updatedProject)
                    )
                    .then(onClose);
                successStatusToast();
                sendNotificationEmail(projects);
            }
        }
    }

    function handleClose() {
        onClose();
        setStatusSelected(props.projectStatus.trim());
    }

    function createRadioButtons() {
        let statusOptions = [
            "Design Pending",
            "Preliminary Design Ongoing",
            "Preliminary Design Complete",
            "Awaiting Customer Approval",
            "Detailed Design Pending",
            "Detailed Design Ongoing",
            "Design Complete",
            "Project Complete",
            "Project Cancelled",
        ];

        return statusOptions.map((status) => (
            <Radio key={count++} value={status}>
                {status}
            </Radio>
        ));
    }

    return (
        <div key={count++}>
            {props.inMenu ? (
                <MenuItem icon={<FaEdit />} onClick={onOpen}>
                    Update Status
                </MenuItem>
            ) : (
                <Button onClick={onOpen} colorScheme={"red"}>
                    Update Status
                </Button>
            )}

            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Please select a status</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <RadioGroup
                            w="100%"
                            size="lg"
                            colorScheme="red"
                            value={statusSelected}
                            onChange={setStatusSelected}
                        >
                            <VStack
                                spacing="1rem"
                                align="left"
                                textAlign={"right"}
                            >
                                {createRadioButtons()}
                            </VStack>
                        </RadioGroup>
                    </ModalBody>

                    <ModalFooter>
                        <Button colorScheme="red" mr={3} onClick={handleClose}>
                            Cancel
                        </Button>
                        <Button colorScheme="green" onClick={handleSubmit}>
                            Submit
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </div>
    );
};

export default UpdateStatus;
