import random
from datetime import date, timedelta
from src.transactions.models import TransactionOrm, TransactionType

random.seed(42)

MERCHANTS_BY_CATEGORY: dict[str, list[tuple[str, float, float]]] = {
    # category: [(merchant, min_amount, max_amount), ...]
    "Groceries": [
        ("Whole Foods Market", 25, 200),
        ("Trader Joe's", 20, 150),
        ("Costco", 50, 300),
        ("Kroger", 15, 180),
        ("Aldi", 15, 120),
        ("Safeway", 20, 160),
    ],
    "Food & Dining": [
        ("Starbucks", 4, 12),
        ("Chipotle", 9, 18),
        ("Olive Garden", 25, 80),
        ("Panera Bread", 8, 22),
        ("Dunkin' Donuts", 3, 10),
        ("Uber Eats", 15, 55),
        ("DoorDash", 12, 50),
        ("McDonald's", 5, 15),
        ("Chick-fil-A", 7, 18),
        ("Domino's Pizza", 10, 35),
    ],
    "Transportation": [
        ("Shell Gas Station", 25, 70),
        ("Uber", 8, 45),
        ("Lyft", 8, 40),
        ("Parking Fee", 5, 25),
        ("BP Gas Station", 25, 70),
        ("EV Charging", 8, 30),
    ],
    "Utilities": [
        ("Electric Company", 80, 200),
        ("Water Company", 30, 90),
        ("Gas Company", 50, 150),
        ("Internet Service", 60, 100),
        ("Phone Bill", 40, 90),
    ],
    "Shopping": [
        ("Amazon", 10, 500),
        ("Target", 15, 200),
        ("Best Buy", 20, 600),
        ("Home Depot", 15, 300),
        ("Apple Store", 30, 400),
        ("Walmart", 10, 150),
        ("IKEA", 25, 350),
        ("Etsy", 10, 80),
    ],
    "Entertainment": [
        ("Netflix Subscription", 15.99, 15.99),
        ("Spotify Subscription", 10.99, 10.99),
        ("Movie Theater", 12, 45),
        ("Hulu Subscription", 17.99, 17.99),
        ("Concert Tickets", 40, 200),
        ("Bowling Alley", 15, 50),
        ("Steam Games", 5, 60),
    ],
    "Health": [
        ("CVS Pharmacy", 8, 80),
        ("Walgreens", 5, 60),
        ("Gym Membership", 30, 60),
        ("Doctor Copay", 20, 50),
        ("Dental Office", 25, 200),
    ],
    "Travel": [
        ("Delta Airlines", 150, 600),
        ("United Airlines", 150, 550),
        ("Airbnb", 80, 300),
        ("Marriott Hotel", 100, 350),
        ("Hertz Car Rental", 40, 150),
    ],
    "Income": [
        ("Salary Deposit", 3000, 6000),
        ("Freelance Project", 500, 3000),
        ("Client Payment", 200, 2000),
        ("Dividend Payment", 50, 500),
        ("Refund", 10, 200),
    ],
}

# Weights for how often each category appears (roughly realistic)
CATEGORY_WEIGHTS: dict[str, int] = {
    "Groceries": 15,
    "Food & Dining": 25,
    "Transportation": 12,
    "Utilities": 5,
    "Shopping": 15,
    "Entertainment": 8,
    "Health": 5,
    "Travel": 3,
    "Income": 12,
}

# Distribution weights for bank accounts 1-5
ACCOUNT_WEIGHTS = [35, 20, 25, 10, 10]

CATEGORY_TO_BUDGET_ITEM_ID: dict[str, int] = {
    "Groceries": 1,
    "Food & Dining": 2,
    "Transportation": 3,
    "Utilities": 5,
    "Shopping": 8,
    "Entertainment": 7,
    "Health": 9,
    "Travel": 13,
    "Income": 14,
}

CATEGORIES = list(CATEGORY_WEIGHTS.keys())
WEIGHTS = list(CATEGORY_WEIGHTS.values())
START_DATE = date(2025, 1, 1)
END_DATE = date(2026, 2, 28)
DATE_RANGE_DAYS = (END_DATE - START_DATE).days


def _generate_transactions(count: int) -> list[TransactionOrm]:
    txns: list[TransactionOrm] = []

    for _ in range(count):
        category = random.choices(CATEGORIES, weights=WEIGHTS, k=1)[0]
        merchant, min_amt, max_amt = random.choice(MERCHANTS_BY_CATEGORY[category])
        bank_account_id = random.choices(
            [1, 2, 3, 4, 5],
            weights=ACCOUNT_WEIGHTS,
            k=1,
        )[0]

        txn_date = START_DATE + timedelta(days=random.randint(0, DATE_RANGE_DAYS))

        if category == "Income":
            amount = round(random.uniform(min_amt, max_amt), 2)
            txn_type = TransactionType.income
        else:
            amount = -round(random.uniform(min_amt, max_amt), 2)
            txn_type = TransactionType.expense

        txns.append(
            TransactionOrm(
                date=txn_date.isoformat(),
                merchant=merchant,
                category=category,
                amount=amount,
                type=txn_type,
                bank_account_id=bank_account_id,
                budget_item_id=CATEGORY_TO_BUDGET_ITEM_ID[category],
            )
        )

    txns.sort(key=lambda t: t.date, reverse=True)
    return txns


transactions: list[TransactionOrm] = _generate_transactions(2000)
