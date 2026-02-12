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
import { ThermometerBar, BudgetDetails } from "@/components/budget/BudgetDisplayComps";

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
    const isCategoryOverspent = groupTotalSpent > groupTotalAssigned;

    const toggleExpanded = () => {
        setIsExpanded(!isExpanded);
    };

    return (
        <div className="bg-white border border-slate-200 rounded-lg p-5">
            <button
                onClick={toggleExpanded}
                className="w-full flex items-center justify-between mb-4 text-left hover:opacity-70 transition-opacity"
            >
                <div className="flex items-center gap-2">
                    {isExpanded ? (
                        <ChevronDown className="size-5 text-slate-600" />
                    ) : (
                        <ChevronRight className="size-5 text-slate-600" />
                    )}
                    <h3 className="text-lg font-semibold text-slate-900">{group.name}</h3>
                </div>

                {!isExpanded && (
                    <div className="text-right">
                        <p
                            className={cn(
                                "text-base font-semibold",
                                isCategoryOverspent ? "text-red-600" : "text-slate-900"
                            )}
                        >
                            $
                            {Math.abs(categoryAvailable).toLocaleString("en-US", {
                                minimumFractionDigits: 2,
                                maximumFractionDigits: 2,
                            })}
                        </p>
                        <p className="text-xs text-slate-500">
                            {isCategoryOverspent ? "overspent" : "available"}
                        </p>
                    </div>
                )}
            </button>

            {isExpanded ? (
                <div className="space-y-4">{children}</div>
            ) : (
                <div className="space-y-2">
                    <ThermometerBar
                        percent={categoryPercentSpent}
                        overspent={isCategoryOverspent}
                    />

                    <BudgetDetails spent={groupTotalSpent} assigned={groupTotalAssigned} />
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
