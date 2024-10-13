declare module '*.png' {}
declare module '*.jpg' {}
declare module '*.mp4' {}

declare module 'react-native-usb-thermal-printer' {
  export function onPrintDeviceList(): any;
  export function onPrintClear(id);
  export function onPrintCut(id: number, line?: boolean, beep?: boolean);
  export function onPrintImageBase64();
  export function onPrintImageURL();
  export function onPrintText(id: number, text: string, opts?: any);
  export function onPrintBarCode();
  export function onPrintQRCode();
  export function IPrinter();
  export function PrinterOptions();
  export function PrinterImageOptions();
}
