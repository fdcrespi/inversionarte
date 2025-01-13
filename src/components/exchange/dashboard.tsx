"use client";

import { Actives } from "@/lib/types";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Input } from "../ui/input";
import { useState } from "react";
import { Button } from "../ui/button";
import { Save } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/lib/data";

interface Activo {
  id: string;
  valor: number;
}

export default function ExchangeDashboard({ actives }: { actives: Actives[] }) {
  const [active, setActive] = useState<Activo>();
  const { toast } = useToast();

  const handleValueChange = (id: string, valor: number) => {
    setActive({ id, valor });
  };

  const saveActive = async (id: string) => {
    if (!active) {
      toast({
        variant: "destructive",
        description: "Debe modificar un valor",
      });
      return;
    }
    const ant = actives.find((a) => a.id == active!.id && a.id == id);
    if (!ant) {
      toast({
        variant: "destructive",
        description: "Debe modificar el valor",
      });
      return;
    }
    if (ant.value_usd === active?.valor) {
      toast({
        variant: "destructive",
        description: "No se ha modificado el valor",
      });
      return;
    }
    const { error } = await supabase
      .from('active')
      .update({value_usd: active.valor})
      .eq('id', active.id)
    if (error) {
      console.error(error)
      return
    }
    toast({
      description: "Valor modificado con exito"
    })
  };

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader className="p-4">
          <div className="md:flex space-y-2 items-center justify-between">
            <CardTitle className="flex-1">Tasas de Activos</CardTitle>
          </div>
          <CardDescription className="hidden md:block">
            Gestiona el valor en USD de tus activos.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nombre</TableHead>
                <TableHead>Tipo</TableHead>
                <TableHead>Valor en USD</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {actives.map((a) => (
                <TableRow key={a.id}>
                  <TableCell className="font-medium">{a.name}</TableCell>
                  <TableCell className="font-medium">{a.type.name}</TableCell>
                  <TableCell className="flex space-x-1">
                    <Input
                      type="number"
                      defaultValue={a.value_usd}
                      onChange={(e) =>
                        handleValueChange(a.id, parseFloat(e.target.value))
                      }
                      className="max-w-[120px]"
                    />
                    <Button
                      onClick={() => saveActive(a.id)}
                      size="icon"
                      variant="secondary"
                    >
                      <Save />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
