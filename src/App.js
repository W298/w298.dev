import "./App.css";

import { Text, IconButton } from "@chakra-ui/react";
import { Box, Flex } from "@chakra-ui/react";
import { Menu, MenuButton, MenuList, MenuItem, MenuGroup, MenuDivider } from "@chakra-ui/react";
import { FiGithub, FiMoon, FiMenu, FiList, FiColumns } from "react-icons/fi";

export default function App() {
  return (
    <div className='App'>
      <Box minH='100vh' bgColor='rgb(245, 245, 245)'>
        <Box px={5} py={2} bgColor='white'>
          <Flex justifyContent='center' alignItems='center' gap={5}>
            <Flex flex='1' gap={2}>
              <IconButton
                size='md'
                fontSize='20px'
                color='darkgrey'
                _hover={{ color: 'black' }}
                icon={<FiGithub />}
              />
              <IconButton
                size='md'
                fontSize='20px'
                color='darkgrey'
                _hover={{ color: 'black' }}
                icon={<FiMoon />}
              />
            </Flex>
            <Flex flex='1' justifyContent='center'>
              <Text
                bgGradient='linear(to-l, #fe8c00, #f83600)'
                bgClip='text'
                fontSize='3xl'
                fontWeight='extrabold'
                fontFamily='Bakbak One'
                letterSpacing='-2px'
                mr={8}
              >
                tuttoMaker.dev
              </Text>
            </Flex>
            <Flex flex='1' justifyContent='flex-end'>
              <Menu>
                <MenuButton as={IconButton} icon={<FiMenu />}>
                </MenuButton>
                <MenuList>
                  <MenuGroup title='Project'>
                    <MenuItem icon={<FiColumns />}>Project Board</MenuItem>
                    <MenuItem icon={<FiList />}>Project List</MenuItem>
                  </MenuGroup>
                  <MenuDivider />
                  <MenuItem>Blog</MenuItem>
                  <MenuItem>About Me</MenuItem>
                </MenuList>
              </Menu>
            </Flex>
          </Flex>
        </Box>
      </Box>
    </div>
  );
}
