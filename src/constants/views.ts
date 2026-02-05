import { z } from "zod";

const ViewSchema = z.enum(["budget", "transactions"]);
type View = z.infer<typeof ViewSchema>;

export { ViewSchema, type View };
