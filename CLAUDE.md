# CLAUDE.md

## What This Is

A personal finance / budget tracker app. The frontend is a Next.js prototype with dummy data. A FastAPI backend is being added.

## Tech Stack

**Frontend:** Next.js 16 (Pages Router), React 19, TypeScript 5 (strict), TailwindCSS 4, shadcn/ui (Radix UI), Zod
**Backend (in progress):** Python, FastAPI, Uvicorn

## Project Structure

```
├── src/                        # Next.js frontend source
│   ├── pages/                  # Routes (use .route.tsx extension)
│   │   ├── _app.route.tsx      # App wrapper, global styles, Layout
│   │   ├── index.route.tsx     # Home (placeholder)
│   │   ├── budget.route.tsx    # Budget view
│   │   └── transactions/
│   │       ├── index.route.tsx           # All transactions
│   │       └── [bankAccountId].route.tsx # Per-account transactions
│   │
│   ├── components/
│   │   ├── layout/             # Layout, TopBar, Sidebar, Logo, sidebarButtons
│   │   ├── budget/             # BudgetBody, HeaderBar, BudgetItemDisplay, BudgetDisplayComps
│   │   ├── transactions/       # TransactionsView, TransactionsTable
│   │   └── ui/                 # shadcn/ui components (~50+), utils.ts (cn()), use-mobile.ts
│   │
│   ├── lib/
│   │   ├── constants/          # Type definitions (index.ts re-exports all)
│   │   │   ├── views.ts                    # View = "budget" | "transactions"
│   │   │   ├── bankAccountType.ts          # BankAccount { id, name, type, balance, icon }
│   │   │   ├── budgetGroupType.ts          # BudgetGroup { id, name, items[] } (Zod)
│   │   │   ├── budgetItemType.ts           # BudgetItem { id, name, assigned, spent } (Zod)
│   │   │   ├── transactionType.ts          # Transaction { id, date, merchant, category, amount, accountId, type, icon } (Zod)
│   │   │   └── transactionDisplaySchema.ts # Display config for table columns
│   │   │
│   │   ├── dummyData/          # Hardcoded test data + helper/selector functions
│   │   │   ├── bankAccounts.tsx    # 4 accounts, getBankAccountById(), getSumOfAllBalances()
│   │   │   ├── budgetGroups.tsx    # 5 groups, getAllBudgetGroups(), getTotalAssigned/SpentForGroup()
│   │   │   ├── budgetItems.tsx     # 10 items, getBudgetItemById(), getTotalAssigned/SpentForAll()
│   │   │   └── transactions.tsx    # 35 txns, selectAllTxnsForAccountId(), sumAllTxnsForAccountId()
│   │   │
│   │   ├── dateHelpers.ts      # formatDate(), getMonthAndYearFromOffset()
│   │   └── urlValidation.ts    # getBankAccountIdFromRoute()
│   │
│   └── styles/
│       ├── globals.css
│       ├── index.css
│       ├── tailwind.css         # Tailwind v4 entry point
│       └── theme.css
│
├── backend/                     # FastAPI backend (being set up)
│   ├── app/
│   │   ├── __init__.py
│   │   └── main.py
│   └── requirements.txt
│
├── src_from_Figma/              # Reference-only Figma export (not active code)
│
├── next.config.ts               # typedRoutes, reactCompiler, pageExtensions: [".route.tsx", ".route.ts"]
├── tsconfig.json                # strict, paths: @/* -> ./src/*
├── .prettierrc                  # 4-space indent, 100 char width, trailing commas
├── eslint.config.mjs            # next/core-web-vitals + typescript
└── postcss.config.mjs           # @tailwindcss/postcss
```

## Key Conventions

- **Page files use `.route.tsx` / `.route.ts` extension** (not the default `.page.tsx`). Configured in `next.config.ts`.
- **Import alias:** `@/*` maps to `./src/*`.
- **Formatting:** 4-space indentation, 100 char line width, trailing commas (es5).
- **Component style:** Functional components with hooks. No class components.
- **Styling:** Tailwind utility classes. Use `cn()` from `@/components/ui/utils` to merge classes.
- **Types:** Zod schemas define core domain types (BudgetGroup, BudgetItem, Transaction). BankAccount is a plain TypeScript type.

## Data Models

| Model        | Key Fields                                              | Validated With |
|--------------|---------------------------------------------------------|----------------|
| BankAccount  | id, name, type (checking/savings/credit/investment), balance, icon | TypeScript     |
| BudgetGroup  | id, name, items (array of BudgetItem IDs)               | Zod            |
| BudgetItem   | id, name, assigned (budgeted $), spent ($)              | Zod            |
| Transaction  | id, date, merchant, category, amount, accountId, type (income/expense), icon | Zod  |

## Current State

- **Frontend:** Functional UI for budget view (with month navigation, progress bars) and transactions view (table, per-account filtering). All data is from hardcoded dummy data in `lib/dummyData/`.
- **State management:** React `useState` only. No Context, Redux, or external state library.
- **No backend yet** — the dummy data functions in `lib/dummyData/` serve as the mock data layer and will be replaced by API calls.
- **No persistent storage.** All state resets on refresh.

## Commands

```bash
npm run dev       # Start Next.js dev server (port 3000)
npm run build     # Production build
npm run start     # Start production server
npm run lint      # ESLint
```

## Component Hierarchy

```
_app.route.tsx
└── Layout
    ├── TopBar → Logo
    └── Sidebar → ViewSidebarSection → AccountButton[]

/budget → BudgetBody → BudgetGroupCard[] → BudgetItemDisplay[] → ThermometerBar, AmountAvailableBadge
/transactions → TransactionsView → TransactionsTable → TableRow[]
```

## Notes

- `src_from_Figma/` is a legacy Figma export using React Router — do not modify, reference only.
- If Tailwind classes aren't applying, try deleting the `.next` cache.
- React Compiler is enabled (`reactCompiler: true` in next.config.ts).
