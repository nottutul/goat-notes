import type { Metadata } from "next";
import "../styles/globals.css";
import { Geist } from "next/font/google";
import { cn } from "@/lib/utils";
import { ThemeProvider } from "@/components/ThemeProvider"
import { Button } from "@/components/ui/button";
import { Toaster } from "@/components/ui/sonner";
import Header from "@/components/Header";
import React from "react";


const geist = Geist({subsets:['latin'],variable:'--font-sans'});

export const metadata: Metadata = {
  title: "Goat Notes",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
        <head />
        <body>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
          
          <div className="flex flex-col w-full">
            <Header/>
          </div>

          <main>
            {children}
          </main>
          <Toaster/> 
            
          </ThemeProvider>
        </body>
      </html>
  );
}

