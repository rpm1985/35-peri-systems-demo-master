import {
    Bar,
    BarChart,
    CartesianGrid,
    Legend,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from "recharts";
import React from "react";
import { Box } from "@chakra-ui/layout";

//Adapted code from https://recharts.org/en-US/examples/TinyBarChart
export const ProjectsCompletedBarChart = (props) => {
    const data = [
        {
            name: "Completed On Time",
            amount: props.data ? props.data[0] : 0,
        },
        {
            name: "Not Completed On Time",
            amount: props.data ? props.data[1] : 0,
        },
    ];

    return (
        <Box width={500} height={300} marginTop={5}>
            <ResponsiveContainer width={"100%"} height={"100%"}>
                <BarChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="amount" fill="#8884d8" barSize={80} />
                </BarChart>
            </ResponsiveContainer>
        </Box>
    );
};
