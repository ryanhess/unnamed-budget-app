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
import { AccountButton, ViewSidebarSection } from "@/components/layout/sidebarButtons";
import { bankAccounts } from "@/lib/dummyData/bankAccounts";

const parseAccountFromUrlSegment = (segment: string): BankAccount | "all" | null => {
    const allTxnSegment = ROUTES.viewAlltransactions.segmentName;
    if (!segment) {
        return null;
    } else if (segment === allTxnSegment) {
        return allTxnSegment;
    } else {
        const resultOfFind = bankAccounts.find((a) => a.id === segment);
        const bankAccount = resultOfFind || null;
        return bankAccount;
    }
};

const parseRouteParamsFromRouter = (
    router: NextRouter
): { view: View; account: BankAccount | "all" | null } => {
    const segments = router.asPath.split("/");
    const view = segments[1];

    const accountSegment = segments[2];

    const account = parseAccountFromUrlSegment(accountSegment);

    return { view, account };
};

const Sidebar = () => {
    const router = useRouter();
    const { view: selectedView, account: selectedAccount } = parseRouteParamsFromRouter(router);

    const totalBalance = bankAccounts.reduce((sum, account) => sum + account.balance, 0);

    const allAccounts: BankAccount = {
        id: "all",
        name: "All Transactions",
        type: "checking",
        balance: totalBalance,
        icon: null,
    };

    return (
        <div className="w-64 bg-slate-50 border-r border-slate-200 h-full flex flex-col">
            <div className="flex-1 px-3 pt-6 overflow-auto">
                <ViewSidebarSection view="budget" isSelected={selectedView === "budget"} />

                <ViewSidebarSection
                    view="transactions"
                    isSelected={selectedView === "transactions"}
                >
                    <AccountButton
                        bankAccount={allAccounts}
                        isSelected={selectedAccount === "all"}
                    />

                    {bankAccounts.map((bankAccount) => (
                        <AccountButton
                            key={bankAccount.id}
                            bankAccount={bankAccount}
                            isSelected={selectedAccount === bankAccount}
                        />
                    ))}
                </ViewSidebarSection>
            </div>
        </div>
    );
};

export default Sidebar;
export { bankAccounts as accounts };
