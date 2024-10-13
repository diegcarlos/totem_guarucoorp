import * as React from 'react';
import { Pressable } from './styled';
//@ts-ignore
import { Dimensions } from 'react-native';
import Video, { ResizeMode, VideoRef } from 'react-native-video';
import coorp from '../../assets/videos/COORP_HOME.mp4';

export default function Home(props: any) {
  const { height, width } = Dimensions.get('screen');
  const { navigation } = props;
  const videoRef = React.useRef<VideoRef>(null);
  return (
    <Pressable onPress={() => navigation.push('content')}>
      <Video
        style={{ height, width, flex: 1 }}
        ref={videoRef}
        source={coorp}
        controls={false}
        repeat={true}
        resizeMode={ResizeMode.STRETCH}
      />
    </Pressable>
  );
}
