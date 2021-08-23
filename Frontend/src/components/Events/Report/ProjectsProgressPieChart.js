import { Cell, Pie, PieChart, ResponsiveContainer, Sector } from "recharts";
import React from "react";
import { Box } from "@chakra-ui/layout";

//adapted code from https://recharts.org/en-US/examples/CustomActiveShapePieChart
//and https://recharts.org/en-US/examples/PieChartWithCustomizedLabel
export const ProjectsProgressPieChart = (props) => {
    const data = props ? buildData() : [];

    function buildData() {
        let keys = Object.keys(props.data);
        let data = [];
        for (let i = 0; i < keys.length; i++) {
            data.push({
                name: keys[i],
                value: props.data[keys[i]].length,
            });
        }

        return data;
    }

    const COLORS = [
        "#e74c3c",
        "#9b59b6",
        "#3498db",
        "#16a085",
        "#2ecc71",
        "#f1c40f",
        "#d35400",
        "#7f8c8d",
    ];

    const renderLabel = (props) => {
        const RADIAN = Math.PI / 180;
        const {
            cx,
            cy,
            midAngle,
            innerRadius,
            outerRadius,
            startAngle,
            endAngle,
            fill,
            payload,
            percent,
            value,
        } = props;
        const sin = Math.sin(-RADIAN * midAngle);
        const cos = Math.cos(-RADIAN * midAngle);
        const sx = cx + (outerRadius + 10) * cos;
        const sy = cy + (outerRadius + 10) * sin;
        const mx = cx + (outerRadius + 30) * cos;
        const my = cy + (outerRadius + 30) * sin;
        const ex = mx + (cos >= 0 ? 1 : -1) * 22;
        const ey = my;
        const textAnchor = cos >= 0 ? "start" : "end";

        return (
            <g>
                <Sector
                    cx={cx}
                    cy={cy}
                    innerRadius={innerRadius}
                    outerRadius={outerRadius}
                    startAngle={startAngle}
                    endAngle={endAngle}
                    fill={fill}
                />
                <path
                    d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`}
                    stroke={fill}
                    fill="none"
                />
                <text
                    x={ex + (cos >= 0 ? 1 : -1) * 12}
                    y={ey - 22}
                    textAnchor={textAnchor}
                    fill="#000000"
                >
                    {payload.name}
                </text>
                <text
                    x={ex + (cos >= 0 ? 1 : -1) * 12}
                    y={ey}
                    textAnchor={textAnchor}
                    fill="#999"
                >{`${value} (${(percent * 100).toFixed(1)}%)`}</text>
            </g>
        );
    };

    return (
        <Box width={900} height={400}>
            <ResponsiveContainer width={"100%"} height={"100%"}>
                <PieChart width={900} height={400}>
                    <Pie
                        data={data}
                        labelLine={false}
                        label={renderLabel}
                        outerRadius={150}
                        fill="#8884d8"
                        dataKey="value"
                    >
                        {data.map((entry, index) => (
                            <Cell
                                key={`cell-${index}`}
                                fill={COLORS[index % COLORS.length]}
                            />
                        ))}
                    </Pie>
                </PieChart>
            </ResponsiveContainer>
        </Box>
    );
};
