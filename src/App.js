import "./App.css";

import { useState, useEffect } from "react";
import { useColorMode, useColorModeValue } from "@chakra-ui/react";

import intersection from "./imgs/intersection.png";
import todaysgenshin from "./imgs/todaysgenshin.png";
import pixelreversi from "./imgs/pixelreversi.jpg";
import together from "./imgs/together.jpg";
import reflect from "./imgs/reflect.jpg";
import pixelreversi_intro from "./imgs/pixelreversi_intro.gif";
import todaysgenshin_more from "./imgs/todaysgenshin_more.png";

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
import {
  FiGithub,
  FiMoon,
  FiMenu,
  FiList,
  FiImage,
  FiFileText,
  FiGlobe,
} from "react-icons/fi";
import AboutMe from "./AboutMe";

export default function App() {
  const pointList = [
    {
      id: "about-me-code",
      title: "About Me",
    },
    {
      id: "project-list-point",
      title: "Project List",
      category: "Project",
    },
    {
      id: "screenshot-point",
      title: "Screenshots",
      category: "Project",
    },
    {
      id: "blog-point",
      title: "Posts",
      category: "Blog",
    },
  ];
  const categoryList = [
    ...new Set(
      pointList.map((p) => {
        return p.category;
      })
    ),
  ];

  const menuList = [
    {
      list: [
        {
          name: "About Me",
        },
      ],
    },
    {
      header: "Project",
      list: [
        {
          name: "Project List",
          icon: <FiList />,
          callback: () => {
            console.log("asdf");
          },
        },
        {
          name: "Screenshots",
          icon: <FiImage />,
        },
      ],
    },
    {
      header: "Blog",
      list: [
        {
          name: "Posts",
          icon: <FiFileText />,
        },
      ],
    },
    {
      header: "Links",
      list: [
        {
          name: "Github Profile",
          icon: <FiGithub />,
        },
      ],
    },
    {
      header: "Settings",
      list: [
        {
          name: `Toggle Dark Mode`,
          icon: <FiMoon />,
        },
        {
          name: "Change Lang to KR",
          icon: <FiGlobe />,
          callback: () => {
            setLanguage("kr");
          },
        },
        {
          name: "Change Lang to EN",
          icon: <FiGlobe />,
          callback: () => {
            setLanguage("en");
          },
        },
      ],
    },
  ];

  const getScrollPos = (id) => {
    let element = document.getElementById(id);
    if (!element) return null;
    let headerOffset = 180;
    let elementPosition = element.getBoundingClientRect().top;
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

  let [language, setLanguage] = useState("kr");
  let [focusedPoint, setFocusedPoint] = useState(pointList[0].id);

  const { toggleColorMode } = useColorMode();
  const appBg = useColorModeValue("gray.50", "gray.900");
  const topnavBg = useColorModeValue(
    "rgba(255, 255, 255, 0.8)",
    "rgba(45, 55, 72, 0.8)"
  );
  const sidebarBg = useColorModeValue("white", "gray.800");

  useEffect(() => {
    window.addEventListener("scroll", () => {
      let curPoint = getCurrnetPoint();
      if (curPoint && focusedPoint !== curPoint) {
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
        bgColor={appBg}
        zIndex="-1"
      ></Box>
      <Box
        px={5}
        py={2}
        background={topnavBg}
        position="fixed"
        width="100vw"
        zIndex="2"
        boxShadow="0 0 15px 0 rgba(0, 0, 0, 0.05)"
        backdropFilter="blur(8px) saturate(180%)"
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
                window.open("https://github.com/w298", "_blank");
              }}
            />
            <IconButton
              size="md"
              fontSize="20px"
              color="gray.400"
              _hover={{ color: "black" }}
              icon={<FiMoon />}
              onClick={toggleColorMode}
            />
          </Flex>
          <Flex flex="1" justifyContent="center">
            <Text
              bgGradient="linear(to-r, #7474BF, #348AC7)"
              bgClip="text"
              fontSize="3xl"
              fontWeight="extrabold"
              fontFamily="Kanit"
              p={1}
            >
              W298.dev
            </Text>
          </Flex>
          <Flex flex="1" justifyContent="flex-end">
            <Menu>
              <MenuButton as={IconButton} icon={<FiMenu />}></MenuButton>
              <MenuList>
                {menuList.map(({ header, list }, index) => {
                  return (
                    <>
                      <MenuGroup
                        title={header}
                        fontWeight="medium"
                        fontFamily="Kanit"
                        fontSize="md"
                      >
                        {list.map(({ name, icon, callback }) => {
                          return (
                            <MenuItem icon={icon} onClick={callback}>
                              <Text fontFamily="Kanit" fontSize="md">
                                {name}
                              </Text>
                            </MenuItem>
                          );
                        })}
                      </MenuGroup>
                      {index !== menuList.length - 1 && <MenuDivider />}
                    </>
                  );
                })}
              </MenuList>
            </Menu>
          </Flex>
        </Flex>
      </Box>
      <Box
        bgColor={sidebarBg}
        position="fixed"
        zIndex="1"
        width="18rem"
        pt="5rem"
        height="100%"
        boxShadow="0 0 15px 0 rgba(0, 0, 0, 0.05)"
        display={{ base: "none", sm: "none", md: "none", lg: "block" }}
      >
        {categoryList.map((cate) => {
          return (
            <>
              {cate && (
                <Flex p="0.5rem 1.5rem" gap="0.6rem">
                  <Text
                    fontFamily="Kanit"
                    fontWeight="semibold"
                    fontSize="1.4rem"
                    color={
                      pointList.find((p) => p.id === focusedPoint).category ===
                      cate
                        ? "#7474BF"
                        : "gray.400"
                    }
                  >
                    {cate}
                  </Text>
                </Flex>
              )}
              <Flex flexDirection="column">
                {pointList.map(({ id, title, category }) => {
                  if (cate !== category) return null;
                  return (
                    <Flex
                      p="0.5rem 1.5rem"
                      _hover={{
                        bgColor: "gray.100",
                      }}
                      onClick={() => {
                        scrollToTarget(id);
                      }}
                    >
                      <Text
                        fontFamily="Kanit"
                        fontWeight="normal"
                        color={focusedPoint === id ? "#7474BF" : "gray.400"}
                        cursor="pointer"
                        transition="0.1s ease-in-out"
                        fontSize="1.1rem"
                      >
                        {title}
                      </Text>
                    </Flex>
                  );
                })}
              </Flex>
              <Divider my={4} />
            </>
          );
        })}
      </Box>
      <Box ml={{ base: "0", sm: "0", md: "0", lg: "18rem" }} pb="50rem" pt={16}>
        <AboutMe />
        <Divider />
        <Box p={8} py={12} id="project-list-point">
          <Box
            display="grid"
            gridTemplateColumns="repeat(auto-fill, minmax(15rem, 18rem))"
            gap="1rem"
            justifyContent="center"
          >
            <ProjectCard
              name="Intersection"
              img={intersection}
              tagList={["UNITY"]}
              descList={
                language === "kr"
                  ? [
                      "도로 배치해서 도시의 교통량 조절하는 게임 🚘",
                      "유니티 엔진을 이용해 Build 했습니다.",
                    ]
                  : ["Traffic Management Game 🚘", "Develop with Unity Engine"]
              }
              btnList={[
                {
                  name: "Github repo",
                  href: "https://github.com/w298/Intersection",
                },
                {
                  name: "Notion",
                  href: "https://www.notion.so/rukasp/Project-Intersection-b17815fa8fb54fafb60bf39df80ccb74",
                },
              ]}
            />
            <ProjectCard
              name={language === "kr" ? "오늘의 원신" : "Today's Genshin"}
              img={todaysgenshin}
              moreImg={todaysgenshin_more}
              bgColor="white"
              tagList={["REACT", "MATERIAL"]}
              descList={
                language === "kr"
                  ? [
                      "원신에서 매일 할 일을 알려주는 웹앱 📝",
                      "리액트로 Build 했습니다.",
                    ]
                  : ["Genshin Impact Todo Web-app 📝", "Built with React.js"]
              }
              btnList={[
                {
                  name: "Github repo",
                  href: "https://github.com/w298/todays-genshin",
                },
                {
                  name: "Link",
                  href: "https://todays-genshin.netlify.app",
                },
              ]}
            />
            <ProjectCard
              name="Pixel Reversi"
              img={pixelreversi}
              moreImg={pixelreversi_intro}
              tagList={["UNITY"]}
              descList={
                language === "kr"
                  ? [
                      "Pixel 그래픽으로 개발한 리버시 게임",
                      "Unity 로 개발했고, WebGL 로 Build 했습니다.",
                    ]
                  : [
                      "Reversi (Othello) game with pixel graphic",
                      "Develop with Unity Engine + WebGL",
                    ]
              }
              btnList={[
                {
                  name: "Github repo",
                  href: "https://github.com/w298/Pixel-Reversi",
                },
                {
                  name: "Play Now",
                  href: "https://pixel-reversi.netlify.app",
                },
              ]}
            />
            <ProjectCard
              name="Together"
              img={together}
              tagList={["UNREAL4"]}
              descList={[
                "Unreal Engine 4로 개발한 1인칭 공포 게임",
                "숲속에 있는 구 소련 건물을 탈출해야 합니다.",
              ]}
              btnList={[{ name: "Github repo" }]}
            />
            <ProjectCard
              name="Reflect"
              img={reflect}
              tagList={["PYTHON"]}
              descList={[
                "거울과 레이저를 이용한 퍼즐 게임",
                "Python Cocos 엔진을 이용해 개발했습니다.",
              ]}
              btnList={[{ name: "Github repo" }]}
            />
          </Box>
        </Box>
        <Divider />
        <Box p={8} py={12} id="screenshot-point"></Box>
        <Divider />
        <Box p={8} py={12} id="blog-point"></Box>
      </Box>
    </div>
  );
}
