import { ReactNode } from "react";
import { getBudgetItemById } from "@/lib/dummyData/budgetItems";
import { cn } from "@/components/ui/utils";
import {
    ThermometerBar,
    BudgetDetails,
    AmountAvailableBadge,
} from "@/components/budget/BudgetDisplayComps";

const BudgetItemDisplay = ({ itemId }: { itemId: string }): ReactNode => {
    const item = getBudgetItemById(itemId);

    if (!item) {
        return null;
    }

    const available = item.assigned - item.spent;
    const itemPercentSpent =
        item.assigned > 0 ? Math.min((item.spent / item.assigned) * 100, 100) : 0;
    const itemIsOverspent = item.spent > item.assigned;

    return (
        <div className="space-y-2">
            <div className="flex items-center justify-between">
                <h4 className="text-base font-medium text-slate-900">{item.name}</h4>
                <AmountAvailableBadge
                    isOverspent={itemIsOverspent}
                    amountAvailableOrOverspent={available}
                />
            </div>
            <ThermometerBar percentSpent={itemPercentSpent} isOverspent={itemIsOverspent} />
            <BudgetDetails amountSpent={item.spent} amountAssigned={item.assigned} />
        </div>
    );
};

export { BudgetItemDisplay };
