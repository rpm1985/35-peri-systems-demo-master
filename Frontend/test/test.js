import { SeparatedHeading } from "../src/components/Util/SeparatedHeading/SeparatedHeading";
import { render, waitFor } from "@testing-library/react";
import React from "react";

require("regenerator-runtime");

test("doing something", async () => {
    const primaryText = "Primary Heading";
    const secondaryText = "Secondary Heading";
    const a = render(
        <SeparatedHeading primary={primaryText} secondary={secondaryText} />
    );
    const d = await waitFor(() =>
        a.getByText((content, element) => content.includes(primaryText))
    );
});
