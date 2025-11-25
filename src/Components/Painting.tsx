import * as React from 'react';
import {
  Stack,
  Button,
  HStack,
  Input,
  Text,
  Center,
  AspectRatio,
  Kbd,
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogBody,
  AlertDialogHeader,
  AlertDialogFooter,
} from '@chakra-ui/react';
import { SvgImage } from './SVGImage';
import { FullScreen, useFullScreenHandle } from 'react-full-screen';
import { useNavigate, useLocation, useParams } from 'react-router-dom';
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
  const navigate = useNavigate();
  const location = useLocation();

  const paintingByName = paintings.find(painting => painting.name === name);
  const painting = paintingByName || { iterations: [], name: 'none', numColors: 0, renderContent: () => null };

  const [colors, setColors] = React.useState([...getDefaultColors(painting.numColors)]);
  const [previewColors, setPreviewColors] = React.useState([...getDefaultColors(painting.numColors)]);
  const [outline, setOutline] = React.useState('black');
  const [background, setBackground] = React.useState('white');
  const [presentationMode, setPresentationModeState] = React.useState(false);
  const [presentationModeExitWarningIsOpen, setPresentationModeExitWarningIsOpen] = React.useState(false);
  const cancelExitPresentationModeRef = React.useRef<any>();
  const presentationModeExitWarningOnClose = () => setPresentationModeExitWarningIsOpen(false);

  const processedColors = previewColors.map(color => (predefinedColors.includes(color) ? color : '#' + color));
  const outlineColor = predefinedColors.includes(outline) ? outline : '#' + outline;
  const backgroundColor = predefinedColors.includes(background) ? background : '#' + background;

  const textShadow = `0px 0px 0.6vh black`;
  const image = painting.renderContent(
    processedColors,
    outlineColor,
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

        const queryParams = new URLSearchParams(location.search);
        queryParams.set('colors', newColors.toString());
        navigate('?' + queryParams.toString(), { replace: true });
      }
    },
    [colors, location.search, navigate]
  );

  const setPresentationMode = React.useCallback(
    (present: boolean) => {
      const queryParams = new URLSearchParams(location.search);
      queryParams.set('present', present.toString());
      navigate('?' + queryParams.toString(), { replace: true });
    },
    [location.search, navigate]
  );

  const handleKeyPress = React.useCallback(
    ({ key }: { key: string }) => {
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

          case 'p':
            setPresentationMode(true);
            break;

          default:
            break;
        }
      }
    },
    [nextSlide, previousSlide, handle, updateColors, previewColors, presentationMode, setPresentationMode]
  );

  React.useEffect(() => {
    window.addEventListener('keydown', handleKeyPress);
    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, [handleKeyPress]);

  React.useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const queryColors = queryParams.get('colors')?.split(',');
    if (queryColors) {
      const isDifferent = queryColors.every((_, i) => queryColors[i] === colors[i]);
      if (!isDifferent) {
        setColors(queryColors);
        setPreviewColors(queryColors);
      }
    }

    const present = queryParams.get('present') === 'true';
    if (!presentationMode && present) {
      setPresentationModeState(true);
    } else if (presentationMode && !present) {
      setPresentationModeState(false);
    }
  }, [colors, query, presentationMode, location.search]);

  if (!paintingByName || !image) {
    return <Text>Ikke funnet</Text>;
  }

  return (
    <Center>
      <Stack width={{ base: '100%', md: '75%', lg: '60%' }}>
        <Button onClick={() => navigate('/')}>← Back to motive selection</Button>
        {!presentationMode ? (
          <>
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
                {'← Shift colors left'}
              </Button>
              <Button width="100%" onClick={() => updateColors(shiftArray('right', previewColors))}>
                {'Shift colors right →'}
              </Button>
            </HStack>
          </>
        ) : null}
        <FullScreen handle={handle}>
          <Center height="100%" backgroundColor="black">
            <AspectRatio ratio={16 / 9} background={backgroundColor} width="100%">
              <SvgImage svg={image} />
            </AspectRatio>
            {handle.active ? (
              <HStack position="fixed" bottom="2">
                <Button colorScheme="ghost" onClick={() => previousSlide()}>
                  <Text color="white" textShadow={textShadow}>
                    ←
                  </Text>
                </Button>
                <Button colorScheme="ghost" onClick={() => handle.active && handle.exit()}>
                  <Text color="white" textShadow={textShadow}>
                    Exit
                  </Text>
                </Button>
                <Button colorScheme="ghost" onClick={() => nextSlide()}>
                  <Text color="white" textShadow={textShadow}>
                    →
                  </Text>
                </Button>
              </HStack>
            ) : null}
          </Center>
        </FullScreen>
        <Center width="100%" paddingBottom="10">
          {presentationMode ? (
            <Stack width="100%">
              <HStack width="100%">
                <Button onClick={() => previousSlide()} width="100%">
                  {'← Previous'}
                </Button>
                <Text fontWeight="bold">{slide}</Text>
                <Button onClick={() => nextSlide()} width="100%">
                  {'Next →'}
                </Button>
              </HStack>

              <Button
                onClick={() => {
                  !handle.active && handle.enter();
                }}
              >
                Fullscreen
              </Button>
              <Button colorScheme="red" onClick={() => setPresentationModeExitWarningIsOpen(true)}>
                Exit presentation mode
              </Button>
            </Stack>
          ) : (
            <HStack>
              <Button onClick={() => setPresentationMode(true)}>Present</Button>
            </HStack>
          )}
        </Center>
        <Stack>
          <Text fontWeight="bold" fontSize="xl">
            Keyboard shortcuts
          </Text>

          <Text fontWeight="bold" fontSize="l">
            In presentation mode
          </Text>
          <Table variant="simple">
            <Thead>
              <Tr>
                <Th>Key</Th>
                <Th>Action</Th>
              </Tr>
            </Thead>
            <Tbody>
              <Tr>
                <Td>
                  <Kbd>F</Kbd>
                </Td>
                <Td>Toggle fullscreen mode</Td>
              </Tr>
              <Tr>
                <Td>
                  <Kbd>Esc</Kbd>
                </Td>
                <Td>Exit fullscreen mode</Td>
              </Tr>
              <Tr>
                <Td>
                  <Kbd>←</Kbd>
                </Td>
                <Td>Previous step</Td>
              </Tr>
              <Tr>
                <Td>
                  <Kbd>→</Kbd>
                </Td>
                <Td>Next step</Td>
              </Tr>
            </Tbody>
          </Table>
          <Text fontWeight="bold" fontSize="l">
            In edit mode
          </Text>
          <Table variant="simple">
            <Thead>
              <Tr>
                <Th>Key</Th>
                <Th>Action</Th>
              </Tr>
            </Thead>
            <Tbody>
              <Tr>
                <Td>
                  <Kbd>←</Kbd>
                </Td>
                <Td>Shift colors left</Td>
              </Tr>
              <Tr>
                <Td>
                  <Kbd>→</Kbd>
                </Td>
                <Td>Shift colors right</Td>
              </Tr>
            </Tbody>
          </Table>
        </Stack>
      </Stack>
      <AlertDialog
        isOpen={presentationModeExitWarningIsOpen}
        leastDestructiveRef={cancelExitPresentationModeRef}
        onClose={presentationModeExitWarningOnClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Exit presentation mode
            </AlertDialogHeader>
            <AlertDialogBody>
              Are you sure you want to exit presentation mode? The whole motive will be revealed by exiting presentation
              mode.
            </AlertDialogBody>

            <AlertDialogFooter>
              <HStack>
                <Button
                  colorScheme="red"
                  onClick={() => {
                    setPresentationMode(false);
                    presentationModeExitWarningOnClose();
                  }}
                >
                  Exit presentation mode
                </Button>
                <Button ref={cancelExitPresentationModeRef} onClick={presentationModeExitWarningOnClose}>
                  Cancel
                </Button>
              </HStack>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </Center>
  );
};
