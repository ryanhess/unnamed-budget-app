from fastapi import APIRouter

router = APIRouter()

@router.get("/{budget_item_id}")
async def get_budget_item(budget_item_id: str):
    return(f"getting specific budget item! {budget_item_id}")