import TransactionsView from "@/components/transactions/TransactionsView";
import { selectAllTxnsForUser, sumOfAllTxnsForUser } from "@/lib/dummyData/transactions";

const AllTransactions = () => {
    const allTxnsForUser = selectAllTxnsForUser();
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
