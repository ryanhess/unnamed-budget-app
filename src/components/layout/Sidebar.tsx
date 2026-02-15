import { ReactNode } from "react";
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
import { type View, type BankAccount } from "@/lib/constants";
import {
    AccountButton,
    ViewSidebarSection,
    type ViewSidebarProps,
    type AccountButtonProps,
} from "@/components/layout/sidebarButtons";
import {
    bankAccounts,
    getBankAccountById,
    getSumOfAllBalances,
} from "@/lib/dummyData/bankAccounts";
import { getBankAccountIdFromRoute } from "@/lib/urlValidation";

const getSidebarViews = (
    selectedView: string
): Record<View, Omit<ViewSidebarProps, "children">> => {
    return {
        budget: {
            label: "Budget",
            route: "/budget",
            icon: <PieChart className="size-4" />,
            isSelected: selectedView === "budget",
        },
        transactions: {
            label: "Transactions",
            route: "/transactions",
            icon: <Wallet className="size-4" />,
            isSelected: selectedView === "transactions",
        },
    };
};

const getAccountButtonPropsArray = (selectedAccountId: string): AccountButtonProps[] =>
    bankAccounts.map((account) => ({
        // needs to be type asserted as Route because the template string
        // cant pass the static type check.
        linkResolvedPath: `/transactions/${account.id}` as Route,
        isSelected: selectedAccountId === account.id,
        accountId: account.id,
        accountName: account.name,
        accountBalance: account.balance,
    }));

const getAllAccountsButtonProps = (
    selectedAccountId: string,
    totalBalance: number
): AccountButtonProps => ({
    linkResolvedPath: "/transactions",
    isSelected: selectedAccountId === "all",
    accountId: "all",
    accountName: "All Transactions",
    accountBalance: totalBalance,
});

const SidebarLayoutContainer = ({ children }: { children: ReactNode }): ReactNode => {
    return (
        <div className="w-64 bg-slate-50 border-r border-slate-200 h-full flex flex-col">
            <div className="flex-1 px-3 pt-6 overflow-auto">
                {/* prettier-ignore */}
                {children}
            </div>
        </div>
    );
};

const Sidebar = () => {
    const router = useRouter();
    const { pathname } = router;

    // using type assertion here so selectedView stays as View downstream
    // More intensive ways of validating view here would add complexity,
    // and there is already the failsafe of going to a 404 if a bad route is inputted.
    // The file system is the source of truth for routes, and
    const selectedView = pathname.split("/")[1] as View;

    const selectedAccountId: string = getBankAccountIdFromRoute(router) ?? "all";

    const totalBalance = getSumOfAllBalances();
    // allAccounts.balance = totalBalance;

    const sidebarViews = getSidebarViews(selectedView);
    const accountButtonPropsArray = getAccountButtonPropsArray(selectedAccountId);
    const allAccountsButtonProps = getAllAccountsButtonProps(selectedAccountId, totalBalance);

    return (
        <SidebarLayoutContainer>
            <ViewSidebarSection {...sidebarViews.budget} />
            <ViewSidebarSection {...sidebarViews.transactions}>
                <AccountButton {...allAccountsButtonProps} />
                {accountButtonPropsArray.map((accountButtonProps) => (
                    <AccountButton key={accountButtonProps.accountId} {...accountButtonProps} />
                ))}
            </ViewSidebarSection>
        </SidebarLayoutContainer>
    );
};

export default Sidebar;
