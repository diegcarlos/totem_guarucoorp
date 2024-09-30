import { Dimensions } from 'react-native';
import styled from 'styled-components/native';

const { fontScale } = Dimensions.get('window');

export const Container = styled.View`
  display: flex;
  gap: 15px;
  position: absolute;
  bottom: 0;
  width: 100%;
  background-color: #f0f0f0;
`;

export const Lang = styled.View`
  position: absolute;
  top: -90px;
  right: 10px;
  width: 75px;
  height: 75px;
  border-radius: 50px;
  background-color: #fff;
`;

export const Card = styled.View`
  background-color: #fff;
`;

export const CardHeader = styled.View`
  display: flex;
  justify-content: center;
  align-items: center;
  border-bottom-width: 1px;
  border-color: #dedede;
  padding: 10px;
`;
export const CardTitle = styled.Text`
  font-size: ${fontScale + 25}px;
  font-weight: 600;
`;

export const CardContent = styled.View<{ cor?: 'blue' | 'orange' }>`
  border-left-width: 8px;
  border-color: ${e => e.cor};
  display: flex;
  align-items: center;
  flex-direction: row;
`;

export const DataContent = styled.View`
  padding: 20px;
  width: 90%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  gap: 35px;
`;

export const Trajeto = styled.View`
  display: flex;
  flex: 1;
`;

export const TextMain = styled.Text`
  font-size: ${fontScale * 25}px;
  font-weight: 700;
`;
export const TextWng = styled.Text`
  font-weight: 500;
  font-size: ${fontScale * 18}px;
`;

export const KmsTimeView = styled.View``;

export const TextTime = styled.Text`
  color: green;
  font-size: ${fontScale * 18}px;
  font-weight: 500;
`;
export const TextKms = styled.Text`
  font-size: ${fontScale * 18}px;
  font-weight: 500;
`;

export const TextTotal = styled.Text`
  font-size: ${fontScale * 24}px;
  font-weight: 600;
  padding: 15px;
`;

export const ConfirmPress = styled.Pressable`
  height: 100%;
  width: 100%;
  background-color: #021e7e;
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 1;
`;

export const TextConfirm = styled.Text`
  font-size: ${fontScale * 24}px;
  color: #fff;
  elevation: 3;
`;
