import { TransactionSchema, type Transaction } from "@/lib/constants";

const txnWhatFieldsToDisplay = {
    date: "Date",
    merchant: "Merchant",
    category: "Category",
    amount: "Amount",
} satisfies Partial<Record<keyof Transaction, string>>;

// derived — these update automatically when the config changes
const txnDbColumns = Object.keys(txnWhatFieldsToDisplay) as (keyof typeof txnWhatFieldsToDisplay)[];
const txnDisplayHeaders = Object.values(txnWhatFieldsToDisplay);

export { txnDbColumns, txnDisplayHeaders };
