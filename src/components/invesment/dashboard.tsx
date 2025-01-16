"use client";

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
import { useEffect, useState } from "react";
import { supabase } from "@/lib/data";


export default function InvestmentsDashboard({
  actives,
  wallets,
  investments
}: {
  actives: Actives[];
  wallets: Wallet[];
  investments: Investment[]
}) {

  const [inversiones, setInversiones] = useState<Investment[]>(investments);

  useEffect(() => {
    // Suscribirse a los cambios en la tabla "active"
    const subscription = supabase
      .channel("realtime-investments")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "invesment" },
        (payload) => {
          if (payload.eventType === "INSERT") {
            // Agregar el nuevo registro a la lista
            const inv = {
              id: payload.new.id,
              created_at: payload.new.created_at,
              cantidad: payload.new.cantidad,
              wallet: {
                id: payload.new.wallet_id,
                name: wallets.find(w => w.id == payload.new.wallet_id)!.name
              },
              active: {
                id: payload.new.active_id,
                name: actives.find(a => a.id == payload.new.active_id)!.name,
                value_usd: actives.find(a => a.id == payload.new.active_id)!.value_usd 
              },
              money: payload.new.money,
              value: payload.new.value
            }
            setInversiones((prev) => [...prev, inv as Investment]);
          } else if (payload.eventType === "UPDATE") {
            // Actualizar el registro existente
            setInversiones((prev) =>
              prev.map((item) =>
                item.id === payload.new.id ? (payload.new as Investment) : item
              )
            );
          } else if (payload.eventType === "DELETE") {
            // Eliminar el registro de la lista
            setInversiones((prev) =>
              prev.filter((item) => item.id !== payload.old.id)
            );
          }
        }
      )
      .subscribe();
    return () => {
      supabase.removeChannel(subscription);
    };
  }, [actives, wallets]);

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
        <CardContent className="relative">
          <ListInvestment investments={inversiones}/>
        </CardContent>
      </Card>
    </div>
  );
}
