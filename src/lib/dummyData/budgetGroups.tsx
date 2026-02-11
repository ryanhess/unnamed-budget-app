import type { BudgetGroup } from "@/lib/constants";
import { getBudgetItemById } from "@/lib/dummyData/budgetItems";

const budgetGroups: BudgetGroup[] = [
    {
        id: "1",
        name: "Food",
        items: ["1", "2"],
    },
    {
        id: "2",
        name: "Transportation",
        items: ["3", "4"],
    },
    {
        id: "3",
        name: "Home",
        items: ["5", "6"],
    },
    {
        id: "4",
        name: "Lifestyle",
        items: ["7", "8"],
    },
    {
        id: "5",
        name: "Health",
        items: ["9", "10"],
    },
];

// prettier-ignore
const sumOneAssignedOrSpent = (field: "assigned" | "spent") =>
    (sum: number, itemId: string): number => {
        const item = getBudgetItemById(itemId);
        return sum + (item?.[field] ?? 0);
    };

//prettier-ignore
const getAllBudgetGroupIds = (): string[] =>
    budgetGroups.map((cat: BudgetGroup) => cat.id);

const getBudgetGroupById = (id: string): BudgetGroup | null =>
    budgetGroups.find((group) => group.id === id) || null;

// Fail silently here.
const getTotalAssignedForGroup = (id: string): number => {
    const group = getBudgetGroupById(id);
    return group?.items.reduce(sumOneAssignedOrSpent("assigned"), 0) ?? 0;
};

const getTotalSpentForGroup = (id: string): number => {
    const group = getBudgetGroupById(id);
    return group?.items.reduce(sumOneAssignedOrSpent("spent"), 0) ?? 0;
};

export {
    getAllBudgetGroupIds,
    getBudgetGroupById,
    getTotalAssignedForGroup,
    getTotalSpentForGroup,
};
