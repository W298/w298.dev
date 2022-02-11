import { Flex, Text, Icon } from "@chakra-ui/react";

import { BiWindowAlt } from "react-icons/bi";
import { IoGameController } from "react-icons/io5";
import { FiCode } from "react-icons/fi";
import { DiJavascript1 } from "react-icons/di";
import {
  SiCplusplus,
  SiVisualstudiocode,
  SiSublimetext,
  SiVisualstudio,
} from "react-icons/si";
import { DiTerminal } from "react-icons/di";

import { ReactComponent as Vuejs } from "./svgs/vuejs.svg";
import { ReactComponent as Svelte } from "./svgs/svelte.svg";
import { ReactComponent as React } from "./svgs/react.svg";
import { ReactComponent as Unreal } from "./svgs/unreal-engine.svg";
import { ReactComponent as Unity } from "./svgs/unity.svg";
import { ReactComponent as Threejs } from "./svgs/threedotjs.svg";
import { ReactComponent as CSharp } from "./svgs/csharp.svg";
import { ReactComponent as Typescript } from "./svgs/typescript.svg";

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
      _hover={{
        base: { transform: "scale(1) " },
        sm: { transform: "scale(1)" },
        md: { transform: "scale(1.1)" },
      }}
      transform={{ base: "scale(0.9)", sm: "scale(0.9)", md: "scale(1)" }}
      transition="0.2s ease-in-out"
    >
      <Icon
        as={icon}
        fill={fill}
        width={iconSize * 1.25 + "rem"}
        height={iconSize * 1.25 + "rem"}
      />
    </Flex>
  );
}

function DemonCardContainer({ children }) {
  return (
    <Flex
      p={{ base: 2, sm: 2, md: 4 }}
      borderRadius="0.5rem"
      bgColor="white"
      boxShadow="0 0 15px 0 rgba(0, 0, 0, 0.05)"
      flexDir="column"
      gap="0.25rem"
      width="100%"
    >
      {children}
    </Flex>
  );
}

function DemonCard({ children }) {
  return (
    <Flex
      p={2}
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      gap="0.25rem"
    >
      {children}
    </Flex>
  );
}

export default function AboutMe() {
  return (
    <Flex p={8} py={12} justifyContent="center">
      <Flex width={{ base: "100%", sm: "100%", md: "45rem" }}>
        <DemonCardContainer>
          <Flex alignItems="flex-end">
            <Text
              fontSize={{ base: "1rem", sm: "1rem", md: "1.25rem" }}
              fontWeight="semibold"
              fontFamily="Kanit"
              lineHeight={{ base: "1.8rem", sm: "1.8rem", md: "2.15rem" }}
              pl={2}
              pr={1}
            >
              Developer.
            </Text>
            <Text
              fontSize={{ base: "1.3rem", sm: "1.3rem", md: "1.5rem" }}
              fontWeight="bold"
              fontFamily="Kanit"
            >
              W298
            </Text>
          </Flex>
          <Flex
            display="grid"
            gridTemplateColumns={{
              base: "repeat(auto-fill, minmax(8rem, auto))",
              sm: "repeat(auto-fill, minmax(8rem, auto))",
              md: "repeat(auto-fill, minmax(10rem, auto))",
            }}
            justifyContent="space-evenly"
            width="100%"
          >
            <DemonCard>
              <Flex
                justifyContent="center"
                alignItems="center"
                gap={{ base: "0.5rem", sm: "0.5rem", md: "0.75rem" }}
              >
                <BiWindowAlt />
                <Text
                  fontFamily="Kanit"
                  fontWeight="semibold"
                  fontSize={{ base: "0.9rem", sm: "0.9rem", md: "1.1rem" }}
                >
                  WEB DEV
                </Text>
              </Flex>
              <Flex gap={{ base: "0.2rem", sm: "0.2rem", md: "0.5rem" }}>
                <CircleIcon bgColor="#61DAFB" icon={React} />
                <CircleIcon bgColor="#4FC08D" icon={Vuejs} iconSize={0.9} />
                <CircleIcon bgColor="#FF3E00" icon={Svelte} />
              </Flex>
            </DemonCard>
            <DemonCard>
              <Flex
                justifyContent="center"
                alignItems="center"
                gap={{ base: "0.5rem", sm: "0.5rem", md: "0.75rem" }}
              >
                <IoGameController fontSize="1.1rem" />
                <Text
                  fontFamily="Kanit"
                  fontWeight="semibold"
                  fontSize={{ base: "0.9rem", sm: "0.9rem", md: "1.1rem" }}
                >
                  GAME DEV
                </Text>
              </Flex>
              <Flex gap={{ base: "0.2rem", sm: "0.2rem", md: "0.5rem" }}>
                <CircleIcon bgColor="#0E1128" icon={Unreal} />
                <CircleIcon bgColor="black" icon={Unity} />
                <CircleIcon bgColor="black" icon={Threejs} />
              </Flex>
            </DemonCard>
            <DemonCard>
              <Flex
                justifyContent="center"
                alignItems="center"
                gap={{ base: "0.5rem", sm: "0.5rem", md: "0.75rem" }}
              >
                <FiCode fontSize="1.1rem" />
                <Text
                  fontFamily="Kanit"
                  fontWeight="semibold"
                  fontSize={{ base: "0.9rem", sm: "0.9rem", md: "1.1rem" }}
                >
                  MAIN LANG
                </Text>
              </Flex>
              <Flex gap={{ base: "0.2rem", sm: "0.2rem", md: "0.5rem" }}>
                <CircleIcon bgColor="#00599C" icon={SiCplusplus} />
                <CircleIcon bgColor="#68217A" icon={CSharp} />
                <CircleIcon
                  bgColor="#F7DF1E"
                  icon={DiJavascript1}
                  fill="black"
                />
                <CircleIcon bgColor="#3178C6" icon={Typescript} />
              </Flex>
            </DemonCard>
            <DemonCard>
              <Flex
                justifyContent="center"
                alignItems="center"
                gap={{ base: "0.5rem", sm: "0.5rem", md: "0.75rem" }}
              >
                <DiTerminal fontSize="1.4rem" />
                <Text
                  fontFamily="Kanit"
                  fontWeight="semibold"
                  fontSize={{ base: "0.9rem", sm: "0.9rem", md: "1.1rem" }}
                >
                  FAV TOOLS
                </Text>
              </Flex>
              <Flex gap={{ base: "0.2rem", sm: "0.2rem", md: "0.5rem" }}>
                <CircleIcon
                  bgColor="#007ACC"
                  icon={SiVisualstudiocode}
                  iconSize={0.9}
                />
                <CircleIcon
                  bgColor="#5C2D91"
                  icon={SiVisualstudio}
                  iconSize={0.9}
                />
                <CircleIcon
                  bgColor="#FF9800"
                  icon={SiSublimetext}
                  iconSize={0.9}
                />
              </Flex>
            </DemonCard>
          </Flex>
        </DemonCardContainer>
      </Flex>
    </Flex>
  );
}
