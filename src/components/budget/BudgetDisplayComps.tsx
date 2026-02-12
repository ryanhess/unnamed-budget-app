import { ReactNode } from "react";
import { cn } from "@/components/ui/utils";

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

export { ThermometerBar, BudgetDetails };
