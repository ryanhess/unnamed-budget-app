import { useState } from "react";
import { Sidebar, accounts } from "@/app/components/Sidebar";
import { TopBar } from "@/app/components/TopBar";
import { TransactionsView } from "@/app/components/TransactionsView";
import { BudgetView } from "@/app/components/BudgetView";

export default function App() {
  const [selectedAccount, setSelectedAccount] = useState<string | null>(null);
  const [selectedView, setSelectedView] = useState<"budget" | "transactions">("transactions");

  const getAccountName = () => {
    if (selectedAccount === null) {
      return "All Accounts";
    }
    const account = accounts.find((acc) => acc.id === selectedAccount);
    return account ? account.name : "All Accounts";
  };

  return (
    <div className="h-screen flex flex-col overflow-hidden">
      <TopBar onAddTransaction={() => console.log("Add transaction")} />
      
      <div className="flex-1 flex overflow-hidden">
        <Sidebar 
          selectedAccount={selectedAccount} 
          onSelectAccount={setSelectedAccount}
          selectedView={selectedView}
          onSelectView={setSelectedView}
        />
        
        {selectedView === "transactions" ? (
          <TransactionsView 
            selectedAccount={selectedAccount} 
            accountName={getAccountName()}
          />
        ) : (
          <BudgetView />
        )}
      </div>
    </div>
  );
}