import * as React from 'react';
import { Image } from '@chakra-ui/react';

export const SvgImage = ({ svg }: { svg: string }) => (
  <Image src={`data:image/svg+xml;utf8,${encodeURIComponent(svg)}`} />
);
