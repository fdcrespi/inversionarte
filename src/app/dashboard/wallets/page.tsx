import { WalletsDashboard } from "@/components/wallet/dashboard"
import { supabase } from '@/lib/data'
import { Wallet } from "@/lib/types"
import { Suspense } from "react"
import WalletsDashboardSkeleton from "./loading"

export default async function WalletsPage() {
  const wallets = await supabase.from('wallet').select().then((res) => res.data as Wallet[])

  const walletsWithBalance = await supabase
  .from('wallet')
  .select(`
    *,
    saldo:invesment!invesment_wallet_id_fkey(cantidad)
  `)
  .then((res) => res.data as Wallet[]);

  console.log(walletsWithBalance);
  return (
    <Suspense fallback={<WalletsDashboardSkeleton />}>
      <WalletsDashboard wallets={wallets} />
    </Suspense>
    )
}

