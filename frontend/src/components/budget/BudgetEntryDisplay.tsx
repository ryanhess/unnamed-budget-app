import {
    AmountAvailableBadge,
    ThermometerBar,
    BudgetDetails,
} from "@/components/budget/BudgetDisplayComps";
import { BudgetItemDisplay } from "@/components/budget/BudgetItemDisplay";
import { BudgetEntry, BudgetGroup, BudgetItem } from "@/lib/data-schemas";
import { ChevronDown, ChevronRight } from "lucide-react";
import { ReactNode, useState } from "react";

const BudgetEntryHeading = ({
    entryName,
    isGroup,
    expanded,
    expandHandler,
    isOverspent,
    entryAvailable,
}: {
    entryName: string;
    isGroup: boolean;
    expanded: boolean;
    expandHandler: () => void;
    isOverspent: boolean;
    entryAvailable: number;
}): ReactNode => {
    const HeaderContent = (
        <>
            <div className="flex items-center gap-2">
                {isGroup &&
                    (expanded ? (
                        <ChevronDown className="size-5 text-slate-600" />
                    ) : (
                        <ChevronRight className="size-5 text-slate-600" />
                    ))}
                <h3 className="text-lg font-semibold text-slate-900">{entryName}</h3>
            </div>
            {!(isGroup && expanded) && (
                <AmountAvailableBadge
                    isOverspent={isOverspent}
                    amountAvailableOrOverspent={entryAvailable}
                />
            )}
        </>
    );

    return (
        <>
            {isGroup ? (
                <button
                    onClick={expandHandler}
                    className="w-full flex items-center justify-between mb-4 text-left hover:opacity-70 transition-opacity"
                >
                    {HeaderContent}
                </button>
            ) : (
                <div className="w-full flex items-center justify-between mb-4 text-left">
                    {HeaderContent}
                </div>
            )}
        </>
    );
};

const getEntryAssignedSpentAvail = (
    entry: BudgetEntry
): {
    entryAssigned: number;
    entrySpent: number;
    entryAvailable: number;
} => {
    if (entry.type == "group") {
        return {
            entryAssigned: entry.content.assigned,
            entrySpent: entry.content.spent,
            entryAvailable: entry.content.available,
        };
    } else {
        return {
            entryAssigned: entry.content.envelope.assigned,
            entrySpent: entry.content.envelope.spent,
            entryAvailable: entry.content.envelope.spent,
        };
    }
};

const BudgetEntryCard = ({ entry }: { entry: BudgetEntry }): ReactNode => {
    const isGroup = entry.type === "group";

    const [isExpanded, setIsExpanded] = useState(true);
    const { entryAssigned, entrySpent, entryAvailable } = getEntryAssignedSpentAvail(entry);
    const entryPercentSpent =
        entryAssigned > 0 ? Math.min((entrySpent / entryAssigned) * 100, 100) : 0;
    const isEntryOverspent = entrySpent > entryAssigned;

    const toggleExpanded = () => {
        setIsExpanded(!isExpanded);
    };
    return (
        <div className="bg-white border border-slate-200 rounded-lg p-5">
            <BudgetEntryHeading
                entryName={entry.content.name}
                isGroup={isGroup}
                expanded={isExpanded}
                expandHandler={toggleExpanded}
                isOverspent={isEntryOverspent}
                entryAvailable={entryAvailable}
            />
            {isGroup && isExpanded ? (
                <div className="space-y-4">
                    {entry.content.budget_items.map((item) => (
                        <BudgetItemDisplay key={item.id} item={item} />
                    ))}
                </div>
            ) : (
                <div className="space-y-2">
                    <ThermometerBar
                        percentSpent={entryPercentSpent}
                        isOverspent={isEntryOverspent}
                    />
                    <BudgetDetails amountSpent={entrySpent} amountAssigned={entryAssigned} />
                </div>
            )}
        </div>
    );
};

export { BudgetEntryCard };
