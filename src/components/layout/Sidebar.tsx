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
import { Route } from "next";
import { type View, type BankAccount } from "@/constants";
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

const Sidebar = () => {
    const router = useRouter();
    const { pathname, query } = useRouter();

    // using type assertion here so selectedView stays as View downstream
    // More intensive ways of validating view here would add complexity,
    // and there is already the failsafe of going to a 404 if a bad route is inputted.
    // The file system is the source of truth for routes.
    const selectedView = pathname.split("/")[1] as View;
    const bankAccountId = query.bankAccountId as string;

    const selectedAccount = getAccountById(bankAccountId) || allAccounts;

    const totalBalance = getSumOfAllBalances();
    allAccounts.balance = totalBalance;

    const accountButtonPropsArray = bankAccounts.map((account) => {
        return {
            // needs to be type asserted as Route because the template string
            // cant pass the static type check.
            linkResolvedPath: `/transactions/${account.id}` as Route,
            isSelected: selectedAccount === account,
            accountId: account.id,
            accountName: account.name,
            accountBalance: account.balance,
        };
    });

    const allAccountsButtonProps: AccountButtonProps = {
        linkResolvedPath: "/transactions",
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
