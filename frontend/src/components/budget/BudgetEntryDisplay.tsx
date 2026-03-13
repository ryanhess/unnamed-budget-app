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

const BudgetEntryCard = ({ entry }: { entry: BudgetEntry }): ReactNode => {
    const isGroup = entry.type === "group";

    const getEntryAssignedSpentAvail = (): {
        entryTotalAssigned: number;
        entryTotalSpent: number;
        entryAvailable: number;
    } => {
        let entryTotalAssigned, entryTotalSpent, entryAvailable: number;
        if (entry.type === "group") {
            //its a group here
            const group = entry.content;

            //prettier-ignore
            entryTotalAssigned = group.budget_items.reduce(
                (totalAssigned, item) => (
                    totalAssigned + item.envelope.assigned
                )
            ,0);

            //prettier-ignore
            entryTotalSpent = group.budget_items.reduce(
                (totalSpent, item) => (
                    totalSpent + item.envelope.spent
                )
            , 0);

            entryAvailable = entryTotalAssigned - entryTotalSpent;
        } else {
            const item = entry.content;
            entryTotalAssigned = item.envelope.assigned;
            entryTotalSpent = item.envelope.spent;
            entryAvailable = item.envelope.available;
        }

        return { entryTotalAssigned, entryTotalSpent, entryAvailable };
    };

    const [isExpanded, setIsExpanded] = useState(true);
    const { entryTotalAssigned, entryTotalSpent, entryAvailable } = getEntryAssignedSpentAvail();
    const entryPercentSpent =
        entryTotalAssigned > 0 ? Math.min((entryTotalSpent / entryTotalAssigned) * 100, 100) : 0;
    const isEntryOverspent = entryTotalSpent > entryTotalAssigned;

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
                    <BudgetDetails
                        amountSpent={entryTotalSpent}
                        amountAssigned={entryTotalAssigned}
                    />
                </div>
            )}
        </div>
    );
};

export { BudgetEntryCard };
