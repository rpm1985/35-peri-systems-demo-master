import React, { useEffect, useState } from "react";
import {
    Box,
    Button,
    Container,
    HStack,
    IconButton,
    useMediaQuery,
} from "@chakra-ui/react";
import { ReactComponent as ReactLogo } from "../icons/Pericon.svg";
import ".././App.css";
import AuthService from "../services/auth.service";
import { Link, useLocation } from "react-router-dom";
import {
    Menu,
    MenuButton,
    MenuGroup,
    MenuItem,
    MenuList,
} from "@chakra-ui/menu";
import { ChevronDownIcon } from "@chakra-ui/icons";

const PeriNavbar = () => {
    const [showAdminBoard, setShowAdminBoard] = useState(false);
    const [currentUser, setCurrentUser] = useState(undefined);
    const location = useLocation();
    const [showFullMenu] = useMediaQuery("(min-width: 800px)");

    useEffect(() => {
        const user = AuthService.getCurrentUser();

        if (user) {
            setCurrentUser(user);
            setShowAdminBoard(user.roles.includes("ROLE_ADMIN"));
        }
    }, []);

    const logOut = () => {
        AuthService.logout();
        window.location.reload();
    };

    const isCurrentPage = (route) => {
        const { pathname } = location;
        return pathname === route;
    };

    return (
        <Box bg="brand.background" boxShadow="lg">
            <Container maxW="6xl">
                <HStack justifyContent="space-between">
                    <ReactLogo className="Logo" />
                    <Box mr="1em">
                        {currentUser ? (
                            <HStack>
                                {showFullMenu ? (
                                    <>
                                        <Link to="/Dashboard">
                                            <Button
                                                colorScheme="red"
                                                variant="ghost"
                                                to="/Dashboard"
                                                isActive={isCurrentPage(
                                                    "/Dashboard"
                                                )}
                                            >
                                                Project Dashboard
                                            </Button>
                                        </Link>
                                        {showAdminBoard ? (
                                            <Link to="/Register">
                                                <Button
                                                    colorScheme="red"
                                                    variant="ghost"
                                                    to="/Register"
                                                    isActive={isCurrentPage(
                                                        "/Register"
                                                    )}
                                                >
                                                    Manage Users
                                                </Button>
                                            </Link>
                                        ) : (
                                            <></>
                                        )}
                                    </>
                                ) : (
                                    <></>
                                )}

                                {currentUser ? (
                                    <Menu isLazy>
                                        <MenuButton
                                            as={IconButton}
                                            colorScheme="red"
                                            variant="ghost"
                                            icon={<ChevronDownIcon />}
                                        />
                                        <MenuList>
                                            {!showFullMenu ? (
                                                <MenuGroup title="Navigation">
                                                    <Link to="/Dashboard">
                                                        <MenuItem>
                                                            Project Dashboard
                                                        </MenuItem>
                                                    </Link>
                                                    {showAdminBoard ? (
                                                        <Link to="/Register">
                                                            <MenuItem>
                                                                Manage Users
                                                            </MenuItem>
                                                        </Link>
                                                    ) : (
                                                        <></>
                                                    )}
                                                </MenuGroup>
                                            ) : (
                                                <></>
                                            )}
                                            <MenuGroup title="Access">
                                                <MenuItem onClick={logOut}>
                                                    Logout
                                                </MenuItem>
                                            </MenuGroup>
                                        </MenuList>
                                    </Menu>
                                ) : (
                                    <></>
                                )}
                            </HStack>
                        ) : (
                            <Button
                                colorScheme="red"
                                variant="ghost"
                                isActive={isCurrentPage("/Login")}
                            >
                                <Link to="/Login">Login</Link>
                            </Button>
                        )}
                    </Box>
                </HStack>
            </Container>
        </Box>
    );
};

export default PeriNavbar;
