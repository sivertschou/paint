import * as React from 'react';
import { Stack, Button, HStack, Input, Text, Center, AspectRatio } from '@chakra-ui/react';
import { SvgImage } from './SVGImage';
import { FullScreen, useFullScreenHandle } from 'react-full-screen';
import { useHistory, useLocation, useParams } from 'react-router';
import { paintings } from '../svgs/paintings';
import { defaultColors, colors as predefinedColors } from '../colors';
import { shiftArray } from './PaintingOverview';

const getDefaultColors = (numColors: number) => [
  ...new Array(numColors).fill('').map((_, i) => defaultColors[i % defaultColors.length]),
];

const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};

export const Painting = () => {
  const handle = useFullScreenHandle();
  const [slide, setSlide] = React.useState(0);

  const { name } = useParams<{ name: string }>();
  const query = useQuery();
  const history = useHistory();

  const paintingByName = paintings.find(painting => painting.name === name);
  const painting = paintingByName || { iterations: [], name: 'none', numColors: 0, renderContent: () => null };

  const [colors, setColors] = React.useState([...getDefaultColors(painting.numColors)]);
  const [previewColors, setPreviewColors] = React.useState([...getDefaultColors(painting.numColors)]);
  const [outline, setOutline] = React.useState('black');
  const [background, setBackground] = React.useState('white');
  const [presentationMode, setPresentationMode] = React.useState(false);

  const processedColors = previewColors.map(color => (predefinedColors.includes(color) ? color : '#' + color));

  const image = painting.renderContent(
    processedColors,
    outline,
    painting.iterations,
    !presentationMode ? painting.iterations.length : slide
  );

  const nextSlide = React.useCallback(() => {
    slide < painting.iterations.length && setSlide(slide + 1);
  }, [slide, painting.iterations.length]);

  const previousSlide = React.useCallback(() => {
    slide > 0 && setSlide(slide - 1);
  }, [slide]);

  const updateColors = React.useCallback(
    (newColors: string[]) => {
      if (!newColors.every((c, i) => c === colors[i])) {
        // update colors and url
        history.push(`/painting/${painting.name}?colors=${newColors.join(',')}${presentationMode ? '&present' : ''}`);
      }
    },
    [colors, history, painting.name, presentationMode]
  );

  const handleKeyPress = React.useCallback(
    ({ key }) => {
      if (document.activeElement?.tagName === 'INPUT') {
        return;
      }
      if (presentationMode) {
        switch (key) {
          case 'ArrowRight':
            nextSlide();
            break;
          case 'ArrowLeft':
            previousSlide();
            break;

          case 'f':
            !handle.active && handle.enter();
            handle.active && handle.exit();
            break;
          default:
            break;
        }
      } else {
        switch (key) {
          case 'ArrowRight':
            updateColors(shiftArray('right', previewColors));
            break;
          case 'ArrowLeft':
            updateColors(shiftArray('left', previewColors));

            break;
          default:
            break;
        }
      }
    },
    [nextSlide, previousSlide, handle, updateColors, previewColors, presentationMode]
  );

  React.useEffect(() => {
    window.addEventListener('keydown', handleKeyPress);
    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, [handleKeyPress]);

  React.useEffect(() => {
    const queryColors = query.get('colors')?.split(',');
    console.log('query.get("colors")', query.get('colors'));
    if (queryColors) {
      const isDifferent = queryColors.every((_, i) => queryColors[i] === colors[i]);
      if (!isDifferent) {
        setColors(queryColors);
        setPreviewColors(queryColors);
      }
    }

    const present = query.get('present');
    if (!presentationMode && present !== null) {
      setPresentationMode(true);
    } else if (presentationMode && present !== '') {
      setPresentationMode(false);
    }
  }, [colors, query, presentationMode]);

  if (!paintingByName || !image) {
    return <Text>Ikke funnet</Text>;
  }

  return (
    <Center>
      <Stack width={{ base: '100%', md: '75%', lg: '60%' }}>
        <Button onClick={() => history.push('/')}>Go back</Button>
        <HStack>
          {previewColors.map((color, i) => (
            <Input
              value={color}
              onChange={e =>
                setPreviewColors(prev => [...prev].map((color, idx) => (idx === i ? e.target.value : color)))
              }
              onBlur={_e => {
                updateColors(previewColors);
              }}
              key={i}
            />
          ))}

          <Input value={outline} onChange={e => setOutline(e.target.value)} />
          <Input value={background} onChange={e => setBackground(e.target.value)} />
        </HStack>
        <HStack>
          <Button width="100%" onClick={() => updateColors(shiftArray('left', previewColors))}>
            {'< Shift colors left'}
          </Button>
          <Button width="100%" onClick={() => updateColors(shiftArray('right', previewColors))}>
            {'Shift colors right >'}
          </Button>
        </HStack>
        <FullScreen handle={handle}>
          <Center height="100%">
            <AspectRatio ratio={16 / 9} background={background} width="100%">
              <SvgImage svg={image} />
            </AspectRatio>
          </Center>
        </FullScreen>
        <Button
          onClick={() => {
            !handle.active && handle.enter();
          }}
        >
          Fullscreen
        </Button>
        <Center>
          {presentationMode ? (
            <HStack>
              <Button onClick={() => previousSlide()}>{'<'}</Button>
              <Text>{slide}</Text>
              <Button onClick={() => nextSlide()}>{'>'}</Button>
            </HStack>
          ) : (
            <HStack>
              <Button
                onClick={() => {
                  const { pathname, search } = history.location;
                  history.push(`${pathname}${search}&present`);
                }}
              >
                Present
              </Button>
            </HStack>
          )}
        </Center>
      </Stack>
    </Center>
  );
};
