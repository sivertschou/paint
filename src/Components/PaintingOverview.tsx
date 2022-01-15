import * as React from 'react';
import { Painting } from '../types';
import { paintings } from '../svgs/paintings';
import { Box, Grid, Text, Heading, Link, Stack, HStack } from '@chakra-ui/layout';
import { PaintingPreview } from './PaintingPreview';
import { basicColors, colors, defaultColors } from '../colors';
import { Link as ReachLink } from 'react-router-dom';
import { useHistory, useLocation } from 'react-router';
import { Center, Button } from '@chakra-ui/react';

const generateIntNotInArray = (currentValues: number[], min: number, max: number) => {
  const diff = max - min;
  if (diff === 0) return min;

  if (diff === currentValues.length) return Math.floor(Math.random() * diff) + min;

  for (let i = 0; i < 100; i++) {
    const value = Math.floor(Math.random() * diff) + min;
    if (!currentValues.includes(value)) {
      return value;
    }
  }

  return Math.floor(Math.random() * diff) + min;
};
const generateColorCombinations = (numColors: number, colors: string[]) => {
  let arr = [] as number[];
  for (let i = 0; i < numColors; i++) {
    arr = [...arr, generateIntNotInArray(arr, 0, colors.length)];
  }

  return [...arr.map(i => colors[i])];
};

const generateColors = (numPaintings: number, colorsPerPainting: number, colors: string[]) => {
  return [
    ...Array(numPaintings)
      .fill('')
      .map(_ => generateColorCombinations(colorsPerPainting, colors)),
  ];
};

const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};

export const shiftArray = (dir: 'left' | 'right', arr: any[]) => {
  switch (dir) {
    case 'left':
      return [...arr.filter((_, i) => i !== 0), arr[0]];
    case 'right':
      return [arr[arr.length - 1], ...arr.filter((_, i) => i !== arr.length - 1)];
  }
};

export const PaintingOverview = () => {
  const [selectedPainting, setSelectedPainting] = React.useState<Painting | null>(null);

  const query = useQuery();
  const history = useHistory();

  const background = 'white';
  const outline = 'black';

  const [basicColorsForPaintings, setBasicColorsForPaintings] = React.useState([] as string[][]);
  const [colorsForPaintings, setColorsForPaintings] = React.useState([] as string[][]);

  React.useEffect(() => {
    const queryTemplate = query.get('template');
    if (queryTemplate) {
      const matchingPainting = paintings.find(painting => painting.name === queryTemplate);
      if (matchingPainting) {
        setSelectedPainting(matchingPainting || null);
      } else {
        history.push('/');
      }
    } else {
      if (history.location.pathname === '/' && selectedPainting) {
        setSelectedPainting(null);
      }
    }
  }, [history, query, selectedPainting]);

  const shiftColors = React.useCallback(
    (direction: 'left' | 'right') => {
      setBasicColorsForPaintings(basicColorsForPaintings.map(c => shiftArray(direction, c)));
      setColorsForPaintings(colorsForPaintings.map(c => shiftArray(direction, c)));
    },
    [setBasicColorsForPaintings, basicColorsForPaintings, setColorsForPaintings, colorsForPaintings]
  );

  const regenerateColors = React.useCallback(() => {
    if (!selectedPainting) return;

    setBasicColorsForPaintings(generateColors(33, selectedPainting.numColors || 4, basicColors));
    setColorsForPaintings(generateColors(99, selectedPainting.numColors || 4, colors));
  }, [setBasicColorsForPaintings, setColorsForPaintings, selectedPainting]);

  const handleKeyPress = React.useCallback(
    ({ key }) => {
      if (document.activeElement?.tagName === 'INPUT') {
        return;
      }

      if (!selectedPainting) return;

      switch (key) {
        case 'ArrowRight':
          shiftColors('right');
          break;
        case 'ArrowLeft':
          shiftColors('left');
          break;
        case 'r':
          regenerateColors();
          break;
        default:
          break;
      }
    },
    [selectedPainting, regenerateColors, shiftColors]
  );

  React.useEffect(() => {
    window.addEventListener('keydown', handleKeyPress);
    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, [handleKeyPress]);

  React.useEffect(() => {
    if (selectedPainting) {
      regenerateColors();
    }
  }, [selectedPainting, regenerateColors]);

  return (
    <>
      <Center>
        <Stack width={{ base: '100%', md: '75%', lg: '60%' }} mb="5em">
          {selectedPainting ? (
            <>
              <Heading>Choose a template</Heading>

              <Heading as={'h2'} fontSize="2xl">
                Basic colors
              </Heading>
              <Grid templateColumns="1fr 1fr 1fr" gap="2">
                {basicColorsForPaintings.map((colors, i) => (
                  <Link as={ReachLink} to={`/painting/${selectedPainting.name}?colors=${colors.join(',')}`} key={i}>
                    <PaintingPreview
                      painting={selectedPainting}
                      background={background}
                      outline={outline}
                      colors={colors}
                    />
                  </Link>
                ))}
              </Grid>
              <Heading as={'h2'} fontSize="2xl">
                All colors
              </Heading>
              <Grid templateColumns="1fr 1fr 1fr" gap="2">
                {colorsForPaintings.map((colors, i) => (
                  <Link as={ReachLink} to={`/painting/${selectedPainting.name}?colors=${colors.join(',')}`} key={i}>
                    <PaintingPreview
                      painting={selectedPainting}
                      background={background}
                      outline={outline}
                      colors={colors}
                    />
                  </Link>
                ))}
              </Grid>
            </>
          ) : (
            <>
              <Heading>Choose a template</Heading>
              {paintings.map((painting, i) => (
                <Link as={ReachLink} to={`?template=${painting.name}`} key={i}>
                  <Box>
                    <PaintingPreview
                      painting={painting}
                      background={background}
                      outline={outline}
                      colors={defaultColors}
                    />
                  </Box>
                </Link>
              ))}
            </>
          )}
        </Stack>
      </Center>

      {selectedPainting ? (
        <Center position="fixed" bottom="0" width="100%">
          <HStack mb="2">
            <Button onClick={() => shiftColors('left')}>{'< Shift colors left'}</Button>
            <Button onClick={() => shiftColors('right')}>{'Shift colors right >'}</Button>
          </HStack>
        </Center>
      ) : null}
    </>
  );
};
