import { AntdRegistry } from '@ant-design/nextjs-registry';
import AntProvider from '@components/common/AntProvider';
import StoreProvider from '@components/common/StoreProvider';
import { Jost, Playfair_Display } from 'next/font/google';
import './globals.css';

// next.js google fonts Jost & Playfair Display
const jost = Jost({
  subsets: ['latin'],
  variable: '--font-jost',
  weight: ['300', '400', '500', '600', '700', '800'],
  display: 'swap',
  adjustFontFallback: false,
});
const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  weight: ['400', '600', '700'],
  style: ['normal', 'italic'],
  display: 'swap',
  adjustFontFallback: false,
});

export const metadata = {
  title: {
    default: 'Glamora',
    template: '%s ― Glamora',
  },
  description:
    'Glamora is your premier authentic beauty shopping destination, offering over 10,000+ products from 450+ globally trusted brands. Dedicated to bringing out your unique glow with verified quality.',
  authors: { name: 'Silicon Orchard Ltd.', url: 'https://siliconorchard.com' },
};

export default function RootLayout({ children }: { readonly children: React.ReactNode }) {
  return (
    <html lang='en' className={`${jost.className} ${playfair.className}`}>
      <body>
        <AntdRegistry>
          <StoreProvider>
            <AntProvider>{children}</AntProvider>
          </StoreProvider>
        </AntdRegistry>
      </body>
    </html>
  );
}
