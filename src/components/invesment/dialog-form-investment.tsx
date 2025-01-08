import { supabase } from "@/lib/data";
import { Actives, Investment, Wallet } from "@/lib/types";
import { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";
import { Button } from "../ui/button";
import { Plus } from "lucide-react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";

export default function DialogFormInvestment(
  {
    actives,
    wallets,
  }: {
    actives: Actives[];
    wallets: Wallet[];
  }
) {

  const [newInvestment, setNewInvestment] = useState<Partial<Investment>>({});
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [user, setUser] = useState<string>('');

  useEffect(() => {
    const getUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (user) {
        setUser(user.id);
      }
    };
    getUser();
  }, []);

  const handleAddInvestment = () => {
    console.log(newInvestment);
    console.log(user);
    /* if (
      newInvestment.asset &&
      newInvestment.type &&
      newInvestment.amount &&
      newInvestment.value &&
      newInvestment.money &&
      newInvestment.wallet
    ) {
      const investment: Investment = {
        asset: newInvestment.asset,
        type: newInvestment.type,
        amount: newInvestment.amount,
        value: newInvestment.value,
        money: newInvestment.money,
        purchaseDate:
          newInvestment.purchaseDate || new Date().toISOString().split("T")[0]
      };
      setInvestments([...investments, investment]);
      setNewInvestment({});
      setIsDialogOpen(false);
    } */
  };

  return (
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
            <Label htmlFor="type" className="text-right">
              Activo
            </Label>
            <Select
              onValueChange={(value) =>
                setNewInvestment({
                  ...newInvestment,
                  activo: parseInt(value),
                })
              }
            >
              <SelectTrigger className="w-[240px]">
                <SelectValue placeholder="Seleccionar activo" />
              </SelectTrigger>
              <SelectContent>
                {actives.map((a) => (
                  <SelectItem key={a.id} value={a.id.toString()}>
                    {a.name} <span className="font-light text-xs">({a.types.name})</span>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="type" className="text-right">
              Billetera
            </Label>
            <Select
              onValueChange={(value) =>
                setNewInvestment({
                  ...newInvestment,
                  wallet: parseInt(value),
                })
              }
            >
              <SelectTrigger className="w-[240px]">
                <SelectValue placeholder="Seleccionar billetera" />
              </SelectTrigger>
              <SelectContent>
                {wallets.map((w) => (
                  <SelectItem key={w.id} value={w.id.toString()}>
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

            <Select
              onValueChange={(value) =>
                setNewInvestment({
                  ...newInvestment,
                  money: value,
                })
              }
            >
              <SelectTrigger className="w-[240px]">
                <SelectValue placeholder="Seleccionar moneda" />
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
  );
}
