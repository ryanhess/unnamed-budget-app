import { ReactNode } from "react";
import { getMonthAndYearFromOffset } from "@/lib/dateHelpers";
import { Dispatch, SetStateAction } from "react";
import { cn } from "@/components/ui/utils";
import { ChevronRight, ChevronLeft } from "lucide-react";
import {
    getTotalAssignedForAllBudgetItems,
    getTotalSpentForAllBudgetItems,
} from "@/lib/dummyData/budgetItems";

const calcMoneyAvailable = (): number => {
    const totalAssigned = getTotalAssignedForAllBudgetItems();
    const totalSpent = getTotalSpentForAllBudgetItems();
    return totalAssigned - totalSpent;
};

const BudgetMonthDisplay = ({
    monthName,
    year,
}: {
    monthName: string;
    year: number;
}): ReactNode => {
    return (
        <div className="flex-shrink-0 w-[200px]">
            <h2 className="text-2xl font-semibold text-slate-900 mb-1">{monthName}</h2>
            <p className="text-slate-400">{year}</p>
        </div>
    );
};

const MoneyAvailableDisplay = ({ moneyAvail }: { moneyAvail: number }): ReactNode => {
    return (
        <div className="text-center">
            <h3 className="text-sm font-medium text-slate-500 mb-1">Money Available</h3>
            <p
                className={cn(
                    "text-2xl font-semibold",
                    moneyAvail >= 0 ? "text-green-600" : "text-red-600"
                )}
            >
                $
                {Math.abs(moneyAvail).toLocaleString("en-US", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                })}
            </p>
        </div>
    );
};

const MoneyAvailableContainer = ({
    prevMonHandler,
    nextMonHandler,
    children,
}: {
    prevMonHandler: () => void;
    nextMonHandler: () => void;
    children: ReactNode;
}) => {
    return (
        <div className="flex items-center gap-4">
            <button
                onClick={prevMonHandler}
                className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
            >
                <ChevronLeft className="size-5 text-slate-600" />
            </button>
            {children}
            <button
                onClick={nextMonHandler}
                className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
            >
                <ChevronRight className="size-5 text-slate-600" />
            </button>
        </div>
    );
};

const HeaderBar = ({
    monthOffset,
    setMonthOffset,
}: {
    monthOffset: number;
    setMonthOffset: Dispatch<SetStateAction<number>>;
}): ReactNode => {
    const { monthName, year } = getMonthAndYearFromOffset(monthOffset);
    const moneyAvailable = calcMoneyAvailable();

    const goToPreviousMonth = () => {
        setMonthOffset((prev) => prev - 1);
    };

    const goToNextMonth = () => {
        setMonthOffset((prev) => prev + 1);
    };

    return (
        <div className="flex-shrink-0 w-full">
            <div className="pt-6 pb-6 px-6 flex items-center justify-between gap-8">
                <BudgetMonthDisplay monthName={monthName} year={year} />
                <MoneyAvailableContainer
                    prevMonHandler={goToPreviousMonth}
                    nextMonHandler={goToNextMonth}
                >
                    <MoneyAvailableDisplay moneyAvail={moneyAvailable} />
                </MoneyAvailableContainer>

                <div className="flex-shrink-0 w-[200px]" />
            </div>
        </div>
    );
};

export default HeaderBar;
