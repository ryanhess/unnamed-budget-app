import TransactionsView from "@/components/TransactionsView";

const AllTransactions = ({}) => {
    return (
        <>
            <TransactionsView selectedAccount={null} accountName="All Accounts" />
        </>
    );
};

export default AllTransactions;
