import { TextInput as BaseTextInput, Dimensions } from 'react-native';
import { styled } from 'styled-components/native';

const { width, fontScale } = Dimensions.get('window');

export const ViewRoot = styled.View`
  flex: 1;
  width: ${width}px;
  margin-top: 120px;
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
  font-size: ${fontScale * 18}px;
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

export const HeaderOptions = styled.View<{ viewTop?: number }>`
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
  font-size: ${fontScale * 28}px;
  font-weight: 600;
  color: #000000;
`;

export const ViewTextInputContainer = styled.View`
  flex: 1;
  width: ${width}px;
  display: flex;
  align-items: 'center';
  padding-top: 10px;
  position: 'relative';
  justify-content: 'center';
`;

export const ViewInput = styled.View`
  display: flex;
  justify-content: center;
  align-items: center;
  width: ${width}px;
  height: 80px;
  background-color: #eeeeee;
`;

export const TextInput = styled(BaseTextInput)`
  font-weight: 600;
  font-size: ${fontScale * 25}px;
  color: #000000;
  text-align: center;
  width: ${width}px;
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

export const ProgressStepContent = styled.View`
  display: flex;
  flex: 1;
  width: ${width}px;
`;

export const TextDescription = styled.Text`
  width: 350px;
  position: absolute;
  top: 25px;
  text-align: center;
  font-size: ${fontScale * 22}px;
`;

export const ButtonStep = styled.Pressable<{
  disabled?: boolean;
  finish?: boolean;
}>`
  width: ${width / 3}px;
  height: 50px;
  background-color: ${p =>
    p.disabled ? '#dddddd' : p.finish ? '#237a05' : '#021e7e'};
  border-radius: 12px;
  elevation: 4;
  padding: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const TextButton = styled.Text`
  color: #ffffff;
  font-weight: 600;
`;

export const ViewPayment = styled.View`
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  gap: 8px;
  elevation: 4;
`;
export const ViewPayContainer = styled.View`
  display: flex;
  padding: 10px;
  border-radius: 6px;
  width: 200px;
  justify-content: center;
  flex-direction: row;
  align-items: center;
  background-color: #dddddd;
  margin-bottom: 8px;
`;
export const TextPay = styled.Text`
  font-size: ${fontScale * 22}px;
  width: 220px;
  text-align: center;
`;
export const TextTotal = styled.Text`
  font-size: ${fontScale * 22}px;
  font-weight: 600;
  color: #021e7e;
`;
