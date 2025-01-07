import { WalletsDashboard } from "@/components/wallet/dashboard"
import { supabase } from '@/lib/data'
import { Wallet } from "@/lib/types"

export default async function WalletsPage() {
  const wallets = await supabase.from('wallet').select().then((res) => res.data as Wallet[])

  return <WalletsDashboard wallets={wallets} />
}

