import { Dimensions } from 'react-native';
import { styled } from 'styled-components/native';

const { width, fontScale } = Dimensions.get('window');

export const ViewRoot = styled.View`
  position: relative;
  width: 100%;
  height: 100%;
  flex: 1;
  justify-content: center;
  align-items: center;
`;

export const Box = styled.View`
  position: absolute;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const SubBox = styled.Pressable<{ margin?: string }>`
  padding: 5px 15px 5px 15px;
  position: absolute;
  background-color: red;
  z-index: 10;
  margin-left: 15px;
  margin-right: 15px;
  bottom: 5px;
  display: flex;
  flex: 1;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin-top: ${p => p.margin};
  border-radius: 50px;
  opacity: 0.7;
  min-width: ${width - 60}px;
  height: 50px;
  background-color: black;
  position: absolute;
  z-index: 99;
  color: #ffffff;
  top: 0;
`;

export const SectionList = styled.View`
  min-width: 300px;
  max-width: 300px;
  padding: 0 8px 8px 0;
  background-color: #000000;
  opacity: 0.7;
  position: absolute;
  color: #ffffff;
  top: 48%;
  border-radius: 10px;
  display: flex;
  align-items: center;
  line-height: 3px;
  overflow: auto;
`;

export const TextInput = styled.TextInput`
  color: #ffffff;
  height: 100%;
  font-weight: 700;
  font-size: ${fontScale + 15}px;
  text-align: center;
`;

export const TouchableOpacity = styled.TouchableOpacity`
  display: flex;
  height: 75px;
  width: 99%;
  padding: 15px;
  box-sizing: content-box;
  justify-content: center;
  flex-direction: row;
  gap: 8px;
  align-items: center;
`;

export const Text = styled.Text`
  display: flex;
  font-size: 18px;
  color: #000000;
  width: 100%;
  text-align: justify;
  font-weight: 700;
  justify-content: center;
  gap: 2px;
`;

export const Divider = styled.View`
  border: 0.2px solid #000;
  opacity: 0.2;
  width: 98%;
`;

export const ViewList = styled.View<{ isOpen: boolean }>`
  position: absolute;
  padding: 10px;
  bottom: 0;
  background-color: #fff;
`;

export const ViewInitEnd = styled.View`
  position: absolute;
  display: flex;
  flex-direction: row;
  padding: 0 15px 0 15px;
  gap: 10px;
  z-index: 99;
  top: 0px;
  margin-top: 50px;
  width: 100%;
  height: 90px;
`;

export const ViewRota = styled.TouchableOpacity`
  display: flex;
  flex-direction: row;
  height: 100%;
  background-color: red;
  justify-content: start;
  overflow: hidden;
  align-items: center;
  background-color: #fff;
  width: 100%;
  padding-left: 15px;
  flex: 1;
  border-radius: 50px;
  gap: 12px;
  elevation: 4;
`;

export const GroupViewRota = styled.View`
  height: 100%;
  width: 80%;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

export const GroupTextRota = styled.View`
  position: relative;
  text-align: center;
  gap: 6px;
  display: flex;
  align-items: center;
  flex-direction: row;
`;

export const TextRota = styled.Text`
  font-weight: 800;
  font-size: 16px;
`;

export const BackClear = styled.Pressable`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #fff;
  width: 85px;
  height: 100%;
  border-radius: 50px;
  elevation: 4;
`;
