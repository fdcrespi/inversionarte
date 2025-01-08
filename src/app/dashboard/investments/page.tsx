import InvestmentsDashboard from "@/components/invesment/dashboard";
import { supabase } from "@/lib/data";
import { Actives, Wallet } from "@/lib/types";
import { Suspense } from "react";
import InvesmentDashboardSkeleton from "./loading";

export default async function InvestmentsPage() {
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
  const wallets = await supabase
    .from("wallet")
    .select()
    .then((res) => res.data as Wallet[]);

  return (
    <Suspense fallback={<InvesmentDashboardSkeleton />}>
      <InvestmentsDashboard actives={actives} wallets={wallets} />
    </Suspense>
  );
}
