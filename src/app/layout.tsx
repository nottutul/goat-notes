import type { Metadata } from "next";
import "../styles/globals.css";
import { Geist } from "next/font/google";
import { cn } from "@/lib/utils";
import { ThemeProvider } from "@/components/ThemeProvider"
import { Button } from "@/components/ui/button";
import { Toaster } from "@/components/ui/sonner";
import Header from "@/components/Header";
import React from "react";
import AppSidebar from "@/components/AppSidebar";
import { SidebarProvider } from "@/components/ui/sidebar";


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
          
          <Header/>

          <main>
            {children}
          </main>
          <Toaster/> 
         
          </ThemeProvider>
        </body>
      </html>
  );
}

