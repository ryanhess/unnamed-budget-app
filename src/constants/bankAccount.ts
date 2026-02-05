type BankAccount = {
    id: string;
    name: string;
    type: "checking" | "savings" | "credit" | "investment";
    balance: number;
    icon: React.ReactNode;
};

export { type BankAccount };
