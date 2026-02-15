import { NextRouter } from "next/router";

const getBankAccountIdFromRoute = (router: NextRouter): string | null => {
    const queryParam = router.query.bankAccountId;

    // This could be undefined during the first load of the page, before hydration
    // even though we are at the route defined by putting a string in the segment
    if (!queryParam) {
        return null;
    }
    // router.query combines the segment and potential query params
    // so a user could potentially append ?bankAccountId=1 and this
    // could potentially generate an array.
    if (Array.isArray(queryParam)) {
        return queryParam[0] || null;
    }
    return queryParam;
};

export { getBankAccountIdFromRoute };
