import { ReactNode } from "react";
import { cn } from "@/components/ui/utils";

const AmountAvailableBadge = ({
    isOverspent,
    amountAvailableOrOverspent,
}: {
    isOverspent: boolean;
    amountAvailableOrOverspent: number;
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
                {Math.abs(amountAvailableOrOverspent).toLocaleString("en-US", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                })}
            </p>
            <p className="text-xs text-slate-500">{isOverspent ? "overspent" : "available"}</p>
        </div>
    );
};

const ThermometerBar = ({
    percentSpent: percent,
    isOverspent,
}: {
    percentSpent: number;
    isOverspent: boolean;
}): ReactNode => {
    return (
        <div className="mb-1">
            <div className="h-3 bg-slate-100 rounded-full overflow-hidden">
                <div
                    className={cn(
                        "h-full transition-all rounded-full",
                        isOverspent ? "bg-red-500" : "bg-blue-500"
                    )}
                    style={{
                        width: `${percent}%`,
                    }}
                />
            </div>
        </div>
    );
};

const BudgetDetails = ({
    amountSpent,
    amountAssigned,
}: {
    amountSpent: number;
    amountAssigned: number;
}): ReactNode => {
    return (
        <div className="flex items-center justify-between text-xs text-slate-600">
            <span>
                Spent: $
                {amountSpent.toLocaleString("en-US", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                })}
            </span>
            <span>
                Assigned: $
                {amountAssigned.toLocaleString("en-US", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                })}
            </span>
        </div>
    );
};

export { ThermometerBar, BudgetDetails, AmountAvailableBadge };
