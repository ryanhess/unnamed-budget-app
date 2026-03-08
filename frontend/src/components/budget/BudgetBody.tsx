import { ReactNode, useState } from "react";
import { ChevronDown, ChevronRight } from "lucide-react";
import { BudgetGroup, BudgetEntry, BudgetItem } from "@/lib/data-schemas";
import { BudgetItemDisplay } from "@/components/budget/BudgetItemDisplay";
import {
    ThermometerBar,
    BudgetDetails,
    AmountAvailableBadge,
} from "@/components/budget/BudgetDisplayComps";

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
                <div className="w-full flex items-center justify-between mb-4 text-left hover:opacity-70 transition-opacity">
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
            const group = entry.content as BudgetGroup;

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
            const item = entry.content as BudgetItem;
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
                    {/* @ts-expect-error */}
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

const BudgetItemDisp = (): ReactNode => {
    return <></>;
};

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

const BudgetItemCard = ({ budgetItem }: { budgetItem: BudgetItem }): ReactNode => {
    const itemPercentSpent =
        budgetItem.envelope.assigned > 0
            ? Math.min((budgetItem.envelope.spent / budgetItem.envelope.assigned) * 100, 100)
            : 0;
    const itemIsOverspent = budgetItem.envelope.spent > budgetItem.envelope.assigned;

    return (
        <div className="bg-white border border-slate-200 rounded-lg p-5">
            <div className="w-full flex items-center justify-between mb-4 text-left hover:opacity-70 transition-opacity">
                <div className="flex items-center gap-2">
                    <h3 className="text-lg font-semibold text-slate-900">{budgetItem.name}</h3>
                </div>
                <AmountAvailableBadge
                    isOverspent={itemIsOverspent}
                    amountAvailableOrOverspent={budgetItem.envelope.available}
                />
            </div>
            <div className="space-y-2">
                <ThermometerBar percentSpent={itemPercentSpent} isOverspent={itemIsOverspent} />

                <BudgetDetails
                    amountSpent={budgetItem.envelope.spent}
                    amountAssigned={budgetItem.envelope.assigned}
                />
            </div>
        </div>
    );
};

const BodyLayoutContainer = ({ children }: { children: ReactNode }): ReactNode => {
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

const BudgetBody = ({ budgetEntries }: { budgetEntries: BudgetEntry[] }): ReactNode => {
    return (
        <BodyLayoutContainer>
            {/* For now assume everything is a group */}
            {budgetEntries.map((entry, index) => (
                <BudgetEntryCard entry={entry} />
            ))}
        </BodyLayoutContainer>
    );
};

export default BudgetBody;
