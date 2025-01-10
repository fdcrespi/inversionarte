import InvestmentsDashboard from "@/components/invesment/dashboard";
import { supabase } from "@/lib/data";
import { Actives, Investment, Wallet } from "@/lib/types";
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
  
  const investments = await supabase
    .from("invesment")
    .select(
      `
        id,
        created_at,
        cantidad,
        wallet: wallet!invesment_wallet_id_fkey(id, name),
        active: active!invesment_coin_id_fkey(id, name),
        money
      `
    )
    .then((res) => res.data as unknown as Investment[])
 
  return (
    <Suspense fallback={<InvesmentDashboardSkeleton />}>
      <InvestmentsDashboard actives={actives} wallets={wallets} investments={investments} />
    </Suspense>
  );
}
