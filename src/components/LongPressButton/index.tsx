import React, { useState } from 'react';
import type { TouchableOpacityProps } from 'react-native';
import { Pressable } from 'react-native';

interface Props extends TouchableOpacityProps {
  children: React.ReactNode;
  onPressContinuous?: () => void;
}

const LongPressButton = (props: Props) => {
  const { children, onPressContinuous, ...rest } = props;
  const [timeoutId, setTimeoutId] = useState<any>(null);

  const handlePressIn = () => {
    const id = setTimeout(() => {
      onPressContinuous?.();
    }, 6000);
    setTimeoutId(id);
  };

  const handlePressOut = () => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
  };

  return (
    <Pressable {...rest} onPressIn={handlePressIn} onPressOut={handlePressOut}>
      {children}
    </Pressable>
  );
};

export default LongPressButton;
