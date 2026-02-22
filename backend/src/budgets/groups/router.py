from fastapi import APIRouter, Depends
from src.budgets.groups.models import BudgetGroup, BudgetGroupOrm
from src.database import get_db
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select

router = APIRouter()

@router.get("/getall", response_model=list[BudgetGroup])
async def get_all_groups_for_user_budget(db: AsyncSession=Depends(get_db)):
    query = select(BudgetGroupOrm)
    result = await db.execute(query)
    return result.scalars().all()