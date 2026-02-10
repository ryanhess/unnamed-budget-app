import { ReactNode } from "react";
import { Badge } from "@/components/ui/badge";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { cn } from "@/components/ui/utils";
import type { Transaction } from "@/lib/constants/transactionType";

const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const today = new Date("2026-02-02");
    const yesterday = new Date("2026-02-01");

    if (date.toDateString() === today.toDateString()) {
        return "Today";
    } else if (date.toDateString() === yesterday.toDateString()) {
        return "Yesterday";
    } else {
        return date.toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
        });
    }
};

const TransactionsTable = ({
    filteredTransactions,
}: {
    filteredTransactions: Transaction[];
}): ReactNode => {
    return (
        <div className="flex-1 px-6 pb-6 overflow-hidden">
            <div className="border border-slate-200 rounded-lg overflow-auto h-full">
                <Table>
                    <TableHeader className="sticky top-0 bg-white z-10 after:absolute after:bottom-0 after:left-0 after:right-0 after:h-px after:bg-slate-200">
                        <TableRow>
                            <TableHead className="w-12 bg-white"></TableHead>
                            <TableHead className="bg-white">Date</TableHead>
                            <TableHead className="bg-white">Merchant</TableHead>
                            <TableHead className="bg-white">Category</TableHead>
                            <TableHead className="text-right bg-white">Amount</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {filteredTransactions.map((transaction: Transaction) => (
                            <TableRow key={transaction.id} className="cursor-pointer">
                                <TableCell>
                                    <div
                                        className={cn(
                                            "flex items-center justify-center size-8 rounded-full",
                                            transaction.type === "income"
                                                ? "bg-green-100 text-green-700"
                                                : "bg-slate-100 text-slate-700"
                                        )}
                                    >
                                        {transaction.icon}
                                    </div>
                                </TableCell>
                                <TableCell className="font-medium text-slate-600">
                                    {formatDate(transaction.date)}
                                </TableCell>
                                <TableCell className="font-medium text-slate-900">
                                    {transaction.merchant}
                                </TableCell>
                                <TableCell>
                                    <Badge variant="secondary" className="text-xs">
                                        {transaction.category}
                                    </Badge>
                                </TableCell>
                                <TableCell className="text-right">
                                    <span
                                        className={cn(
                                            "font-semibold",
                                            transaction.type === "income"
                                                ? "text-green-600"
                                                : "text-slate-900"
                                        )}
                                    >
                                        {transaction.type === "income" ? "+" : ""}$
                                        {Math.abs(transaction.amount).toLocaleString("en-US", {
                                            minimumFractionDigits: 2,
                                            maximumFractionDigits: 2,
                                        })}
                                    </span>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
};
export default TransactionsTable;
