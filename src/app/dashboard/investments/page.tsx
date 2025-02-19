import InvestmentsDashboard from "@/components/invesment/dashboard";
import { Suspense } from "react";
import InvesmentDashboardSkeleton from "./loading";
import { fetchActives, fetchInvesment, fetchWallets } from "@/app/lib/data";

export default async function InvestmentsPage() {
  const actives = await fetchActives();
  const wallets = await fetchWallets();
  const investments = await fetchInvesment();

  return (
    <Suspense fallback={<InvesmentDashboardSkeleton />}>
      <InvestmentsDashboard actives={actives} wallets={wallets} investments={investments} />
    </Suspense>
  );
}
