from pydantic import BaseModel
from enum import Enum
from sqlalchemy import String, Enum as SAEnum
from sqlalchemy.orm import Mapped, mapped_column
from src.database import OrmBase

class TransactionType(str, Enum):
    income = "income"
    expense = "expense"

# Pydantic Schema for API layer
class Transaction(BaseModel):
    id: str
    date: str
    merchant: str
    category: str
    amount: float
    account_id: str
    type: TransactionType

    class Config:
        from_attributes = True
    
# SQLAlchemy model for DB layer
class TransactionOrm(OrmBase):
    __tablename__ = "transactions"

    id: Mapped[str] = mapped_column(String, primary_key=True)
    date: Mapped[str]
    merchant: Mapped[str]
    category: Mapped[str]
    amount: Mapped[float]
    account_id: Mapped[str]
    type: Mapped[TransactionType] = mapped_column(SAEnum(TransactionType))