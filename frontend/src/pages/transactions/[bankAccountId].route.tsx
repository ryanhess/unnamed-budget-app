import TransactionsView from "@/components/transactions/TransactionsView";
import { useState, useEffect } from "react";
import { useRouter, NextRouter } from "next/router";
import { getBankAccountById } from "@/lib/dummyData/bankAccounts";
import { Transaction } from "@/lib/constants";
import { selectAllTxnsForAccountId, sumAllTxnsForAccountId } from "@/lib/dummyData/transactions";
import { getBankAccountIdFromRoute } from "@/lib/urlValidation";

const SpecificBankTransactions = ({}) => {
    const router = useRouter();

    const accountId = getBankAccountIdFromRoute(router);
    if (!accountId) {
        return null;
    }

    const bankAccount = getBankAccountById(accountId);
    if (!bankAccount) {
        router.replace("/transactions");
        return <>NOPE</>;
    }

    const [txns, setTxns] = useState<Transaction[]>([]);

    useEffect(() => {
        fetch(`http://localhost:8000/transactions/${accountId}`)
            .then((fetchResult) => fetchResult.json())
            .then((jsonFromResult) => setTxns(jsonFromResult));
    }, []);

    const bal = sumAllTxnsForAccountId(accountId);

    return (
        //prettier-ignore
        <TransactionsView
            accountName={bankAccount.name}
            transactions={txns}
            balance={bal} 
        />
    );
};

export default SpecificBankTransactions;
