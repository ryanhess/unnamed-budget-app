from pydantic import BaseModel
from enum import Enum

class TransactionType(str, Enum):
    income = "income"
    expense = "expense"

class Transaction(BaseModel):
    id: str
    date: str
    merchant: str
    category: str
    amount: float
    accountId: str
    type: TransactionType