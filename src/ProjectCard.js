import {
  Avatar,
  Button,
  Divider,
  Box,
  Flex,
  Text,
  Image,
  Collapse,
  Icon,
} from "@chakra-ui/react";
import { GoRepo } from "react-icons/go";
import { SiNotion } from "react-icons/si";
import { FiPlay, FiExternalLink } from "react-icons/fi";
import { useState } from "react";

import { ReactComponent as Unity } from "./svgs/unity.svg";
import { ReactComponent as Unreal } from "./svgs/unreal-engine.svg";
import { ReactComponent as React } from "./svgs/react.svg";
import { ReactComponent as Python } from "./svgs/python.svg";
import { ReactComponent as Material } from "./svgs/material.svg";

import { CircleIcon } from "./CircleIcon";

export default function ProjectCard({
  name,
  img = undefined,
  bgColor = "#9a9bdb",
  icon = undefined,
  iconSize = "1.5rem",
  tagList,
  descList,
  btnList,
  moreImg = undefined,
}) {
  const BtnProp = ({ color = "", children }) => {
    return (
      <Button
        width="fit-content"
        variant="outline"
        colorScheme={color}
        size="xs"
        display="flex"
        gap="0.25rem"
        fontWeight="bold"
        _hover={{ transform: "translateY(-2px)" }}
        transition="0.2s"
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
      <BtnProp>
        <SiNotion /> Notion
      </BtnProp>
    ),
    "Play Now": (
      <BtnProp>
        <FiPlay />
        Play Now
      </BtnProp>
    ),
    Link: (
      <BtnProp>
        <FiExternalLink />
        Link
      </BtnProp>
    ),
  };

  const tagData = {
    UNITY: <CircleIcon icon={Unity} bgColor="black" />,
    REACT: <CircleIcon icon={React} bgColor="#61DAFB" />,
    UNREAL4: <CircleIcon icon={Unreal} bgColor="black" />,
    PYTHON: <CircleIcon icon={Python} bgColor="#3776AB" iconSize={0.9} />,
    MATERIAL: <CircleIcon icon={Material} bgColor="#2196F3" iconSize={0.9} />,
  };

  let [expanded, setExpanded] = useState(false);

  return (
    <Box
      bg="white"
      height="fit-content"
      borderRadius="0.5rem"
      p={4}
      boxShadow="0 0 15px 5px rgb(0 0 0 / 5%)"
      onClick={{
        base: () => {
          setExpanded(!expanded);
        },
        sm: () => {
          setExpanded(!expanded);
        },
        md: () => {},
      }}
      _hover={{ transform: "scale(1.02)" }}
      transition="0.2s ease-in-out"
    >
      <Flex
        direction="column"
        justifyContent="space-between"
        height="100%"
        gap="0.8rem"
      >
        <Flex direction="row" gap="0.8rem">
          <Flex flex={1} alignItems="center">
            <Avatar
              size="md"
              src={img}
              bgColor={bgColor}
              icon={icon}
              fontSize={iconSize}
            />
          </Flex>
          <Flex direction="column" flex={4}>
            <Flex direction="row" gap="0.25rem">
              {tagList.map((tag) => {
                return tagData[tag];
              })}
            </Flex>
            <Text fontSize="1.4rem" fontWeight="extrabold">
              {name}
            </Text>
          </Flex>
        </Flex>
        <Collapse in={moreImg && expanded} animateOpacity>
          <Image src={moreImg} borderRadius="0.5rem" />
        </Collapse>
        <Flex direction="column" gap="0.4rem">
          <Text fontWeight="medium" fontSize="0.8rem">
            {descList.map((desc) => {
              return <Text>{desc}</Text>;
            })}
          </Text>
          <Divider />
          <Flex gap="0.5rem" mt={1}>
            {btnList.map(({ name, href }) => {
              return (
                <a href={href} target="_blank" rel="noreferrer">
                  {btnData[name]}
                </a>
              );
            })}
          </Flex>
        </Flex>
      </Flex>
    </Box>
  );
}
