"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Wallet } from "@/lib/types";

// Tasa de cambio de ejemplo (1 USD = 100 ARS)
/* const exchangeRate = 100; */

export function WalletsDashboard({wallets , exchangeRate} : {wallets: Wallet[], exchangeRate: number}) {
 
  const [showPesos, setShowPesos] = useState(false);
  const [newWallet, setNewWallet] = useState({
    name: "",
    balance: "",
  });
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const totalBalance = wallets.reduce((sum, wallet) => sum + wallet.balance, 0);

  const handleCurrencyToggle = () => {
    setShowPesos(!showPesos);
  };

  const handleAddWallet = () => {
    console.log("hi");
    /* if (newWallet.name && newWallet.balance) {
      setWallets([
        ...wallets,
        {
          id: (wallets.length + 1).toString(),
          name: newWallet.name,
          balance: parseFloat(newWallet.balance),
        },
      ]);
      setNewWallet({ name: "", balance: "" });
      setIsDialogOpen(false);
    } */
  };

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader className="p-4">
          <div className="md:flex space-y-2 items-center justify-between">
            <CardTitle className="flex-1">Resumen de Billeteras</CardTitle>
            <div className="flex items-center justify-end space-x-2">
              <Label htmlFor="currency-toggle">Mostrar en {showPesos ? 'USD' : 'ARS'}</Label>
              <Switch
                id="currency-toggle"
                checked={showPesos}
                onCheckedChange={handleCurrencyToggle}
              />
            </div>
          </div>
          <CardDescription className="hidden md:block">
            Gestiona tus billeteras virtuales y sus saldos.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[300px]">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nombre</TableHead>
                  <TableHead className="text-right">Saldo</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {wallets.map((wallet) => (
                  <TableRow key={wallet.id}>
                    <TableCell className="font-medium">{wallet.name}</TableCell>
                    <TableCell className="text-right">
                      {showPesos
                        ? `ARS ${(wallet.balance ? wallet.balance / exchangeRate : 0).toLocaleString('es-ar', {style: 'currency', currency: 'ARS', minimumFractionDigits: 2})}`
                        : `USD ${(wallet.balance ? wallet.balance : 0).toLocaleString('es-ar', {style: 'currency', currency: 'ARS', minimumFractionDigits: 2})}`}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </ScrollArea>
          <div className="w-full space-y-2">
            <div className="text-2xl font-bold">
              Total:{" "}
              {showPesos
                ? `ARS ${(totalBalance ? totalBalance / exchangeRate : 0).toLocaleString('es-ar', {style: 'currency', currency: 'ARS', minimumFractionDigits: 2})}`
                : `USD ${(totalBalance ? totalBalance : 0).toLocaleString('es-ar', {style: 'currency', currency: 'ARS', minimumFractionDigits: 2})}`}
            </div>
            <div className="w-full text-end">
              <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogTrigger asChild>
                  <Button>Agregar Billetera</Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                  <DialogHeader>
                    <DialogTitle>Agregar Nueva Billetera</DialogTitle>
                    <DialogDescription>
                      Ingresa los detalles de la nueva billetera aquí.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="name" className="text-right">
                        Nombre
                      </Label>
                      <Input
                        id="name"
                        value={newWallet.name}
                        onChange={(e) =>
                          setNewWallet({ ...newWallet, name: e.target.value })
                        }
                        className="col-span-3"
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="balance" className="text-right">
                        Saldo (USD)
                      </Label>
                      <Input
                        id="balance"
                        type="number"
                        value={newWallet.balance}
                        onChange={(e) =>
                          setNewWallet({
                            ...newWallet,
                            balance: e.target.value,
                          })
                        }
                        className="col-span-3"
                      />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button type="submit" onClick={handleAddWallet}>
                      Agregar Billetera
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
