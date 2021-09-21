import * as React from 'react';
import { Stack, Button, HStack, Input, Text, Center, AspectRatio } from '@chakra-ui/react';
import { SvgImage } from './SVGImage';
import { Painting as PaintingType } from '../types';

interface Props {
  painting: PaintingType;
}

const defaultColors = ['lime', 'yellow', 'blue', 'red'];

const getDefaultColors = (numColors: number) => [
  ...new Array(numColors).fill('').map((_, i) => defaultColors[i % defaultColors.length]),
];

export const Painting = ({ painting }: Props) => {
  const [slide, setSlide] = React.useState(0);

  const [colors, setColors] = React.useState([...getDefaultColors(painting.numColors)]);
  const [outline, setOutline] = React.useState('black');
  const [background, setBackground] = React.useState('white');

  const image = painting.renderContent(colors, outline, painting.iterations, slide);

  const nextSlide = React.useCallback(
    () => slide < painting.iterations.length && setSlide(slide + 1),
    [slide, painting.iterations.length]
  );
  const previousSlide = React.useCallback(() => slide > 0 && setSlide(slide - 1), [slide]);

  const handleKeyPress = React.useCallback(
    e => {
      const { key } = e;
      console.log(key);
      switch (key) {
        case 'ArrowRight':
          nextSlide();
          break;
        case 'ArrowLeft':
          previousSlide();
          break;
        default:
          break;
      }
    },
    [nextSlide, previousSlide]
  );

  React.useEffect(() => {
    window.addEventListener('keydown', handleKeyPress);
    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, [handleKeyPress]);

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
      <AspectRatio background={background} ratio={16 / 9}>
        <SvgImage svg={image} />
      </AspectRatio>
      <Center>
        <HStack>
          <Button onClick={() => previousSlide()}>{'<'}</Button>
          <Text>{slide}</Text>
          <Button onClick={() => nextSlide()}>{'>'}</Button>
        </HStack>
      </Center>
    </Stack>
  );
};
