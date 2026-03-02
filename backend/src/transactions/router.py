from fastapi import APIRouter
from src.transactions.models import (
    TransactionResponse,
    TransactionOrm,
    TransactionCreate,
)


router = APIRouter()


@router.get("/", response_model=list[TransactionResponse])
def get_all_transactions_for_user() -> list[TransactionOrm]:
    return []


@router.get("/new-transaction", response_model=TransactionResponse)
def create_new_transaction(
    new_txn_fields: TransactionCreate,
) -> TransactionOrm:
    return TransactionOrm()


@router.get("/{bank_account_id}", response_model=list[TransactionResponse])
def get_specific_account_transactions(
    bank_account_id: int,
) -> list[TransactionOrm]:
    return []
