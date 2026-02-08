import { ReactNode } from "react";
import { Search, Plus } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
    sumOfAllTxnsForAccountId,
    sumOfAllTxnsForUser,
    selectAllTxnsForAccountId,
    selectAllTxnsForUser,
} from "@/lib/dummyData/transactions";
import TransactionsTable from "@/components/transactions/TransactionsTable";

const AddTransactionButton = (): ReactNode => {
    return (
        <Button variant="outline" size="sm" onClick={() => console.log("Add transaction")}>
            <Plus className="size-4 mr-2" />
            Add Transaction
        </Button>
    );
};

const BalanceDisplay = ({ total }: { total: number }): ReactNode => {
    return (
        <div className="text-right">
            <h3 className="text-sm font-medium text-slate-500 mb-1">Total Balance</h3>
            <p className="text-2xl font-semibold text-slate-900">
                $
                {total.toLocaleString("en-US", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                })}
            </p>
        </div>
    );
};

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

const TransactionSearchBar = (): ReactNode => {
    return (
        <div className="flex-1 max-w-md">
            <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-slate-400" />
                <Input type="text" placeholder="Search transactions..." className="pl-9" />
            </div>
        </div>
    );
};

const RightHeaderContainer = ({
    totalAccountBalance,
}: {
    totalAccountBalance: number;
}): ReactNode => {
    return (
        <div className="flex-shrink-0 flex items-end gap-4">
            <AddTransactionButton />
            <BalanceDisplay total={totalAccountBalance} />
        </div>
    );
};

interface TransactionsViewProps {
    selectedAccountId: string | null;
    accountName: string;
}

const TransactionsView = ({ selectedAccountId, accountName }: TransactionsViewProps): ReactNode => {
    let filteredTransactions;
    let totalAccountBalance;
    if (selectedAccountId) {
        filteredTransactions = selectAllTxnsForAccountId(selectedAccountId);
        totalAccountBalance = sumOfAllTxnsForAccountId(selectedAccountId);
    } else {
        filteredTransactions = selectAllTxnsForUser();
        totalAccountBalance = sumOfAllTxnsForUser();
    }

    return (
        <div className="flex-1 bg-white overflow-hidden flex flex-col">
            <div className="flex-shrink-0 w-full">
                <div className="pt-6 pb-6 px-6 flex items-center justify-between gap-8">
                    <TransactionsCount
                        accountName={accountName}
                        txnCount={filteredTransactions.length}
                    />
                    <TransactionSearchBar />
                    <RightHeaderContainer totalAccountBalance={totalAccountBalance} />
                </div>
            </div>

            <TransactionsTable filteredTransactions={filteredTransactions} />
        </div>
    );
};

export default TransactionsView;
