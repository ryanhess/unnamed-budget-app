import TransactionsView from "@/components/TransactionsView";

const AllTransactions = ({}) => {
    return (
        <>
            <TransactionsView selectedAccountId={null} accountName="All Accounts" />
        </>
    );
};

export default AllTransactions;
