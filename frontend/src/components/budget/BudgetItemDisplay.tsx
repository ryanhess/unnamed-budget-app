import { ReactNode } from "react";
import {
    ThermometerBar,
    BudgetDetails,
    AmountAvailableBadge,
} from "@/components/budget/BudgetDisplayComps";
import { BudgetItem } from "@/lib/data-schemas";

const BudgetItemDisplay = ({ item }: { item: BudgetItem }): ReactNode => {
    if (!item) {
        return null;
    }

    const available = item.envelope.available;
    const itemPercentSpent =
        item.envelope.assigned > 0
            ? Math.min((item.envelope.spent / item.envelope.assigned) * 100, 100)
            : 0;
    const itemIsOverspent = item.envelope.spent > item.envelope.assigned;

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
            <BudgetDetails
                amountSpent={item.envelope.spent}
                amountAssigned={item.envelope.assigned}
            />
        </div>
    );
};

export { BudgetItemDisplay };
