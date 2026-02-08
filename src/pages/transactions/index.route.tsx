import TransactionsView from "@/components/transactions/TransactionsView";

const AllTransactions = ({}) => {
    return (
        <>
            <TransactionsView selectedAccountId={null} accountName="All Accounts" />
        </>
    );
};

export default AllTransactions;
