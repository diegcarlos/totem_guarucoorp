import { Dimensions } from 'react-native';
import styled from 'styled-components/native';

const { height, fontScale } = Dimensions.get('window');

const heightInput = height * 0.06;

export const RootView = styled.SafeAreaView`
  display: flex;
  gap: 15px;
  flex: 1;
  width: 100%;
  height: 100%;
  background-color: '#f0f0f0';
`;

export const BoxInput = styled.View`
  padding-top: 120px;
  background-color: white;
  padding-bottom: 15px;
`;

export const ViewInput = styled.View`
  height: ${heightInput}px;
  position: relative;
  display: flex;
  justify-content: center;
  margin: 0px 15px 10px 15px;
  background-color: white;
  border-radius: 15px;
  elevation: 4;
`;

export const Dots = styled.View<{
  cor: 'green' | 'orange';
  absolute?: boolean;
}>`
  position: ${e => e.absolute && 'absolute'};
  width: 25px;
  height: 25px;
  border-radius: 50px;
  margin-left: 18px;
  background-color: ${e => e.cor};
  border: solid 5px #f0f0f0;
`;

export const Input = styled.TextInput`
  margin-left: 65px;
  margin-right: 25px;
  font-size: ${fontScale * 18}px;
  color: #474747;
  font-weight: 600;
`;

export const ScrollList = styled.View`
  flex: 1;
  display: flex;
  position: relative;
  background-color: white;
`;

export const Li = styled.TouchableOpacity`
  display: flex;
  height: auto;
  width: 99%;
  padding: 15px;
  box-sizing: content-box;
  justify-content: start;
  flex-direction: row;
  gap: 8px;
  align-items: center;
`;

export const ViewText = styled.View`
  margin-left: 18px;
  display: flex;
  flex-direction: column;
  position: relative;
`;

export const TextInput = styled.Text`
  margin-left: 65px;
  overflow: hidden;
  text-overflow: ellipsis;
  margin-right: 25px;
  font-size: ${fontScale * 18}px;
  font-weight: 700;
  color: #474747;
`;

export const TextMain = styled.Text`
  display: flex;
  flex-wrap: wrap;
  height: auto;
  font-size: 22px;
  font-weight: 800;
  color: #474747;
`;

export const TextSecondary = styled.Text`
  font-size: 16px;
  font-weight: 500;
  color: #adadad;
  color: #474747;
`;

export const TextKms = styled.Text`
  position: absolute;
  font-size: 14px;
  color: #474747;
  font-weight: 600;
  top: 8px;
  right: 8px;
`;

export const ViewEmpty = styled.View`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const TextEmpty = styled.Text`
  font-size: 18px;
  color: #474747;
`;

export const LoadingPress = styled.View`
  width: 100%;
  z-index: 30;
  height: 100%;
  background-color: #000;
  opacity: 0.8;
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const TextLoadingPress = styled.Text`
  display: flex;
  flex-direction: column;
  justify-content: center;
  font-size: ${fontScale * 25}px;
  color: #fff;
  color: #474747;
`;
