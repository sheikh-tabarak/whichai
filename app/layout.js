import { Poppins } from "next/font/google";
import "./globals.css";
import Header from "@/app/components/header";
import Footer from "@/app/components/footer";

const poppins = Poppins({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-poppins',
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900']
});

export const metadata = {
  metadataBase: new URL(
    process.env.NODE_ENV === 'development'
      ? 'http://localhost:3000'
      : (process.env.NEXT_PUBLIC_APP_URL || 'https://whichai.sheikhtabarak.me')
  ),
  title: {
    default: 'Which AI | The Ultimate AI Empire',
    template: '%s | Which AI'
  },
  description: "Discover the world's most comprehensive directory of artificial intelligence tools. Curated, verified, and organized to help you find the perfect AI solution for your workflow.",
  keywords: ['AI tools', 'Artificial Intelligence Directory', 'Best AI Tools', 'Generative AI', 'ChatGPT Alternatives', 'Midjourney', 'AI Productivity', 'Machine Learning Tools'],
  authors: [{ name: 'Muhammad Tabarak', url: 'https://sheikhtabarak.me' }],
  creator: 'Muhammad Tabarak',
  publisher: 'SMT Digital Tech',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: '/',
    siteName: 'Which AI',
    title: 'Which AI | The Ultimate AI Empire',
    description: "Discover the world's most comprehensive directory of artificial intelligence tools.",
    images: [
      {
        url: '/api/og?title=Which%20AI&subtitle=The%20Ultimate%20AI%20Directory&type=Empire',
        width: 1200,
        height: 630,
        alt: 'Which AI Directory',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Which AI | The Ultimate AI Empire',
    description: "Discover the world's most comprehensive directory of artificial intelligence tools.",
    creator: '@smtdigitaltech',
    images: ['/api/og?title=Which%20AI&subtitle=The%20Ultimate%20AI%20Directory&type=Empire'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  appleWebApp: {
    title: 'Which AI',
  }
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={poppins.variable} suppressHydrationWarning>
      <body className="font-poppins antialiased" suppressHydrationWarning>
        <div className="h-full w-full fixed top-0 left-0 -z-10 bg-slate-950"></div>
        <Header />
        <main className="min-h-screen">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
