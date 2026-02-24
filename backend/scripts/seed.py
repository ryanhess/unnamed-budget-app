## seed.py ##
# this script assumes that the db is initialized and fully migrated
# add to it as needed for both manual and automated tests as the app grows.
# uses asyncio to wrap the async db calls.

import asyncio
from src.database import async_session
from src.transactions.models import TransactionOrm, TransactionType
from src.budgets.groups.models import BudgetGroupOrm
from src.budgets.items.models import BudgetItemOrm
from sqlalchemy import select

transactions: list[TransactionOrm] = [
    TransactionOrm(
        id="1",
        date="2026-02-02",
        merchant="Salary Deposit",
        category="Income",
        amount=5000,
        type=TransactionType.income,
        account_id="1",
    ),
    TransactionOrm(
        id="2",
        date="2026-02-01",
        merchant="Whole Foods Market",
        category="Groceries",
        amount=-125.43,
        type=TransactionType.expense,
        account_id="1",
    ),
    TransactionOrm(
        id="3",
        date="2026-02-01",
        merchant="Shell Gas Station",
        category="Transportation",
        amount=-52.0,
        type=TransactionType.expense,
        account_id="3",
    ),
    TransactionOrm(
        id="4",
        date="2026-01-31",
        merchant="Netflix Subscription",
        category="Entertainment",
        amount=-15.99,
        type=TransactionType.expense,
        account_id="3",
    ),
    TransactionOrm(
        id="5",
        date="2026-01-31",
        merchant="Starbucks",
        category="Food & Dining",
        amount=-8.75,
        type=TransactionType.expense,
        account_id="1",
    ),
    TransactionOrm(
        id="6",
        date="2026-01-30",
        merchant="Electric Company",
        category="Utilities",
        amount=-145.0,
        type=TransactionType.expense,
        account_id="1",
    ),
    TransactionOrm(
        id="7",
        date="2026-01-29",
        merchant="Target",
        category="Shopping",
        amount=-87.34,
        type=TransactionType.expense,
        account_id="3",
    ),
    TransactionOrm(
        id="8",
        date="2026-01-28",
        merchant="Olive Garden",
        category="Food & Dining",
        amount=-65.5,
        type=TransactionType.expense,
        account_id="1",
    ),
    TransactionOrm(
        id="9",
        date="2026-01-27",
        merchant="Gym Membership",
        category="Health",
        amount=-50.0,
        type=TransactionType.expense,
        account_id="1",
    ),
    TransactionOrm(
        id="10",
        date="2026-01-26",
        merchant="Amazon",
        category="Shopping",
        amount=-234.99,
        type=TransactionType.expense,
        account_id="3",
    ),
    TransactionOrm(
        id="11",
        date="2026-01-25",
        merchant="Freelance Project",
        category="Income",
        amount=1250,
        type=TransactionType.income,
        account_id="1",
    ),
    TransactionOrm(
        id="12",
        date="2026-01-24",
        merchant="Delta Airlines",
        category="Travel",
        amount=-450.0,
        type=TransactionType.expense,
        account_id="3",
    ),
    TransactionOrm(
        id="13",
        date="2026-01-24",
        merchant="Uber",
        category="Transportation",
        amount=-28.5,
        type=TransactionType.expense,
        account_id="1",
    ),
    TransactionOrm(
        id="14",
        date="2026-01-23",
        merchant="Trader Joe's",
        category="Groceries",
        amount=-89.23,
        type=TransactionType.expense,
        account_id="1",
    ),
    TransactionOrm(
        id="15",
        date="2026-01-23",
        merchant="Chipotle",
        category="Food & Dining",
        amount=-12.45,
        type=TransactionType.expense,
        account_id="3",
    ),
    TransactionOrm(
        id="16",
        date="2026-01-22",
        merchant="Best Buy",
        category="Shopping",
        amount=-399.99,
        type=TransactionType.expense,
        account_id="3",
    ),
    TransactionOrm(
        id="17",
        date="2026-01-22",
        merchant="Spotify Subscription",
        category="Entertainment",
        amount=-10.99,
        type=TransactionType.expense,
        account_id="1",
    ),
    TransactionOrm(
        id="18",
        date="2026-01-21",
        merchant="Water Company",
        category="Utilities",
        amount=-65.0,
        type=TransactionType.expense,
        account_id="1",
    ),
    TransactionOrm(
        id="19",
        date="2026-01-20",
        merchant="CVS Pharmacy",
        category="Health",
        amount=-45.67,
        type=TransactionType.expense,
        account_id="1",
    ),
    TransactionOrm(
        id="20",
        date="2026-01-20",
        merchant="Panera Bread",
        category="Food & Dining",
        amount=-18.9,
        type=TransactionType.expense,
        account_id="1",
    ),
    TransactionOrm(
        id="21",
        date="2026-01-19",
        merchant="Shell Gas Station",
        category="Transportation",
        amount=-48.0,
        type=TransactionType.expense,
        account_id="3",
    ),
    TransactionOrm(
        id="22",
        date="2026-01-18",
        merchant="Costco",
        category="Groceries",
        amount=-156.78,
        type=TransactionType.expense,
        account_id="1",
    ),
    TransactionOrm(
        id="23",
        date="2026-01-18",
        merchant="Client Payment",
        category="Income",
        amount=800,
        type=TransactionType.income,
        account_id="1",
    ),
    TransactionOrm(
        id="24",
        date="2026-01-17",
        merchant="Home Depot",
        category="Shopping",
        amount=-178.45,
        type=TransactionType.expense,
        account_id="3",
    ),
    TransactionOrm(
        id="25",
        date="2026-01-17",
        merchant="Movie Theater",
        category="Entertainment",
        amount=-35.0,
        type=TransactionType.expense,
        account_id="1",
    ),
    TransactionOrm(
        id="26",
        date="2026-01-16",
        merchant="Starbucks",
        category="Food & Dining",
        amount=-6.85,
        type=TransactionType.expense,
        account_id="1",
    ),
    TransactionOrm(
        id="27",
        date="2026-01-15",
        merchant="Internet Service",
        category="Utilities",
        amount=-89.99,
        type=TransactionType.expense,
        account_id="1",
    ),
    TransactionOrm(
        id="28",
        date="2026-01-15",
        merchant="Uber Eats",
        category="Food & Dining",
        amount=-32.5,
        type=TransactionType.expense,
        account_id="3",
    ),
    TransactionOrm(
        id="29",
        date="2026-01-14",
        merchant="Walgreens",
        category="Health",
        amount=-23.45,
        type=TransactionType.expense,
        account_id="1",
    ),
    TransactionOrm(
        id="30",
        date="2026-01-13",
        merchant="Whole Foods Market",
        category="Groceries",
        amount=-98.67,
        type=TransactionType.expense,
        account_id="1",
    ),
    TransactionOrm(
        id="31",
        date="2026-01-12",
        merchant="Lyft",
        category="Transportation",
        amount=-19.75,
        type=TransactionType.expense,
        account_id="1",
    ),
    TransactionOrm(
        id="32",
        date="2026-01-12",
        merchant="Apple Store",
        category="Shopping",
        amount=-129.0,
        type=TransactionType.expense,
        account_id="3",
    ),
    TransactionOrm(
        id="33",
        date="2026-01-11",
        merchant="Dunkin' Donuts",
        category="Food & Dining",
        amount=-9.25,
        type=TransactionType.expense,
        account_id="1",
    ),
    TransactionOrm(
        id="34",
        date="2026-01-10",
        merchant="Gas Company",
        category="Utilities",
        amount=-112.0,
        type=TransactionType.expense,
        account_id="1",
    ),
    TransactionOrm(
        id="35",
        date="2026-01-09",
        merchant="Parking Fee",
        category="Transportation",
        amount=-15.0,
        type=TransactionType.expense,
        account_id="1",
    ),
]

budget_groups: list[BudgetGroupOrm] = [
    BudgetGroupOrm(
        id="1",
        name="Food",
    ),
    BudgetGroupOrm(
        id="2",
        name="Transportation",
    ),
    BudgetGroupOrm(
        id="3",
        name="Home",
    ),
    BudgetGroupOrm(
        id="4",
        name="Lifestyle",
    ),
    BudgetGroupOrm(
        id="5",
        name="Health",    
    ),
]

budget_items: list[BudgetItemOrm] = [
    BudgetItemOrm( id="1", name="Groceries", assigned=600, spent=425.5, budget_group=budget_groups[0] ),
    BudgetItemOrm( id="2", name="Dining Out", assigned=300, spent=285.75, budget_group=budget_groups[0] ),
    BudgetItemOrm( id="3", name="Gas", assigned=150, spent=125.0, budget_group=budget_groups[1] ),
    BudgetItemOrm( id="4", name="Public Transit", assigned=50, spent=20.0, budget_group=budget_groups[1] ),
    BudgetItemOrm( id="5", name="Utilities", assigned=250, spent=220.0, budget_group=budget_groups[2] ),
    BudgetItemOrm( id="6", name="Insurance", assigned=350, spent=350.0, budget_group=budget_groups[2] ),
    BudgetItemOrm( id="7", name="Entertainment", assigned=150, spent=95.5, budget_group=budget_groups[3] ),
    BudgetItemOrm( id="8", name="Shopping", assigned=400, spent=520.25, budget_group=budget_groups[3] ),
    BudgetItemOrm( id="9", name="Healthcare", assigned=200, spent=75.0, budget_group=budget_groups[4] ),
    BudgetItemOrm( id="10", name="Fitness", assigned=100, spent=100.0, budget_group=budget_groups[4] ),  
]

async def seed():
    async with async_session() as session:
        session.add_all(transactions)
        session.add_all(budget_groups)
        session.add_all(budget_items)
        await session.commit()

async def check_already_seeded():
    async with async_session() as session:
        res = await session.execute(select(TransactionOrm).where(TransactionOrm.id == "30"))
        txn = res.scalars().first()
        return bool(txn)

already_seeded = asyncio.run(check_already_seeded())

if already_seeded:
    print("already seeded")
else:
    print("start seeding db")
    asyncio.run(seed())
    print("seeding complete")