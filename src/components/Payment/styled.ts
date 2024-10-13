import { Dimensions } from 'react-native';
import styled from 'styled-components/native';

const { width, height, fontScale } = Dimensions.get('screen');

export const ViewRoot = styled.View`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const ViewContainerCard = styled.View`
  padding: 8px;
  width: ${width}px;
  padding: 0 35px 0 35px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  gap: 10px;
  height: auto;
`;

export const ViewCard = styled.TouchableOpacity<{ select: boolean }>`
  width: ${width / 3.5}px;
  background-color: ${p => (p.select ? '#021e7e' : '#ffffff')};
  border-radius: 15px;
  border: 1px solid #021e7e;
  height: 96px;
`;

export const ViewHeader = styled.View`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 8px;
`;

export const ViewContent = styled.View`
  display: flex;
  align-items: center;
`;

export const TextContent = styled.Text<{ select: boolean }>`
  font-size: ${fontScale * 18}px;
  color: ${p => (p.select ? '#ffffff' : '#021e7e')};
`;
