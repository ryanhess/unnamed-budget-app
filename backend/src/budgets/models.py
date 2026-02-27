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
    budget_items: list["BudgetItemResponse"] # type: ignore

    class Config:
        from_attributes = True


# SQLAlchemy model for DB layer
class BudgetGroupOrm(OrmBase):
    __tablename__ = "budget_groups"

    id: Mapped[str] = mapped_column(String, primary_key=True)
    name: Mapped[str]
    # forward-import to avoid circular dependency
    budget_items: Mapped[list["BudgetItemOrm"]] = relationship(back_populates="budget_group") # type: ignore


class BudgetItemBase(BaseModel):
    budget_group_id: str | None = None


class BudgetItemCreate(BudgetItemBase):
    name: str
    assigned: float = 0.0
    spent: float = 0.0


class BudgetItemUpdate(BudgetItemBase):
    id: str
    name: str | None = None
    assigned: float | None = None
    spent: float | None = None


class BudgetItemResponse(BudgetItemBase):
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
    budget_group_id: Mapped[str | None] = mapped_column(ForeignKey("budget_groups.id"), nullable=True)
    budget_group: Mapped[BudgetGroupOrm | None] = relationship(back_populates="budget_items")