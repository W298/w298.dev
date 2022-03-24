import { Avatar, Flex, Box, Text } from "@chakra-ui/react";
import { useState } from "react";

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

  const TabButton = ({
    children,
    selected = false,
    fontSize = "0.8rem",
    onClick,
  }) => {
    return (
      <Flex
        fontSize={fontSize}
        color={selected ? "#545454" : "#D5D5D5"}
        boxShadow={selected ? "0px 3px 3px -1px #58585826" : ""}
        px="0.6rem"
        py="0.2rem"
        borderRadius="0.2rem"
        userSelect="none"
        cursor="pointer"
        onClick={onClick}
        transition="color 0.2s ease-in-out"
      >
        {children}
      </Flex>
    );
  };

  const tabs = ["Overview", "Web Dev", "Game Dev", "Favorites"];
  const [curTab, setCurTab] = useState("Overview");

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
        <Flex gap="0.5rem" alignItems="center" justifySelf="center">
          {tabs.map((id) => {
            return (
              <TabButton
                selected={curTab === id}
                onClick={() => {
                  setCurTab(id);
                }}
              >
                {id}
              </TabButton>
            );
          })}
        </Flex>
        <Flex gap="0.5rem" alignItems="center" visibility="hidden">
          <CircleButton color="#FF5F58" />
          <CircleButton color="#FFBE2F" />
          <CircleButton color="#2AC940" disabled />
        </Flex>
      </Flex>
      <Flex
        justifyContent="center"
        alignItems="center"
        width="100%"
        height="100%"
        gap="4rem"
      >
        <Avatar
          width="8.5rem"
          height="8.5rem"
          marginBottom="1rem"
          src="https://i.pinimg.com/originals/a8/cb/bb/a8cbbbdb73615f16068de2cb077bb143.jpg"
        />
        <Flex flexDir="column" gap="1.1rem" width="20rem">
          <Flex flexDir="column">
            <Flex lineHeight="2rem">
              <Text fontWeight="normal" fontSize="1.6rem" marginRight="0.6rem">
                developer.
              </Text>
              <Text fontWeight="extrabold" fontSize="1.6rem">
                W298
              </Text>
            </Flex>
            <Text fontSize="0.7rem" marginLeft="0.2rem">
              Version 1.0
            </Text>
          </Flex>
          <Flex flexDir="column" marginLeft="0.2rem" gap="0.15rem">
            <Text fontSize="0.7rem" fontWeight="bold">
              Game & Web Developer
            </Text>
            <Flex gap="0.6rem">
              <Text fontSize="0.7rem" fontWeight="bold">
                Game Dev
              </Text>
              <Text fontSize="0.7rem">Unreal Engine, Unity Engine</Text>
            </Flex>
            <Flex gap="0.6rem">
              <Text fontSize="0.7rem" fontWeight="bold">
                Web Dev
              </Text>
              <Text fontSize="0.7rem">React, Vue, Svelte</Text>
            </Flex>
            <Flex gap="0.6rem">
              <Text fontSize="0.7rem" fontWeight="bold">
                Main Language
              </Text>
              <Text fontSize="0.7rem">C++, C#, Javscript, Python</Text>
            </Flex>
          </Flex>
          <Flex>
            <TabButton selected fontSize="0.7rem">
              Github Profile
            </TabButton>
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
