import { cn } from "@/components/ui/utils";
import { ChevronDown, ChevronRight, ChevronLeft } from "lucide-react";
import { useState } from "react";
import { ReactNode } from "react";
import {
    getAllBudgetGroupIds,
    getBudgetGroupById,
    getTotalAssignedForGroup,
    getTotalSpentForGroup,
} from "@/lib/dummyData/budgetGroups";
import {
    getTotalAssignedForAllBudgetItems,
    getTotalSpentForAllBudgetItems,
    getBudgetItemById,
} from "@/lib/dummyData/budgetItems";

const getMonthAndYearFromState = (monthOffset: number): { monthName: string; year: number } => {
    const currentDate = new Date();
    currentDate.setMonth(currentDate.getMonth() + monthOffset);

    const monthName = currentDate.toLocaleString("en-US", { month: "long" });
    const year = currentDate.getFullYear();
    return { monthName, year };
};

const BudgetView = ({}): ReactNode => {
    const [monthOffset, setMonthOffset] = useState(0);

    const { monthName, year } = getMonthAndYearFromState(monthOffset);

    const allBudgetGroupIds = getAllBudgetGroupIds();
    const [expandedGroups, setExpandedGroups] = useState<Set<string>>(new Set(allBudgetGroupIds));

    const toggleExpandGroup = (budgetGroupId: string) => {
        setExpandedGroups((prev) => {
            const newSet = new Set(prev);
            if (newSet.has(budgetGroupId)) {
                newSet.delete(budgetGroupId);
            } else {
                newSet.add(budgetGroupId);
            }
            return newSet;
        });
    };

    const goToPreviousMonth = () => {
        setMonthOffset((prev) => prev - 1);
    };

    const goToNextMonth = () => {
        setMonthOffset((prev) => prev + 1);
    };

    const totalAssigned = getTotalAssignedForAllBudgetItems();
    const totalSpent = getTotalSpentForAllBudgetItems();
    const moneyAvailable = totalAssigned - totalSpent;

    return (
        <div className="flex-1 bg-white overflow-hidden flex flex-col">
            {/* Begin budget header bar */}
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
                            onClick={goToPreviousMonth}
                            className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
                        >
                            <ChevronLeft className="size-5 text-slate-600" />
                        </button>

                        <div className="text-center">
                            <h3 className="text-sm font-medium text-slate-500 mb-1">
                                Money Available
                            </h3>
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
                            onClick={goToNextMonth}
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
            {/* end budget header bar */}

            {/* begin budget body */}
            <div className="flex-1 overflow-auto">
                <div className="w-full px-6 pb-6">
                    <div className="space-y-4">
                        {allBudgetGroupIds.map((groupId) => {
                            const group = getBudgetGroupById(groupId);

                            if (!group) {
                                return null;
                            }

                            const isExpanded = expandedGroups.has(group.id);
                            const groupTotalAssigned = getTotalAssignedForGroup(group.id);
                            const groupTotalSpent = getTotalSpentForGroup(group.id);
                            const categoryAvailable = groupTotalAssigned - groupTotalSpent;
                            const categoryPercentSpent =
                                groupTotalAssigned > 0
                                    ? Math.min((groupTotalSpent / groupTotalAssigned) * 100, 100)
                                    : 0;
                            const isCategoryOverspent = groupTotalSpent > groupTotalAssigned;

                            return (
                                <div
                                    key={group.id}
                                    className="bg-white border border-slate-200 rounded-lg p-5"
                                >
                                    <button
                                        onClick={() => toggleExpandGroup(group.id)}
                                        className="w-full flex items-center justify-between mb-4 text-left hover:opacity-70 transition-opacity"
                                    >
                                        <div className="flex items-center gap-2">
                                            {isExpanded ? (
                                                <ChevronDown className="size-5 text-slate-600" />
                                            ) : (
                                                <ChevronRight className="size-5 text-slate-600" />
                                            )}
                                            <h3 className="text-lg font-semibold text-slate-900">
                                                {group.name}
                                            </h3>
                                        </div>

                                        {!isExpanded && (
                                            <div className="text-right">
                                                <p
                                                    className={cn(
                                                        "text-base font-semibold",
                                                        isCategoryOverspent
                                                            ? "text-red-600"
                                                            : "text-slate-900"
                                                    )}
                                                >
                                                    $
                                                    {Math.abs(categoryAvailable).toLocaleString(
                                                        "en-US",
                                                        {
                                                            minimumFractionDigits: 2,
                                                            maximumFractionDigits: 2,
                                                        }
                                                    )}
                                                </p>
                                                <p className="text-xs text-slate-500">
                                                    {isCategoryOverspent
                                                        ? "overspent"
                                                        : "available"}
                                                </p>
                                            </div>
                                        )}
                                    </button>

                                    {isExpanded ? (
                                        <div className="space-y-4">
                                            {group.items.map((itemId) => {
                                                const item = getBudgetItemById(itemId);

                                                if (!item) {
                                                    return null;
                                                }

                                                const available = item.assigned - item.spent;
                                                const percentSpent =
                                                    item.assigned > 0
                                                        ? Math.min(
                                                              (item.spent / item.assigned) * 100,
                                                              100
                                                          )
                                                        : 0;
                                                const isOverspent = item.spent > item.assigned;

                                                return (
                                                    <div key={item.id} className="space-y-2">
                                                        <div className="flex items-center justify-between">
                                                            <h4 className="text-base font-medium text-slate-900">
                                                                {item.name}
                                                            </h4>
                                                            <div className="text-right">
                                                                <p
                                                                    className={cn(
                                                                        "text-base font-semibold",
                                                                        isOverspent
                                                                            ? "text-red-600"
                                                                            : "text-slate-900"
                                                                    )}
                                                                >
                                                                    $
                                                                    {Math.abs(
                                                                        available
                                                                    ).toLocaleString("en-US", {
                                                                        minimumFractionDigits: 2,
                                                                        maximumFractionDigits: 2,
                                                                    })}
                                                                </p>
                                                                <p className="text-xs text-slate-500">
                                                                    {isOverspent
                                                                        ? "overspent"
                                                                        : "available"}
                                                                </p>
                                                            </div>
                                                        </div>

                                                        {/* Thermometer Bar */}
                                                        <div className="mb-1">
                                                            <div className="h-3 bg-slate-100 rounded-full overflow-hidden">
                                                                <div
                                                                    className={cn(
                                                                        "h-full transition-all rounded-full",
                                                                        isOverspent
                                                                            ? "bg-red-500"
                                                                            : "bg-blue-500"
                                                                    )}
                                                                    style={{
                                                                        width: `${percentSpent}%`,
                                                                    }}
                                                                />
                                                            </div>
                                                        </div>

                                                        {/* Budget Details */}
                                                        <div className="flex items-center justify-between text-xs text-slate-600">
                                                            <span>
                                                                Spent: $
                                                                {item.spent.toLocaleString(
                                                                    "en-US",
                                                                    {
                                                                        minimumFractionDigits: 2,
                                                                        maximumFractionDigits: 2,
                                                                    }
                                                                )}
                                                            </span>
                                                            <span>
                                                                Assigned: $
                                                                {item.assigned.toLocaleString(
                                                                    "en-US",
                                                                    {
                                                                        minimumFractionDigits: 2,
                                                                        maximumFractionDigits: 2,
                                                                    }
                                                                )}
                                                            </span>
                                                        </div>
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    ) : (
                                        <div className="space-y-2">
                                            {/* Thermometer Bar */}
                                            <div className="mb-1">
                                                <div className="h-3 bg-slate-100 rounded-full overflow-hidden">
                                                    <div
                                                        className={cn(
                                                            "h-full transition-all rounded-full",
                                                            isCategoryOverspent
                                                                ? "bg-red-500"
                                                                : "bg-blue-500"
                                                        )}
                                                        style={{
                                                            width: `${categoryPercentSpent}%`,
                                                        }}
                                                    />
                                                </div>
                                            </div>

                                            {/* Budget Details */}
                                            <div className="flex items-center justify-between text-xs text-slate-600">
                                                <span>
                                                    Spent: $
                                                    {groupTotalSpent.toLocaleString("en-US", {
                                                        minimumFractionDigits: 2,
                                                        maximumFractionDigits: 2,
                                                    })}
                                                </span>
                                                <span>
                                                    Assigned: $
                                                    {groupTotalAssigned.toLocaleString("en-US", {
                                                        minimumFractionDigits: 2,
                                                        maximumFractionDigits: 2,
                                                    })}
                                                </span>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
            {/* end buget body */}
        </div>
    );
};

export default BudgetView;
