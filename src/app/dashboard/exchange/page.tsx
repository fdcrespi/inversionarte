import ExchangeDashboard from "@/components/exchange/dashboard";
import { supabase } from "@/lib/data";
import { Actives } from "@/lib/types";
import { Suspense } from "react";

export default async function ExchangePage() {

  const actives = await supabase
  .from("active")
  .select(
    `
     id,
     name,
     type:types!active_type_id_fkey(id, name),
     value_usd
    `
  )
  .then((res) => res.data as unknown as Actives[]);

  return (
    <Suspense>
      <ExchangeDashboard actives={actives} />
    </Suspense>
  )
}