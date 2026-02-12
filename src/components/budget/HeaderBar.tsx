import { ReactNode } from "react";
import {
    getMonthAndYearFromState,
    goToPreviousMonth,
    goToNextMonth,
} from "@/lib/budgetMonthStateHelpers";
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

const HeaderBar = ({
    monthOffset,
    setMonthOffset,
}: {
    monthOffset: number;
    setMonthOffset: Dispatch<SetStateAction<number>>;
}): ReactNode => {
    const { monthName, year } = getMonthAndYearFromState(monthOffset);
    const moneyAvailable = calcMoneyAvailable();
    return (
        <div className="flex-shrink-0 w-full">
            <div className="pt-6 pb-6 px-6 flex items-center justify-between gap-8">
                {/* Begin budget Month Display */}
                <div className="flex-shrink-0 w-[200px]">
                    <h2 className="text-2xl font-semibold text-slate-900 mb-1">{monthName}</h2>
                    <p className="text-slate-400">{year}</p>
                </div>
                {/* End budget month display */}

                {/* Begin Money Available */}
                <div className="flex items-center gap-4">
                    <button
                        onClick={() => goToPreviousMonth(setMonthOffset)}
                        className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
                    >
                        <ChevronLeft className="size-5 text-slate-600" />
                    </button>

                    <div className="text-center">
                        <h3 className="text-sm font-medium text-slate-500 mb-1">Money Available</h3>
                        <p
                            className={cn(
                                "text-2xl font-semibold",
                                moneyAvailable >= 0 ? "text-green-600" : "text-red-600"
                            )}
                        >
                            $
                            {Math.abs(moneyAvailable).toLocaleString("en-US", {
                                minimumFractionDigits: 2,
                                maximumFractionDigits: 2,
                            })}
                        </p>
                    </div>

                    <button
                        onClick={() => goToNextMonth(setMonthOffset)}
                        className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
                    >
                        <ChevronRight className="size-5 text-slate-600" />
                    </button>
                </div>
                {/* End Money Available */}

                {/* Begin Symmetry Placeholder` */}
                <div className="flex-shrink-0 w-[200px]" />
                {/* End Symmetry Placeholder */}
            </div>
        </div>
    );
};

export default HeaderBar;
