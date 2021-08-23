import { Heading } from "@chakra-ui/layout";
import React from "react";

export const SeparatedHeading = ({ primary, secondary }) => {
    return (
        <>
            <Heading>{primary}</Heading>
            <Heading size="md" mb={4} color="grey">
                {secondary}
            </Heading>
        </>
    );
};
