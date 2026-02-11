import { BudgetItem } from "@/lib/constants/budgetItemType";
import { z } from "zod";

const BudgetGroupSchema = z.object({
    id: z.string(),
    name: z.string(),
    items: z.array(z.string()),
});

type BudgetGroup = z.infer<typeof BudgetGroupSchema>;

export type { BudgetGroup, BudgetGroupSchema };
