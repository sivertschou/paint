import * as React from 'react';
import { Center, ChakraProvider, Text, Stack } from '@chakra-ui/react';
import theme from './theme';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Painting } from './Components/Painting';
import { PaintingOverview } from './Components/PaintingOverview';

export const App = () => {
  return (
    <ChakraProvider theme={theme}>
      <BrowserRouter>
        <Center>
          <Stack width="100%" paddingY="5">
            <Routes>
              <Route path="/" element={<PaintingOverview />} />
              <Route path="/painting/:name" element={<Painting />} />
              <Route path="*" element={<Text>Siden ble ikke funnet:(</Text>} />
            </Routes>
          </Stack>
        </Center>
      </BrowserRouter>
    </ChakraProvider>
  );
};
