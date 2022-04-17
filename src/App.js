// import style
import "./App.css";

// import react
import { useState, useEffect } from "react";

// import chakra-ui modules
import { useColorMode, useColorModeValue } from "@chakra-ui/react";
import { Text, IconButton, Box, Flex, Divider } from "@chakra-ui/react";
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuGroup,
  MenuDivider,
} from "@chakra-ui/react";

// import framer-motion modules
import { motion, AnimatePresence } from "framer-motion";

// import custom modules
import ProjectCard from "./modules/ProjectCard";
import AboutMe from "./modules/AboutMe";
import scroll from "./tools/Scroll";

// import images
import bgImg_Intersection from "./imgs/bgImg_Intersection.png";
import bgImg_TodaysGenshin from "./imgs/bgImg_TodaysGenshin.png";
import bgImg_PixelReversi from "./imgs/bgImg_PixelReversi.png";
import bgImg_Together from "./imgs/bgImg_Together.png";
import bgImg_Reflect from "./imgs/bgImg_Reflect.png";

// import icons
import {
  FiGithub,
  FiMoon,
  FiMenu,
  FiList,
  FiImage,
  FiFileText,
  FiGlobe,
} from "react-icons/fi";

export default function App() {
  // define scroll points
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
      title: "Posts",
      category: "Blog",
    },
  ];

  // automatically generate category list
  // for sidebar category
  const categoryList = [
    ...new Set(
      pointList.map((p) => {
        return p.category;
      })
    ),
  ];

  // toggle menu list
  const menuList = [
    {
      list: [
        {
          name: "About Me",
          callback: () => {
            scroll.scrollToTarget("about-me-code");
          },
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
            scroll.scrollToTarget("project-list-point");
          },
        },
        {
          name: "Screenshots",
          icon: <FiImage />,
          callback: () => {
            scroll.scrollToTarget("screenshot-point");
          },
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
          callback: () => {
            window.open("https://github.com/w298", "_blank");
          },
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

  // current language
  let [language, setLanguage] = useState("kr");
  // current scroll point
  let [focusedPoint, setFocusedPoint] = useState(pointList[0].id);

  // project card list data
  const cardList = [
    {
      title: "Intersection",
      bgImg: { src: bgImg_Intersection, h: "8rem" },
      tagList: ["UNITY", "BLENDER"],
      descList:
        language === "kr"
          ? [
              "도로 배치해서 도시의 교통량 조절하는 게임 🚘",
              "유니티 엔진을 이용해 Build 했습니다.",
            ]
          : ["Traffic Management Game 🚘", "Develop with Unity Engine"],
      btnList: [
        {
          name: "Github repo",
          href: "https://github.com/w298/Intersection",
        },
        {
          name: "Notion",
          href: "https://www.notion.so/rukasp/Project-Intersection-b17815fa8fb54fafb60bf39df80ccb74",
        },
      ],
    },
    {
      title: language === "kr" ? "오늘의 원신" : "Today's Genshin",
      bgImg: { src: bgImg_TodaysGenshin },
      tagList: ["REACT", "MATERIAL"],
      descList:
        language === "kr"
          ? [
              "원신에서 매일 할 일을 알려주는 웹앱 📝",
              "리액트로 Build 했습니다.",
            ]
          : ["Genshin Impact Todo Web-app 📝", "Built with React.js"],
      btnList: [
        {
          name: "Github repo",
          href: "https://github.com/w298/todays-genshin",
        },
        {
          name: "Link",
          href: "https://todays-genshin.netlify.app",
        },
      ],
    },
    {
      title: "Pixel Reversi",
      bgImg: { src: bgImg_PixelReversi, x: 0, y: "-2px", h: "12rem" },
      tagList: ["UNITY"],
      descList:
        language === "kr"
          ? [
              "Pixel 그래픽으로 개발한 리버시 게임",
              "Unity WebGL 로 Build 했습니다.",
            ]
          : [
              "Reversi (Othello) game with pixel graphic",
              "Develop with Unity Engine + WebGL",
            ],
      btnList: [
        {
          name: "Github repo",
          href: "https://github.com/w298/Pixel-Reversi",
        },
        {
          name: "Play Now",
          href: "https://pixel-reversi.netlify.app",
        },
      ],
    },
    {
      title: "Together",
      tagList: ["UNREAL4"],
      bgImg: { src: bgImg_Together, h: "8rem" },
      descList: [
        "Unreal Engine 4로 개발한 1인칭 공포 게임",
        "숲속에 있는 구 소련 건물을 탈출해야 합니다.",
      ],
      btnList: [
        { name: "Github repo", href: "https://github.com/W298/Together" },
      ],
    },
    {
      title: "Reflect",
      tagList: ["PYTHON"],
      bgImg: { src: bgImg_Reflect },
      descList: [
        "거울과 레이저를 이용한 퍼즐 게임",
        "Python Cocos 엔진을 이용해 개발했습니다.",
      ],
      btnList: [
        { name: "Github repo", href: "https://github.com/W298/Reflect" },
      ],
    },
  ];

  // chakra ui settings
  const { toggleColorMode } = useColorMode();
  const appBg = useColorModeValue("gray.50", "gray.900");
  const topnavBg = useColorModeValue(
    "rgba(255, 255, 255, 0.8)",
    "rgba(45, 55, 72, 0.8)"
  );
  const sidebarBg = useColorModeValue("white", "gray.800");

  // add scroll event for updating current scroll point
  useEffect(() => {
    window.addEventListener("scroll", () => {
      let curPoint = scroll.getCurrnetPoint(pointList);
      if (curPoint && focusedPoint !== curPoint) {
        setFocusedPoint(scroll.getCurrnetPoint(pointList));
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
              fontSize={["1.5rem", "1.5rem", "1.6rem"]}
              fontWeight="black"
              fontFamily="Montserrat"
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
                      <MenuGroup title={header} fontWeight="bold" fontSize="md">
                        {list.map(({ name, icon, callback }) => {
                          return (
                            <MenuItem icon={icon} onClick={callback}>
                              <Text fontWeight="semibold" fontSize="md">
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
                    fontWeight="bold"
                    fontSize="1.1rem"
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
                      gap="0.8rem"
                      alignItems="center"
                      cursor="pointer"
                      _hover={{
                        bgColor: "gray.100",
                      }}
                      onClick={() => {
                        scroll.scrollToTarget(id);
                      }}
                    >
                      <AnimatePresence>
                        {focusedPoint === id && (
                          <motion.div
                            initial={{ x: -10, opacity: 0.5 }}
                            animate={{ x: 0, opacity: 1 }}
                            exit={{ x: -10, opacity: 0.5 }}
                            transition={{ duration: 0.2, ease: "easeInOut" }}
                          >
                            <Box
                              width="0.6rem"
                              height="0.6rem"
                              transform="rotate(45deg)"
                              border="1px black solid"
                              boxShadow="1px 1px #7474bf, 2px 2px #7474bf"
                            ></Box>
                          </motion.div>
                        )}
                      </AnimatePresence>
                      <Text
                        fontWeight="bold"
                        color={focusedPoint === id ? "#7474BF" : "gray.400"}
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
        <Box px={10} py={12} id="project-list-point">
          <Flex
            w="100%"
            justifyContent="center"
            gap="5rem"
            mb="2rem"
            alignItems="center"
          >
            <Box
              display={["none", "none", "block"]}
              w="20%"
              border="2px black solid"
              height="0.4rem"
              boxShadow="3px 3px #7474bf"
            ></Box>
            <Text
              textAlign="center"
              fontWeight="extrabold"
              fontSize="1.8rem"
              color="white"
              style={{ "-webkit-text-stroke": "1.3px black" }}
              textShadow="3px 3px #7474BF"
            >
              PROJECT LIST
            </Text>
            <Box
              display={["none", "none", "block"]}
              w="20%"
              border="2px black solid"
              height="0.4rem"
              boxShadow="3px 3px #7474bf"
            ></Box>
          </Flex>
          <Box
            display="grid"
            gridTemplateColumns={[
              "repeat(auto-fill, minmax(19rem, 19rem))",
              "repeat(auto-fill, minmax(19rem, 19rem))",
              "repeat(auto-fill, minmax(20rem, 20rem))",
            ]}
            gap="1.5rem"
            justifyContent="center"
          >
            {cardList.map(({ title, bgImg, tagList, descList, btnList }) => {
              return (
                <ProjectCard
                  title={title}
                  bgImg={bgImg}
                  tagList={tagList}
                  descList={descList}
                  btnList={btnList}
                />
              );
            })}
          </Box>
        </Box>
        <Divider />
        <Box p={8} py={12} id="screenshot-point">
          <Flex
            w="100%"
            justifyContent="center"
            gap="5rem"
            mb="2rem"
            alignItems="center"
          >
            <Box
              display={["none", "none", "block"]}
              w="20%"
              border="2px black solid"
              height="0.4rem"
              boxShadow="3px 3px #7474bf"
            ></Box>
            <Text
              textAlign="center"
              fontWeight="extrabold"
              fontSize="1.8rem"
              color="white"
              style={{ "-webkit-text-stroke": "1.3px black" }}
              textShadow="3px 3px #7474BF"
            >
              SCREENSHOTS
            </Text>
            <Box
              display={["none", "none", "block"]}
              w="20%"
              border="2px black solid"
              height="0.4rem"
              boxShadow="3px 3px #7474bf"
            ></Box>
          </Flex>
        </Box>
      </Box>
    </div>
  );
}
