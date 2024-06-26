import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ChatAppProvider } from "@/Context/ChatAppContext";
import "./globals.css";
import NavbarComponent from "@/Components/Navbar/Navbar";
import { Providers } from "./providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ChatAppProvider>
      <html lang="en" className="font-sans dark scrollbar-hide">
        <body className={inter.className}><Providers><NavbarComponent />{children}</Providers></body>
      </html>
    </ChatAppProvider>
  );
}
