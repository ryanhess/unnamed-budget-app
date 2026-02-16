from fastapi import APIRouter
from .models import Transaction
from .dumbData import transactions

router = APIRouter()

@router.get("/")
def get_all_transactions() -> list[Transaction]:
    return transactions

@router.get("/{bankAccountId}")
def get_specific_account_transactions(bankAccountId: str) -> list[Transaction]:
    result = [trans for trans in transactions if trans.accountId == bankAccountId]
    return result