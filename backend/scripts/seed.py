## seed.py ##
# this script assumes that the db is initialized and fully migrated
# add to it as needed for both manual and automated tests as the app grows.
# uses asyncio to wrap the async db calls.

import asyncio
from src.database import async_session
from src.transactions.models import TransactionOrm
from src.budgets.models import BudgetGroupOrm, BudgetItemOrm
from src.bank_accounts.models import BankAccountOrm
from scripts.seed_data.transactions import transactions
from sqlalchemy import select


bank_accounts: list[BankAccountOrm] = [
    BankAccountOrm(),
    BankAccountOrm(),
    BankAccountOrm(),
    BankAccountOrm(),
    BankAccountOrm(),
]


budget_groups: list[BudgetGroupOrm] = [
    BudgetGroupOrm(
        name="Food",
    ),
    BudgetGroupOrm(
        name="Transportation",
    ),
    BudgetGroupOrm(
        name="Home",
    ),
    BudgetGroupOrm(
        name="Lifestyle",
    ),
    BudgetGroupOrm(
        name="Health",
    ),
]


budget_items: list[BudgetItemOrm] = [
    BudgetItemOrm(name="Groceries", assigned=600, spent=425.5, budget_group_id=1),
    BudgetItemOrm(name="Dining Out", assigned=300, spent=285.75, budget_group_id=1),
    BudgetItemOrm(name="Gas", assigned=150, spent=125.0, budget_group_id=2),
    BudgetItemOrm(name="Public Transit", assigned=50, spent=20.0, budget_group_id=2),
    BudgetItemOrm(name="Utilities", assigned=250, spent=220.0, budget_group_id=3),
    BudgetItemOrm(name="Insurance", assigned=350, spent=350.0, budget_group_id=3),
    BudgetItemOrm(name="Entertainment", assigned=150, spent=95.5, budget_group_id=4),
    BudgetItemOrm(name="Shopping", assigned=400, spent=520.25, budget_group_id=4),
    BudgetItemOrm(name="Healthcare", assigned=200, spent=75.0, budget_group_id=5),
    BudgetItemOrm(name="Fitness", assigned=100, spent=100.0, budget_group_id=5),
]


async def seed() -> None:
    async with async_session() as session:
        session.add_all(bank_accounts)
        session.add_all(transactions)
        session.add_all(budget_groups)
        session.add_all(budget_items)
        await session.commit()


async def check_already_seeded() -> bool:
    async with async_session() as session:
        res = await session.execute(
            select(TransactionOrm).where(TransactionOrm.id == 2000)
        )
        txn = res.scalars().first()
        return bool(txn)


already_seeded = asyncio.run(check_already_seeded())

if already_seeded:
    print("already seeded")
else:
    print("start seeding db")
    asyncio.run(seed())
    print("seeding complete")
