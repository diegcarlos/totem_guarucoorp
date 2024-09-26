import React, {useEffect, useRef} from 'react';
import RBSheet from 'react-native-raw-bottom-sheet';

export default function BottomSheet({children, isOpen}: any) {
  const refRBSheet = useRef();

  useEffect(() => {
    if (isOpen) {
      refRBSheet.current.open();
    } else {
      refRBSheet.current.close();
    }
  }, [isOpen]);

  return (
    <RBSheet
      ref={refRBSheet}
      draggable
      customModalProps={{
        animationType: 'slide',
        statusBarTranslucent: true,
      }}
      customStyles={{
        wrapper: {
          backgroundColor: 'transparent',
        },
        container: {
          height: 400,
          top: 25,
          borderTopLeftRadius: 10,
          borderTopRightRadius: 10,
        },
        draggableIcon: {
          width: 80,
        },
      }}>
      {children}
    </RBSheet>
  );
}
