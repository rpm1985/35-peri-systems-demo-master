import React, { useCallback, useEffect, useRef, useState } from "react";
import {
    Button,
    Collapse,
    Fade,
    HStack,
    IconButton,
    Input,
    InputGroup,
    InputLeftElement,
    Select,
    Slide,
    SlideFade,
    useDisclosure,
} from "@chakra-ui/react";
import { CheckIcon, DeleteIcon, Search2Icon } from "@chakra-ui/icons";
import { Box, Heading, Stack, Text, VStack, Wrap } from "@chakra-ui/layout";
import DatePicker from "../Util/DatePicker/DatePicker";
import ProjectFilteringService from "../../services/project.filtering.service";
import AuthService from "../../services/auth.service";
import userService from "../../services/user.service";

const ProjectFilter = (props) => {
    let filters = useRef({});
    const [statusOptions, setStatusOptions] = useState();
    let firstRender = useRef(true);
    let count = props.count;
    const { isOpen, onToggle } = useDisclosure();
    const {
        isOpen: isRequestsOpen,
        onToggle: onRequestsToggle,
        onClose,
    } = useDisclosure();
    const [userId, setUserId] = useState(null);
    const [approvals, setApprovals] = useState([]);
    const [requests, setRequests] = useState([]);

    useEffect(async () => {
        const user = AuthService.getCurrentUser();
        const {
            data: { requests },
        } = await userService.getUserRequests();
        setRequests(requests);
        setUserId(user.id);
    }, []);

    const getUniqueStatusFromProjects = (projectList) =>
        projectList
            ? setStatusOptions(
                  projectList
                      .map((project) => project.status.value)
                      .filter(
                          (value, index, self) => self.indexOf(value) === index
                      )
              )
            : false;

    const createSelectionOptions = (listOfOptions) =>
        listOfOptions
            ? listOfOptions.map((aStatus) => (
                  <option key={count++} value={aStatus}>
                      {aStatus}
                  </option>
              ))
            : false;

    function handleKeyPress(event) {
        // checking if the key pressed is a letter and if so it prevents the
        // letter from being typed in
        let key = event.keyCode || event.which;
        key = String.fromCharCode(key);

        let regex = /[0-9]|\./;
        if (!regex.test(key)) {
            event.returnValue = false;
            if (event.preventDefault) event.preventDefault();
        }
    }

    const approveRequest = async (requestId) => {
        const res = await userService.approveRequest(requestId);
        const {
            data: { requests },
        } = await userService.getUserRequests();
        requests.length > 0 ? setRequests(requests) : onClose();
    };

    const declineRequest = async (requestId) => {
        const res = await userService.declineRequest(requestId);
        const {
            data: { requests },
        } = await userService.getUserRequests();
        requests.length > 0 ? setRequests(requests) : onClose();
    };

    const handleFilterChange = useCallback(
        (filterName, value) => {
            if (filterName !== undefined && value !== undefined) {
                filters.current[filterName] = value;
            }
            ProjectFilteringService.getProjectsByEngineerIDAndFilter(
                props.authenticatedId,
                filters.current,
                props.page
            ).then((data) => {
                props.setProjectsParent(data.data);
                props.setMaxPage(data.maxPage);
                if (data.maxPage === 1) {
                    props.setPage(1);
                }
            });
        },
        [props.page]
    );

    function clearFilters() {
        let filterNames = Object.keys(filters.current);
        for (let i = 0; i < filterNames.length; i++) {
            filters.current[filterNames[i]] = "";
        }
        props.setProjectDisplayedToAllEngineerProjects();
        props.setMaxPage(props.originalMaxPage);
    }

    useEffect(() => {
        if (
            firstRender.current === false &&
            props.projectsDisplayed.length !== 0
        ) {
            handleFilterChange();
        }
    }, [props.page, handleFilterChange]);

    useEffect(() => {
        if (
            firstRender.current === true &&
            props.projectsDisplayed.length !== 0
        ) {
            firstRender.current = false;
            getUniqueStatusFromProjects(props.projectsDisplayed);
        }
    }, [props.projectsDisplayed]);

    const filtersActive = () =>
        !Object.values(filters.current)
            .map((value) => value !== "")
            .every((value) => value === false) ||
        Object.values(filters.current) === []
            ? true
            : false;

    return (
        <>
            <HStack mb={4}>
                <Button w="120px" onClick={onToggle} colorScheme="yellow">
                    {isOpen ? "Hide Filters" : "Show Filters"}
                </Button>
                <Fade unmountOnExit in={filtersActive()} offsetX="-20px">
                    <Button
                        leftIcon={<DeleteIcon />}
                        colorScheme="red"
                        onClick={clearFilters}
                    >
                        Clear Filters
                    </Button>
                </Fade>
                <Fade
                    unmountOnExit
                    in={approvals.length > 0 || requests.length > 0}
                    offsetX="-20px"
                >
                    <Button
                        colorScheme="red"
                        variant="outline"
                        onClick={onRequestsToggle}
                    >
                        {`Approvals and Invitations`}
                    </Button>
                </Fade>
            </HStack>
            <Collapse in={isRequestsOpen} animateOpacity>
                <VStack
                    align="start"
                    mb={4}
                    background="white"
                    p={4}
                    borderRadius={8}
                >
                    {approvals.length > 0 ? (
                        <>
                            <Heading size="md">Approvals</Heading>
                            {approvals.map((approval) => (
                                <Box>{approval}</Box>
                            ))}
                        </>
                    ) : (
                        <></>
                    )}
                    {requests.length > 0 ? (
                        <>
                            <Heading size="md">Invitations</Heading>
                            <Wrap>
                                {requests.map((request) => (
                                    <Box
                                        boxShadow="inner"
                                        p={4}
                                        bg="#F1F1F1"
                                        borderRadius={8}
                                    >
                                        <Text>{request.projectId.name}</Text>
                                        <HStack mt={3}>
                                            <IconButton
                                                size="sm"
                                                colorScheme="yellow"
                                                onClick={() =>
                                                    approveRequest(request._id)
                                                }
                                                icon={<CheckIcon />}
                                            />
                                            <IconButton
                                                size="sm"
                                                colorScheme="red"
                                                onClick={() =>
                                                    declineRequest(request._id)
                                                }
                                                icon={<DeleteIcon />}
                                            />
                                        </HStack>
                                    </Box>
                                ))}
                            </Wrap>
                        </>
                    ) : (
                        <></>
                    )}
                </VStack>
            </Collapse>
            <Collapse in={isOpen} animateOpacity>
                <Box mb={4} background="white" p={4} borderRadius={8}>
                    <Stack>
                        <HStack>
                            <DatePicker
                                name="from_date"
                                placeholderText="Start Date"
                                selected={filters.current.from_date || ""}
                                onSelect={(e) =>
                                    handleFilterChange("from_date", new Date(e))
                                }
                                dateFormat={"dd/MM/yyyy"}
                            />
                            <DatePicker
                                name="to_date"
                                placeholderText="End Date"
                                selected={filters.current.to_date || ""}
                                onSelect={(e) =>
                                    handleFilterChange("to_date", new Date(e))
                                }
                                dateFormat={"dd/MM/yyyy"}
                            />
                        </HStack>
                        <InputGroup>
                            <InputLeftElement
                                pointerEvents="none"
                                children={<Search2Icon color="gray.300" />}
                            />
                            <Input
                                name="project_number"
                                value={filters.current.number || ""}
                                placeholder="Number"
                                onKeyPress={handleKeyPress}
                                onChange={(e) =>
                                    handleFilterChange("number", e.target.value)
                                }
                            />
                        </InputGroup>
                        <InputGroup>
                            <InputLeftElement
                                pointerEvents="none"
                                children={<Search2Icon color="gray.300" />}
                            />
                            <Input
                                name="project_name"
                                onChange={(e) =>
                                    handleFilterChange("name", e.target.value)
                                }
                                placeholder="Name"
                                value={filters.current.name || ""}
                            />
                        </InputGroup>

                        <InputGroup>
                            <InputLeftElement
                                pointerEvents="none"
                                children={<Search2Icon color="gray.300" />}
                            />
                            <Input
                                name="project_client"
                                value={filters.current.client || ""}
                                onChange={(e) =>
                                    handleFilterChange("client", e.target.value)
                                }
                                placeholder="Client"
                            />
                        </InputGroup>
                        <Select
                            color="#A0AEC4"
                            placeholder="Select a status"
                            name="project_status"
                            onChange={(e) =>
                                handleFilterChange(
                                    "status.value",
                                    e.target.value
                                )
                            }
                            value={filters.current["status.value"] || ""}
                        >
                            {createSelectionOptions(statusOptions)}
                        </Select>
                    </Stack>
                </Box>
            </Collapse>
        </>
    );
};

export default ProjectFilter;
