import { BudgetItem, BudgetItemSchema } from "@/lib/constants/budgetItemType";
import { z } from "zod";

const BudgetGroupSchema = z.object({
    id: z.string(),
    name: z.string(),
    budget_items: z.array(BudgetItemSchema),
});

type BudgetGroup = z.infer<typeof BudgetGroupSchema>;

export type { BudgetGroup, BudgetGroupSchema };
