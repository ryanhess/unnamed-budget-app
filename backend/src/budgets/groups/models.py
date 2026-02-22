from pydantic import BaseModel
from sqlalchemy import String
from sqlalchemy.orm import Mapped, mapped_column, relationship
from src.database import OrmBase

# Pydantic Schema for API layer
class BudgetGroup(BaseModel):
    id: str
    name: str

    class Config:
        from_attributes = True
    
# SQLAlchemy model for DB layer
class BudgetGroupOrm(OrmBase):
    __tablename__ = "budget_groups"

    id: Mapped[str] = mapped_column(String, primary_key=True)
    name: Mapped[str]
    budget_items: Mapped[list["BudgetItemOrm"]] = relationship(back_populates="budget_group") # type: ignore