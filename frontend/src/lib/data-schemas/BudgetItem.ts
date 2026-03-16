import { z } from "zod";
import { EnvelopeSchema } from "@/lib/data-schemas";

const BudgetItemSchema = z.object({
    id: z.int(),
    name: z.string(),
    envelope: EnvelopeSchema,
});

type BudgetItem = z.infer<typeof BudgetItemSchema>;

export type { BudgetItem };
export { BudgetItemSchema };
