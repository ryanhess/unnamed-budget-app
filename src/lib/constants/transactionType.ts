type Transaction = {
    id: string;
    date: string;
    merchant: string;
    category: string;
    amount: number;
    type: "income" | "expense";
    icon: React.ReactNode;
    accountId: string;
};

export type { Transaction };
