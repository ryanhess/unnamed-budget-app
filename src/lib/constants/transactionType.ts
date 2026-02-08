import { z } from "zod";
import { ReactNode } from "react";

const TransactionSchema = z.object({
    id: z.string(),
    date: z.string(),
    merchant: z.string(),
    category: z.string(),
    amount: z.number(),
    accountId: z.string(),
    type: z.enum(["income", "expense"]),
});

type Transaction = z.infer<typeof TransactionSchema> & {
    icon: ReactNode;
};

export type { Transaction };
export { TransactionSchema };
