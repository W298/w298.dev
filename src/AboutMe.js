import { Avatar, Flex, Text } from "@chakra-ui/react";

import { ReactComponent as Vuejs } from "./svgs/vuejs.svg";
import { ReactComponent as Svelte } from "./svgs/svelte.svg";
import { ReactComponent as React } from "./svgs/react.svg";
import { ReactComponent as Unreal } from "./svgs/unreal-engine.svg";
import { ReactComponent as Unity } from "./svgs/unity.svg";
import { ReactComponent as Threejs } from "./svgs/threedotjs.svg";

import { Window } from "./Window.js";
import { CircleIcon } from "./CircleIcon.js";

export default function AboutMe() {
  return (
    <Flex p={[10, 10, 12]} width="100%" justifyContent="center">
      <Window w={["100%", "100%", "40rem"]} h={["100%", "100%", "16rem"]}>
        <Flex
          flex="1"
          justifyContent="center"
          textAlign={["center", "center", "start"]}
        >
          <Flex width="10rem" lineHeight="1.5rem" flexDir="column">
            <Text fontSize="1.2rem" fontFamily="Kanit">
              developer.
            </Text>
            <Text fontSize="2rem" fontWeight="extrabold" fontFamily="Kanit">
              W298
            </Text>
            <Text fontSize="1rem" marginTop="1rem" fontFamily="Kanit">
              Develop Web & Game
            </Text>
          </Flex>
        </Flex>
        <Flex flex="1" justifyContent="center">
          <Avatar
            width="8.5rem"
            height="8.5rem"
            src="https://i.pinimg.com/originals/a8/cb/bb/a8cbbbdb73615f16068de2cb077bb143.jpg"
          />
        </Flex>
        <Flex
          flex="1"
          justifyContent="center"
          textAlign={["center", "center", "end"]}
        >
          <Flex
            width="10rem"
            flexDir="column"
            gap="0.5rem"
            lineHeight="1.2rem"
            fontSize="0.9rem"
          >
            <Flex flexDir="column" gap="0.3rem">
              <Text fontWeight="bold" fontFamily="Kanit" fontSize="1rem">
                WEB DEV.
              </Text>
              <Flex
                columnGap="0.4rem"
                justifyContent={["center", "center", "flex-end"]}
                flexWrap="wrap"
              >
                <CircleIcon bgColor="#61DAFB" icon={React} />
                <CircleIcon bgColor="#4FC08D" icon={Vuejs} />
                <CircleIcon bgColor="#FF3E00" icon={Svelte} />
              </Flex>
            </Flex>
            <Flex flexDir="column" gap="0.3rem">
              <Text fontWeight="bold" fontFamily="Kanit" fontSize="1rem">
                GAME DEV.
              </Text>
              <Flex
                columnGap="0.4rem"
                justifyContent={["center", "center", "flex-end"]}
                flexWrap="wrap"
              >
                <CircleIcon bgColor="#0E1128" icon={Unreal} />
                <CircleIcon bgColor="black" icon={Unity} />
                <CircleIcon bgColor="black" icon={Threejs} />
              </Flex>
            </Flex>
          </Flex>
        </Flex>
      </Window>
    </Flex>
  );
}
