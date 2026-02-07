import {
    Wallet,
    CreditCard,
    PiggyBank,
    Building2,
    ChevronDown,
    ChevronRight,
    PieChart,
} from "lucide-react";
import { NextRouter, useRouter } from "next/router";
import { ROUTES, type View, type BankAccount } from "@/constants";
import {
    AccountButton,
    ViewSidebarSection,
    type AccountButtonProps,
} from "@/components/layout/sidebarButtons";
import { bankAccounts, getAccountById, getSumOfAllBalances } from "@/lib/dummyData/bankAccounts";

let allAccounts: BankAccount = {
    id: "all",
    name: "All Transactions",
    type: "checking",
    balance: 0,
    icon: null,
};

const parseAccountFromUrlSegment = (router: NextRouter): BankAccount | null => {
    // Where this function is, and potentially anywhere it could be called from,
    // we can safely assume we are in a transactions view. If we arent, and this otherwise would be called
    // it wont be called because we have 404'd.
    const path = router.asPath;
    const idSegment = router.query.bankAccountId;
    const allTxnResolvedPath = ROUTES.viewAllTransactions.resolvedPath;
    if (path === allTxnResolvedPath) {
        return allAccounts;
    } else if (Array.isArray(idSegment)) {
        return null;
    } else {
        const resultOfFind = getAccountById(idSegment);
        const bankAccount = resultOfFind || null;
        return bankAccount;
    }
};

const parseRouteParamsFromRouter = (
    router: NextRouter
): { view: View; account: BankAccount | null } => {
    const segments = router.asPath.split("/");

    // NextJS validates the url at runtime naturally with the routes system.
    // We want to enforce compile time errors, so this just tells Typescript
    // that from here forward, view should be a View. That way,
    // downstream attempts to use a different view name would fail at compile time.
    const view: View = segments[1] as View;

    let account;
    if (view === "transactions") {
        account = parseAccountFromUrlSegment(router);
    } else {
        account = null;
    }

    return { view, account };
};

const Sidebar = () => {
    const router = useRouter();
    const { view: selectedView, account: selectedAccount } = parseRouteParamsFromRouter(router);

    const totalBalance = getSumOfAllBalances();
    allAccounts.balance = totalBalance;
    console.log(selectedAccount);

    const accountButtonPropsArray: AccountButtonProps[] = bankAccounts.map((account) => ({
        linkResolvedPath: ROUTES.viewAccountTransactions.resolvedPath(account.id),
        isSelected: selectedAccount === account,
        accountId: account.id,
        accountName: account.name,
        accountBalance: account.balance,
    }));

    const allAccountsButtonProps: AccountButtonProps = {
        linkResolvedPath: ROUTES.viewAllTransactions.resolvedPath,
        isSelected: selectedAccount === allAccounts,
        accountId: allAccounts.id,
        accountName: allAccounts.name,
        accountBalance: totalBalance,
    };

    return (
        <div className="w-64 bg-slate-50 border-r border-slate-200 h-full flex flex-col">
            <div className="flex-1 px-3 pt-6 overflow-auto">
                <ViewSidebarSection view="budget" isSelected={selectedView === "budget"} />

                <ViewSidebarSection
                    view="transactions"
                    isSelected={selectedView === "transactions"}
                >
                    <AccountButton {...allAccountsButtonProps} />

                    {accountButtonPropsArray.map((accountButtonProps) => (
                        <AccountButton {...accountButtonProps} />
                    ))}
                </ViewSidebarSection>
            </div>
        </div>
    );
};

export default Sidebar;
