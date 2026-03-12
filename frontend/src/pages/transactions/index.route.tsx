import { useState, useEffect } from "react";
import { Transaction } from "@/lib/data-schemas";
import TransactionsView from "@/components/transactions/TransactionsView";
import { sumOfAllTxnsForUser } from "@/lib/dummyData/transactions";

const AllTransactions = () => {
    const [allTxnsForUser, setAllTxnsForUser] = useState<Transaction[]>([]);

    useEffect(() => {
        fetch("http://localhost:8000/transactions/")
            .then((fetchResult) => fetchResult.json())
            .then((jsonFromResult) => setAllTxnsForUser(jsonFromResult));
    }, []);

    const balance = sumOfAllTxnsForUser();

    return (
        <TransactionsView
            accountName="All Transactions"
            transactions={allTxnsForUser}
            balance={balance}
        />
    );
};

export default AllTransactions;
