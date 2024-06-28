import { Inter } from "next/font/google";
import "./globals.css";

// import { Poppins } from 'next/font/google';

import { Poppins } from "next/font/google";
import Header from "@/app/components/header";
import Footer from "@/app/components/footer";
import { ErrorBoundary } from "next/dist/client/components/error-boundary";

const poppins = Poppins({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-poppins',
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900']
});

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Which AI",
  description: "Welcome to Which AI, your ultimate directory for discovering useful and innovative AI tools from around the globe. With the rapid pace of AI development, countless tools are released daily, making it challenging to find the perfect solution for your specific needs. Our mission is to simplify this process by curating a comprehensive and easily navigable collection of AI tools, ensuring you find exactly what you need.",
};

export default function RootLayout({ children }) {
  return (
    <ErrorBoundary>
    <html className={`${poppins.variable}`} lang="en">   
    <link rel="shortcut icon" href="favicon.png" type="image/x-icon" />   
      <body  className={`${poppins.variable}`}>
      <div className="h-full w-full object-cover fixed top-0 right-auto left-auto -z-10 bg-gradient-to-tl from-slate-950  to-slate-950"></div>
      {/* <div className="h-full w-full object-cover fixed top-0 right-auto left-auto -z-10 animated-background bg-gradient-to-r from-slate-950  via-purple-950 to-indigo-950"></div> */}
        {/* <video className='h-full w-full object-cover fixed top-0 right-auto left-auto -z-10' autoPlay loop muted src="bgparticles2.mp4"></video> */}
        <Header/>
        {children}
        <Footer/>
        </body>
    </html>
    </ErrorBoundary>
  );
}
