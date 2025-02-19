import { supabase } from "@/lib/data";
import { Actives, Investment, Wallet } from "@/lib/types";
import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { Plus } from "lucide-react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { useToast } from "@/hooks/use-toast";

export default function DialogFormInvestment({
  actives,
  wallets,
}: {
  actives: Actives[];
  wallets: Wallet[];
}) {
  const [newInvestment, setNewInvestment] = useState<Partial<Investment>>({});
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [user, setUser] = useState<string>("");
  const { toast } = useToast();

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

  const handleAddInvestment = async () => {
    console.log(newInvestment)
    if (
      newInvestment.active_id &&
      newInvestment.cantidad &&
      newInvestment.money &&
      newInvestment.wallet_id
    ) {
      const { error } = await supabase.from("invesment").insert({
        created_at: newInvestment.created_at,
        cantidad: newInvestment.cantidad,
        user_id: user,
        wallet_id: newInvestment.wallet_id,
        active_id: newInvestment.active_id,
        money: newInvestment.money,
        value: newInvestment.value,
      });
      if (error) {
        console.log(error);
        toast({
          variant: "destructive",
          title: "Error",
          description: "Error al insertar activo",
        });
      }
      setNewInvestment({});
      setIsDialogOpen(false);
    } else {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Debe completar todos los campos",
      });
    }
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
              onValueChange={(value) => {
                const selectedActive = actives.find((a) => a.id === value);
                if (selectedActive) {
                  setNewInvestment({
                    ...newInvestment,
                    active_id: parseInt(value),
                    active_name: selectedActive.name,
                  });
                }
              }}
            >
              <SelectTrigger className="w-[240px]">
                <SelectValue placeholder="Seleccionar activo" />
              </SelectTrigger>
              <SelectContent>
                {actives.map((a) => (
                  <SelectItem key={a.id} value={a.id}>
                    {a.name}{" "}
                    <span className="font-light text-xs">({a.type_name})</span>
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
              onValueChange={(value) => {
                console.log(wallets);
                const selectedWallet = wallets.find(
                  (w) => w.id == parseInt(value)
                );
                if (selectedWallet) {
                  setNewInvestment({
                    ...newInvestment,
                    wallet_id: parseInt(value),
                    wallet_name: selectedWallet.name,
                  });
                }
              }}
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
            <Label htmlFor="cantidad" className="text-right">
              Cantidad
            </Label>
            <Input
              id="cantidad"
              onChange={(e) =>
                setNewInvestment({
                  ...newInvestment,
                  cantidad: parseFloat(e.target.value),
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
              onChange={(e) =>
                setNewInvestment({
                  ...newInvestment,
                  value: parseFloat(e.target.value),
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
              onChange={(e) =>
                setNewInvestment({
                  ...newInvestment,
                  created_at: e.target.value,
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
