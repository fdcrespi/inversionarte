"use client"

import { supabase } from "@/lib/data";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Page(){
  const router = useRouter();

  useEffect(() => {
    const getUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) {
        router.push("/login");
      } else router.push("/dashboard")
    };
    getUser();
  }, [router]);


  return (
    <h1>Inversionarte</h1>
  )
}