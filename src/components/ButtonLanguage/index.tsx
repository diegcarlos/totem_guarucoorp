import React, { useState } from "react";
import { Alert } from "react-native";
import Glob from "../Glob";
import { Language } from "./styled";

interface Props {
  fill: string;
  stroke: number;
  width: number;
  height: number;
}

export default function ButtonLanguage(props: Props) {
  const { fill, height, stroke, width } = props;
  const [isOpen, setIsOpen] = useState(false);

  const handlePressLang = () => {
    Alert.prompt("lingua");
  };
  return (
    <Language
      onPress={() => {
        setIsOpen(!isOpen);
      }}
    >
      <Glob fill={fill} stroke={stroke} width={width} height={height} />
    </Language>
  );
}
