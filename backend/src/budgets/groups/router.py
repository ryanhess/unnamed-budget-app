from fastapi import APIRouter

router = APIRouter()

@router.get("/getall")
async def get_all_groups_for_user_budget():
    return("getting al groups for user budget!")