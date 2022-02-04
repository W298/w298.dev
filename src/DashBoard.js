import { Box, Flex, Text, Image, IconButton } from "@chakra-ui/react";

import uesvg from "./svgs/unreal-engine.svg";
import stsvg from "./svgs/sublime-text.svg";
import { useState } from "react";

import { FiChevronDown, FiChevronUp } from "react-icons/fi";

function Front({ text, space = true }) {
  return (
    <Text
      fontSize={{ base: "sm", sm: "sm", md: "md" }}
      fontWeight="medium"
      fontFamily="Fira Code"
      display="inline"
      color="#d73a49"
    >
      <pre>{space ? "  " + text : text}</pre>
    </Text>
  );
}

function Parameter({ text, space = true }) {
  return (
    <Text
      fontSize={{ base: "sm", sm: "sm", md: "md" }}
      fontWeight="medium"
      fontFamily="Fira Code"
      display="inline"
      color="#e36209"
    >
      <pre>{space ? "  " + text : text}</pre>
    </Text>
  );
}

function Function({ text, space = true }) {
  return (
    <Text
      fontSize={{ base: "sm", sm: "sm", md: "md" }}
      fontWeight="medium"
      fontFamily="Fira Code"
      display="inline"
      color="#6f42c1"
    >
      <pre>{space ? "  " + text : text}</pre>
    </Text>
  );
}

function String({ text, space = true }) {
  return (
    <Text
      fontSize={{ base: "sm", sm: "sm", md: "md" }}
      fontWeight="medium"
      fontFamily="Fira Code"
      display="inline"
      color="#005cc5"
    >
      <pre>{space ? "  " + text : text}</pre>
    </Text>
  );
}

function Icon({ src, alt }) {
  return (
    <Image
      src={src}
      alt={alt}
      style={{
        width: "1.2rem",
        margin: "0 0.2rem -0.3rem 0.2rem",
        display: "inline",
      }}
    />
  );
}

export default function DashBoard() {
  let [expanded, setExpanded] = useState(false);

  return (
    <Flex justifyContent="center" alignItems="center" flexDir="column" gap={4}>
      <Box
        p={3}
        borderRadius="0.5rem"
        bgColor="white"
        boxShadow="0 0 15px 0 rgba(0, 0, 0, 0.05)"
        width="100%"
        height={expanded ? "27rem" : "15rem"}
        transition="0.2s ease-in-out"
        overflowY="hidden"
        maxWidth="40rem"
      >
        <Text
          fontSize={{ base: "sm", sm: "sm", md: "md" }}
          fontWeight="medium"
          fontFamily="Fira Code"
          display="inline"
        >
          <Front text="let" space={false} />
          <Function text=" onLoad" space={false} />
          {" = ("}
          <Parameter text="event" space={false} />
          {") => {"}
          <br />
          <Function text="shakingHand" />
          ('👋');
          <br />
          <br />
          <Front text="let" />
          <String text=" d" space={false} />
          {' = { name: "riruna" };'}
          <br />
          <Front text="let" />
          {" gameDev = {"}
          <br />
          <pre>{"    lang: ["}</pre>
          <Icon
            src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg"
            alt="cpp"
          />
          {","}
          <Icon
            src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/csharp/csharp-original.svg"
            alt="csharp"
          />
          {","}
          <Icon
            src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg"
            alt="python"
          />
          {"],"}
          <br />
          <pre>{"    engine: ["}</pre>
          <Icon src={uesvg} alt="unreal" />
          {","}
          <Icon src="https://simpleicons.org/icons/unity.svg" alt="unity" />
          {"]"}
          <br />
          <pre>{"  };"}</pre>
          <br />
          <Front text="let" />
          {" webApp = {"}
          <br />
          <pre>{"    lang: ["}</pre>
          <Icon
            src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg"
            alt="js"
          />
          {","}
          <Icon
            src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg"
            alt="ts"
          />
          {"],"}
          <br />
          <pre>{"    lib: ["}</pre>
          <Icon
            src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg"
            alt="react"
          />
          {","}
          <Icon
            src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vuejs/vuejs-original.svg"
            alt="vue"
          />
          {","}
          <Icon
            src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/svelte/svelte-original.svg"
            alt="svelte"
          />
          {"]"}
          <br />
          <pre>{"  };"}</pre>
          <br />
          <String text="d" />
          {".main = { gameDev, webApp };"}
          <br />
          <String text="d" />
          {".fav.editor = ["}
          <Icon
            src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg"
            alt="vscode"
          />
          {","}
          <Icon
            src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/visualstudio/visualstudio-plain.svg"
            alt="vs"
          />
          {","}
          <Icon src={stsvg} alt="st" />
          {"];"}
          <br />
          <br />
          <Front text="return new" />
          <Function text=" Developer" space={false} />
          {"(d);"}
          <br />
          {"};"}
        </Text>
      </Box>
      <Flex alignItems="center" flexDir="column" gap={1}>
        <IconButton
          icon={expanded ? <FiChevronUp /> : <FiChevronDown />}
          fontSize="1.5rem"
          onClick={() => {
            setExpanded(!expanded);
          }}
        />
        <Text fontSize="sm" fontWeight="bold">
          {expanded ? "view less" : "view more"}
        </Text>
      </Flex>
    </Flex>
  );
}
