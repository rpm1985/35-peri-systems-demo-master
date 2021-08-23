import React, { useCallback, useEffect, useState } from "react";
import { Select, Text } from "@chakra-ui/react";
import UsersService from "../../../services/users.service";

const EngineerSelection = (props) => {
    const [allEngineers, setAllEngineers] = useState([]);
    const typeOfEngineerSelection = props.type;
    let [selectValue, setSelectValue] = useState(props.currentEngineer);

    const getDesigners = useCallback(() => {
        return new Promise((resolve, reject) => {
            UsersService.getDesignerRoleID().then((idRetrieved) => {
                if (idRetrieved !== undefined) {
                    UsersService.getUsersWithRoleID(idRetrieved).then(
                        (users) => {
                            resolve(users);
                        }
                    );
                } else {
                    reject(Error("Promise rejected"));
                }
            });
        });
    }, []);

    const getTechnicalLeads = useCallback(() => {
        return new Promise((resolve, reject) => {
            UsersService.getTechnicalLeadRoleID().then((idRetrieved) => {
                if (idRetrieved !== undefined) {
                    UsersService.getUsersWithRoleID(idRetrieved).then(
                        (users) => {
                            resolve(users);
                        }
                    );
                } else {
                    reject(Error("Promise rejected"));
                }
            });
        });
    }, []);

    const getAndSetEngineers = useCallback(() => {
        getDesigners().then((designEngineers) => {
            if (typeOfEngineerSelection === "Design Checker") {
                getTechnicalLeads().then((technicalLeads) => {
                    setAllEngineers(designEngineers.concat(technicalLeads));
                });
            } else {
                setAllEngineers(designEngineers);
            }
        });
    }, [getDesigners, getTechnicalLeads, typeOfEngineerSelection]);

    useEffect(() => {
        getAndSetEngineers();
    }, [props.currentEngineer, getAndSetEngineers]);

    const createDesignEngineerSelectionOptions = () => {
        if (allEngineers !== undefined) {
            return allEngineers.map((aDesigner) => (
                <option
                    key={aDesigner._id + Math.random()}
                    value={aDesigner._id}
                >
                    {aDesigner.firstname + " " + aDesigner.lastname}
                </option>
            ));
        }
    };

    const handleOnChange = (event) => {
        let newIdSelected = event.target.value;
        setSelectValue(newIdSelected);
        props.onChange(newIdSelected);
    }

    return (
        <div align="left" key={props.currentEngineer}>
            <Text>{typeOfEngineerSelection}:</Text>
            <Select
                w="70%"
                size="sm"
                placeholder="Select an engineer"
                name="design_engineers"
                onChange={handleOnChange}
                value={selectValue}
            >
                {createDesignEngineerSelectionOptions()}
            </Select>
        </div>
    );
};

export default EngineerSelection;
