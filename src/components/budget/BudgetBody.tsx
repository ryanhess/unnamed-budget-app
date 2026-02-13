import { ReactNode, useState } from "react";
import { cn } from "@/components/ui/utils";
import { ChevronDown, ChevronRight } from "lucide-react";
import {
    getAllBudgetGroups,
    getBudgetGroupById,
    getTotalAssignedForGroup,
    getTotalSpentForGroup,
} from "@/lib/dummyData/budgetGroups";
import { getBudgetItemById } from "@/lib/dummyData/budgetItems";
import { BudgetGroup } from "@/lib/constants";
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
    const [isExpanded, setIsExpanded] = useState(true);
    const groupTotalAssigned = getTotalAssignedForGroup(group.id);
    const groupTotalSpent = getTotalSpentForGroup(group.id);
    const categoryAvailable = groupTotalAssigned - groupTotalSpent;
    const categoryPercentSpent =
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
                        amountAvailableOrOverspent={categoryAvailable}
                    />
                )}
            </BudgetGroupHeaderWithButton>

            {isExpanded ? (
                <div className="space-y-4">{children}</div>
            ) : (
                <div className="space-y-2">
                    <ThermometerBar
                        percentSpent={categoryPercentSpent}
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

const Container = ({ children }: { children: ReactNode }) => {
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

const BudgetBody = (): ReactNode => {
    const allBudgetGroups = getAllBudgetGroups();

    return (
        <Container>
            {allBudgetGroups.map((group) => (
                <BudgetGroupCard key={group.id} group={group}>
                    {group.items.map((itemId) => (
                        <BudgetItemDisplay key={itemId} itemId={itemId} />
                    ))}
                </BudgetGroupCard>
            ))}
        </Container>
    );
};

export default BudgetBody;
