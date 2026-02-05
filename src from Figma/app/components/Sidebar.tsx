import { Wallet, CreditCard, PiggyBank, Building2, ChevronDown, ChevronRight, PieChart } from "lucide-react";
import { cn } from "@/app/components/ui/utils";

interface BankAccount {
  id: string;
  name: string;
  type: "checking" | "savings" | "credit" | "investment";
  balance: number;
  icon: React.ReactNode;
}

const accounts: BankAccount[] = [
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

interface SidebarProps {
  selectedAccount: string | null;
  onSelectAccount: (accountId: string | null) => void;
  selectedView: "budget" | "transactions";
  onSelectView: (view: "budget" | "transactions") => void;
}

export function Sidebar({ selectedAccount, onSelectAccount, selectedView, onSelectView }: SidebarProps) {
  const totalBalance = accounts.reduce((sum, account) => sum + account.balance, 0);

  const handleBudgetClick = () => {
    onSelectView("budget");
    onSelectAccount(null);
  };

  const handleTransactionsClick = () => {
    onSelectView("transactions");
    if (selectedView !== "transactions") {
      onSelectAccount(null);
    }
  };

  return (
    <div className="w-64 bg-slate-50 border-r border-slate-200 h-full flex flex-col">
      <div className="flex-1 px-3 pt-6 overflow-auto">
        {/* Budget Section */}
        <button
          onClick={handleBudgetClick}
          className={cn(
            "w-full text-left px-3 py-3 rounded-lg mb-2 transition-colors flex items-center gap-2",
            selectedView === "budget"
              ? "bg-slate-900 text-white"
              : "hover:bg-slate-100 text-slate-700"
          )}
        >
          <PieChart className="size-4" />
          <span className="text-sm font-medium">Budget</span>
        </button>

        {/* Transactions Section */}
        <div className="mb-4">
          <button
            onClick={handleTransactionsClick}
            className={cn(
              "w-full text-left px-3 py-3 rounded-lg mb-1 transition-colors flex items-center gap-2",
              selectedView === "transactions"
                ? "bg-slate-900 text-white"
                : "hover:bg-slate-100 text-slate-700"
            )}
          >
            <Wallet className="size-4" />
            <span className="text-sm font-medium">Transactions</span>
          </button>

          {/* Accounts List - Only visible when Transactions is selected */}
          {selectedView === "transactions" && (
            <div className="ml-3 mt-1 space-y-1">
              <button
                onClick={() => onSelectAccount(null)}
                className={cn(
                  "w-full text-left px-3 py-1.5 rounded-lg transition-colors",
                  selectedAccount === null
                    ? "bg-slate-200 text-slate-900"
                    : "hover:bg-slate-100 text-slate-700"
                )}
              >
                <p className="text-sm">All Accounts</p>
              </button>

              {accounts.map((account) => (
                <button
                  key={account.id}
                  onClick={() => onSelectAccount(account.id)}
                  className={cn(
                    "w-full text-left px-3 py-1.5 rounded-lg transition-colors",
                    selectedAccount === account.id
                      ? "bg-slate-200 text-slate-900"
                      : "hover:bg-slate-100 text-slate-700"
                  )}
                >
                  <div className="flex items-center justify-between">
                    <p className="text-sm">{account.name}</p>
                    <p className={cn(
                      "text-sm",
                      account.balance < 0 ? "text-red-500" : "text-slate-500"
                    )}>
                      ${Math.abs(account.balance).toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </p>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export { accounts };