"use client";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Switch } from "@/components/ui/switch";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ScrollArea } from "@/components/ui/scroll-area";

export default function WalletsDashboardSkeleton() {
  return (
    <div className="space-y-4">
      <Card>
        <CardHeader className="p-4">
          <div className="md:flex space-y-2 items-center justify-between">
            <Skeleton className="h-8 w-48" />
            <div className="flex items-center justify-end space-x-2">
              <Skeleton className="h-4 w-24" />
              <Switch disabled />
            </div>
          </div>
          <Skeleton className="h-4 w-full mt-2" />
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[300px]">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>
                    <Skeleton className="h-4 w-16" />
                  </TableHead>
                  <TableHead className="text-right">
                    <Skeleton className="h-4 w-16 ml-auto" />
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {[...Array(5)].map((_, index) => (
                  <TableRow key={index}>
                    <TableCell>
                      <Skeleton className="h-4 w-24" />
                    </TableCell>
                    <TableCell className="text-right">
                      <Skeleton className="h-4 w-20 ml-auto" />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </ScrollArea>
          <div className="w-full space-y-2 mt-4">
            <Skeleton className="h-8 w-40" />
            <div className="w-full text-end">
              <Skeleton className="h-10 w-36 ml-auto" />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
