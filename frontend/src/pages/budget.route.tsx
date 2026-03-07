import { useState, useEffect } from "react";
import { ReactNode } from "react";
import HeaderBar from "@/components/budget/HeaderBar";
import BudgetBody from "@/components/budget/BudgetBody";
import { getMonthAsNumberAndYearFromOffset } from "@/lib/dateHelpers";
import { BudgetEntry } from "@/lib/data-schemas";

const BudgetView = ({}): ReactNode => {
    const [monthOffset, setMonthOffset] = useState(0);
    const [budgetEntries, setBudgetEntries] = useState<BudgetEntry[]>([]);

    // use monthOffset to form the api call. if zero, call current.
    const { month, year } = getMonthAsNumberAndYearFromOffset(monthOffset);

    useEffect(() => {
        fetch(`http://localhost:8000/budgets/2026/3`)
            .then((fetchResult) => fetchResult.json())
            .then((jsonFromResult) => setBudgetEntries(jsonFromResult));
    }, []);

    return (
        <div className="flex-1 bg-white overflow-hidden flex flex-col">
            <HeaderBar monthOffset={monthOffset} setMonthOffset={setMonthOffset} />
            <BudgetBody budgetEntries={budgetEntries} />
        </div>
    );
};

export default BudgetView;
