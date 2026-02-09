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
import type { Transaction } from "@/lib/constants";
import { formatDate } from "@/lib/dateHelpers";
// Decide about this as I build out. Does it serve me to have separately-defined table headers and
// row fields? Or, do changes to the table just happen here.
import { txnDbColumns, txnDisplayHeaders } from "@/lib/constants/";

const TableHeaders = (): ReactNode => {
    const middleHeaderNames = txnDisplayHeaders.slice(0, -1);
    const lastHeaderName = txnDisplayHeaders.at(-1);

    const middleHeaders = middleHeaderNames.map((headerName, i) => (
        <TableHead key={i} className="bg-white">
            {headerName}
        </TableHead>
    ));

    return (
        <TableHeader className="sticky top-0 bg-white z-10 after:absolute after:bottom-0 after:left-0 after:right-0 after:h-px after:bg-slate-200">
            <TableRow>
                <TableHead className="w-12 bg-white"></TableHead>
                {middleHeaders}
                <TableHead className="text-right bg-white">{lastHeaderName}</TableHead>
            </TableRow>
        </TableHeader>
    );
};

const TransactionTableRow = ({ txn }: { txn: Transaction }): ReactNode => {
    return (
        <TableRow key={txn.id} className="cursor-pointer">
            <TableCell>
                <div
                    className={cn(
                        "flex items-center justify-center size-8 rounded-full",
                        txn.type === "income"
                            ? "bg-green-100 text-green-700"
                            : "bg-slate-100 text-slate-700"
                    )}
                >
                    {txn.icon}
                </div>
            </TableCell>
            <TableCell className="font-medium text-slate-600">{formatDate(txn.date)}</TableCell>
            <TableCell className="font-medium text-slate-900">{txn.merchant}</TableCell>
            <TableCell>
                <Badge variant="secondary" className="text-xs">
                    {txn.category}
                </Badge>
            </TableCell>
            <TableCell className="text-right">
                <span
                    className={cn(
                        "font-semibold",
                        txn.type === "income" ? "text-green-600" : "text-slate-900"
                    )}
                >
                    {txn.type === "income" ? "+" : ""}$
                    {Math.abs(txn.amount).toLocaleString("en-US", {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                    })}
                </span>
            </TableCell>
        </TableRow>
    );
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
                    <TableHeaders />
                    <TableBody>
                        {filteredTransactions.map((transaction: Transaction) => (
                            <TransactionTableRow key={transaction.id} txn={transaction} />
                        ))}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
};
export default TransactionsTable;
