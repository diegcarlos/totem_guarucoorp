import React, { useState } from 'react';
import Glob from '../Glob';
import { Language } from './styled';

interface Props {
  fill: string;
  stroke: number;
  width: number;
  height: number;
}

export default function ButtonLanguage(props: Props) {
  const { fill, height, stroke, width } = props;
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Language
      onPress={() => {
        setIsOpen(!isOpen);
      }}>
      <Glob fill={fill} width={width} height={height} />
    </Language>
  );
}
