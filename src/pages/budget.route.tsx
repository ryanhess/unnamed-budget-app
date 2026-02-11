import { cn } from "@/components/ui/utils";
import { ChevronDown, ChevronRight, ChevronLeft } from "lucide-react";
import { useState } from "react";
import { ReactNode } from "react";

interface BudgetItem {
    id: string;
    name: string;
    assigned: number;
    spent: number;
}

interface BudgetCategory {
    id: string;
    name: string;
    items: BudgetItem[];
}

const budgetCategories: BudgetCategory[] = [
    {
        id: "1",
        name: "Food",
        items: [
            { id: "1-1", name: "Groceries", assigned: 600, spent: 425.5 },
            { id: "1-2", name: "Dining Out", assigned: 300, spent: 285.75 },
        ],
    },
    {
        id: "2",
        name: "Transportation",
        items: [
            { id: "2-1", name: "Gas", assigned: 150, spent: 125.0 },
            { id: "2-2", name: "Public Transit", assigned: 50, spent: 20.0 },
        ],
    },
    {
        id: "3",
        name: "Home",
        items: [
            { id: "3-1", name: "Utilities", assigned: 250, spent: 220.0 },
            { id: "3-2", name: "Insurance", assigned: 350, spent: 350.0 },
        ],
    },
    {
        id: "4",
        name: "Lifestyle",
        items: [
            { id: "4-1", name: "Entertainment", assigned: 150, spent: 95.5 },
            { id: "4-2", name: "Shopping", assigned: 400, spent: 520.25 },
        ],
    },
    {
        id: "5",
        name: "Health",
        items: [
            { id: "5-1", name: "Healthcare", assigned: 200, spent: 75.0 },
            { id: "5-2", name: "Fitness", assigned: 100, spent: 100.0 },
        ],
    },
];

// Pull this whole component out to components/budget
const BudgetView = ({}): ReactNode => {
    const [monthOffset, setMonthOffset] = useState(0);

    const currentDate = new Date();
    currentDate.setMonth(currentDate.getMonth() + monthOffset);
    const monthName = currentDate.toLocaleString("en-US", { month: "long" });
    const year = currentDate.getFullYear();

    const [expandedCategories, setExpandedCategories] = useState<Set<string>>(
        new Set(budgetCategories.map((cat) => cat.id))
    );

    const toggleCategory = (categoryId: string) => {
        setExpandedCategories((prev) => {
            const newSet = new Set(prev);
            if (newSet.has(categoryId)) {
                newSet.delete(categoryId);
            } else {
                newSet.add(categoryId);
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

    const totalAssigned = budgetCategories.reduce(
        (sum, cat) => sum + cat.items.reduce((itemSum, item) => itemSum + item.assigned, 0),
        0
    );
    const totalSpent = budgetCategories.reduce(
        (sum, cat) => sum + cat.items.reduce((itemSum, item) => itemSum + item.spent, 0),
        0
    );
    const moneyAvailable = totalAssigned - totalSpent;

    return (
        <div className="flex-1 bg-white overflow-hidden flex flex-col">
            <div className="flex-shrink-0 w-full">
                <div className="pt-6 pb-6 px-6 flex items-center justify-between gap-8">
                    <div className="flex-shrink-0 w-[200px]">
                        <h2 className="text-2xl font-semibold text-slate-900 mb-1">{monthName}</h2>
                        <p className="text-slate-400">{year}</p>
                    </div>

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

                    <div className="flex-shrink-0 w-[200px]" />
                </div>
            </div>

            <div className="flex-1 overflow-auto">
                <div className="w-full px-6 pb-6">
                    <div className="space-y-4">
                        {budgetCategories.map((category) => {
                            const isExpanded = expandedCategories.has(category.id);
                            const categoryTotalAssigned = category.items.reduce(
                                (sum, item) => sum + item.assigned,
                                0
                            );
                            const categoryTotalSpent = category.items.reduce(
                                (sum, item) => sum + item.spent,
                                0
                            );
                            const categoryAvailable = categoryTotalAssigned - categoryTotalSpent;
                            const categoryPercentSpent =
                                categoryTotalAssigned > 0
                                    ? Math.min(
                                          (categoryTotalSpent / categoryTotalAssigned) * 100,
                                          100
                                      )
                                    : 0;
                            const isCategoryOverspent = categoryTotalSpent > categoryTotalAssigned;

                            return (
                                <div
                                    key={category.id}
                                    className="bg-white border border-slate-200 rounded-lg p-5"
                                >
                                    <button
                                        onClick={() => toggleCategory(category.id)}
                                        className="w-full flex items-center justify-between mb-4 text-left hover:opacity-70 transition-opacity"
                                    >
                                        <div className="flex items-center gap-2">
                                            {isExpanded ? (
                                                <ChevronDown className="size-5 text-slate-600" />
                                            ) : (
                                                <ChevronRight className="size-5 text-slate-600" />
                                            )}
                                            <h3 className="text-lg font-semibold text-slate-900">
                                                {category.name}
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
                                            {category.items.map((item) => {
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
                                                    {categoryTotalSpent.toLocaleString("en-US", {
                                                        minimumFractionDigits: 2,
                                                        maximumFractionDigits: 2,
                                                    })}
                                                </span>
                                                <span>
                                                    Assigned: $
                                                    {categoryTotalAssigned.toLocaleString("en-US", {
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
        </div>
    );
};

export default BudgetView;
