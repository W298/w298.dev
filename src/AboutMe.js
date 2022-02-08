import { Flex, Box, Text } from "@chakra-ui/react";

export default function AboutMe() {
  return (
    <Flex p={8} py={12} justifyContent="center">
      <Box
        width="50rem"
        height="10rem"
        borderRadius="0.5rem"
        bgColor="white"
        boxShadow="0 0 15px 0 rgba(0, 0, 0, 0.05)"
      ></Box>
    </Flex>
  );
}
