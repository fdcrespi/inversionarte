import { ActivesDashboard } from "@/components/active/dashboard";
import { supabase } from '@/lib/data'
import { Actives, Types, } from "@/lib/types"
import { Suspense } from "react"

export default async function ActivesPage() {

  const actives = await supabase
    .from("active")
    .select(
      `
       id,
       name,
       types:types!active_type_id_fkey(id, name),
       value_usd
      `
    )
    .then((res) => res.data as unknown as Actives[]);

  const types = await supabase.from("types").select().then((res) => res.data as Types[]);

  return (
    <Suspense>
      <ActivesDashboard actives={actives} types={types} />
    </Suspense>
    )
}

