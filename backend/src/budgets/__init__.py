# These imports are here to resolve the fact that
# in groups.models and items.models, the relational
# nature of these classes causes groups.models to need
# string-literal forward-imports. This causes issues
# with incomplete imports, so the code here fixes that.


from src.budgets.groups.models import BudgetGroup
from src.budgets.items.models import BudgetItem

BudgetGroup.model_rebuild()
BudgetItem.model_rebuild()