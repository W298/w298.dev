import "./App.css";

import { useState, useEffect } from "react";

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
  const pointList = [
    { id: "project-list-point", title: "Project List", category: "Project" },
    {
      id: "screenshot-point",
      title: "Project Screenshot",
      category: "Project",
    },
    { id: "blog-point", title: "Posts", category: "Blog" },
  ];
  const categoryList = [
    ...new Set(
      pointList.map((p) => {
        return p.category;
      })
    ),
  ];

  const getScrollPos = (id) => {
    var element = document.getElementById(id);
    var headerOffset = 180;
    var elementPosition = element.getBoundingClientRect().top;
    return Math.floor(elementPosition + window.pageYOffset - headerOffset);
  };

  const scrollToTarget = (id) => {
    window.scrollTo({
      top: getScrollPos(id),
      behavior: "smooth",
    });
  };

  const getCurrnetPoint = () => {
    for (let i = 0; i < pointList.length; i++) {
      let l = getScrollPos(pointList[i].id);
      let r =
        i === pointList.length - 1
          ? document.body.scrollHeight
          : getScrollPos(pointList[i + 1].id);
      if (l <= window.scrollY && window.scrollY < r) return pointList[i].id;
    }
  };

  let [focusedPoint, setFocusedPoint] = useState(pointList[0].id);

  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (focusedPoint !== getCurrnetPoint()) {
        setFocusedPoint(getCurrnetPoint());
      }
    });
  });

  return (
    <div className="App">
      <Box
        position="fixed"
        width="100vw"
        height="100vh"
        bgColor="gray.50"
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
              color="gray.400"
              _hover={{ color: "black" }}
              icon={<FiGithub />}
              onClick={() => {
                window.open("https://github.com/descendStar", "_blank");
              }}
            />
            <IconButton
              size="md"
              fontSize="20px"
              color="gray.400"
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
              stellarPudding.dev
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
        pt="5rem"
        height="100%"
        boxShadow="0 0 15px 0 rgba(0, 0, 0, 0.05)"
        display={{ base: "none", sm: "none", md: "none", lg: "block" }}
      >
        {categoryList.map((cate) => {
          return (
            <>
              <Text
                fontWeight="extrabold"
                p="0.5rem 2rem"
                fontSize="1.1rem"
                color={
                  pointList.find((p) => p.id === focusedPoint).category === cate
                    ? "black"
                    : "gray.400"
                }
              >
                {cate}
              </Text>
              <Flex flexDirection="column">
                {pointList.map(({ id, title, category }) => {
                  if (cate !== category) return null;
                  return (
                    <Text
                      fontWeight="medium"
                      color={focusedPoint === id ? "black" : "gray.400"}
                      cursor="pointer"
                      p="0.5rem 2rem"
                      transition="0.1s ease-in-out"
                      _hover={{
                        bgColor: "gray.100",
                      }}
                      onClick={() => {
                        scrollToTarget(id);
                      }}
                    >
                      {title}
                    </Text>
                  );
                })}
              </Flex>
              <Divider my={4} />
            </>
          );
        })}
      </Box>
      <Box
        p={8}
        pt="6rem"
        ml={{ base: "0", sm: "0", md: "0", lg: "18rem" }}
        pb="50rem"
      >
        <Box py={2}>
          <Text
            id="project-list-point"
            fontSize="3xl"
            fontWeight="extrabold"
            mb={8}
            textAlign="center"
          >
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
              name="Intersection"
              img={intersection}
              tagList={["GAME DEV", "UNITY"]}
              descList={[
                "도로를 배치해서 도시의 교통량 조절하는 게임 🚘",
                "유니티 엔진을 이용해 Build 했습니다.",
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
              name="오늘의 원신"
              img={todaysgenshin}
              bgColor="white"
              tagList={["REACT"]}
              descList={[
                "원신에서 매일 할 일을 알려주는 웹앱 📝",
                "리액트로 Build 했습니다.",
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
                "Pixel 그래픽을 사용한 리버시 게임입니다.",
                "Unity 로 개발했고, WebGL 로 Build 했습니다.",
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
        <Divider my={12} />
        <Box py={2}>
          <Text
            id="screenshot-point"
            fontSize="3xl"
            fontWeight="extrabold"
            mb={8}
            textAlign="center"
          >
            PROJECT SCREENSHOT
          </Text>
        </Box>
        <Divider my={12} />
        <Box py={2}>
          <Text
            id="blog-point"
            fontSize="3xl"
            fontWeight="extrabold"
            mb={8}
            textAlign="center"
          >
            BLOG
          </Text>
        </Box>
      </Box>
    </div>
  );
}
