const ROUTES = {
    budget: "/budget",
    transactions: {
        allAccounts: {
            asPath: "/transactions/all",
            segmentName: "all",
        },
        account: {
            asPath: (bankAccountId: string) => `/transactions/${bankAccountId}`,
            pathDefinition: "/transactions/[bankAccountId]",
        },
    },
} as const;

export { ROUTES };
