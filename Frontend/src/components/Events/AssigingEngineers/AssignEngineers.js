import React, { useEffect, useRef } from "react";
import {
    Button,
    HStack,
    MenuItem,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    VStack,
} from "@chakra-ui/react";
import { useDisclosure } from "@chakra-ui/hooks";
import ProjectService from "../../../services/project.service";
import EngineerSelection from "./EngineerSelection";
import { BsFillPeopleFill } from "react-icons/bs";

const AssignEngineers = (props) => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const selectedDesignEngineerId = useRef();
    const selectedDesignCheckerId = useRef();
    const initialDesigner = useRef();
    const initialDesignChecker = useRef();

    useEffect(() => {
        if (props.project.engineers.designer_id !== null) {
            initialDesigner.current = props.project.engineers.designer_id._id;
            selectedDesignEngineerId.current = initialDesigner.current;
        }

        if (props.project.engineers.design_checker_id !== null) {
            initialDesignChecker.current =
                props.project.engineers.design_checker_id._id;
            selectedDesignCheckerId.current = initialDesignChecker.current;
        }
    }, [
        props.project.engineers.designer_id,
        props.project.engineers.design_checker_id,
    ]);

    async function handleSubmit() {
        let updatedProject;
        if (initialDesigner.current !== selectedDesignEngineerId.current) {
            await ProjectService.updateProjectDesignEngineer(
                props.project._id,
                selectedDesignEngineerId.current
            ).then((project) => {
                updatedProject = project;
            });
        }

        if (initialDesignChecker.current !== selectedDesignCheckerId.current) {
            await ProjectService.updateProjectDesignChecker(
                props.project._id,
                selectedDesignCheckerId.current
            ).then((project) => {
                updatedProject = project;
            });
        }

        onClose();

        if (updatedProject !== undefined) {
            props.updateParent(updatedProject);
        }
    }

    function handleClose() {
        onClose();
    }

    function handleDesignEngineerSelection(selectedID) {
        selectedDesignEngineerId.current = selectedID;
    }

    function handleDesignCheckerSelection(selectedID) {
        selectedDesignCheckerId.current = selectedID;
    }

    return (
        <div key={"assign_engineer_modal"}>
            {props.inMenu ? (
                <MenuItem icon={<BsFillPeopleFill />} onClick={onOpen}>
                    Assign Engineers
                </MenuItem>
            ) : (
                <Button onClick={onOpen} colorScheme={"green"} marginLeft={10}>
                    Assign Engineers
                </Button>
            )}

            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Assigning engineers to projects</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <VStack align="left">
                            <EngineerSelection
                                type={"Design Engineer"}
                                onChange={handleDesignEngineerSelection}
                                currentEngineer={initialDesigner.current}
                            />
                            <EngineerSelection
                                type={"Design Checker"}
                                onChange={handleDesignCheckerSelection}
                                currentEngineer={initialDesignChecker.current}
                            />
                        </VStack>
                    </ModalBody>

                    <ModalFooter>
                        <HStack>
                            <Button
                                colorScheme="red"
                                mr={3}
                                onClick={handleClose}
                            >
                                Cancel
                            </Button>
                            <Button colorScheme="green" onClick={handleSubmit}>
                                Submit
                            </Button>
                        </HStack>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </div>
    );
};

export default AssignEngineers;
