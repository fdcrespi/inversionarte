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
import { Actives, Types } from "@/lib/types";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

export function ActivesDashboard({
  actives,
  types,
}: {
  actives: Actives[];
  types: Types[];
}) {
  const [newActive, setNewActive] = useState({
    name: "",
    tipo: 0,
    valor: 0
  });
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleAddWallet = () => {
    console.log(newActive);
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

  console.log(actives);

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader className="p-4">
          <div className="md:flex space-y-2 items-center justify-between">
            <CardTitle className="flex-1">Resumen de Activos</CardTitle>
          </div>
          <CardDescription className="hidden md:block">
            Gestiona tus activos y sus saldos.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[300px]">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nombre</TableHead>
                  <TableHead>Tipo</TableHead>
                  <TableHead className="text-right">Saldo</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {actives.map((a) => (
                  <TableRow key={a.id}>
                    <TableCell className="font-medium">{a.name}</TableCell>
                    <TableCell className="font-medium">{a.types.name}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </ScrollArea>
          <div className="w-full text-end">
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button>Agregar Activo</Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Agregar Nueva Activo</DialogTitle>
                  <DialogDescription>
                    Ingresa los detalles del activo aquí.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="name" className="text-right">
                      Nombre
                    </Label>
                    <Input
                      id="name"
                      value={newActive.name}
                      onChange={(e) =>
                        setNewActive({ ...newActive, name: e.target.value })
                      }
                      className="col-span-3"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="type" className="text-right">
                      Tipo
                    </Label>
                    <Select
                      onValueChange={(value) =>
                        setNewActive({
                          ...newActive,
                          tipo: parseInt(value),
                        })
                      }
                    >
                      <SelectTrigger className="w-[240px]">
                        <SelectValue placeholder="Seleccionar activo" />
                      </SelectTrigger>
                      <SelectContent>
                        {types.map((t) => (
                          <SelectItem key={t.id} value={t.id.toString()}>
                            {t.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="valor" className="text-right">
                      Valor en USD
                    </Label>
                    <Input
                      id="valor"
                      type="number"
                      onChange={(e) =>
                        setNewActive({
                          ...newActive,
                          valor: parseFloat(e.target.value),
                        })
                      }
                      className="col-span-3"
                    />
                  </div>
                </div>

                <DialogFooter>
                  <Button type="submit" onClick={handleAddWallet}>
                    Agregar Activo
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
