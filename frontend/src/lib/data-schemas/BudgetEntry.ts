import { BudgetGroupSchema, BudgetItemSchema } from "@/lib/data-schemas";
import { z } from "zod";

const BudgetEntrySchema = z.object({
    type: z.enum(["group", "item"]),
    content: z.union([BudgetGroupSchema, BudgetItemSchema]),
});

type BudgetEntry = z.infer<typeof BudgetEntrySchema>;

export type { BudgetEntry };
export { BudgetEntrySchema };
