import { Dimensions } from 'react-native';
import { styled } from 'styled-components/native';

const { width, fontScale } = Dimensions.get('window');

export const ViewRoot = styled.View`
  display: flex;
  height: 100%;
  width: ${width}px;
  justify-content: center;
  align-items: center;
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
  font-size: ${fontScale * 18}px;
`;

export const GroupButtons = styled.View`
  display: flex;
  flex-direction: row;
  gap: 25px;
`;

export const Button = styled.TouchableOpacity`
  display: flex;
  background-color: #f5f6f8;
  border-radius: 50px;
  padding: 15px 50px 15px 50px;
  flex-direction: row;
  align-items: center;
  gap: 25px;
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
  font-size: ${fontScale * 45}px;
  color: #000000;
`;

export const HeaderOptions = styled.View<{ viewTop?: number }>`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 18px;
  position: absolute;
  top: ${e => e.viewTop + 'px'};
  width: 100%;
  height: 80px;
  background-color: #f5f6f8;
`;

export const TitleHeaderText = styled.Text`
  color: #000000;
  font-size: ${fontScale * 28}px;
  font-weight: 600;
`;
