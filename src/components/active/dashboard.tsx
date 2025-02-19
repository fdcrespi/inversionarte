"use client";

import { Suspense, useEffect, useState } from "react";
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
import { supabase } from "@/lib/data";
import { useToast } from "@/hooks/use-toast";

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
  const { toast } = useToast();
  const [activos, setActivos] = useState<Actives[]>(actives)

  useEffect(() => {
    // Suscribirse a los cambios en la tabla "active"
    const subscription = supabase
      .channel("realtime-actives")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "active" },
        (payload) => {
          console.log("Cambio detectado:", payload);

          if (payload.eventType === "INSERT") {
            // Agregar el nuevo registro a la lista
            const act = {
              id: payload.new.id,
              name: payload.new.name,
              type_id: payload.new.type_id,
              type_name: types.find(t => t.id == payload.new.type_id)!.name,
              value_usd: payload.new.value_usd
            };
            setActivos((prev) => [...prev, act as Actives]);
          } else if (payload.eventType === "UPDATE") {
            // Actualizar el registro existente
            setActivos((prev) =>
              prev.map((item) =>
                item.id === payload.new.id ? (payload.new as Actives) : item
              )
            );
          } else if (payload.eventType === "DELETE") {
            // Eliminar el registro de la lista
            setActivos((prev) =>
              prev.filter((item) => item.id !== payload.old.id)
            );
          }
        }
      )
      .subscribe();
    return () => {
      supabase.removeChannel(subscription);
    };
  }, []);

  const handleAddWallet = async () => {
    const { error } = await supabase
      .from('active')
      .insert({ name: newActive.name, type_id: newActive.tipo, value_usd: newActive.valor})
    if (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Error al insertar activo",
      })
    }
    setIsDialogOpen(false);
  };

  return (
    <Suspense>
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
            <ScrollArea className="">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Nombre</TableHead>
                    <TableHead>Tipo</TableHead>
                  {/*   <TableHead className="text-right">Saldo</TableHead> */}
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {activos.map((a) => (
                    <TableRow key={a.id}>
                      <TableCell className="font-medium">{a.name}</TableCell>
                      <TableCell className="font-medium">{a.type_name}</TableCell>
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
    </Suspense>
  );
}
