// View type. This provides validation at compile time.
// Use this type any place where the view is the condition for
// any logic or the key for anything.
// Next.js does the validation at runtime for routes.

type View = "budget" | "transactions";

export { type View };
