from fastapi import APIRouter, Depends
from src.budgets.groups.models import BudgetGroup, BudgetGroupOrm
from src.database import get_db
from sqlalchemy import select
from sqlalchemy.orm import joinedload
from sqlalchemy.ext.asyncio import AsyncSession

router = APIRouter()

# Joinedload as an option here overrides the lazy loading default
# behavior with the budget_items attribute. Before, there were issues
# where SqlAlchemy needed to query the db at serialization
# time to lazy-load budget_items in each budget_group,
# but since that is outside the scope there is no async connection
# context to run the query in -> runtime error. 
@router.get("/getall", response_model=list[BudgetGroup])
async def get_all_groups_for_user_budget(db: AsyncSession=Depends(get_db)):
    query = select(BudgetGroupOrm).options(joinedload(BudgetGroupOrm.budget_items))
    result = await db.execute(query)
    return result.scalars().all()