import '../styles/globals.css';
import { Outfit } from "next/font/google";
import Link from "next/link";
import { ClerkProvider } from '@clerk/nextjs';
import { dark } from '@clerk/themes';

import Button from './components/Button';
import Header from '@/components/navbar/Header';
import AppContent from '@/components/AppContent';

const outfit = Outfit({ weight: '400', subsets: ["latin"] });




const RootLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {

  const navLinks : any = [
  ];

  return (
    <ClerkProvider
      appearance={{
        baseTheme: [dark],
        variables: {
          colorBackground: '#0e042c',
          colorPrimary: '#808cfb',
        },
        elements: {
          card: 'background-color: #0e042c;',
          buttonPrimary: 'background-color: #6875F5; color: white;',
          buttonPrimaryHover: 'background-color: #5865F2;',
          input: {
            backgroundColor: '#0e042c',
            borderColor: '#6875F5',
            color: '#fff',
            placeholderColor: '#aaa',
          },
        },
      }}
    >
      <html lang="en" className={outfit.className}>
        <body className="bg-[#0e042c] m-0 flex flex-col min-h-screen">
          <Header navLinks={navLinks} />
          <AppContent>
            {children}
          </AppContent>
          {/* <footer className="text-white py-8 max-w-4xl w-full mx-auto mt-20">
            <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-5 gap-8 text-center md:text-left">
              <div>
                <h4 className="font-bold mb-4">NextCreator</h4>
              </div>
              <div>
                <h4 className="font-bold mb-4">Services</h4>
                <ul>
                  <li><Link href="/coaching" className="hover:underline">Coaching</Link></li>
                  <li><Link href="/branding" className="hover:underline">Branding</Link></li>
                  <li><Link href="/content" className="hover:underline">Content</Link></li>
                </ul>
              </div>
              <div>
                <h4 className="font-bold mb-4">About</h4>
                <ul>
                  <li><Link href="/faq" className="hover:underline">FAQ</Link></li>
                  <li><Link href="/who-we-are" className="hover:underline">Who Are We?</Link></li>
                  <li><Link href="/why-us" className="hover:underline">Why Us?</Link></li>
                </ul>
              </div>
              <div>
                <h4 className="font-bold mb-4">Socials</h4>
                <ul>
                  <li><Link href="https://twitter.com" target="_blank" className="hover:underline">Twitter</Link></li>
                  <li><Link href="https://linkedin.com" target="_blank" className="hover:underline">LinkedIn</Link></li>
                  <li><Link href="https://instagram.com" target="_blank" className="hover:underline">Instagram</Link></li>
                </ul>
              </div>
              <div className="flex justify-center md:justify-end items-center">
                <Button href="/newsletter" className="text-sm text-center">
                  Join our newsletter
                </Button>
              </div>
            </div>
          </footer> */}
        </body>
      </html>
    </ClerkProvider>
  );
};

export default RootLayout;
