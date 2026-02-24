from fastapi import APIRouter, Depends, HTTPException
from src.budgets.models import BudgetGroup, BudgetGroupOrm
from src.budgets.models import BudgetItemResponse, BudgetItemOrm
from src.database import get_db
from sqlalchemy import select
from sqlalchemy.orm import selectinload
from sqlalchemy.ext.asyncio import AsyncSession


router = APIRouter()


# The query here includes an option for selectinload. By default, BudgetGroupOrm
# does not load all data from db inside this function, but does a lazy load instead.
# Leaving this option out would result in many queries being run at serialization time.
# selectinload causes only one additional query to run so that everything is filled out.
# Anyway, the async engine would have resulted in runtime errors when those serialization
# queries run, so this option solves two problems: query efficiency, and avoid runtime
# error for async.
@router.get("/groups/getall", response_model=list[BudgetGroup])
async def get_all_groups_for_user_budget(db: AsyncSession=Depends(get_db)):
    query = select(BudgetGroupOrm).options(selectinload(BudgetGroupOrm.budget_items))
    result = await db.execute(query)
    return result.scalars().all()


@router.post("/groups/{budget_group_id}")
async def update_budget_group(
    budget_group_id: str,
    new_fields: BudgetGroup,
    db: AsyncSession=Depends(get_db)
):
    return


@router.post("/groups/new")
async def create_new_budget_group(
    new_budget_group: BudgetGroup,
    db: AsyncSession=Depends(get_db)
):
	return


@router.delete("/groups/delete")
async def delete_budget_group(
    budget_group_id: str,
    db: AsyncSession=Depends(get_db)
):
	return


@router.get("/items/{budget_item_id}", response_model=BudgetItemResponse)
async def get_budget_item(budget_item_id: str, db: AsyncSession=Depends(get_db)):
    query = select(BudgetItemOrm).where(BudgetItemOrm.id == budget_item_id)
    query_result = await db.execute(query)
    buget_item = query_result.scalars().one_or_none()
    if buget_item is None:
        raise HTTPException(status_code=404, detail="Budget item not found")
    return buget_item