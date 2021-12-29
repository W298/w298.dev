import "./App.css";

import intersection from "./imgs/intersection.png";
import todaysgenshin from "./imgs/todaysgenshin.png";
import ProjectCard from "./ProjectCard";

import { Text, IconButton, Box, Flex, Divider } from "@chakra-ui/react";
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuGroup,
  MenuDivider,
} from "@chakra-ui/react";
import { FiGithub, FiMoon, FiMenu, FiList, FiImage } from "react-icons/fi";

export default function App() {
  return (
    <div className="App">
      <Box
        position="fixed"
        width="100vw"
        height="100vh"
        bgColor="rgb(245, 245, 245)"
        zIndex="-1"
      ></Box>
      <Box
        px={5}
        py={2}
        bgColor="white"
        position="fixed"
        width="100vw"
        zIndex="1"
        boxShadow="0 0 15px 0 rgba(0, 0, 0, 0.05)"
      >
        <Flex justifyContent="center" alignItems="center" gap={5}>
          <Flex flex="1" gap={2} display={{ base: "none", sm: "flex" }}>
            <IconButton
              size="md"
              fontSize="20px"
              color="darkgrey"
              _hover={{ color: "black" }}
              icon={<FiGithub />}
              onClick={() => {
                window.open("https://github.com/descendStar", "_blank");
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
                  <MenuItem icon={<FiList />} fontWeight="medium">
                    Project List
                  </MenuItem>
                  <MenuItem icon={<FiImage />} fontWeight="medium">
                    Project Screenshot
                  </MenuItem>
                </MenuGroup>
                <MenuDivider />
                <MenuGroup title="Shortcut" fontWeight="bold">
                  <MenuItem
                    icon={<FiGithub />}
                    fontWeight="medium"
                    onClick={() => {
                      window.open("https://github.com/descendStar", "_blank");
                    }}
                  >
                    Github Profile
                  </MenuItem>
                  <MenuItem icon={<FiMoon />} fontWeight="medium">
                    Toggle Dark Mode
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
      <Box
        bgColor="white"
        position="fixed"
        width="18rem"
        height="100%"
        boxShadow="0 0 15px 0 rgba(0, 0, 0, 0.05)"
      ></Box>
      <Box p={8} pt="6rem" ml="18rem">
        <Box py={2}>
          <Text fontSize="3xl" fontWeight="extrabold" mb={8} textAlign="center">
            PROJECT LIST
          </Text>
          <Box
            display="grid"
            gridTemplateColumns="repeat(auto-fill, minmax(15rem, 18rem))"
            gap="1rem"
            justifyContent="center"
          >
            <ProjectCard
              name="Intersection"
              img={intersection}
              tagList={["GAME DEV", "UNITY"]}
              descList={[
                "Traffic Management Game 🚘",
                "Develop with Unity Engine",
              ]}
              btnList={[
                {
                  name: "Github repo",
                  href: "https://github.com/tuttoMaker/Intersection",
                },
                {
                  name: "Notion",
                  href: "https://www.notion.so/rukasp/Project-Intersection-b17815fa8fb54fafb60bf39df80ccb74",
                },
              ]}
            />
            <ProjectCard
              name="Today's Genshin"
              img={todaysgenshin}
              bgColor="white"
              tagList={["REACT"]}
              descList={[
                "Genshin Impact Todo Web-app 📝",
                "Built with React.js",
              ]}
              btnList={[
                {
                  name: "Github repo",
                  href: "https://github.com/descendStar/todays-genshin",
                },
              ]}
            />
            <ProjectCard
              name="Pixel Reversi"
              tagList={["GAME DEV", "UNITY"]}
              descList={[
                "Reversi (Othello) game with pixel graphic",
                "Develop with Unity Engine + WebGL",
              ]}
              btnList={[
                {
                  name: "Github repo",
                  href: "https://github.com/descendStar/Pixel-Reversi",
                },
                {
                  name: "Play Now",
                  href: "https://pixel-reversi.netlify.app",
                },
              ]}
            />
            <ProjectCard
              name="Pixel Reversi"
              tagList={["GAME DEV", "UNITY"]}
              descList={[
                "Reversi (Othello) game with pixel graphic",
                "Develop with Unity Engine + WebGL",
              ]}
              btnList={[
                {
                  name: "Github repo",
                  href: "https://github.com/descendStar/Pixel-Reversi",
                },
                {
                  name: "Play Now",
                  href: "https://pixel-reversi.netlify.app",
                },
              ]}
            />
          </Box>
        </Box>
        <Divider my={8} />
        <Box p={2}></Box>
      </Box>
    </div>
  );
}
