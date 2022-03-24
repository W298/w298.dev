import { Avatar, Flex, Box, Text, Icon } from "@chakra-ui/react";

import { ReactComponent as Vuejs } from "./svgs/vuejs.svg";
import { ReactComponent as Svelte } from "./svgs/svelte.svg";
import { ReactComponent as React } from "./svgs/react.svg";
import { ReactComponent as Unreal } from "./svgs/unreal-engine.svg";
import { ReactComponent as Unity } from "./svgs/unity.svg";
import { ReactComponent as Threejs } from "./svgs/threedotjs.svg";

function CircleIcon({ bgColor, icon, iconSize = 1, fill = "white" }) {
  return (
    <Flex
      bgColor={bgColor}
      p={1}
      width="1.75rem"
      height="1.75rem"
      borderRadius="1.75rem"
      justifyContent="center"
      alignItems="center"
    >
      <Icon
        as={icon}
        fill={fill}
        width={iconSize + "rem"}
        height={iconSize + "rem"}
      />
    </Flex>
  );
}

function Window() {
  const border = "1px #d1d1d169 solid";

  const CircleButton = ({ color, disabled = false }) => {
    const size = "0.8rem";
    return (
      <Box
        width={size}
        height={size}
        borderRadius={size}
        bgColor={disabled ? "#DFDFDF" : color}
        cursor="pointer"
      ></Box>
    );
  };

  return (
    <Flex
      bgColor="white"
      minWidth="40rem"
      height="20rem"
      boxShadow="0 0 15px 5px rgb(0 0 0 / 5%)"
      border={border}
      borderRadius="0.7rem"
      flexDir="column"
    >
      <Flex
        gap="1.5rem"
        px="1rem"
        py="0.6rem"
        borderBottom={border}
        justifyContent="space-between"
      >
        <Flex gap="0.5rem" alignItems="center">
          <CircleButton color="#FF5F58" />
          <CircleButton color="#FFBE2F" />
          <CircleButton color="#2AC940" disabled />
        </Flex>
        <Flex gap="0.5rem" alignItems="center" justifySelf="center"></Flex>
        <Flex gap="0.5rem" alignItems="center" visibility="hidden">
          <CircleButton color="#FF5F58" />
          <CircleButton color="#FFBE2F" />
          <CircleButton color="#2AC940" disabled />
        </Flex>
      </Flex>
      <Flex
        width="100%"
        height="100%"
        justifyContent="center"
        alignItems="center"
        gap="1rem"
        p="1rem"
      >
        <Flex flex="1" justifyContent="center">
          <Flex width="10rem" lineHeight="1.6rem" flexDir="column">
            <Text fontSize="1.3rem" fontWeight="normal">
              developer.
            </Text>
            <Text fontSize="1.5rem" fontWeight="extrabold">
              W298
            </Text>
            <Text fontSize="0.9rem" marginTop="1rem" fontWeight="bold">
              Develop Web & Game
            </Text>
          </Flex>
        </Flex>
        <Flex flex="1" justifyContent="center">
          <Avatar
            width="8.5rem"
            height="8.5rem"
            src="https://i.pinimg.com/originals/a8/cb/bb/a8cbbbdb73615f16068de2cb077bb143.jpg"
          />
        </Flex>
        <Flex flex="1" justifyContent="center" textAlign="end">
          <Flex
            width="10rem"
            flexDir="column"
            gap="0.5rem"
            lineHeight="1.2rem"
            fontSize="0.9rem"
          >
            <Flex flexDir="column">
              <Text fontWeight="extrabold">Web Dev.</Text>
              <Flex
                columnGap="0.4rem"
                justifyContent="flex-end"
                flexWrap="wrap"
              >
                <Flex justifyContent="center" alignItems="center">
                  <CircleIcon bgColor="transparent" fill="black" icon={React} />
                  <Text>React</Text>
                </Flex>
                <Flex justifyContent="center" alignItems="center">
                  <CircleIcon bgColor="transparent" fill="black" icon={Vuejs} />
                  <Text>Vue</Text>
                </Flex>
                <Flex justifyContent="center" alignItems="center">
                  <CircleIcon
                    bgColor="transparent"
                    fill="black"
                    icon={Svelte}
                  />
                  <Text>Svelte</Text>
                </Flex>
              </Flex>
            </Flex>
            <Flex flexDir="column">
              <Text fontWeight="extrabold">Game Dev.</Text>
              <Flex
                columnGap="0.4rem"
                justifyContent="flex-end"
                flexWrap="wrap"
              >
                <Flex justifyContent="center" alignItems="center">
                  <CircleIcon
                    bgColor="transparent"
                    fill="black"
                    icon={Unreal}
                  />
                  <Text>Unreal</Text>
                </Flex>
                <Flex justifyContent="center" alignItems="center">
                  <CircleIcon bgColor="transparent" fill="black" icon={Unity} />
                  <Text>Unity</Text>
                </Flex>
                <Flex justifyContent="center" alignItems="center">
                  <CircleIcon
                    bgColor="transparent"
                    fill="black"
                    icon={Threejs}
                  />
                  <Text>Threejs</Text>
                </Flex>
              </Flex>
            </Flex>
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
}

export default function AboutMe() {
  return (
    <Flex p={12} width="100%" justifyContent="center">
      <Window />
    </Flex>
  );
}
