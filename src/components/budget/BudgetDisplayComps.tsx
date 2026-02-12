import { ReactNode } from "react";
import { cn } from "@/components/ui/utils";

const AmountAvailableBadge = ({
    isOverspent,
    availableOrOverspent,
}: {
    isOverspent: boolean;
    availableOrOverspent: number;
}): ReactNode => {
    return (
        <div className="text-right">
            <p
                className={cn(
                    "text-base font-semibold",
                    isOverspent ? "text-red-600" : "text-slate-900"
                )}
            >
                $
                {Math.abs(availableOrOverspent).toLocaleString("en-US", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                })}
            </p>
            <p className="text-xs text-slate-500">{isOverspent ? "overspent" : "available"}</p>
        </div>
    );
};

const ThermometerBar = ({
    percent,
    overspent,
}: {
    percent: number;
    overspent: boolean;
}): ReactNode => {
    return (
        <div className="mb-1">
            <div className="h-3 bg-slate-100 rounded-full overflow-hidden">
                <div
                    className={cn(
                        "h-full transition-all rounded-full",
                        overspent ? "bg-red-500" : "bg-blue-500"
                    )}
                    style={{
                        width: `${percent}%`,
                    }}
                />
            </div>
        </div>
    );
};

const BudgetDetails = ({ spent, assigned }: { spent: number; assigned: number }): ReactNode => {
    return (
        <div className="flex items-center justify-between text-xs text-slate-600">
            <span>
                Spent: $
                {spent.toLocaleString("en-US", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                })}
            </span>
            <span>
                Assigned: $
                {assigned.toLocaleString("en-US", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                })}
            </span>
        </div>
    );
};

export { ThermometerBar, BudgetDetails, AmountAvailableBadge };
