from fastapi import APIRouter
from src.transactions.models import Transaction
from src.transactions.dumbData import transactions

router = APIRouter()

@router.get("/")
def get_all_transactions() -> list[Transaction]:
    return transactions

@router.get("/{bank_account_id}")
def get_specific_account_transactions(bank_account_id: str) -> list[Transaction]:
    result = [trans for trans in transactions if trans.account_id == bank_account_id]
    return result