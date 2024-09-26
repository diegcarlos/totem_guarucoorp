import { styled } from "styled-components/native";

export const ViewRoot = styled.View`
  display: flex;
  height: 100%;
  justify-content: center;
  align-items: center;
  padding: 10px;
  position: relative;
`;

export const Header = styled.View`
  display: flex;
  width: 100%;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: absolute;
  padding: 15px;
  top: 0;
`;

export const HeaderTitle = styled.View`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
`;

export const HeaderContent = styled.View`
  display: flex;
  padding: 10px;
  align-items: center;
  justify-content: center;
  width: 100%;
`;

export const ImageHeader = styled.Image`
  height: 85px;
`;

export const IconLanguage = styled.View`
  position: absolute;

  right: 0;
`;
export const IconClose = styled.TouchableOpacity`
  position: absolute;

  left: 0;
`;

export const TextHeader = styled.Text`
  font-weight: 600;
  font-size: 18px;
`;

export const GroupButtons = styled.View`
  display: flex;
  gap: 25px;
`;

export const Button = styled.TouchableOpacity`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 25px;
`;
export const Image = styled.Image`
  width: 90px;
  height: 80px;
`;

export const ImageBackground = styled.Image`
  position: absolute;
  background-size: contain;
  width: 100%;
  height: 100%;
  z-index: -1;
  opacity: 0.5;
`;

export const TextButton = styled.Text`
  font-weight: 700;
  font-size: 45px;
`;
