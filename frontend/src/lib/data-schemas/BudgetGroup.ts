import { BudgetItemSchema } from "@/lib/data-schemas";
import { z } from "zod";

const BudgetGroupSchema = z.object({
    id: z.int(),
    name: z.string(),
    budget_items: z.array(BudgetItemSchema),
    assigned: z.number(),
    spent: z.number(),
    available: z.number(),
});

type BudgetGroup = z.infer<typeof BudgetGroupSchema>;

export type { BudgetGroup };
export { BudgetGroupSchema };
