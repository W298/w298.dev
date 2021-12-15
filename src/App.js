import "./App.css";

import { Text, IconButton, Avatar, Badge } from "@chakra-ui/react";
import { Box, Flex } from "@chakra-ui/react";
import { SimpleGrid } from "@chakra-ui/react";
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuGroup,
  MenuDivider,
} from "@chakra-ui/react";
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
                _hover={{ color: "black" }}
                icon={<FiGithub />}
                onClick={() => {
                  window.open("https://github.com/tuttoMaker", "_blank");
                }}
              />
              <IconButton
                size='md'
                fontSize='20px'
                color='darkgrey'
                _hover={{ color: "black" }}
                icon={<FiMoon />}
                onClick={() => {
                  console.log("dark mode enabled");
                }}
              />
            </Flex>
            <Flex flex='1' justifyContent='center'>
              <Text
                bgGradient='linear(to-l, #fe8c00, #f83600)'
                bgClip='text'
                fontSize='3xl'
                fontWeight='black'
                fontFamily='Raleway'
                letterSpacing='-1px'
                p={1}
                mr={8}
              >
                tuttoMaker.dev
              </Text>
            </Flex>
            <Flex flex='1' justifyContent='flex-end'>
              <Menu>
                <MenuButton as={IconButton} icon={<FiMenu />}></MenuButton>
                <MenuList>
                  <MenuGroup title='Project' fontWeight='bold'>
                    <MenuItem icon={<FiColumns />} fontWeight='medium'>
                      Project Board
                    </MenuItem>
                    <MenuItem icon={<FiList />} fontWeight='medium'>
                      Project List
                    </MenuItem>
                  </MenuGroup>
                  <MenuDivider />
                  <MenuItem fontWeight='medium'>Blog</MenuItem>
                  <MenuItem fontWeight='medium'>About Me</MenuItem>
                </MenuList>
              </Menu>
            </Flex>
          </Flex>
        </Box>

        <Box p={8}>
          <Box py={2}>
            <Text fontSize='2xl' fontWeight='extrabold' mb={5}>
              PROJECT LIST
            </Text>
            <SimpleGrid minChildWidth='15rem' spacing='2rem'>
              <Box bg='white' maxW='17rem' borderRadius='0.5rem' p={5}>
                <Flex direction='column' gap="1rem">
                  <Flex direction='row' gap="1rem">
                    <Flex flex={1} alignItems="center">
                      <Avatar size='md' name='Intersection' src='...' />
                    </Flex>
                    <Flex direction='column' flex={4}>
                      <Badge width='fit-content'>Game DEV</Badge>
                      <Text fontSize='xl' fontWeight='extrabold'>
                        Intersection
                      </Text>
                    </Flex>
                  </Flex>
                  <Flex direction='column'>
                    <Text fontWeight='medium'>Traffic Management Game 🚘</Text>
                  </Flex>
                </Flex>
              </Box>
            </SimpleGrid>
          </Box>
        </Box>
      </Box>
    </div>
  );
}
