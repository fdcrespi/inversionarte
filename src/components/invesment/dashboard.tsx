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
import { Plus } from "lucide-react";
import {
  Select,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectContent,
} from "../ui/select";
import { Types, Wallet } from "@/lib/types";

type Investment = {
  id: string;
  asset: string;
  type: string;
  amount: string;
  value: string;
  money: string;
  purchaseDate: string;
  currentPrice: string;
  profitLoss: string;
};

const initialInvestments: Investment[] = [
  {
    id: "INV001",
    asset: "Bitcoin",
    type: "Criptomoneda",
    amount: "0.5 BTC",
    value: "$15,000",
    money: "ARS",
    purchaseDate: "2023-01-15",
    currentPrice: "$30,000",
    profitLoss: "+15%",
  },
  {
    id: "INV002",
    asset: "Apple Inc.",
    type: "Acciones",
    amount: "10 acciones",
    value: "$1,450",
    money: "USD",
    purchaseDate: "2023-02-20",
    currentPrice: "$145",
    profitLoss: "+5.8%",
  },
  {
    id: "INV003",
    asset: "ETH",
    type: "Criptomoneda",
    amount: "5 ETH",
    value: "$9,000",
    money: "USD",
    purchaseDate: "2023-03-10",
    currentPrice: "$1,800",
    profitLoss: "-2.2%",
  },
  {
    id: "INV004",
    asset: "S&P 500 ETF",
    type: "ETF",
    amount: "20 unidades",
    value: "$8,000",
    money: "USD",
    purchaseDate: "2023-04-05",
    currentPrice: "$400",
    profitLoss: "+3.5%",
  },
  {
    id: "INV005",
    asset: "Bono del Tesoro",
    type: "Bono",
    amount: "$10,000",
    value: "$10,200",
    money: "USD",
    purchaseDate: "2023-05-01",
    currentPrice: "102%",
    profitLoss: "+2%",
  },
];

export default function InvestmentsDashboard({types, wallets} : {types: Types[], wallets: Wallet[]}) {
  const [investments, setInvestments] =
    useState<Investment[]>(initialInvestments);
  const [newInvestment, setNewInvestment] = useState<Partial<Investment>>({});
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleAddInvestment = () => {
    if (
      newInvestment.asset &&
      newInvestment.type &&
      newInvestment.amount &&
      newInvestment.value &&
      newInvestment.money
    ) {
      const investment: Investment = {
        id: `INV${investments.length + 1}`.padStart(6, "0"),
        asset: newInvestment.asset,
        type: newInvestment.type,
        amount: newInvestment.amount,
        value: newInvestment.value,
        money: newInvestment.money,
        purchaseDate:
          newInvestment.purchaseDate || new Date().toISOString().split("T")[0],
        currentPrice: newInvestment.currentPrice || "N/A",
        profitLoss: newInvestment.profitLoss || "0%",
      };
      setInvestments([...investments, investment]);
      setNewInvestment({});
      setIsDialogOpen(false);
    }
  };

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Todas las Inversiones</CardTitle>
            <div className="flex items-center space-x-2">
              <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogTrigger asChild>
                  <Button className="md:w-auto w-10 h-10 px-4" size="icon">
                    <Plus />
                    <span className="hidden md:block">Agregar Inversión</span>
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                  <DialogHeader>
                    <DialogTitle>Agregar Nueva Inversión</DialogTitle>
                    <DialogDescription>
                      Ingresa los detalles de la nueva inversión aquí.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="asset" className="text-right">
                        Activo
                      </Label>
                      <Input
                        id="asset"
                        value={newInvestment.asset || ""}
                        onChange={(e) =>
                          setNewInvestment({
                            ...newInvestment,
                            asset: e.target.value,
                          })
                        }
                        className="col-span-3"
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="type" className="text-right">
                        Tipo
                      </Label>
                      <Select>
                        <SelectTrigger className="w-[280px]">
                          <SelectValue placeholder="Seleccionar tipo" />
                        </SelectTrigger>
                        <SelectContent>
                          {types.map((t) => (
                            <SelectItem key={t.id} value={t.name}>
                              {t.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="type" className="text-right">
                        Billetera
                      </Label>
                      <Select>
                        <SelectTrigger className="w-[280px]">
                          <SelectValue placeholder="Seleccionar tipo" />
                        </SelectTrigger>
                        <SelectContent>
                          {wallets.map((w) => (
                            <SelectItem key={w.id} value={w.name}>
                              {w.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="amount" className="text-right">
                        Cantidad
                      </Label>
                      <Input
                        id="amount"
                        value={newInvestment.amount || ""}
                        onChange={(e) =>
                          setNewInvestment({
                            ...newInvestment,
                            amount: e.target.value,
                          })
                        }
                        className="col-span-3"
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="value" className="text-right">
                        Valor
                      </Label>
                      <Input
                        id="value"
                        value={newInvestment.value || ""}
                        onChange={(e) =>
                          setNewInvestment({
                            ...newInvestment,
                            value: e.target.value,
                          })
                        }
                        className="col-span-3"
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="money" className="text-right">
                        Moneda
                      </Label>
    
                      <Select>
                        <SelectTrigger className="w-[280px]">
                          <SelectValue placeholder="Seleccionar tipo" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="ARS">ARS</SelectItem>
                          <SelectItem value="USD">USD</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="purchaseDate" className="text-right">
                        Fecha de Compra
                      </Label>
                      <Input
                        id="purchaseDate"
                        type="date"
                        value={newInvestment.purchaseDate || ""}
                        onChange={(e) =>
                          setNewInvestment({
                            ...newInvestment,
                            purchaseDate: e.target.value,
                          })
                        }
                        className="col-span-3"
                      />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button type="submit" onClick={handleAddInvestment}>
                      Agregar Inversión
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
          </div>
          <CardDescription>
            Una lista detallada de todas tus inversiones actuales.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[600px]">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Activo</TableHead>
                  <TableHead>Tipo</TableHead>
                  <TableHead>Cantidad</TableHead>
                  <TableHead>Valor</TableHead>
                  <TableHead>Moneda</TableHead>
                  <TableHead>Fecha de Compra</TableHead>
                  <TableHead>Precio Actual</TableHead>
                  <TableHead>Ganancia/Pérdida</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {investments.map((investment) => (
                  <TableRow key={investment.id}>
                    <TableCell>{investment.id}</TableCell>
                    <TableCell>{investment.asset}</TableCell>
                    <TableCell>{investment.type}</TableCell>
                    <TableCell>{investment.amount}</TableCell>
                    <TableCell>{investment.value}</TableCell>
                    <TableCell>{investment.money}</TableCell>
                    <TableCell>{investment.purchaseDate}</TableCell>
                    <TableCell>{investment.currentPrice}</TableCell>
                    <TableCell>{investment.profitLoss}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  );
}
