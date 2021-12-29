import {
  Avatar,
  Badge,
  Button,
  Divider,
  Box,
  Flex,
  Text,
} from "@chakra-ui/react";
import { GoRepo } from "react-icons/go";
import { SiNotion } from "react-icons/si";
import { FiPlay } from "react-icons/fi";

export default function ProjectCard({
  name,
  img = undefined,
  bgColor = "#9a9bdb",
  icon = undefined,
  iconSize = "1.5rem",
  tagList,
  descList,
  btnList,
}) {
  const BtnProp = ({ color, children }) => {
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

  const TagProp = ({ name, color }) => {
    return (
      <Badge width="fit-content" colorScheme={color} fontSize="0.5rem" py={0.5}>
        {name}
      </Badge>
    );
  };

  const btnData = {
    "Github repo": (
      <BtnProp color="teal">
        <GoRepo /> Github repo
      </BtnProp>
    ),
    Notion: (
      <BtnProp color="">
        <SiNotion /> Notion
      </BtnProp>
    ),
    "Play Now": (
      <BtnProp color="">
        <FiPlay />
        Play Now
      </BtnProp>
    ),
  };

  const tagData = {
    "GAME DEV": <TagProp name="GAME DEV" color="purple" />,
    UNITY: <TagProp name="UNITY" color="blackAlpha" />,
    REACT: <TagProp name="REACT.JS" color="blue" />,
  };

  return (
    <Box
      bg="white"
      height="fit-content"
      borderRadius="0.5rem"
      p={4}
      boxShadow="0 0 15px 0 rgba(0, 0, 0, 0.05)"
    >
      <Flex direction="column" gap="0.6rem">
        <Flex direction="row" gap="1rem">
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
    </Box>
  );
}
