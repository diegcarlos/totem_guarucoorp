import ReactVideo from 'react-native-video';
import {styled} from 'styled-components/native';

export const Pressable = styled.Pressable`
  position: relative;
  flex: 1;
  background-color: red;
  justify-content: center;
  align-items: center;
`;

export const Video = styled(ReactVideo)`
  position: absolute;
  pointer-events: none;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
`;
