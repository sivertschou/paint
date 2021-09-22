import * as React from 'react';
import { Painting } from '../types';
import { paintings } from '../svgs/paintings';
import { Box, Grid, Heading, Link, Stack } from '@chakra-ui/layout';
import { PaintingPreview } from './PaintingPreview';
import { basicColors, colors, defaultColors } from '../colors';
import { Link as ReachLink } from 'react-router-dom';
import { useHistory, useLocation } from 'react-router';

const generateColorCombinations = (numColors: number, colors: string[]) => {
  return [
    ...Array(numColors)
      .fill('')
      .map(_ => colors[Math.floor(Math.random() * colors.length)]),
  ];
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

const shiftArray = (dir: 'left' | 'right', arr: any[]) => {
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

  const handleKeyPress = React.useCallback(
    ({ key }) => {
      if (document.activeElement?.tagName === 'INPUT') {
        return;
      }

      switch (key) {
        case 'ArrowRight':
          setBasicColorsForPaintings(basicColorsForPaintings.map(c => shiftArray('right', c)));
          break;
        case 'ArrowLeft':
          setBasicColorsForPaintings(basicColorsForPaintings.map(c => shiftArray('left', c)));
          break;
        default:
          break;
      }
    },
    [setBasicColorsForPaintings, basicColorsForPaintings]
  );

  React.useEffect(() => {
    window.addEventListener('keydown', handleKeyPress);
    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, [handleKeyPress]);

  React.useEffect(() => {
    if (selectedPainting) {
      setBasicColorsForPaintings(generateColors(33, selectedPainting.numColors || 4, basicColors));
      setColorsForPaintings(generateColors(99, selectedPainting.numColors || 4, colors));
    }
  }, [selectedPainting]);

  return (
    <Stack>
      {selectedPainting ? (
        <>
          <Heading>Choose a template</Heading>

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
                <PaintingPreview painting={painting} background={background} outline={outline} colors={defaultColors} />
              </Box>
            </Link>
          ))}
        </>
      )}
    </Stack>
  );
};
