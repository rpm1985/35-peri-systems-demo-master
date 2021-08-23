import React, { useEffect, useRef, useState } from "react";
import circle_outline from "../../icons/outline_circle.png";
import red_tick from "../../icons/red_tick.png";
import in_progress from "../../icons/inprogress_icon.png";
import cross_circle from "../../icons/cross_circle.png";
import "../../style/timeline.css";
import { Box, Flex, Text } from "@chakra-ui/react";

const Timeline = (props) => {
    let aProject = useRef();
    const [projects, setProjects] = useState();
    const allProjectStages = [
        "Design Pending",
        "Preliminary Design Ongoing",
        "Preliminary Design Complete",
        "Awaiting Customer Approval",
        "Detailed Design Pending",
        "Detailed Design Ongoing",
        "Design Complete",
        "Project Complete",
    ];

    useEffect(() => {
        if (props.project !== undefined) {
            aProject.current = props.project;
            setProjects(aProject.current);
        } else if (props.location !== undefined) {
            aProject.current = props.location.state.project;
            setProjects(aProject.current);
        }
    }, [props.project, props.location]);

    let logoWidth = 68;
    let logoHeight = 64;
    let timeTextSize = "xs";
    let statusTextSize = "sm";

    let statusArray = [];

    function retrieveProjectStatusArray() {
        let i;
        let tempStatusArray = [];
        if (typeof projects !== "undefined") {
            for (i = 0; i < projects.status_history.length; i++) {
                tempStatusArray.push(projects.status_history[i].value);
            }
            statusArray = tempStatusArray;
        }
    }

    function returnDateToDisplayMinuteHourMeridiemFromADateString(aDate) {
        let date = new Date(aDate);
        let dateToDisplay = date.toLocaleDateString();
        let minute = (date.getMinutes() < 10 ? "0" : "") + date.getMinutes();
        let hour = (date.getHours() < 10 ? "0" : "") + date.getHours();
        let meridiem;
        if (hour > 12) {
            meridiem = "PM";
            hour = hour - 12;
        } else if (hour < 12) {
            meridiem = "AM";
        } else if (hour === 12) {
            meridiem = "PM";
        } else {
            meridiem = "PM";
        }
        return [dateToDisplay, minute, hour, meridiem];
    }

    function displayLogo(
        line,
        logo,
        width,
        height,
        statusTextSize,
        projectArray,
        index,
        timeTextSize,
        dateToDisplay,
        hour,
        minute,
        meridiem,
        typeOfStatus
    ) {
        let dateText;
        let timeText;
        let statusText;
        let statusText2;
        let statusText3;
        if (typeOfStatus === "complete") {
            dateText = "Date: " + dateToDisplay;
            timeText = "Time: " + hour + ":" + minute + " " + meridiem;
            statusText = allProjectStages[index];
        } else if (typeOfStatus === "in_progress") {
            timeText = "In progress...";
            statusText = allProjectStages[index];
        } else if (typeOfStatus === "waiting") {
            timeText = "Waiting...";
            statusText = allProjectStages[index];
        } else if (typeOfStatus === "cancelled") {
            dateText = "Date: " + dateToDisplay;
            timeText = "Time: " + hour + ":" + minute + " " + meridiem;
            statusText = "Project Cancelled";
        }
        if (index === 1) {
            statusText = "Preliminary⠀⠀⠀⠀⠀";
            statusText2 = "Design";
            statusText3 = "Ongoing";
        }
        if (index === 2) {
            statusText = "Preliminary⠀⠀⠀⠀⠀";
            statusText2 = "Design";
            statusText3 = "Complete";
        }
        if (index === 3) {
            statusText = "Awaiting⠀⠀⠀⠀⠀⠀⠀⠀";
            statusText2 = "Customer";
            statusText3 = "Approval";
        }
        return (
            <div className={line}>
                <img
                    src={logo}
                    alt="Logo"
                    width={logoWidth}
                    height={logoHeight}
                />
                <b>
                    <Text fontSize={statusTextSize}>{statusText}</Text>
                    <Text fontSize={statusTextSize}>{statusText2}</Text>
                    <Text fontSize={statusTextSize}>{statusText3}</Text>
                </b>
                <Text fontSize={timeTextSize}>{dateText}</Text>
                <Text fontSize={timeTextSize}>{timeText}</Text>
            </div>
        );
    }

    function isStatusComplete(index) {
        let minute;
        let hour;
        let meridiem;
        let dateToDisplay;
        let line;
        let lastIndex;
        let currentStatusIndex;
        let cancelledIndex;
        if (index !== 7) {
            line = "line";
        }
        if (typeof projects !== "undefined") {
            retrieveProjectStatusArray();
            if (projects.status.value !== "Project Cancelled") {
                lastIndex = allProjectStages.lastIndexOf(projects.status.value);
                currentStatusIndex = statusArray.lastIndexOf(
                    allProjectStages[index]
                );
            } else if (projects.status.value === "Project Cancelled") {
                lastIndex = allProjectStages.lastIndexOf(
                    statusArray[statusArray.length - 2]
                );
                cancelledIndex =
                    allProjectStages.lastIndexOf(
                        statusArray[statusArray.length - 2]
                    ) + 1;
                currentStatusIndex = statusArray.lastIndexOf(
                    allProjectStages[index]
                );
            }

            if (index === cancelledIndex) {
                [
                    dateToDisplay,
                    minute,
                    hour,
                    meridiem,
                ] = returnDateToDisplayMinuteHourMeridiemFromADateString(
                    projects.status.time_set
                );
                return displayLogo(
                    line,
                    cross_circle,
                    logoWidth,
                    logoHeight,
                    statusTextSize,
                    allProjectStages,
                    index,
                    timeTextSize,
                    dateToDisplay,
                    hour,
                    minute,
                    meridiem,
                    "cancelled"
                );
            }
            if (index < lastIndex) {
                if (statusArray.includes(allProjectStages[index])) {
                    [
                        dateToDisplay,
                        minute,
                        hour,
                        meridiem,
                    ] = returnDateToDisplayMinuteHourMeridiemFromADateString(
                        projects.status_history[currentStatusIndex].time_set
                    );
                } else {
                    dateToDisplay = "Unknown";
                    hour = "Unknown";
                    minute = "";
                    meridiem = "";
                }
                return displayLogo(
                    line,
                    red_tick,
                    logoWidth,
                    logoHeight,
                    statusTextSize,
                    allProjectStages,
                    index,
                    timeTextSize,
                    dateToDisplay,
                    hour,
                    minute,
                    meridiem,
                    "complete"
                );
            } else if (lastIndex === index) {
                [
                    dateToDisplay,
                    minute,
                    hour,
                    meridiem,
                ] = returnDateToDisplayMinuteHourMeridiemFromADateString(
                    projects.status.time_set
                );
                if (index === 2 || index === 6 || index === 7) {
                    return displayLogo(
                        line,
                        red_tick,
                        logoWidth,
                        logoHeight,
                        statusTextSize,
                        allProjectStages,
                        index,
                        timeTextSize,
                        dateToDisplay,
                        hour,
                        minute,
                        meridiem,
                        "complete"
                    );
                }
                return displayLogo(
                    line,
                    in_progress,
                    logoWidth,
                    logoHeight,
                    statusTextSize,
                    allProjectStages,
                    index,
                    timeTextSize,
                    dateToDisplay,
                    hour,
                    minute,
                    meridiem,
                    "in_progress"
                );
            } else if (
                index >= lastIndex ||
                statusArray.lastIndexOf(allProjectStages[index]) === -1
            ) {
                return displayLogo(
                    line,
                    circle_outline,
                    logoWidth,
                    logoHeight,
                    statusTextSize,
                    allProjectStages,
                    index,
                    timeTextSize,
                    dateToDisplay,
                    hour,
                    minute,
                    meridiem,
                    "waiting"
                );
            }
        }
    }

    return (
        <Box bg="brand.background" width="100%" marginBottom={20}>
            <Flex>
                <Box w="100%"> {isStatusComplete(0)}</Box>
                <Box w="100%"> {isStatusComplete(1)}</Box>
                <Box w="100%"> {isStatusComplete(2)}</Box>
                <Box w="100%"> {isStatusComplete(3)}</Box>
                <Box w="100%"> {isStatusComplete(4)}</Box>
                <Box w="100%"> {isStatusComplete(5)}</Box>
                <Box w="100%"> {isStatusComplete(6)}</Box>
                <Box w="100%"> {isStatusComplete(7)}</Box>
            </Flex>
        </Box>
    );
};

export default Timeline;
