import {
    Wallet,
    CreditCard,
    PiggyBank,
    Building2,
    ChevronDown,
    ChevronRight,
    PieChart,
} from "lucide-react";
import { useRouter } from "next/router";
import { type View, ViewSchema, type BankAccount } from "@/constants";
import {
    AccountButton,
    ViewSidebarSection,
} from "@/components/layout/SidebarButtons";

const validViewFromString = (str: string): View =>
    ViewSchema.catch("budget").parse(str);

const bankAccounts: BankAccount[] = [
    {
        id: "1",
        name: "Main Checking",
        type: "checking",
        balance: 4250.75,
        icon: <Wallet className="size-5" />,
    },
    {
        id: "2",
        name: "Savings Account",
        type: "savings",
        balance: 12450.0,
        icon: <PiggyBank className="size-5" />,
    },
    {
        id: "3",
        name: "Credit Card",
        type: "credit",
        balance: -1250.5,
        icon: <CreditCard className="size-5" />,
    },
    {
        id: "4",
        name: "Investment",
        type: "investment",
        balance: 25800.25,
        icon: <Building2 className="size-5" />,
    },
];

const Sidebar = () => {
    const router = useRouter();
    const routeSegments = router.asPath.split("/");
    const viewSegment = routeSegments[1];
    const selectedAccount: BankAccount | null = null;
    const selectedView: View = validViewFromString(viewSegment);
    const totalBalance = bankAccounts.reduce(
        (sum, account) => sum + account.balance,
        0
    );

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
                <ViewSidebarSection
                    view="budget"
                    isSelected={selectedView === "budget"}
                >
                    <></>
                </ViewSidebarSection>

                <ViewSidebarSection
                    view="transactions"
                    isSelected={selectedView === "transactions"}
                >
                    <AccountButton
                        bankAccount={allAccounts}
                        selectedAccount={selectedAccount}
                    />

                    {bankAccounts.map((bankAccount) => (
                        <AccountButton
                            bankAccount={bankAccount}
                            selectedAccount={selectedAccount}
                        />
                    ))}
                </ViewSidebarSection>
            </div>
        </div>
    );
};

export default Sidebar;
export { bankAccounts as accounts };
