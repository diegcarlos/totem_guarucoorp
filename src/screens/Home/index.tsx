import * as React from 'react';
import {Pressable, Video} from './styled';
//@ts-ignore
import {Text} from 'react-native';
import {ResizeMode, VideoRef} from 'react-native-video';
import coorp from '../../assets/videos/COORP_HOME.mp4';

export default function Home(props: any) {
  const {navigation} = props;
  const videoRef = React.useRef<VideoRef>(null);
  return (
    <Pressable onPress={() => navigation.push('content')}>
      <Text>abc</Text>
      <Video
        ref={videoRef}
        source={coorp}
        controls={false}
        repeat={true}
        resizeMode={ResizeMode.STRETCH}
      />
    </Pressable>
  );
}
