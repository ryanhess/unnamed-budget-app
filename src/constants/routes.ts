const ROUTES = {
    viewBudget: "/budget",
    viewAlltransactions: {
        resolvedPath: "/transactions/all",
        segmentName: "all",
    },
    viewAccountTransactions: {
        resolvedPath: (bankAccountId: string) =>
            `/transactions/${bankAccountId}`,
        urlTemplate: "/transactions/[bankAccountId]",
        urlParam: "bankAccountId",
    },
} as const;

export { ROUTES };
