import React from "react";
import { cleanup, render, waitFor } from "@testing-library/react";
import EngineerSelection from "../src/components/Events/AssigingEngineers/EngineerSelection";
import axios from "axios";
import each from "jest-each";

jest.mock("axios");

afterEach(cleanup);

let engineerChris = {
    _id: "6026dec65552793088002180",
    firstname: "Chris",
    lastname: "Adtek",
};

let engineerMikey = {
    _id: "604937da8e3dba5830594c0f",
    firstname: "Mikey",
    lastname: "Smith",
};

describe("Engineer Selection displays engineers retrieved from axios request", () => {
    each`
        input                                  | engineers
        ${Array(engineerChris, engineerMikey)} | ${`Chris and Mikey`}
        ${Array(engineerChris)}                | ${`Chris`}
        ${Array(engineerMikey)}                | ${`Mikey`}
    `.test("when engineers retrieved are: $engineers", async ({ input }) => {
        //mocking the axios requests which are used by Engineer Selection
        axios.get.mockImplementation((url) => {
            if (url.includes("getUsersWithRoleID")) {
                return Promise.resolve({
                    data: {
                        data: input,
                    },
                });
            } else {
                return Promise.resolve({
                    data: {
                        data: [
                            {
                                _id: "6026d7c4e01f86192c9a5786",
                            },
                        ],
                    },
                });
            }
        });

        const engineerSelectionContainer = render(
            <EngineerSelection
                type={"Design Checker"}
                onChange={null}
                currentEngineer={{ _id: "6026dec65552793088002180" }}
            />
        );

        await waitFor(() => {
            const result = engineerSelectionContainer.getAllByText(
                (content) => {
                    if (content !== "") {
                        return content.includes(
                            input[0].firstname + " " + input[0].lastname
                        );
                    }
                }
            );
            //expect at least two occurrences because the same engineers are
            // rendered twice in this test
            expect(result.length >= 2).toBeTruthy();
        });
    });
});
