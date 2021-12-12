import './App.css';

import { Text } from "@chakra-ui/react";

export default function App() {
  return (
    <div className="App">
      <Text
        bgGradient='linear(to-l, #7928CA, #FF0080)'
        bgClip='text'
        fontSize='6xl'
        fontWeight='extrabold'
        textAlign='center'
        p={3}
      >
        tuttoMaker.dev
      </Text>
    </div>
  );
}
