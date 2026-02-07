// Single source of truth for navigation for a particular purpose. Returns anything relevant about
// that: the resolved route string, the params, the segment name by itself... whatever is needed.
// However, it is not the source of truth for VIEWS. see views.ts

const ROUTES = {
    viewBudget: "/budget",
    viewAlltransactions: {
        resolvedPath: "/transactions/all",
        segmentName: "all",
    },
    viewAccountTransactions: {
        resolvedPath: (bankAccountId: string) => `/transactions/${bankAccountId}`,
        urlTemplate: "/transactions/[bankAccountId]",
        urlParam: "bankAccountId",
    },
} as const;

export { ROUTES };
