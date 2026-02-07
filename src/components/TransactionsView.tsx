import {
    ArrowUpRight,
    ArrowDownLeft,
    ShoppingCart,
    Home,
    Utensils,
    Car,
    Plane,
    Coffee,
    Film,
    Heart,
    Search,
    Plus,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { cn } from "@/components/ui/utils";

interface Transaction {
    id: string;
    date: string;
    merchant: string;
    category: string;
    amount: number;
    type: "income" | "expense";
    icon: React.ReactNode;
    accountId: string;
}

const transactions: Transaction[] = [
    {
        id: "1",
        date: "2026-02-02",
        merchant: "Salary Deposit",
        category: "Income",
        amount: 5000,
        type: "income",
        icon: <ArrowDownLeft className="size-4" />,
        accountId: "1",
    },
    {
        id: "2",
        date: "2026-02-01",
        merchant: "Whole Foods Market",
        category: "Groceries",
        amount: -125.43,
        type: "expense",
        icon: <ShoppingCart className="size-4" />,
        accountId: "1",
    },
    {
        id: "3",
        date: "2026-02-01",
        merchant: "Shell Gas Station",
        category: "Transportation",
        amount: -52.0,
        type: "expense",
        icon: <Car className="size-4" />,
        accountId: "3",
    },
    {
        id: "4",
        date: "2026-01-31",
        merchant: "Netflix Subscription",
        category: "Entertainment",
        amount: -15.99,
        type: "expense",
        icon: <Film className="size-4" />,
        accountId: "3",
    },
    {
        id: "5",
        date: "2026-01-31",
        merchant: "Starbucks",
        category: "Food & Dining",
        amount: -8.75,
        type: "expense",
        icon: <Coffee className="size-4" />,
        accountId: "1",
    },
    {
        id: "6",
        date: "2026-01-30",
        merchant: "Electric Company",
        category: "Utilities",
        amount: -145.0,
        type: "expense",
        icon: <Home className="size-4" />,
        accountId: "1",
    },
    {
        id: "7",
        date: "2026-01-29",
        merchant: "Target",
        category: "Shopping",
        amount: -87.34,
        type: "expense",
        icon: <ShoppingCart className="size-4" />,
        accountId: "3",
    },
    {
        id: "8",
        date: "2026-01-28",
        merchant: "Olive Garden",
        category: "Food & Dining",
        amount: -65.5,
        type: "expense",
        icon: <Utensils className="size-4" />,
        accountId: "1",
    },
    {
        id: "9",
        date: "2026-01-27",
        merchant: "Gym Membership",
        category: "Health",
        amount: -50.0,
        type: "expense",
        icon: <Heart className="size-4" />,
        accountId: "1",
    },
    {
        id: "10",
        date: "2026-01-26",
        merchant: "Amazon",
        category: "Shopping",
        amount: -234.99,
        type: "expense",
        icon: <ShoppingCart className="size-4" />,
        accountId: "3",
    },
    {
        id: "11",
        date: "2026-01-25",
        merchant: "Freelance Project",
        category: "Income",
        amount: 1250,
        type: "income",
        icon: <ArrowDownLeft className="size-4" />,
        accountId: "1",
    },
    {
        id: "12",
        date: "2026-01-24",
        merchant: "Delta Airlines",
        category: "Travel",
        amount: -450.0,
        type: "expense",
        icon: <Plane className="size-4" />,
        accountId: "3",
    },
    {
        id: "13",
        date: "2026-01-24",
        merchant: "Uber",
        category: "Transportation",
        amount: -28.5,
        type: "expense",
        icon: <Car className="size-4" />,
        accountId: "1",
    },
    {
        id: "14",
        date: "2026-01-23",
        merchant: "Trader Joe's",
        category: "Groceries",
        amount: -89.23,
        type: "expense",
        icon: <ShoppingCart className="size-4" />,
        accountId: "1",
    },
    {
        id: "15",
        date: "2026-01-23",
        merchant: "Chipotle",
        category: "Food & Dining",
        amount: -12.45,
        type: "expense",
        icon: <Utensils className="size-4" />,
        accountId: "3",
    },
    {
        id: "16",
        date: "2026-01-22",
        merchant: "Best Buy",
        category: "Shopping",
        amount: -399.99,
        type: "expense",
        icon: <ShoppingCart className="size-4" />,
        accountId: "3",
    },
    {
        id: "17",
        date: "2026-01-22",
        merchant: "Spotify Subscription",
        category: "Entertainment",
        amount: -10.99,
        type: "expense",
        icon: <Film className="size-4" />,
        accountId: "1",
    },
    {
        id: "18",
        date: "2026-01-21",
        merchant: "Water Company",
        category: "Utilities",
        amount: -65.0,
        type: "expense",
        icon: <Home className="size-4" />,
        accountId: "1",
    },
    {
        id: "19",
        date: "2026-01-20",
        merchant: "CVS Pharmacy",
        category: "Health",
        amount: -45.67,
        type: "expense",
        icon: <Heart className="size-4" />,
        accountId: "1",
    },
    {
        id: "20",
        date: "2026-01-20",
        merchant: "Panera Bread",
        category: "Food & Dining",
        amount: -18.9,
        type: "expense",
        icon: <Coffee className="size-4" />,
        accountId: "1",
    },
    {
        id: "21",
        date: "2026-01-19",
        merchant: "Shell Gas Station",
        category: "Transportation",
        amount: -48.0,
        type: "expense",
        icon: <Car className="size-4" />,
        accountId: "3",
    },
    {
        id: "22",
        date: "2026-01-18",
        merchant: "Costco",
        category: "Groceries",
        amount: -156.78,
        type: "expense",
        icon: <ShoppingCart className="size-4" />,
        accountId: "1",
    },
    {
        id: "23",
        date: "2026-01-18",
        merchant: "Client Payment",
        category: "Income",
        amount: 800,
        type: "income",
        icon: <ArrowDownLeft className="size-4" />,
        accountId: "1",
    },
    {
        id: "24",
        date: "2026-01-17",
        merchant: "Home Depot",
        category: "Shopping",
        amount: -178.45,
        type: "expense",
        icon: <ShoppingCart className="size-4" />,
        accountId: "3",
    },
    {
        id: "25",
        date: "2026-01-17",
        merchant: "Movie Theater",
        category: "Entertainment",
        amount: -35.0,
        type: "expense",
        icon: <Film className="size-4" />,
        accountId: "1",
    },
    {
        id: "26",
        date: "2026-01-16",
        merchant: "Starbucks",
        category: "Food & Dining",
        amount: -6.85,
        type: "expense",
        icon: <Coffee className="size-4" />,
        accountId: "1",
    },
    {
        id: "27",
        date: "2026-01-15",
        merchant: "Internet Service",
        category: "Utilities",
        amount: -89.99,
        type: "expense",
        icon: <Home className="size-4" />,
        accountId: "1",
    },
    {
        id: "28",
        date: "2026-01-15",
        merchant: "Uber Eats",
        category: "Food & Dining",
        amount: -32.5,
        type: "expense",
        icon: <Utensils className="size-4" />,
        accountId: "3",
    },
    {
        id: "29",
        date: "2026-01-14",
        merchant: "Walgreens",
        category: "Health",
        amount: -23.45,
        type: "expense",
        icon: <Heart className="size-4" />,
        accountId: "1",
    },
    {
        id: "30",
        date: "2026-01-13",
        merchant: "Whole Foods Market",
        category: "Groceries",
        amount: -98.67,
        type: "expense",
        icon: <ShoppingCart className="size-4" />,
        accountId: "1",
    },
    {
        id: "31",
        date: "2026-01-12",
        merchant: "Lyft",
        category: "Transportation",
        amount: -19.75,
        type: "expense",
        icon: <Car className="size-4" />,
        accountId: "1",
    },
    {
        id: "32",
        date: "2026-01-12",
        merchant: "Apple Store",
        category: "Shopping",
        amount: -129.0,
        type: "expense",
        icon: <ShoppingCart className="size-4" />,
        accountId: "3",
    },
    {
        id: "33",
        date: "2026-01-11",
        merchant: "Dunkin' Donuts",
        category: "Food & Dining",
        amount: -9.25,
        type: "expense",
        icon: <Coffee className="size-4" />,
        accountId: "1",
    },
    {
        id: "34",
        date: "2026-01-10",
        merchant: "Gas Company",
        category: "Utilities",
        amount: -112.0,
        type: "expense",
        icon: <Home className="size-4" />,
        accountId: "1",
    },
    {
        id: "35",
        date: "2026-01-09",
        merchant: "Parking Fee",
        category: "Transportation",
        amount: -15.0,
        type: "expense",
        icon: <Car className="size-4" />,
        accountId: "1",
    },
];

interface TransactionsViewProps {
    selectedAccount: string | null;
    accountName: string;
}

export default function TransactionsView({ selectedAccount, accountName }: TransactionsViewProps) {
    const filteredTransactions = selectedAccount
        ? transactions.filter((t) => t.accountId === selectedAccount)
        : transactions;

    const totalBalance = 41250.5; // Main Checking: 4250.75 + Savings: 12450.00 + Credit: -1250.50 + Investment: 25800.25

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        const today = new Date("2026-02-02");
        const yesterday = new Date("2026-02-01");

        if (date.toDateString() === today.toDateString()) {
            return "Today";
        } else if (date.toDateString() === yesterday.toDateString()) {
            return "Yesterday";
        } else {
            return date.toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
            });
        }
    };

    return (
        <div className="flex-1 bg-white overflow-hidden flex flex-col">
            <div className="flex-shrink-0 w-full">
                <div className="pt-6 pb-6 px-6 flex items-center justify-between gap-8">
                    <div className="flex-shrink-0 w-[200px]">
                        <h2 className="text-2xl font-semibold text-slate-900 mb-1">
                            {accountName}
                        </h2>
                        <p className="text-slate-600">
                            {filteredTransactions.length} transaction
                            {filteredTransactions.length !== 1 ? "s" : ""}
                        </p>
                    </div>

                    <div className="flex-1 max-w-md">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-slate-400" />
                            <Input
                                type="text"
                                placeholder="Search transactions..."
                                className="pl-9"
                            />
                        </div>
                    </div>

                    <div className="flex-shrink-0 flex items-end gap-4">
                        <div className="text-right">
                            <h3 className="text-sm font-medium text-slate-500 mb-1">
                                Total Balance
                            </h3>
                            <p className="text-2xl font-semibold text-slate-900">
                                $
                                {totalBalance.toLocaleString("en-US", {
                                    minimumFractionDigits: 2,
                                    maximumFractionDigits: 2,
                                })}
                            </p>
                        </div>
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() => console.log("Add transaction")}
                        >
                            <Plus className="size-4 mr-2" />
                            Add Transaction
                        </Button>
                    </div>
                </div>
            </div>

            <div className="flex-1 px-6 pb-6 overflow-hidden">
                <div className="border border-slate-200 rounded-lg overflow-auto h-full">
                    <Table>
                        <TableHeader className="sticky top-0 bg-white z-10 after:absolute after:bottom-0 after:left-0 after:right-0 after:h-px after:bg-slate-200">
                            <TableRow>
                                <TableHead className="w-12 bg-white"></TableHead>
                                <TableHead className="bg-white">Date</TableHead>
                                <TableHead className="bg-white">Merchant</TableHead>
                                <TableHead className="bg-white">Category</TableHead>
                                <TableHead className="text-right bg-white">Amount</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {filteredTransactions.map((transaction) => (
                                <TableRow key={transaction.id} className="cursor-pointer">
                                    <TableCell>
                                        <div
                                            className={cn(
                                                "flex items-center justify-center size-8 rounded-full",
                                                transaction.type === "income"
                                                    ? "bg-green-100 text-green-700"
                                                    : "bg-slate-100 text-slate-700"
                                            )}
                                        >
                                            {transaction.icon}
                                        </div>
                                    </TableCell>
                                    <TableCell className="font-medium text-slate-600">
                                        {formatDate(transaction.date)}
                                    </TableCell>
                                    <TableCell className="font-medium text-slate-900">
                                        {transaction.merchant}
                                    </TableCell>
                                    <TableCell>
                                        <Badge variant="secondary" className="text-xs">
                                            {transaction.category}
                                        </Badge>
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <span
                                            className={cn(
                                                "font-semibold",
                                                transaction.type === "income"
                                                    ? "text-green-600"
                                                    : "text-slate-900"
                                            )}
                                        >
                                            {transaction.type === "income" ? "+" : ""}$
                                            {Math.abs(transaction.amount).toLocaleString("en-US", {
                                                minimumFractionDigits: 2,
                                                maximumFractionDigits: 2,
                                            })}
                                        </span>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            </div>
        </div>
    );
}
