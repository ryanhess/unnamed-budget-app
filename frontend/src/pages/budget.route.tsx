import { useState, useEffect } from "react";
import { ReactNode } from "react";
import HeaderBar from "@/components/budget/HeaderBar";
import BudgetBody from "@/components/budget/BudgetBody";
import { getMonthAsNumberAndYearFromOffset } from "@/lib/dateHelpers";
import { BudgetEntry, BudgetEntrySchema } from "@/lib/data-schemas";
import { z } from "zod";

const BudgetView = ({}): ReactNode => {
    const [monthOffset, setMonthOffset] = useState<number>(0);
    const [budgetEntries, setBudgetEntries] = useState<BudgetEntry[]>([]);

    useEffect(() => {
        // use monthOffset to form the api call. if zero, call current.
        const { month, year } = getMonthAsNumberAndYearFromOffset(monthOffset);

        fetch(`http://localhost:8000/budgets/${year}/${month}`)
            .then((fetchResult) => fetchResult.json())
            .then((jsonFromResult) => {
                const parsedBudgetData = z.array(BudgetEntrySchema).parse(jsonFromResult);
                setBudgetEntries(parsedBudgetData);
            });
    }, [monthOffset]);

    return (
        <div className="flex-1 bg-white overflow-hidden flex flex-col">
            <HeaderBar monthOffset={monthOffset} setMonthOffset={setMonthOffset} />
            <BudgetBody budgetEntries={budgetEntries} />
        </div>
    );
};

export default BudgetView;
