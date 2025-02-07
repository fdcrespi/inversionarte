
import { WalletsDashboard } from "@/components/wallet/dashboard"
/* import { Wallet } from "@/lib/types" */
import { Suspense } from "react"
import WalletsDashboardSkeleton from "./loading"
import { fetchActives, fetchWallets } from "@/app/lib/data"

export default async function WalletsPage() {

  const wallets = await fetchWallets();
  const peso = await fetchActives("Pesos")

  return (
    <Suspense fallback={<WalletsDashboardSkeleton />}>
      <WalletsDashboard wallets={wallets} exchangeRate={peso[0].value_usd} />
    </Suspense>
    )
}

