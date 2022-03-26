import { Flex, Box } from "@chakra-ui/react";

export function Window({ children, w, h }) {
  const border = "1px #d1d1d169 solid";

  const CircleButton = ({ color, disabled = false }) => {
    const size = "0.8rem";
    return (
      <Box
        width={size}
        height={size}
        borderRadius={size}
        bgColor={disabled ? "#DFDFDF" : color}
        cursor="pointer"
      ></Box>
    );
  };

  return (
    <Flex
      bgColor="white"
      width={w}
      height={h}
      boxShadow="0 0 15px 5px rgb(0 0 0 / 5%)"
      border={border}
      borderRadius="0.7rem"
      flexDir="column"
    >
      <Flex
        gap="1.5rem"
        px="1rem"
        py="0.6rem"
        borderBottom={border}
        justifyContent="space-between"
      >
        <Flex gap="0.5rem" alignItems="center">
          <CircleButton color="#FF5F58" />
          <CircleButton color="#FFBE2F" />
          <CircleButton color="#2AC940" disabled />
        </Flex>
        <Flex gap="0.5rem" alignItems="center" justifySelf="center"></Flex>
        <Flex gap="0.5rem" alignItems="center" visibility="hidden">
          <CircleButton color="#FF5F58" />
          <CircleButton color="#FFBE2F" />
          <CircleButton color="#2AC940" disabled />
        </Flex>
      </Flex>
      <Flex
        width="100%"
        height="100%"
        justifyContent="center"
        alignItems="center"
        columnGap="1rem"
        rowGap="2rem"
        p="2rem"
        flexWrap="wrap"
      >
        {children}
      </Flex>
    </Flex>
  );
}
