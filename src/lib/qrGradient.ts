import QRCode from 'qrcode';

export interface GradientQROptions {
  width?: number;
  dotsColor?: string;
  margin?: number;
  gradientColors?: [string, string, string];
}

/**
 * Generates a clean, classic, high-contrast Black and White QR code.
 * (Pure black dots #000000 on pure white background #ffffff).
 */
export async function createGradientQRCode(
  url: string,
  options: GradientQROptions = {}
): Promise<string> {
  const { width = 340, margin = 1.5 } = options;

  if (!url) return '';

  try {
    return await QRCode.toDataURL(url, {
      width,
      margin,
      color: {
        dark: '#000000', // Pure black dots
        light: '#ffffff', // Pure white background
      },
      errorCorrectionLevel: 'H',
    });
  } catch (err) {
    console.error('[createQRCode] Error generating black & white QR code:', err);
    return '';
  }
}
