import { styled } from "styled-components/native";

export const ViewHeader = styled.View`
  height: 120px;
  z-index: 1;
  width: 100%;
  top: 0;
  background-color: #f5f6f8;
  position: absolute;
`;

export const ViewNavigate = styled.View`
  display: flex;
  position: relative;
  align-items: center;
  justify-content: center;
  flex-direction: row;
`;
export const ViewTextNavigate = styled.View`
  display: flex;
  gap: 3px;
  align-items: center;
  flex-direction: row;
`;

export const TextNavigateInit = styled.Text`
  font-size: 16px;
  width: 30%;
`;
export const TextNavigateEnd = styled.Text`
  font-size: 16px;
  width: 58%;
`;

export const Language = styled.TouchableOpacity`
  position: absolute;
  right: 10px;
`;
