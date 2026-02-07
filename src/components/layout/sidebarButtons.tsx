import { ReactNode } from "react";
import Link from "next/link";
import { ROUTES } from "@/constants";
import { PieChart, Wallet } from "lucide-react";
import { cn } from "@/components/ui/utils";
import { type View, type BankAccount } from "@/constants";

const viewButtonInstanceParams: Record<
    View,
    {
        label: string;
        route: string;
        icon: ReactNode;
    }
> = {
    budget: {
        label: "Budget",
        route: ROUTES.viewBudget,
        icon: <PieChart className="size-4" />,
    },
    transactions: {
        label: "Transactions",
        route: ROUTES.viewAllTransactions.resolvedPath,
        icon: <Wallet className="size-4" />,
    },
};

const ViewSidebarSection = ({
    view,
    isSelected,
    children,
}: {
    view: View;
    isSelected: boolean;
    children?: ReactNode;
}) => {
    const sectionLabel = viewButtonInstanceParams[view].label;
    return (
        <div className="mb-2">
            <Link
                href={viewButtonInstanceParams[view].route}
                className={cn(
                    "w-full text-left px-3 py-3 rounded-lg transition-colors flex items-center gap-2",
                    isSelected ? "bg-slate-900 text-white" : "hover:bg-slate-100 text-slate-700"
                )}
            >
                {viewButtonInstanceParams[view].icon}
                <span className="text-sm font-medium">{sectionLabel}</span>
            </Link>
            {isSelected && <div className="ml-3 mt-1 space-y-1">{children}</div>}
        </div>
    );
};

type AccountButtonProps = {
    linkResolvedPath: string;
    isSelected: boolean;
    accountId: string;
    accountName: string;
    accountBalance: number;
};

const AccountButton = ({
    linkResolvedPath,
    isSelected,
    accountId,
    accountName,
    accountBalance,
}: AccountButtonProps) => {
    return (
        <Link
            href={linkResolvedPath}
            key={accountId}
            className={cn(
                "w-full text-left px-3 py-1.5 rounded-lg transition-colors block no-underline",
                isSelected ? "bg-slate-200 text-slate-900" : "hover:bg-slate-100 text-slate-700"
            )}
        >
            <div className="flex items-center justify-between">
                <p className="text-sm">{accountName}</p>
                <p
                    className={cn(
                        "text-sm",
                        accountBalance < 0 ? "text-red-500" : "text-slate-500"
                    )}
                >
                    $
                    {Math.abs(accountBalance).toLocaleString("en-US", {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                    })}
                </p>
            </div>
        </Link>
    );
};

export { ViewSidebarSection, AccountButton, type AccountButtonProps };
