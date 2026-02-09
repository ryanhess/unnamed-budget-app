import { z } from "zod";
import { ReactNode } from "react";

const TransactionSchema = z.object({
    id: z.string(),
    accountId: z.string(),
    date: z.string(),
    merchant: z.string(),
    category: z.string(),
    amount: z.number(),
    type: z.enum(["income", "expense"]),
});

// Add in the icon to the type, because icon cannot be serialized.
type Transaction = z.infer<typeof TransactionSchema> & {
    icon: ReactNode;
};

export type { Transaction };
export { TransactionSchema };
