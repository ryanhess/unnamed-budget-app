import type { BudgetItem } from "@/lib/constants";

const budgetItems: BudgetItem[] = [
    { id: "1", name: "Groceries", assigned: 600, spent: 425.5 },
    { id: "2", name: "Dining Out", assigned: 300, spent: 285.75 },
    { id: "3", name: "Gas", assigned: 150, spent: 125.0 },
    { id: "4", name: "Public Transit", assigned: 50, spent: 20.0 },
    { id: "5", name: "Utilities", assigned: 250, spent: 220.0 },
    { id: "6", name: "Insurance", assigned: 350, spent: 350.0 },
    { id: "7", name: "Entertainment", assigned: 150, spent: 95.5 },
    { id: "8", name: "Shopping", assigned: 400, spent: 520.25 },
    { id: "9", name: "Healthcare", assigned: 200, spent: 75.0 },
    { id: "10", name: "Fitness", assigned: 100, spent: 100.0 },
];

const getTotalAssignedForAllBudgetItems = (): number => {
    return budgetItems.reduce((total, budget) => total + budget.assigned, 0);
};

const getTotalSpentForAllBudgetItems = (): number => {
    return budgetItems.reduce((total, budget) => total + budget.spent, 0);
};

const getBudgetItemById = (id: string | null | undefined): BudgetItem | null =>
    budgetItems.find((budget) => budget.id === id) || null;

export { getTotalAssignedForAllBudgetItems, getTotalSpentForAllBudgetItems, getBudgetItemById };
