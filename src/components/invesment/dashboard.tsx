"use client";

import { useState } from "react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Actives, Investment, Wallet } from "@/lib/types";

import ListInvestment from "./list-investment";
import DialogFormInvestment from "./dialog-form-investment";


export default function InvestmentsDashboard({
  actives,
  wallets,
}: {
  actives: Actives[];
  wallets: Wallet[];
}) {
  const [investments] = useState<Investment[]>([]);
  
  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Todas las Inversiones</CardTitle>
            <div className="flex items-center space-x-2">
              <DialogFormInvestment actives={actives} wallets={wallets} />
            </div>
          </div>
          <CardDescription className="hidden md:block">
            Una lista detallada de todas tus inversiones actuales.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ListInvestment investments={investments}/>
        </CardContent>
      </Card>
    </div>
  );
}
