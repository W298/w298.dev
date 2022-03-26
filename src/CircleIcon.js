import { Flex, Icon } from "@chakra-ui/react";

export function CircleIcon({ bgColor, icon, iconSize = 1, fill = "white" }) {
  return (
    <Flex
      bgColor={bgColor}
      p={1}
      width="1.75rem"
      height="1.75rem"
      borderRadius="1.75rem"
      justifyContent="center"
      alignItems="center"
    >
      <Icon
        as={icon}
        fill={fill}
        width={iconSize + "rem"}
        height={iconSize + "rem"}
      />
    </Flex>
  );
}
