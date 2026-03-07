import { z } from "zod";

const BudgetItemSchema = z.object({
    id: z.string(),
    name: z.string(),
    assigned: z.number(),
    spent: z.number(),
});

type BudgetItem = z.infer<typeof BudgetItemSchema>;

export type { BudgetItem };
export { BudgetItemSchema };
