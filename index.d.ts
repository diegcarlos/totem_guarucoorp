declare module '*.png' {}
declare module '*.jpg' {}
declare module '*.mp4' {}

declare module 'react-native-usb-thermal-printer' {
  export function onPrintDeviceList(): any;
  export function onPrintClear(id);
  export function onPrintCut(id: any, line: number, beep: boolean);
  export function onPrintImageBase64();
  export function onPrintImageURL();
  export function onPrintText();
}
