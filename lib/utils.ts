// lib/utils.ts
import QRCode from 'qrcode';

export function generateOTP(): string {
  return Math.random().toString().slice(2, 8).padStart(6, '0');
}

export async function generateQRCode(data: string): Promise<string> {
  return QRCode.toDataURL(data, {
    width: 256,
    margin: 2,
    color: {
      dark: '#000000',
      light: '#FFFFFF',
    },
  });
}
