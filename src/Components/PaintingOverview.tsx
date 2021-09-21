import * as React from 'react';
import { SvgImage } from './SVGImage';
import { Painting } from '../types';
import { paintings } from '../svgs/paintings';
import { Box, Grid, Heading, Link, Stack } from '@chakra-ui/layout';
import { PaintingPreview } from './PaintingPreview';
import { colors, defaultColors } from '../colors';
import { Button } from '@chakra-ui/button';
import { Link as ReachLink } from 'react-router-dom';
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

export const PaintingOverview = () => {
  const [selectedPainting, setSelectedPainting] = React.useState<Painting | null>(null);
  const background = 'white';
  const outline = 'black';

  const colorcomb = generateColorCombinations(5);
  const colorsForPaintings = generateColors(99, selectedPainting?.numColors || 5);
  console.log('colorcomb:', colorcomb);

  console.log('paintings:', paintings);
  return (
    <Stack>
      {selectedPainting ? (
        <>
          <Heading>Choose a template</Heading>

          <Grid templateColumns="1fr 1fr 1fr" gap="2">
            {colorsForPaintings.map(colors => (
              <Link as={ReachLink} to={`/painting/${selectedPainting.name}?colors=${colors.join(',')}`}>
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
        paintings.map((painting, i) => (
          <>
            <Heading>Choose a template</Heading>
            <Box key={i} onClick={() => setSelectedPainting(painting)}>
              <PaintingPreview painting={painting} background={background} outline={outline} colors={defaultColors} />
            </Box>
          </>
        ))
      )}
    </Stack>
  );
};
