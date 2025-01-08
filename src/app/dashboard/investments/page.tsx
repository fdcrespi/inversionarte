import InvestmentsDashboard from "@/components/invesment/dashboard"
import { supabase } from "@/lib/data"
import { Types, Wallet } from "@/lib/types";

export default async function InvestmentsPage() {
  
  const types = await supabase.from('types').select().then((res) => res.data as Types[]);
  const wallets = await supabase.from('wallet').select().then((res) => res.data as Wallet[]);

  return <InvestmentsDashboard types={ types } wallets={ wallets }/>
}

