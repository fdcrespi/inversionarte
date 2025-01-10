import { Investment } from "@/lib/types";
import { ScrollArea } from "../ui/scroll-area";
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
    <ScrollArea className="h-full min-h-[280px]">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Activo</TableHead>
            <TableHead>Cantidad</TableHead>
            <TableHead>Moneda</TableHead>
            <TableHead>Billetera</TableHead>
            <TableHead>Fecha</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {investments.map((investment) => (
            <TableRow key={investment.id}>
              <TableCell>{investment.id}</TableCell>
              <TableCell>{investment.active.name}</TableCell>
              <TableCell>{investment.cantidad}</TableCell>
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
    </ScrollArea>
  );
}
