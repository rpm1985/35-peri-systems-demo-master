import { Button } from "@chakra-ui/react";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";
import React, { useEffect, useState } from "react";

export const CreatePDFButton = (props) => {
    let idOfComponentToConvertToPDF = props.idOfComponent;
    const [isHidden, setIsHidden] = useState(false);

    useEffect(() => {
        if (isHidden) {
            saveComponentAsPDF(idOfComponentToConvertToPDF);
            setIsHidden(false);
        }
    }, [isHidden, idOfComponentToConvertToPDF]);

    //adapted code from https://stackoverflow.com/questions/64845248/download-a-react-component-using-jspdf-and-html2canvas
    const saveComponentAsPDF = (componentId) => {
        const componentToPrint = document.getElementById(componentId);
        let todayDate = new Date();
        html2canvas(componentToPrint).then((canvas) => {
            let imageWidth = 208;
            let imageHeight = (canvas.height * imageWidth) / canvas.width;
            const imageData = canvas.toDataURL("img/png");
            const pdf = new jsPDF("p", "mm", "a4");
            pdf.addImage(imageData, "PNG", 0, 0, imageWidth, imageHeight);
            pdf.save("Report_" + todayDate.toLocaleDateString() + ".pdf");
        });
    };

    return (
        <Button
            hidden={isHidden}
            colorScheme={"red"}
            variant="outline"
            onClick={() => setIsHidden(true)}
        >
            Export to PDF
        </Button>
    );
};
