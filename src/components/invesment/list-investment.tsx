import { Investment } from "@/lib/types";
import { ScrollArea, ScrollBar } from "../ui/scroll-area";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Button } from "../ui/button";
import { Trash } from "lucide-react";

export default function ListInvestment({
  investments,
}: {
  investments: Investment[];
}) {
 
  return (
    <ScrollArea className="absolute md:h-full md:w-full">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Activo</TableHead>
            <TableHead>Cantidad</TableHead>
            <TableHead>Valor</TableHead>
            <TableHead>Moneda</TableHead>
            <TableHead>Billetera</TableHead>
            <TableHead>Fecha</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {investments.map((investment) => (
            <TableRow key={investment.id} className={`${investment.cantidad < 0 ? 'bg-red-100' : ''}`}>
              <TableCell>{investment.id}</TableCell>
              <TableCell>{investment.active.name}</TableCell>
              <TableCell>{(investment.cantidad).toLocaleString('es-AR', { maximumFractionDigits: 4, minimumFractionDigits: 2})}</TableCell>
              <TableCell>{(investment.value).toLocaleString('es-AR', { maximumFractionDigits: 4, minimumFractionDigits: 2})}</TableCell>
              <TableCell>{investment.money}</TableCell>
              <TableCell>{investment.wallet.name}</TableCell>
              <TableCell>{new Date(investment.created_at).toLocaleDateString('es-AR')}</TableCell>
              <TableCell>
                <Button size="icon" variant="destructive">
                  <Trash />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  );
}
