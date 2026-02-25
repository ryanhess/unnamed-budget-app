from fastapi import APIRouter, Depends, HTTPException
from src.budgets.models import (
    BudgetGroup,
    BudgetGroupOrm,
    BudgetItemCreate,
	BudgetItemUpdate,
    BudgetItemResponse,
    BudgetItemOrm
)
from src.database import get_db
from sqlalchemy import select
from sqlalchemy.orm import selectinload
from sqlalchemy.ext.asyncio import AsyncSession


router = APIRouter()


# use POST because this is not idempotent. Will create a new item every valid request
@router.post("/groups/new")
async def create_new_budget_group(
    new_budget_group: BudgetGroup,
    db: AsyncSession=Depends(get_db)
):
	return


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
    budget_group_id: int,
    new_fields: BudgetGroup,
    db: AsyncSession=Depends(get_db)
):
    return


@router.delete("/groups/delete")
async def delete_budget_group(
    budget_group_id: int,
    db: AsyncSession=Depends(get_db)
):
	return


# use POST because this is not idempotent. Will create a new item every valid request
@router.post("/items/newitem")
async def create_new_budget_item(
    new_budget_item: BudgetItemCreate,
    db: AsyncSession=Depends(get_db)
):
    async def populate_item_id(orm: BudgetItemOrm):
        # start tracking the new item orm and have Postgres assign an id to it.
        # the transaction has been entered, but the db is not written yet.
        db.add(new_item_orm)
        await db.flush()

    async def check_group_id_in_db(proposed_item: BudgetItemCreate):
        group_id = proposed_item.budget_group_id
        
        # specifying no group is a valid request.
        if group_id is None:
             return
        
        group = await db.get(BudgetGroupOrm, group_id)
        if group is None:
             raise HTTPException(status_code=422, detail="Bad request: specified a nonexistent budget group")
        
        return group

    await check_group_id_in_db(new_budget_item)

    new_item_orm = BudgetItemOrm(
        name = new_budget_item.name,
        assigned = new_budget_item.assigned,
        spent = new_budget_item.spent,
        budget_group_id = new_budget_item.budget_group_id
    )

    await populate_item_id(new_item_orm)
    await db.commit()
    return new_item_orm


@router.get("/items/{budget_item_id}", response_model=BudgetItemResponse)
async def get_budget_item(budget_item_id: int, db: AsyncSession=Depends(get_db)):
    query = select(BudgetItemOrm).where(BudgetItemOrm.id == budget_item_id)
    query_result = await db.execute(query)
    buget_item = query_result.scalars().one_or_none()
    if buget_item is None:
        raise HTTPException(status_code=404, detail="Budget item not found")
    return buget_item


@router.post("/items/{budget_item_id}/update")
async def update_budget_item(
    new_budget_item: BudgetItemUpdate,
    db: AsyncSession=Depends(get_db)
):
	return


# deletes the item at the id, or returns 404 if not found.
@router.delete("/items/{budget_item_id}/delete")
async def delete_budget_item(
    budget_item_id: int,
    db: AsyncSession=Depends(get_db)
):
	return