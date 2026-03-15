from pydantic import BaseModel
from enum import Enum
from sqlalchemy import Enum as SqlAlchEnum, ForeignKey, Identity, Date
from sqlalchemy.orm import Mapped, mapped_column, relationship
from src.database import OrmBase
from datetime import date as date_type
from budgets.models import BudgetItemOrm


class TransactionType(str, Enum):
    income = "income"
    expense = "expense"


class TransactionCreate(BaseModel):
    date: str
    merchant: str
    category: str
    amount: float
    bank_account_id: int
    type: TransactionType


# Pydantic Schema for API layer
class TransactionResponse(BaseModel):
    id: int
    date: str
    merchant: str
    category: str
    amount: float
    bank_account_id: int
    type: TransactionType

    class Config:
        from_attributes = True


# SQLAlchemy model for DB layer
class TransactionOrm(OrmBase):
    __tablename__ = "transactions"

    id: Mapped[int] = mapped_column(Identity(always=True), primary_key=True)
    date: Mapped[date_type] = mapped_column(Date)

    merchant: Mapped[str]
    category: Mapped[str]
    budget_item_id: Mapped[int] = mapped_column(nullable=True)
    budget_item: Mapped[BudgetItemOrm | None] = relationship(
        back_populates="transactions"
    )
    amount: Mapped[float]
    type: Mapped[TransactionType] = mapped_column(SqlAlchEnum(TransactionType))

    # when the bank account is deleted, the transaction should be deleted.
    bank_account_id: Mapped[int] = mapped_column(
        ForeignKey("bank_accounts.id", ondelete="CASCADE")
    )
