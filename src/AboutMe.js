import { Avatar, Flex, Text } from "@chakra-ui/react";

import { ReactComponent as Vuejs } from "./svgs/vuejs.svg";
import { ReactComponent as Svelte } from "./svgs/svelte.svg";
import { ReactComponent as React } from "./svgs/react.svg";
import { ReactComponent as Unreal } from "./svgs/unreal-engine.svg";
import { ReactComponent as Unity } from "./svgs/unity.svg";
import { ReactComponent as Threejs } from "./svgs/threedotjs.svg";
import { ReactComponent as Nodejs } from "./svgs/nodedotjs.svg";
import { ReactComponent as Redux } from "./svgs/redux.svg";

import { Window } from "./Window.js";
import { CircleIcon } from "./CircleIcon.js";

export default function AboutMe() {
  const txtShadow = {
    color: "#7474BF",
    repeat: 5,
    get style() {
      let str = "";
      for (let i = 1; i <= this.repeat; i++) {
        str += `0px ${i}px ${this.color}`;
        str += i !== this.repeat ? ", " : "";
      }
      return str;
    },
  };

  return (
    <Flex p={[10, 10, 12]} width="100%" justifyContent="center">
      <Window w={["100%", "100%", "40rem"]} h={["100%", "100%", "16rem"]}>
        <Flex
          flex="1"
          justifyContent="center"
          textAlign={["center", "center", "start"]}
        >
          <Flex width="10rem" lineHeight="1.4rem" flexDir="column">
            <Text fontSize="1.1rem" fontWeight="semibold">
              developer.
            </Text>
            <Text
              fontSize="1.8rem"
              fontWeight="extrabold"
              color="white"
              textShadow={txtShadow.style}
              style={{ "-webkit-text-stroke": "1.2px black" }}
            >
              W298
            </Text>
            <Text fontSize="0.9rem" fontWeight="bold" marginTop="1.1rem">
              develop web & game
            </Text>
            <Text fontSize="0.9rem" fontWeight="bold" marginTop="-0.2rem">
              {"t(>.<t)"}
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
            width="12rem"
            flexDir="column"
            gap="0.5rem"
            lineHeight="1.2rem"
            fontSize="0.9rem"
          >
            <Flex flexDir="column" gap="0.3rem">
              <Text fontWeight="extrabold" fontSize="0.9rem">
                WEB DEV.
              </Text>
              <Flex
                columnGap="0.4rem"
                justifyContent={["center", "center", "flex-end"]}
                flexWrap="wrap"
              >
                <CircleIcon bgColor="#5ab7d1" icon={React} />
                <CircleIcon bgColor="#4FC08D" icon={Vuejs} />
                <CircleIcon bgColor="#FF3E00" icon={Svelte} />
                <CircleIcon bgColor="#764ABC" icon={Redux} />
                <CircleIcon bgColor="#339933" icon={Nodejs} />
              </Flex>
            </Flex>
            <Flex flexDir="column" gap="0.3rem">
              <Text fontWeight="extrabold" fontSize="0.9rem">
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
