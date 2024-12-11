import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import AuthProvider from "@/providers/AuthProvider";
import StoreProvider from "@/providers/StoreProvider";
import type { Metadata } from "next";
import localFont from "next/font/local";
import { Toaster } from "sonner";
import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "PT Widya Wicara",
  description: "E-commerce app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <StoreProvider>
          <AuthProvider>
            <Navbar />
            {children}
            <Toaster richColors position="top-center" />
            <Footer />
          </AuthProvider>
        </StoreProvider>
      </body>
    </html>
  );
}
