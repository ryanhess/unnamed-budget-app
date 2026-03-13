import { ReactNode } from "react";
import { BudgetEntry } from "@/lib/data-schemas";
import { BudgetEntryCard } from "@/components/budget/BudgetEntryDisplay";

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
                <BudgetEntryCard key={index} entry={entry} />
            ))}
        </BodyLayoutContainer>
    );
};

export default BudgetBody;
