from fastapi import APIRouter
from src.transactions.models import (
    TransactionResponse,
    TransactionOrm,
    TransactionCreate,
)
from src.database import AsyncDb
from sqlalchemy import select
from typing import Sequence


router = APIRouter()


@router.get("/", response_model=list[TransactionResponse])
async def get_all_transactions_for_user(db: AsyncDb) -> Sequence[TransactionOrm]:
    query = select(TransactionOrm)
    result = await db.execute(query)
    return result.scalars().all()


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
