import { ReactNode } from "react";
import {
    ArrowUpRight,
    ArrowDownLeft,
    ShoppingCart,
    Home,
    Utensils,
    Car,
    Plane,
    Coffee,
    Film,
    Heart,
    Search,
    Plus,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { cn } from "@/components/ui/utils";
import { type Transaction } from "@/lib/constants/transactionType";
import {
    sumOfAllTxnsForAccountId,
    sumOfAllTxnsForUser,
    selectAllTxnsForAccountId,
    selectAllTxnsForUser,
} from "@/lib/dummyData/transactions";

const TransactionsCount = ({
    accountName,
    txnCount,
}: {
    accountName: string;
    txnCount: number;
}): ReactNode => {
    return (
        <div className="flex-shrink-0 w-[200px]">
            <h2 className="text-2xl font-semibold text-slate-900 mb-1">{accountName}</h2>
            <p className="text-slate-600">
                {txnCount} transaction
                {txnCount !== 1 ? "s" : ""}
            </p>
        </div>
    );
};

interface TransactionsViewProps {
    selectedAccountId: string | null;
    accountName: string;
}

export default function TransactionsView({
    selectedAccountId,
    accountName,
}: TransactionsViewProps) {
    let filteredTransactions;
    let totalAccountBalance;
    if (selectedAccountId) {
        filteredTransactions = selectAllTxnsForAccountId(selectedAccountId);
        totalAccountBalance = sumOfAllTxnsForAccountId(selectedAccountId);
    } else {
        filteredTransactions = selectAllTxnsForUser();
        totalAccountBalance = sumOfAllTxnsForUser();
    }

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

    return (
        <div className="flex-1 bg-white overflow-hidden flex flex-col">
            <div className="flex-shrink-0 w-full">
                <div className="pt-6 pb-6 px-6 flex items-center justify-between gap-8">
                    <TransactionsCount
                        accountName={accountName}
                        txnCount={filteredTransactions.length}
                    />

                    {/* Search Transactions */}
                    <div className="flex-1 max-w-md">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-slate-400" />
                            <Input
                                type="text"
                                placeholder="Search transactions..."
                                className="pl-9"
                            />
                        </div>
                    </div>

                    {/* Balance and Add Transactions */}
                    <div className="flex-shrink-0 flex items-end gap-4">
                        {/* Balance */}
                        <div className="text-right">
                            <h3 className="text-sm font-medium text-slate-500 mb-1">
                                Total Balance
                            </h3>
                            <p className="text-2xl font-semibold text-slate-900">
                                $
                                {totalAccountBalance.toLocaleString("en-US", {
                                    minimumFractionDigits: 2,
                                    maximumFractionDigits: 2,
                                })}
                            </p>
                        </div>
                        {/* Add Transaction button */}
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() => console.log("Add transaction")}
                        >
                            <Plus className="size-4 mr-2" />
                            Add Transaction
                        </Button>
                    </div>
                </div>
            </div>

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
                            {filteredTransactions.map((transaction) => (
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
        </div>
    );
}
