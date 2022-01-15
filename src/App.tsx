import * as React from 'react';
import { Center, ChakraProvider, Text, Stack } from '@chakra-ui/react';
import theme from './theme';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Painting } from './Components/Painting';
import { PaintingOverview } from './Components/PaintingOverview';

export const App = () => {
  return (
    <ChakraProvider theme={theme}>
      <BrowserRouter>
        <Center>
          <Stack width="100%">
            <Switch>
              <Route exact path="/">
                <PaintingOverview />
              </Route>
              <Route path="/painting/:name">
                <Painting />
              </Route>
              <Route>
                <Text>Siden ble ikke funnet:(</Text>
              </Route>
            </Switch>
          </Stack>
        </Center>
      </BrowserRouter>
    </ChakraProvider>
  );
};
