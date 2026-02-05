const ROUTES = {
    budget: "/budget",
    transactions: {
        allAccounts: "/transactions/all",
        account: {
            urlEvaluated: (bankAccountId: string) =>
                `/transactions/${bankAccountId}`,
            urlDefinition: "/transactions/[bankAccountId]",
        },
    },
};

export { ROUTES };
