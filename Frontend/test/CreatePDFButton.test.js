import React from "react";
import { cleanup, fireEvent, render } from "@testing-library/react";
import html2canvas from "html2canvas";
import { CreatePDFButton } from "../src/components/Events/Report/CreatePDFButton";
import { jsPDF } from "jspdf";

require("regenerator-runtime");

afterEach(cleanup);

jest.mock("html2canvas", () => jest.fn());
html2canvas.mockResolvedValue({
    height: 100,
    width: 100,
    toDataURL: jest.fn(),
});
jest.mock("jsPDF");
const mockJsPDF = {
    save: jest.fn(),
    addImage: jest.fn(),
};
jsPDF.mockImplementation(() => mockJsPDF);

test("CreatePDFButton retrieves correct component when button is clicked", () => {
    const idOfComponentToPrint = "hello_div";
    const contentToPrintContainer = render(
        <div id={idOfComponentToPrint}>Hello</div>
    );
    const buttonContainer = render(
        <CreatePDFButton idOfComponent={idOfComponentToPrint} />
    );

    const button = buttonContainer.getByRole("button");
    fireEvent.click(button, {
        button: 1,
    });

    const result = contentToPrintContainer.getByText("Hello");
    expect(html2canvas).toHaveBeenCalledWith(result);
});
