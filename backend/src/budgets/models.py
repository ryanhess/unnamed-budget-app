from pydantic import BaseModel
from sqlalchemy import String, ForeignKey
from sqlalchemy.orm import Mapped, mapped_column, relationship
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


# Pydantic Schema for API layer
class BudgetGroup(BaseModel):
    id: str
    name: str
    # forward-import to avoid circular dependency
    budget_items: list["BudgetItem"] # type: ignore

    class Config:
        from_attributes = True


# SQLAlchemy model for DB layer
class BudgetGroupOrm(OrmBase):
    __tablename__ = "budget_groups"

    id: Mapped[str] = mapped_column(String, primary_key=True)
    name: Mapped[str]
    # forward-import to avoid circular dependency
    budget_items: Mapped[list["BudgetItemOrm"]] = relationship(back_populates="budget_group") # type: ignore


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