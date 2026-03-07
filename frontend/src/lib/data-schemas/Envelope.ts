import { z } from "zod";

const EnvelopeSchema = z.object({
    id: z.int(),
    year: z.int(),
    month: z.int(),
    assigned: z.number(),
    budget_item_id: z.int(),
    spent: z.number(),
    available: z.number(),
});

type Envelope = z.infer<typeof EnvelopeSchema>;

export type { Envelope };
export { EnvelopeSchema };
