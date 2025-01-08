"use client";

import { LogOut, User } from "lucide-react";
import { Tabs, TabsList } from "@/components/ui/tabs";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/data";
import { Button } from "@/components/ui/button";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const [user, setUser] = useState<any>(null);
  const router = useRouter();

  useEffect(() => {
    const getUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (user) {
        setUser(user);
      } else {
        router.push("/login");
      }
    };
    getUser();
  }, [router]);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.push("/login");
  };

  if (!user) return null;

  const tabs = [
    { name: "Resumen", href: "/dashboard" },
    { name: "Inversiones", href: "/dashboard/investments" },
    { name: "Billeteras", href: "/dashboard/wallets" },
    { name: "Tasas", href: "/dashboard/exchange" },
    { name: "Monedas", href: "/dashboard/coins" },
  ];

  return (
    <div className="flex-col md:flex">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <div className="md:flex flex-row-reverse items-center justify-between space-y-2">
          <div className="flex items-center space-x-2 justify-end">
            <p className="text-sm font-semibold text-slate-500">{user.email}</p>
            <Button
              onClick={handleSignOut}
              className="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
              size="icon"
            >
              <LogOut />
            </Button>
          </div>
          <h2 className="text-3xl font-bold tracking-tight">Inversionarte</h2>
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
  );
}
