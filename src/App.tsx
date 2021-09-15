import * as React from 'react';
import { Center, ChakraProvider, Text, Stack } from '@chakra-ui/react';
import theme from './theme';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Painting } from './Components/Painting';
import { frogPainting } from './svgs/frog';

export const App = () => {
  return (
    <ChakraProvider theme={theme}>
      <BrowserRouter>
        <Center>
          <Center width={{ base: '100%', md: '75%', lg: '60%' }} h="100vh">
            <Stack>
              <Switch>
                <Route exact path="/">
                  <Painting painting={frogPainting} />
                </Route>
                <Route>
                  <Text>Siden ble ikke funnet:(</Text>
                </Route>
              </Switch>
            </Stack>
          </Center>
        </Center>
      </BrowserRouter>
    </ChakraProvider>
  );
};
