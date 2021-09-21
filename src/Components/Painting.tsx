import * as React from 'react';
import { Stack, Button, HStack, Input, Text, Center, AspectRatio } from '@chakra-ui/react';
import { SvgImage } from './SVGImage';
import { Painting as PaintingType } from '../types';
import { FullScreen, useFullScreenHandle } from 'react-full-screen';
import { useParams } from 'react-router';
import { paintings } from '../svgs/paintings';
const defaultColors = ['lime', 'yellow', 'blue', 'red'];

const getDefaultColors = (numColors: number) => [
  ...new Array(numColors).fill('').map((_, i) => defaultColors[i % defaultColors.length]),
];

export const Painting = () => {
  const handle = useFullScreenHandle();
  const [slide, setSlide] = React.useState(0);

  const { name } = useParams<{ name: string }>();

  const paintingByName = paintings.find(painting => painting.name === name);
  const painting = paintingByName || { iterations: [], name: 'none', numColors: 0, renderContent: () => null };

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
    ({ key }) => {
      console.log('handle.active:', handle.active);
      if (document.activeElement?.tagName === 'INPUT') {
        return;
      }

      switch (key) {
        case 'ArrowRight':
          nextSlide();
          break;
        case 'ArrowLeft':
          previousSlide();
          break;

        case 'f':
          console.log('fullscreen: handle.active:', handle.active);
          !handle.active && handle.enter();
          handle.active && handle.exit();
          break;
        default:
          break;
      }
    },
    [nextSlide, previousSlide, handle]
  );

  React.useEffect(() => {
    window.addEventListener('keydown', handleKeyPress);
    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, [handleKeyPress]);

  if (!paintingByName) {
    return <Text>Ikke funnet</Text>;
  }

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
      <FullScreen handle={handle}>
        <Center height="100%">
          <AspectRatio ratio={16 / 9} background={background} width="100%">
            <SvgImage svg={image} />
          </AspectRatio>
        </Center>
      </FullScreen>
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
