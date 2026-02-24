from fastapi import APIRouter, Depends, HTTPException
from src.budgets.models import BudgetGroup, BudgetGroupOrm
from src.budgets.models import BudgetItem, BudgetItemOrm
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
@router.get("/groups/getall", response_model=list[BudgetGroup])
async def get_all_groups_for_user_budget(db: AsyncSession=Depends(get_db)):
    query = select(BudgetGroupOrm).options(joinedload(BudgetGroupOrm.budget_items))
    result = await db.execute(query)
    return result.scalars().all()

@router.get("/items/{budget_item_id}", response_model=BudgetItem)
async def get_budget_item(budget_item_id: str, db: AsyncSession=Depends(get_db)):
    query = select(BudgetItemOrm).where(BudgetItemOrm.id == budget_item_id)
    query_result = await db.execute(query)
    buget_item = query_result.scalars().one_or_none()
    if buget_item is None:
        raise HTTPException(status_code=404, detail="Budget item not found")
    return buget_item