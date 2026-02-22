from fastapi import APIRouter, Depends, HTTPException
from src.budgets.items.models import BudgetItem, BudgetItemOrm
from src.database import get_db
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select

router = APIRouter()

@router.get("/{budget_item_id}", response_model=BudgetItem)
async def get_budget_item(budget_item_id: str, db: AsyncSession=Depends(get_db)):
    query = select(BudgetItemOrm).where(BudgetItemOrm.id == budget_item_id)
    query_result = await db.execute(query)
    buget_item = query_result.scalars().one_or_none()
    if buget_item is None:
        raise HTTPException(status_code=404, detail="Budget item not found")
    return buget_item