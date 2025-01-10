import { WalletsDashboard } from "@/components/wallet/dashboard"
import { supabase } from '@/lib/data'
/* import { Wallet } from "@/lib/types" */
import { Suspense } from "react"
import WalletsDashboardSkeleton from "./loading"

export default async function WalletsPage() {
  /* const wallets = await supabase.from('wallet').select().then((res) => res.data as Wallet[]) */
 
  /*
  * TODO hacer toda la consulta sobre la tabla invesment
  */
  const {data: walletsBalance } = await supabase
  .from('wallet')
  .select(`
    *,
    balance:invesment(cantidad, money, active_id)
  `)

  const { data: Peso } = await supabase
  .from('active')
  .select("id, value_usd")
  .eq("name", "Pesos")

  const { data: Actives } = await supabase
  .from('active')
  .select("id, value_usd")

  const walletsWithBalance = walletsBalance?.map((wallet) => ({
    ...wallet,
    balance: wallet.balance ? wallet.balance.reduce((acc: number, inv: { cantidad: number, active_id: number }) => acc + (inv.cantidad * Actives?.find((a) => a.id === inv.active_id)?.value_usd), 0) : 0,
  })) || [];


  return (
    <Suspense fallback={<WalletsDashboardSkeleton />}>
      <WalletsDashboard wallets={walletsWithBalance} exchangeRate={Peso?.[0].value_usd} />
    </Suspense>
    )
}

