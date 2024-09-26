import {styled} from 'styled-components/native';

export const TouchableOpacity = styled.Pressable`
  display: flex;
  flex-direction: row;
  gap: 4px;
  align-items: center;
  padding: 10px;
  border-bottom-color: '#ddd';
`;

export const ModalContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.5);
`;

export const ModalContent = styled.View`
  width: 300px;
  background-color: white;
  padding: 20px;
  border-radius: 10px;
`;

export const CloseButton = styled.TouchableOpacity`
  margin-top: 10px;
  align-items: center;
  padding: 10px;
`;

export const ModalTitle = styled.Text`
  font-size: 18px;
  color: #000000;
  font-weight: bold;
  margin-bottom: 10px;
`;

export const ImageText = styled.Image`
  width: 30px;
  height: 30px;
  background-size: cover;
`;

export const TextButton = styled.Text`
  color: #000000;
  font-weight: 600;
`;
