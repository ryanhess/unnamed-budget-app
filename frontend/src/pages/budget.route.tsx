import { useState } from "react";
import { ReactNode } from "react";
import HeaderBar from "@/components/budget/HeaderBar";
import BudgetBody from "@/components/budget/BudgetBody";

const BudgetView = ({}): ReactNode => {
    const [monthOffset, setMonthOffset] = useState(0);

    return (
        <div className="flex-1 bg-white overflow-hidden flex flex-col">
            <HeaderBar monthOffset={monthOffset} setMonthOffset={setMonthOffset} />
            <BudgetBody />
        </div>
    );
};

export default BudgetView;
