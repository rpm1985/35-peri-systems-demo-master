import {
    Button,
    Checkbox,
    CheckboxGroup,
    HStack,
    IconButton,
    Input,
    Menu,
    MenuButton,
    MenuItem,
    MenuList,
    Modal,
    ModalBody,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
} from "@chakra-ui/react";
import { ChevronDownIcon, DeleteIcon, EditIcon } from "@chakra-ui/icons";
import React, { useState } from "react";
import { Td, Tr } from "@chakra-ui/table";
import { useDisclosure } from "@chakra-ui/hooks";
import { FormControl, FormLabel } from "@chakra-ui/form-control";

const UserTableRow = (props) => {
    const { isOpen, onOpen, onClose } = useDisclosure();

    const getRoles = () => {
        if (props.user.roles.length > 0) {
            if (typeof props.user.roles[0] === "object") {
                return props.user.roles.map((role) => role.name);
            } else {
                return props.user.roles;
            }
        } else {
            return [""];
        }
    };

    const [values, setValues] = useState({
        firstname: props.user.firstname,
        lastname: props.user.lastname,
        email: props.user.email,
        roles: getRoles(),
    });

    const updateUser = () => {
        props.updateUser(props.user.email, values);
        onClose();
    };

    const handleChange = ({ target }) => {
        setValues({ ...values, [target.name]: target.value });
    };

    const userRolesAsString = () =>
        values.roles
            .map((role) => role.charAt(0).toUpperCase() + role.slice(1))
            .join(", ");

    const defaultValues = () => {

        return values.roles.map((role) => role);
    };

    const handleCheckboxChange = (x) => {
        setValues({ ...values, roles: x });
    };

    return (
        <Tr key={props.user.id}>
            <Td> {`${props.user.firstname} ${props.user.lastname}`} </Td>
            <Td> {props.user.email} </Td>
            <Td> {userRolesAsString()} </Td>
            <Td isNumeric>
                <Menu placement="bottom-end">
                    <MenuButton
                        as={IconButton}
                        size="sm"
                        colorScheme="red"
                        icon={<ChevronDownIcon w={6} h={6} color="white" />}
                    />
                    <MenuList>
                        <MenuItem onClick={onOpen} icon={<EditIcon />}>
                            Edit
                        </MenuItem>
                        <MenuItem
                            onClick={() => props.deleteUser(props.user.email)}
                            icon={<DeleteIcon />}
                        >
                            Delete
                        </MenuItem>
                    </MenuList>
                </Menu>
            </Td>

            <Modal size="lg" isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Edit user profile</ModalHeader>
                    <ModalBody p={6}>
                        <FormControl>
                            <FormLabel>First Name</FormLabel>
                            <Input
                                name="firstname"
                                value={values.firstname}
                                onChange={handleChange}
                                placeholder="First Name"
                            />
                        </FormControl>
                        <FormControl mt={4}>
                            <FormLabel>Last name</FormLabel>
                            <Input
                                name="lastname"
                                value={values.lastname}
                                onChange={handleChange}
                                placeholder="Last name"
                            />
                        </FormControl>
                        <FormControl mt={4}>
                            <FormLabel>Email</FormLabel>
                            <Input
                                name="email"
                                value={values.email}
                                onChange={handleChange}
                                placeholder="Email"
                            />
                        </FormControl>
                        <FormControl mt={4}>
                            <FormLabel>Roles</FormLabel>
                            <CheckboxGroup
                                colorScheme="green"
                                defaultValue={defaultValues()}
                                onChange={handleCheckboxChange}
                            >
                                <HStack spacing={6}>
                                    <Checkbox
                                        colorScheme="red"
                                        value="technical"
                                    >
                                        Technical
                                    </Checkbox>
                                    <Checkbox colorScheme="red" value="admin">
                                        Admin
                                    </Checkbox>
                                    <Checkbox colorScheme="red" value="sales">
                                        Sales
                                    </Checkbox>
                                    <Checkbox
                                        colorScheme="red"
                                        value="designer"
                                    >
                                        Designer
                                    </Checkbox>
                                </HStack>
                            </CheckboxGroup>
                        </FormControl>
                    </ModalBody>
                    <ModalFooter>
                        <Button
                            onClick={updateUser}
                            colorScheme="yellow"
                            mr={3}
                        >
                            Update
                        </Button>
                        <Button onClick={onClose}>Cancel</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </Tr>
    );
};

export default UserTableRow;
