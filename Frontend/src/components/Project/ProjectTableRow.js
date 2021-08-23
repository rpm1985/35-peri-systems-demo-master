import { ChevronDownIcon } from "@chakra-ui/icons";
import { IconButton, Menu, MenuButton, MenuList } from "@chakra-ui/react";
import AssignEngineers from "../Events/AssigingEngineers/AssignEngineers";
import UpdateStatus from "../Events/UpdateStatus";
import ProjectView from "./ProjectView";
import { useState, useEffect } from "react";
import authService from "../../services/auth.service";

export const ProjectTableRow = ({
    count,
    status_value,
    _id,
    updateParent,
    authenticatedRole,
    project,
}) => {
    const [IsSales, setIsSales] = useState(false);

    useEffect(() => {
        const user = authService.getCurrentUser();
        setIsSales(
            user.roles.includes("ROLE_SALES") && user.roles.length === 1
        );
    });

    return (
        <>
            {IsSales ? (
                <Menu>
                    <ProjectView project={project}/>
                </Menu>
            ) : (
                <Menu placement="bottom-end">
                    <MenuButton
                        as={IconButton}
                        size="sm"
                        colorScheme="red"
                        icon={<ChevronDownIcon w={6} h={6} color="white" />}
                    />
                    <MenuList boxShadow="2xl">
                        <UpdateStatus
                            count={count}
                            projectStatus={status_value}
                            projectId={_id}
                            updateParent={updateParent}
                            inMenu={true}
                        />
                        <ProjectView project={project} />
                        {authenticatedRole.includes("ROLE_TECHNICAL") && (
                            <div>
                                <AssignEngineers
                                    updateParent={updateParent}
                                    project={project}
                                    inMenu={true}
                                />
                            </div>
                        )}
                    </MenuList>
                </Menu>
            )}
        </>
    );
};
