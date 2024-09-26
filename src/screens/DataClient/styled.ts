import {TextInput as BaseTextInput} from 'react-native';
import {styled} from 'styled-components/native';

export const ViewRoot = styled.View`
  display: flex;
  height: 100%;
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

export const TextHeader = styled.Text`
  font-weight: 600;
  font-size: 18px;
  color: #000000;
`;

export const ImageBackground = styled.Image`
  position: absolute;
  background-size: contain;
  width: 100%;
  height: 100%;
  z-index: -1;
  opacity: 0.5;
`;

export const HeaderOptions = styled.View<{viewTop?: number}>`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 18px;
  position: absolute;
  top: ${e => e.viewTop + 'px'};
  width: 100%;
  height: 80px;
  background-color: #f5f6f8;
`;

export const ViewBack = styled.View``;

export const TitleHeaderText = styled.Text`
  font-size: 28px;
  font-weight: 600;
  color: #000000;
`;

export const TextInput = styled(BaseTextInput)`
  font-weight: 600;
  font-size: 30px;
  color: #000000;
  text-align: center;
  width: 90%;
  height: 80px;
`;

export const Content = styled.View`
  background-color: #ffffff;
  display: inline;
  justify-content: center;
  align-items: center;
  position: absolute;
  padding: 5px;
  width: 100%;
  height: 80px;
  bottom: 0;
`;
