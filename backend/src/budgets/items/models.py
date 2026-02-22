from pydantic import BaseModel
from sqlalchemy import String, ForeignKey
from sqlalchemy.orm import Mapped, mapped_column, relationship
from src.database import OrmBase
from src.budgets.groups.models import BudgetGroupOrm

# Pydantic Schema for API layer
class BudgetItem(BaseModel):
    id: str
    name: str
    assigned: float
    spent: float


    class Config:
        from_attributes = True
    
# SQLAlchemy model for DB layer
class BudgetItemOrm(OrmBase):
    __tablename__ = "budget_items"

    id: Mapped[str] = mapped_column(String, primary_key=True)
    name: Mapped[str]
    assigned: Mapped[float]
    spent: Mapped[float]
    budget_group_id: Mapped[str] = mapped_column(ForeignKey("budget_groups.id"))
    budget_group: Mapped[BudgetGroupOrm] = relationship(back_populates="budget_items")