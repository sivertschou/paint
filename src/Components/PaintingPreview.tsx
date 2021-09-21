import * as React from 'react';
import { SvgImage } from './SVGImage';
import { Painting } from '../types';
import { AspectRatio } from '@chakra-ui/layout';

interface Props {
  painting: Painting;
  colors: string[];
  outline: string;
  background: string;
}

export const PaintingPreview = ({ painting, colors, outline, background }: Props) => {
  const image = painting.renderContent(colors, outline, painting.iterations, painting.iterations.length);

  return (
    <AspectRatio ratio={16 / 9} background={background}>
      <SvgImage svg={image} />
    </AspectRatio>
  );
};
