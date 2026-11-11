import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import type { JSX, ReactNode } from "react";
import { AuthProvider } from "../context/auth-context";
import { Toaster } from "react-hot-toast";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "DocCraft",
  description: " A Form Builder System that is designed to streamline the creation, management, and analysis of forms, this system empowers users to build custom forms with drag-and-drop simplicity, collect responses in real-time, and review analytics from a centralized dashboard. Whether for surveys, registrations, feedback, or polls, users can manage all aspects of form lifecycle efficiently.",
};

export default function RootLayout({ children }: { children: ReactNode }): JSX.Element {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
      <AuthProvider> 
        {children} 
        <Toaster position="top-right" />
      </AuthProvider>
      </body>
    </html>
  );
}

import "./globals.css";



