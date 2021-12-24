import "./App.css";

import thum01 from "./imgs/intersection_thumnail.png";
import ProjectCard from "./ProjectCard";

import { Text, IconButton, Box, Flex, SimpleGrid } from "@chakra-ui/react";
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuGroup,
  MenuDivider
} from "@chakra-ui/react";
import { FiGithub, FiMoon, FiMenu, FiList, FiColumns } from "react-icons/fi";

export default function App() {
  return (
    <div className="App">
      <Box minH="100vh" bgColor="rgb(245, 245, 245)">
        <Box px={5} py={2} bgColor="white">
          <Flex justifyContent="center" alignItems="center" gap={5}>
            <Flex flex="1" gap={2}>
              <IconButton
                size="md"
                fontSize="20px"
                color="darkgrey"
                _hover={{ color: "black" }}
                icon={<FiGithub />}
                onClick={() => {
                  window.open("https://github.com/tuttoMaker", "_blank");
                }}
              />
              <IconButton
                size="md"
                fontSize="20px"
                color="darkgrey"
                _hover={{ color: "black" }}
                icon={<FiMoon />}
                onClick={() => {
                  console.log("dark mode enabled");
                }}
              />
            </Flex>
            <Flex flex="1" justifyContent="center">
              <Text
                bgGradient="linear(to-r, #7474BF, #348AC7)"
                bgClip="text"
                fontSize="3xl"
                fontWeight="black"
                fontFamily="Raleway"
                letterSpacing="-1px"
                p={1}
              >
                descendStar.dev
              </Text>
            </Flex>
            <Flex flex="1" justifyContent="flex-end">
              <Menu>
                <MenuButton as={IconButton} icon={<FiMenu />}></MenuButton>
                <MenuList>
                  <MenuGroup title="Project" fontWeight="bold">
                    <MenuItem icon={<FiColumns />} fontWeight="medium">
                      Project Board
                    </MenuItem>
                    <MenuItem icon={<FiList />} fontWeight="medium">
                      Project List
                    </MenuItem>
                  </MenuGroup>
                  <MenuDivider />
                  <MenuItem fontWeight="medium">Blog</MenuItem>
                  <MenuItem fontWeight="medium">About Me</MenuItem>
                </MenuList>
              </Menu>
            </Flex>
          </Flex>
        </Box>
        <Box p={8}>
          <Box py={2}>
            <Text fontSize="2xl" fontWeight="extrabold" mb={5}>
              PROJECT LIST
            </Text>
            <SimpleGrid minChildWidth="15rem" spacing="2rem">
              <ProjectCard
                name="Intersection"
                img={thum01}
                tagList={["GAME DEV", "UNITY"]}
                descList={[
                  "Traffic Management Game 🚘",
                  "Develop with Unity Engine"
                ]}
                btnList={[
                  {
                    name: "Github repo",
                    href: "https://github.com/tuttoMaker/Intersection"
                  },
                  {
                    name: "Notion",
                    href:
                      "https://www.notion.so/rukasp/Project-Intersection-b17815fa8fb54fafb60bf39df80ccb74"
                  }
                ]}
              />
            </SimpleGrid>
          </Box>
        </Box>
      </Box>
    </div>
  );
}