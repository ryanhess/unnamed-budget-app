import { ReactNode, useState } from "react";
import { ChevronDown, ChevronRight } from "lucide-react";
import { BudgetGroup } from "@/lib/data-schemas";
import { BudgetItemDisplay } from "@/components/budget/BudgetItemDisplay";
import {
    ThermometerBar,
    BudgetDetails,
    AmountAvailableBadge,
} from "@/components/budget/BudgetDisplayComps";

const BudgetGroupHeaderWithButton = ({
    isExpanded,
    expandHandler,
    children,
    groupName,
}: {
    isExpanded: boolean;
    expandHandler: () => void;
    children: ReactNode;
    groupName: string;
}): ReactNode => {
    return (
        <button
            onClick={expandHandler}
            className="w-full flex items-center justify-between mb-4 text-left hover:opacity-70 transition-opacity"
        >
            <div className="flex items-center gap-2">
                {isExpanded ? (
                    <ChevronDown className="size-5 text-slate-600" />
                ) : (
                    <ChevronRight className="size-5 text-slate-600" />
                )}
                <h3 className="text-lg font-semibold text-slate-900">{groupName}</h3>
            </div>
            {children}
        </button>
    );
};

const BudgetGroupCard = ({
    group,
    children,
}: {
    group: BudgetGroup;
    children: ReactNode;
}): ReactNode => {
    const getTotalAssignedForGroup = (): number => {
        return group.budget_items.reduce(
            (totalAssigned, item) => totalAssigned + item.envelope.assigned,
            0
        );
    };

    const getTotalSpentForGroup = (): number => {
        return group.budget_items.reduce((totalSpent, item) => totalSpent + item.envelope.spent, 0);
    };

    const [isExpanded, setIsExpanded] = useState(true);
    const groupTotalAssigned = getTotalAssignedForGroup();
    const groupTotalSpent = getTotalSpentForGroup();
    const groupAvailable = groupTotalAssigned - groupTotalSpent;
    const groupPercentSpent =
        groupTotalAssigned > 0 ? Math.min((groupTotalSpent / groupTotalAssigned) * 100, 100) : 0;
    const isGroupOverspent = groupTotalSpent > groupTotalAssigned;

    const toggleExpanded = () => {
        setIsExpanded(!isExpanded);
    };

    return (
        <div className="bg-white border border-slate-200 rounded-lg p-5">
            <BudgetGroupHeaderWithButton
                isExpanded={isExpanded}
                expandHandler={toggleExpanded}
                groupName={group.name}
            >
                {!isExpanded && (
                    <AmountAvailableBadge
                        isOverspent={isGroupOverspent}
                        amountAvailableOrOverspent={groupAvailable}
                    />
                )}
            </BudgetGroupHeaderWithButton>

            {isExpanded ? (
                <div className="space-y-4">{children}</div>
            ) : (
                <div className="space-y-2">
                    <ThermometerBar
                        percentSpent={groupPercentSpent}
                        isOverspent={isGroupOverspent}
                    />

                    <BudgetDetails
                        amountSpent={groupTotalSpent}
                        amountAssigned={groupTotalAssigned}
                    />
                </div>
            )}
        </div>
    );
};

const BodyLayoutContainer = ({ children }: { children: ReactNode }) => {
    return (
        <div className="flex-1 overflow-auto">
            <div className="w-full px-6 pb-6">
                {/* prettier-ignore */}
                <div className="space-y-4">
                    {children}
                </div>
            </div>
        </div>
    );
};

const BudgetBody = ({ budgetEntries }: { budgetEntries: any }): ReactNode => {
    return (
        <BodyLayoutContainer>
            {/* For now assume everything is a group */}
            {budgetEntries.map((entry) => (
                <BudgetGroupCard key={entry.id} group={entry.content}>
                    {entry.content.budget_items.map((item) => (
                        <BudgetItemDisplay key={item.id} item={item} />
                    ))}
                </BudgetGroupCard>
            ))}
        </BodyLayoutContainer>
    );
};

export default BudgetBody;
