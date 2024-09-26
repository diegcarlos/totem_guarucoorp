import Logo from "@/assets/images/logo.png";
import Icon from "@expo/vector-icons/Feather";
import React from "react";
import { Image } from "react-native";
import Glob from "../Glob";
import {
  Language,
  TextNavigateEnd,
  TextNavigateInit,
  ViewHeader,
  ViewNavigate,
  ViewTextNavigate,
} from "./styled";

interface Props {
  dataLocation: {
    startAddress: string;
    endAddress: string;
    distance: string;
    valueDistance: number;
    duration: string;
    valueDuration: number;
    summary: string;
    warning: string;
  };
  onLanguage?: () => void;
}

export function NavigateView(props: Props) {
  const { dataLocation, onLanguage } = props;
  return (
    <ViewHeader>
      <ViewNavigate>
        <Language onPress={onLanguage}>
          <Glob fill="#000000" stroke={5} width={60} height={60} />
        </Language>
        <Image
          style={{ width: 190, height: 85, resizeMode: "contain" }}
          source={Logo}
        />
      </ViewNavigate>
      <ViewTextNavigate>
        <Icon name="chevron-left" size={24} />
        <TextNavigateInit numberOfLines={1}>
          {dataLocation.startAddress}
        </TextNavigateInit>
        <Icon name="arrow-right" size={16} />
        <TextNavigateEnd numberOfLines={1}>
          {dataLocation.endAddress}
        </TextNavigateEnd>
      </ViewTextNavigate>
    </ViewHeader>
  );
}
