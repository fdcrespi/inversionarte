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
            <TableHead>Tipo</TableHead>
            <TableHead>Cantidad</TableHead>
            <TableHead>Valor</TableHead>
            <TableHead>Moneda</TableHead>
            <TableHead>Fecha</TableHead>
            <TableHead>Precio</TableHead>
            <TableHead>Ganancia/Pérdida</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {investments.map((investment) => (
            <TableRow key={investment.id}>
              <TableCell>{investment.id}</TableCell>
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
  );
}
