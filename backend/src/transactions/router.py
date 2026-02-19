from fastapi import APIRouter
from src.transactions.models import TransactionSchema
from src.transactions.dumbData import transactions

router = APIRouter()

@router.get("/")
def get_all_transactions() -> list[TransactionSchema]:
    return transactions

@router.get("/{bankAccountId}")
def get_specific_account_transactions(bankAccountId: str) -> list[TransactionSchema]:
    result = [trans for trans in transactions if trans.account_id == bankAccountId]
    return result