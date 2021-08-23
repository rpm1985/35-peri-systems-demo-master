import { Flex, Heading, HStack, Text, VStack } from "@chakra-ui/layout";
import { IconButton } from "@chakra-ui/react";
import React from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";

const PageSection = (props) => {
    const nextPage = () => props.setPage(props.page + 1);
    const prevPage = () => props.setPage(props.page - 1);

    if (props.variant === "simple") {
        if (props.isLoading) {
            return <></>;
        } else
            return (
                <HStack
                    justifyContent="center"
                    alignItems="center"
                    p={3}
                    spacing={5}
                >
                    <IconButton
                        isLoading={props.isLoading}
                        colorScheme="red"
                        disabled={props.page <= 1 || props.isLoading}
                        icon={<ChevronLeftIcon />}
                        onClick={() => {
                            prevPage();
                        }}
                    />
                    <Text color="grey" fontWeight="bold">
                        Page
                        <Text color="black">
                            {props.page} / {props.maxPage}
                        </Text>
                    </Text>
                    <IconButton
                        isLoading={props.isLoading}
                        colorScheme="red"
                        disabled={
                            props.page >= props.maxPage || props.isLoading
                        }
                        icon={<ChevronRightIcon />}
                        onClick={() => nextPage()}
                    />
                </HStack>
            );
    } else
        return (
            <VStack
                direction="column"
                w="100%"
                p={3}
                bg="#FFFFFC"
                alignItems="center"
                spacing={4}
                rounded={true}
                borderRadius={8}
            >
                <Flex alignItems="center" direction="column">
                    <Heading size={"md"}>Page</Heading>
                    <HStack alignItems="center">
                        <Heading size={"3xl"}>{props.page}</Heading>
                        <Heading size={"xl"} color="grey">
                            /{props.maxPage}
                        </Heading>
                    </HStack>
                </Flex>
                <HStack alignItems="center" spacing={4}>
                    <IconButton
                        isLoading={props.isLoading}
                        colorScheme="yellow"
                        disabled={props.page <= 1 || props.isLoading}
                        icon={<ChevronLeftIcon />}
                        onClick={() => prevPage()}
                    />
                    <IconButton
                        isLoading={props.isLoading}
                        colorScheme="yellow"
                        disabled={
                            props.page >= props.maxPage || props.isLoading
                        }
                        icon={<ChevronRightIcon />}
                        onClick={() => nextPage()}
                    />
                </HStack>
            </VStack>
        );
};

export default PageSection;
