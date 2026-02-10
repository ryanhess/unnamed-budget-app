import TransactionsView from "@/components/transactions/TransactionsView";
import { useRouter, NextRouter } from "next/router";
import { getBankAccountById } from "@/lib/dummyData/bankAccounts";
import { Transaction } from "@/lib/constants";
import { selectAllTxnsForAccountId, sumOfAllTxnsForAccountId } from "@/lib/dummyData/transactions";

const getIdFromRoute = (router: NextRouter): string | null => {
    const queryParam = router.query.bankAccountId;

    // This could be undefined during the first load of the page, before hydration
    // even though we are at the route defined by putting a string in the segment
    if (!queryParam) {
        return null;
    }
    // router.query combines the segment and potential query params
    // so a user could potentially append ?bankAccountId=1 and this
    // could potentially generate an array.
    if (Array.isArray(queryParam)) {
        return queryParam[0] || null;
    }
    return queryParam;
};

const SpecificBankTransactions = ({}) => {
    const router = useRouter();

    const accountId = getIdFromRoute(router);
    if (!accountId) {
        return null;
    }

    const bankAccount = getBankAccountById(accountId);
    if (!bankAccount) {
        router.replace("/transactions");
        return <>NOPE</>;
    }

    const txns: Transaction[] = selectAllTxnsForAccountId(accountId);
    const bal = sumOfAllTxnsForAccountId(accountId);

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
