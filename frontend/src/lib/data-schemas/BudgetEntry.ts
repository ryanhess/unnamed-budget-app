import { BudgetGroupSchema, BudgetItemSchema } from "@/lib/data-schemas";
import { z } from "zod";

const BudgetEntrySchema = z.discriminatedUnion("type", [
    z.object({
        type: z.literal("group"),
        content: BudgetGroupSchema,
    }),
    z.object({
        type: z.literal("item"),
        content: BudgetItemSchema,
    }),
]);

type BudgetEntry = z.infer<typeof BudgetEntrySchema>;

export type { BudgetEntry };
export { BudgetEntrySchema };
