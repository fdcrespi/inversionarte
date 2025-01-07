"use client"

import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { User } from "lucide-react";
import { Tabs, TabsList } from "@/components/ui/tabs";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import Link from "next/link";
import { usePathname } from "next/navigation";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();

  const tabs = [
    { name: "Resumen", href: "/" },
    { name: "Inversiones", href: "/investments" },
    { name: "Billeteras", href: "/wallets" },
    { name: "Tasas", href: "/exchange" },
    { name: "Monedas", href: "/coins" },
  ];

  return (
    <html lang="es">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <div className="flex-col md:flex">
          <div className="flex-1 space-y-4 p-8 pt-6">
            <div className="flex items-center justify-between space-y-2">
              <h2 className="text-3xl font-bold tracking-tight">
                Inversionarte
              </h2>
              <div className="flex items-center space-x-2">
                <User />
              </div>
            </div>
            <Tabs defaultValue="overview" className="space-y-4">
              <ScrollArea className="w-full whitespace-nowrap rounded-md">
                <TabsList className="inline-flex w-max space-x-2 p-1">
                  {tabs.map((tab) => (
                    <Link
                      key={tab.href}
                      href={tab.href}
                      className={`inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 ${
                        pathname === tab.href
                          ? "bg-background text-foreground shadow-sm"
                          : "text-muted-foreground hover:text-foreground"
                      }`}
                    >
                      {tab.name}
                    </Link>
                  ))}
                </TabsList>
                <ScrollBar orientation="horizontal" />
              </ScrollArea>
            </Tabs>
            {children}
          </div>
        </div>
      </body>
    </html>
  );
}
