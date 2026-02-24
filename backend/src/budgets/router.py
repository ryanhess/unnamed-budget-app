from fastapi import APIRouter
from src.budgets.groups.router import router as budget_groups_routes
from src.budgets.items.router import router as budget_items_routes

router = APIRouter()

router.include_router(budget_groups_routes, prefix="/groups")
router.include_router(budget_items_routes, prefix="/items")