from pydantic import BaseModel
from sqlalchemy import String
from sqlalchemy.orm import Mapped, mapped_column
from src.database import OrmBase

# Pydantic Schema for API layer
class Budget(BaseModel):
    id: str
    name: str

    class Config:
        from_attributes = True
    
# SQLAlchemy model for DB layer
class BudgetOrm(OrmBase):
    __tablename__ = "budgets"

    id: Mapped[str] = mapped_column(String, primary_key=True)
    name: Mapped[str]