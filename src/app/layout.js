import "./globals.css";
import { Cinzel_Decorative, Playfair_Display, Inter } from "next/font/google";
import NavbarWrapper from "@/components/NavbarWrapper";
import FooterWrapper from "@/components/FooterWrapper";
import ReduxProvider from "@/redux/ReduxProvider";
import ToastProvider from "@/components/ToastProvider";
import AuthInit from "@/components/AuthInit";
import ScrollToTop from "@/components/SrollToTop";

const cinzel = Cinzel_Decorative({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-cinzel",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-playfair",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-inter",
});

export const metadata = {
   title: "Coffee & Joy",
   description: "Next.js layout with navbar sidebar footer",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${cinzel.variable} ${playfair.variable} ${inter.variable}`}>
      <body className="bg-black text-white font-sans min-h-screen">  
        <ReduxProvider>
          <AuthInit/>
          <NavbarWrapper />
            <ScrollToTop/>
           <main className="min-h-screen">
            {children}
          </main>
          <FooterWrapper />
          <ToastProvider />
        </ReduxProvider>
      </body>
    </html>
  );
}
