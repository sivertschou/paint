import * as React from 'react';
import { Stack, Button, HStack, Input, Text, Box, Center } from '@chakra-ui/react';
import { SvgImage } from './SVGImage';
import { Painting as PaintingType } from '../types';

interface Props {
  painting: PaintingType;
}

const defaultColors = ['#ffff00', '#ff0000', '#0000ff', '#00ff00'];

const getDefaultColors = (numColors: number) => [
  ...new Array(numColors).fill('').map((_, i) => defaultColors[i % defaultColors.length]),
];

export const Painting = ({ painting }: Props) => {
  const [slide, setSlide] = React.useState(0);

  const [colors, setColors] = React.useState([...getDefaultColors(painting.numColors)]);
  const [outline, setOutline] = React.useState('#000000');
  const [background, setBackground] = React.useState('#ffffff');

  const image = painting.renderContent(colors, outline, painting.iterations, slide);

  const nextSlide = () => slide < painting.iterations.length && setSlide(slide + 1);
  const previousSlide = () => slide > 0 && setSlide(slide - 1);

  return (
    <Stack>
      <HStack>
        {colors.map((color, i) => (
          <Input
            value={color}
            onChange={e => setColors(prev => [...prev].map((color, idx) => (idx === i ? e.target.value : color)))}
            key={i}
          />
        ))}

        <Input value={outline} onChange={e => setOutline(e.target.value)} />
        <Input value={background} onChange={e => setBackground(e.target.value)} />
      </HStack>
      <Box background={background}>
        <SvgImage svg={image} />
      </Box>
      <Center>
        <HStack>
          <Button onClick={previousSlide}>{'<'}</Button>
          <Text>{slide}</Text>
          <Button onClick={nextSlide}>{'>'}</Button>
        </HStack>
      </Center>
    </Stack>
  );
};
