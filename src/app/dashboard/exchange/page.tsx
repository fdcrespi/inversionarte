import { fetchActives } from "@/app/lib/data";
import ExchangeDashboard from "@/components/exchange/dashboard";
import { Suspense } from "react";

export default async function ExchangePage() {

  const actives = await fetchActives()

  return (
    <Suspense>
      <ExchangeDashboard actives={actives} />
    </Suspense>
  )
}