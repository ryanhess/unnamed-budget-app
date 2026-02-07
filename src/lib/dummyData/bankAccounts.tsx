import { type BankAccount } from "@/constants/bankAccount";
import { Wallet, PiggyBank, CreditCard, Building2 } from "lucide-react";

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

const getAccountNameById = (accountId: string | null): string => {
    if (accountId === null) {
        return "All Accounts";
    }
    const account = bankAccounts.find((acc) => acc.id === accountId);
    return account ? account.name : "All Accounts";
};

const getAccountById = (id: string): BankAccount | null => {
    const account = bankAccounts.find((acc) => acc.id === id);
    return account || null;
};

const getSumOfAllBalances = () => {
    return bankAccounts.reduce((sum, account) => sum + account.balance, 0);
};

export { bankAccounts, getAccountNameById, getAccountById };
