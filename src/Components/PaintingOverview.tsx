import * as React from 'react';
import { Painting } from '../types';
import { paintings } from '../svgs/paintings';
import { Box, Grid, Heading, Link, Stack } from '@chakra-ui/layout';
import { PaintingPreview } from './PaintingPreview';
import { colors, defaultColors } from '../colors';
import { Link as ReachLink } from 'react-router-dom';
import { useHistory, useLocation } from 'react-router';

const generateColorCombinations = (numColors: number) => {
  return [
    ...Array(numColors)
      .fill('')
      .map(_ => colors[Math.floor(Math.random() * colors.length)]),
  ];
};

const generateColors = (numPaintings: number, colorsPerPainting: number) => {
  return [
    ...Array(numPaintings)
      .fill('')
      .map(_ => generateColorCombinations(colorsPerPainting)),
  ];
};

const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};

export const PaintingOverview = () => {
  const [selectedPainting, setSelectedPainting] = React.useState<Painting | null>(null);
  const query = useQuery();
  const history = useHistory();

  const background = 'white';
  const outline = 'black';

  const colorsForPaintings = generateColors(99, selectedPainting?.numColors || 5);

  React.useEffect(() => {
    const queryTemplate = query.get('template');
    if (queryTemplate) {
      const matchingPainting = paintings.find(painting => painting.name === queryTemplate);
      if (matchingPainting) {
        setSelectedPainting(paintings.find(painting => painting.name === queryTemplate) || null);
      } else {
        history.push('/');
      }
    }
  }, [history, query]);

  return (
    <Stack>
      {selectedPainting ? (
        <>
          <Heading>Choose a template</Heading>

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
