import TransactionsView from "@/components/transactions/TransactionsView";
import { useRouter } from "next/router";
import { getAccountNameById } from "@/lib/dummyData/bankAccounts";

function TransactionsByAccount({
    getAccountName,
}: {
    getAccountName: (accountId: string | null) => string;
}) {
    const router = useRouter();
    const accountId = router.query.bankAccountId;
    console.log(accountId);
    return (
        <TransactionsView
            selectedAccountId={accountId || null}
            accountName={getAccountName(accountId || null)}
        />
    );
}

const SpecificBankTransactions = ({}) => {
    return (
        <>
            <TransactionsByAccount getAccountName={getAccountNameById} />
        </>
    );
};

export default SpecificBankTransactions;
