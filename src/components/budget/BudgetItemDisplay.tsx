import { ReactNode } from "react";
import { getBudgetItemById } from "@/lib/dummyData/budgetItems";
import { cn } from "@/components/ui/utils";
import { ThermometerBar, BudgetDetails } from "@/components/budget/BudgetDisplayComps";

const BudgetItemDisplay = ({ itemId }: { itemId: string }): ReactNode => {
    const item = getBudgetItemById(itemId);

    if (!item) {
        return null;
    }

    const available = item.assigned - item.spent;
    const percentSpent = item.assigned > 0 ? Math.min((item.spent / item.assigned) * 100, 100) : 0;
    const isOverspent = item.spent > item.assigned;

    return (
        <div className="space-y-2">
            <div className="flex items-center justify-between">
                <h4 className="text-base font-medium text-slate-900">{item.name}</h4>
                <div className="text-right">
                    <p
                        className={cn(
                            "text-base font-semibold",
                            isOverspent ? "text-red-600" : "text-slate-900"
                        )}
                    >
                        $
                        {Math.abs(available).toLocaleString("en-US", {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2,
                        })}
                    </p>
                    <p className="text-xs text-slate-500">
                        {isOverspent ? "overspent" : "available"}
                    </p>
                </div>
            </div>

            {/* Thermometer Bar */}
            <div className="mb-1">
                <div className="h-3 bg-slate-100 rounded-full overflow-hidden">
                    <div
                        className={cn(
                            "h-full transition-all rounded-full",
                            isOverspent ? "bg-red-500" : "bg-blue-500"
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
                    {item.spent.toLocaleString("en-US", {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                    })}
                </span>
                <span>
                    Assigned: $
                    {item.assigned.toLocaleString("en-US", {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                    })}
                </span>
            </div>
        </div>
    );
};
export { BudgetItemDisplay };
