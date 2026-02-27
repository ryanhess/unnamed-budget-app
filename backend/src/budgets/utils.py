from sqlalchemy.ext.asyncio import AsyncSession
from src.budgets.models import BudgetGroupOrm
from fastapi import HTTPException


async def validate_group_id_in_db(group_id: int | None, db: AsyncSession) -> BudgetGroupOrm | None:
    # specifying no group is a valid request.
    if group_id is None:
        return None
    
    group = await db.get(BudgetGroupOrm, group_id)
    if group is None:
            raise HTTPException(status_code=422, detail="Bad request: specified a nonexistent budget group")
    
    return group