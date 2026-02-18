from fastapi import APIRouter
from .models import TransactionSchema
from .dumbData import transactions

router = APIRouter()

@router.get("/")
def get_all_transactions() -> list[TransactionSchema]:
    return transactions

@router.get("/{bankAccountId}")
def get_specific_account_transactions(bankAccountId: str) -> list[TransactionSchema]:
    result = [trans for trans in transactions if trans.accountId == bankAccountId]
    return result