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
from scripts.seed_data.envelopes import envelopes
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
    BudgetItemOrm(name="Groceries", budget_group_id=1),
    BudgetItemOrm(name="Dining Out", budget_group_id=1),
    BudgetItemOrm(name="Gas", budget_group_id=2),
    BudgetItemOrm(name="Public Transit", budget_group_id=2),
    BudgetItemOrm(name="Utilities", budget_group_id=3),
    BudgetItemOrm(name="Insurance", budget_group_id=3),
    BudgetItemOrm(name="Entertainment", budget_group_id=4),
    BudgetItemOrm(name="Shopping", budget_group_id=4),
    BudgetItemOrm(name="Healthcare", budget_group_id=5),
    BudgetItemOrm(name="Fitness", budget_group_id=5),
    BudgetItemOrm(name="Vitamins", budget_group_id=5),
]


async def seed() -> None:
    async with async_session() as session:
        session.add_all(bank_accounts)
        session.add_all(transactions)
        session.add_all(budget_groups)
        session.add_all(budget_items)
        session.add_all(envelopes)
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
