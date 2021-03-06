import { Button, Box, Flex, Text, Image } from "@chakra-ui/react";
import { GoRepo } from "react-icons/go";
import { SiNotion } from "react-icons/si";
import { FiPlay, FiExternalLink } from "react-icons/fi";

import { ReactComponent as Unity } from "../svgs/unity.svg";
import { ReactComponent as Unreal } from "../svgs/unreal-engine.svg";
import { ReactComponent as React } from "../svgs/react.svg";
import { ReactComponent as Python } from "../svgs/python.svg";
import { ReactComponent as Material } from "../svgs/material.svg";
import { SiBlender } from "react-icons/si";

import { CircleIcon } from "./CircleIcon";

export default function ProjectCard({
  title,
  bgImg,
  tagList,
  descList,
  btnList,
}) {
  const BtnProp = ({ color = null, customColor = null, children }) => {
    return (
      <Button
        width="fit-content"
        size="xs"
        variant="outline"
        display="flex"
        gap="0.25rem"
        fontWeight="bold"
        _hover={{ transform: "translateY(-2px)" }}
        transition="0.2s"
        borderColor={customColor}
        color={customColor}
        colorScheme={color}
      >
        {children}
      </Button>
    );
  };

  const btnData = {
    "Github repo": (
      <BtnProp color="teal">
        <GoRepo /> Github repo
      </BtnProp>
    ),
    Notion: (
      <BtnProp customColor="gray.800">
        <SiNotion /> Notion
      </BtnProp>
    ),
    "Play Now": (
      <BtnProp customColor="purple.500">
        <FiPlay /> Play Now
      </BtnProp>
    ),
    Link: (
      <BtnProp customColor="purple.500">
        <FiExternalLink /> Link
      </BtnProp>
    ),
  };

  const tagData = {
    UNITY: <CircleIcon key={0} icon={Unity} bgColor="black" />,
    REACT: <CircleIcon key={1} icon={React} bgColor="#5ab7d1" />,
    UNREAL4: <CircleIcon key={2} icon={Unreal} bgColor="black" />,
    PYTHON: <CircleIcon key={3} icon={Python} bgColor="#3776AB" />,
    MATERIAL: <CircleIcon key={4} icon={Material} bgColor="#2196F3" />,
    BLENDER: <CircleIcon key={5} icon={SiBlender} bgColor="#F5792A" />,
  };

  return (
    <Box
      bg="white"
      height="fit-content"
      borderRadius="0.5rem"
      boxShadow="0 0 15px 5px rgb(0 0 0 / 5%)"
      _hover={{
        transform: "translate(-8px, -8px)",
        boxShadow:
          "0 0 15px 5px rgb(0 0 0 / 5%), 1px 1px #7474bf, 2px 2px #7474bf, 3px 3px #7474bf, 4px 4px #7474bf, 5px 5px #7474bf, 6px 6px #7474bf, 7px 7px #7474bf, 8px 8px #7474bf",
      }}
      transition="all 0.2s ease-in-out"
    >
      <Box borderTopRadius="0.5rem" height="8rem" overflow="hidden">
        <Image
          src={bgImg?.src}
          fit="cover"
          width={bgImg?.w}
          height={bgImg?.h}
          transform={bgImg && `translate(${bgImg.x}, ${bgImg.y})`}
        />
      </Box>
      <Flex p={4} pb={2} flexDir="column" gap="0.4rem">
        <Flex gap="0.4rem">{tagList.map((tag) => tagData[tag])}</Flex>
        <Text fontWeight="900" fontSize="1.6rem" lineHeight="100%">
          {title}
        </Text>
      </Flex>
      <hr bordercolor="#d1d1d169" />
      <Flex px={4} py={2} flexDir="column">
        {descList.map((desc, index) => (
          <Text key={index} fontWeight="bold" fontSize="0.9rem">
            {desc}
          </Text>
        ))}
        <Flex pt={4} pb={2} gap="0.5rem">
          {btnList.map(({ name, href }) => (
            <a key={name} href={href} target="_blank" rel="noreferrer">
              {btnData[name]}
            </a>
          ))}
        </Flex>
      </Flex>
    </Box>
  );
}
