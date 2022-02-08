import { Flex, Text } from "@chakra-ui/react";
import { BiWindowAlt } from "react-icons/bi";
import { ReactComponent as Vuejs } from "./svgs/vuejs.svg";
import { ReactComponent as Svelte } from "./svgs/svelte.svg";

export default function AboutMe() {
  return (
    <Flex p={8} py={12} justifyContent="center">
      <Flex
        p={4}
        width="50rem"
        height="10rem"
        borderRadius="0.5rem"
        bgColor="white"
        boxShadow="0 0 15px 0 rgba(0, 0, 0, 0.05)"
      >
        <Flex
          border="5px #7474BF solid"
          p={2}
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
        >
          <BiWindowAlt />
          <Text fontFamily="Kanit">WEB DEV</Text>
          <Flex gap="0.5rem">
            <Flex
              bgColor="#4FC08D"
              p={1}
              width="1.5rem"
              height="1.5rem"
              borderRadius="1.5rem"
              justifyContent="center"
              alignItems="center"
            >
              <Vuejs fill="white" width="0.9rem" height="0.9rem" />
            </Flex>
            <Flex
              bgColor="#FF3E00"
              p={1}
              width="1.5rem"
              height="1.5rem"
              borderRadius="1.5rem"
              justifyContent="center"
              alignItems="center"
            >
              <Svelte fill="white" width="1rem" height="1rem" />
            </Flex>
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
}
