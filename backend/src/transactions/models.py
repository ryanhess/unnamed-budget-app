from pydantic import BaseModel
from enum import Enum
from sqlalchemy import Enum as SAEnum, Identity
from sqlalchemy.orm import Mapped, mapped_column
from src.database import OrmBase


class TransactionType(str, Enum):
    income = "income"
    expense = "expense"


# Pydantic Schema for API layer
class Transaction(BaseModel):
    id: int
    date: str
    merchant: str
    category: str
    amount: float
    account_id: int
    type: TransactionType

    class Config:
        from_attributes = True


# SQLAlchemy model for DB layer
class TransactionOrm(OrmBase):
    __tablename__ = "transactions"

    id: Mapped[int] = mapped_column(Identity(always=True), primary_key=True)
    date: Mapped[str]
    merchant: Mapped[str]
    category: Mapped[str]
    amount: Mapped[float]
    account_id: Mapped[int]
    type: Mapped[TransactionType] = mapped_column(SAEnum(TransactionType))
