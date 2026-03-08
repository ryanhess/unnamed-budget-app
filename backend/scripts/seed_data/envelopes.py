from src.budgets.models import EnvelopeOrm

envelopes: list[EnvelopeOrm] = [
    # Oct 2025
    EnvelopeOrm(year=2025, month=10, assigned=580, budget_item_id=1),  # Groceries
    EnvelopeOrm(year=2025, month=10, assigned=275, budget_item_id=2),  # Dining Out
    EnvelopeOrm(year=2025, month=10, assigned=140, budget_item_id=3),  # Gas
    EnvelopeOrm(year=2025, month=10, assigned=50, budget_item_id=4),  # Public Transit
    EnvelopeOrm(year=2025, month=10, assigned=230, budget_item_id=5),  # Utilities
    EnvelopeOrm(year=2025, month=10, assigned=350, budget_item_id=6),  # Insurance
    EnvelopeOrm(year=2025, month=10, assigned=120, budget_item_id=7),  # Entertainment
    EnvelopeOrm(year=2025, month=10, assigned=375, budget_item_id=8),  # Shopping
    EnvelopeOrm(year=2025, month=10, assigned=200, budget_item_id=9),  # Healthcare
    EnvelopeOrm(year=2025, month=10, assigned=100, budget_item_id=10),  # Fitness
    EnvelopeOrm(year=2025, month=10, assigned=20, budget_item_id=11),  # Vitamins
    # Nov 2025
    EnvelopeOrm(year=2025, month=11, assigned=620, budget_item_id=1),
    EnvelopeOrm(year=2025, month=11, assigned=350, budget_item_id=2),
    EnvelopeOrm(year=2025, month=11, assigned=150, budget_item_id=3),
    EnvelopeOrm(year=2025, month=11, assigned=55, budget_item_id=4),
    EnvelopeOrm(year=2025, month=11, assigned=260, budget_item_id=5),
    EnvelopeOrm(year=2025, month=11, assigned=350, budget_item_id=6),
    EnvelopeOrm(year=2025, month=11, assigned=175, budget_item_id=7),
    EnvelopeOrm(year=2025, month=11, assigned=450, budget_item_id=8),
    EnvelopeOrm(year=2025, month=11, assigned=180, budget_item_id=9),
    EnvelopeOrm(year=2025, month=11, assigned=100, budget_item_id=10),
    EnvelopeOrm(year=2025, month=11, assigned=256, budget_item_id=12),  # Ungrouped
    # Dec 2025
    EnvelopeOrm(year=2025, month=12, assigned=650, budget_item_id=1),
    EnvelopeOrm(year=2025, month=12, assigned=400, budget_item_id=2),
    EnvelopeOrm(year=2025, month=12, assigned=130, budget_item_id=3),
    EnvelopeOrm(year=2025, month=12, assigned=50, budget_item_id=4),
    EnvelopeOrm(year=2025, month=12, assigned=280, budget_item_id=5),
    EnvelopeOrm(year=2025, month=12, assigned=350, budget_item_id=6),
    EnvelopeOrm(year=2025, month=12, assigned=200, budget_item_id=7),
    EnvelopeOrm(year=2025, month=12, assigned=500, budget_item_id=8),
    EnvelopeOrm(year=2025, month=12, assigned=200, budget_item_id=9),
    EnvelopeOrm(year=2025, month=12, assigned=90, budget_item_id=10),
    EnvelopeOrm(year=2025, month=12, assigned=256, budget_item_id=12),  # Ungrouped
    # Jan 2026
    EnvelopeOrm(year=2026, month=1, assigned=600, budget_item_id=1),
    EnvelopeOrm(year=2026, month=1, assigned=280, budget_item_id=2),
    EnvelopeOrm(year=2026, month=1, assigned=160, budget_item_id=3),
    EnvelopeOrm(year=2026, month=1, assigned=50, budget_item_id=4),
    EnvelopeOrm(year=2026, month=1, assigned=250, budget_item_id=5),
    EnvelopeOrm(year=2026, month=1, assigned=350, budget_item_id=6),
    EnvelopeOrm(year=2026, month=1, assigned=130, budget_item_id=7),
    EnvelopeOrm(year=2026, month=1, assigned=350, budget_item_id=8),
    EnvelopeOrm(year=2026, month=1, assigned=220, budget_item_id=9),
    EnvelopeOrm(year=2026, month=1, assigned=110, budget_item_id=10),
    EnvelopeOrm(year=2026, month=1, assigned=256, budget_item_id=12),  # Ungrouped
    # Feb 2026
    EnvelopeOrm(year=2026, month=2, assigned=590, budget_item_id=1),
    EnvelopeOrm(year=2026, month=2, assigned=300, budget_item_id=2),
    EnvelopeOrm(year=2026, month=2, assigned=145, budget_item_id=3),
    EnvelopeOrm(year=2026, month=2, assigned=45, budget_item_id=4),
    EnvelopeOrm(year=2026, month=2, assigned=240, budget_item_id=5),
    EnvelopeOrm(year=2026, month=2, assigned=350, budget_item_id=6),
    EnvelopeOrm(year=2026, month=2, assigned=150, budget_item_id=7),
    EnvelopeOrm(year=2026, month=2, assigned=380, budget_item_id=8),
    EnvelopeOrm(year=2026, month=2, assigned=190, budget_item_id=9),
    EnvelopeOrm(year=2026, month=2, assigned=105, budget_item_id=10),
    EnvelopeOrm(year=2026, month=2, assigned=256, budget_item_id=12),  # Ungrouped
    # Mar 2026
    EnvelopeOrm(year=2026, month=3, assigned=610, budget_item_id=1),
    EnvelopeOrm(year=2026, month=3, assigned=320, budget_item_id=2),
    EnvelopeOrm(year=2026, month=3, assigned=155, budget_item_id=3),
    EnvelopeOrm(year=2026, month=3, assigned=50, budget_item_id=4),
    EnvelopeOrm(year=2026, month=3, assigned=245, budget_item_id=5),
    EnvelopeOrm(year=2026, month=3, assigned=350, budget_item_id=6),
    EnvelopeOrm(year=2026, month=3, assigned=160, budget_item_id=7),
    EnvelopeOrm(year=2026, month=3, assigned=420, budget_item_id=8),  # No healthcare
    # Apr 2026
    EnvelopeOrm(year=2026, month=4, assigned=610, budget_item_id=1),
    EnvelopeOrm(year=2026, month=4, assigned=320, budget_item_id=2),
    EnvelopeOrm(year=2026, month=4, assigned=155, budget_item_id=3),
    EnvelopeOrm(year=2026, month=4, assigned=50, budget_item_id=4),
    EnvelopeOrm(year=2026, month=4, assigned=245, budget_item_id=5),
    EnvelopeOrm(year=2026, month=4, assigned=350, budget_item_id=6),  # 7 is missing
    EnvelopeOrm(year=2026, month=4, assigned=420, budget_item_id=8),  # Entertainment
    EnvelopeOrm(year=2026, month=4, assigned=210, budget_item_id=9),  # Healthcare Back
    EnvelopeOrm(year=2026, month=4, assigned=100, budget_item_id=10),
    EnvelopeOrm(year=2026, month=4, assigned=256, budget_item_id=12),  # Ungrouped
]
