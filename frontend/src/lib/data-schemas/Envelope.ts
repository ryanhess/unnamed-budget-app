import { z } from "zod";

const EnvelopeSchema = z.object({
    id: z.int(),
    assigned: z.number(),
    spent: z.number(),
    available: z.number(),
});

type Envelope = z.infer<typeof EnvelopeSchema>;

export type { Envelope };
export { EnvelopeSchema };
