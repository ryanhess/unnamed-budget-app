from fastapi import APIRouter, HTTPException
from src.transactions.models import (
    TransactionResponse,
    TransactionOrm,
    TransactionCreate,
)
from src.bank_accounts.models import BankAccountOrm
from src.database import AsyncDb
from sqlalchemy import select
from typing import Sequence


router = APIRouter()


@router.get("/", response_model=list[TransactionResponse])
async def get_all_transactions_for_user(db: AsyncDb) -> Sequence[TransactionOrm]:
    query = select(TransactionOrm)
    result = await db.execute(query)
    return result.scalars().all()


@router.post("/new-transaction", response_model=TransactionResponse)
async def create_new_transaction(
    new_txn_fields: TransactionCreate,
    db: AsyncDb,
) -> TransactionOrm:
    bank_account_check = await db.get(BankAccountOrm, new_txn_fields.bank_account_id)

    if bank_account_check is None:
        raise HTTPException(
            status_code=422,
            detail="Bad request: bank account for this transaction not found",
        )

    new_txn_orm = TransactionOrm(**new_txn_fields.model_dump())
    db.add(new_txn_orm)

    # talk to postgres, update the orm with id
    await db.flush()
    await db.commit()
    return new_txn_orm


@router.get("/{bank_account_id}", response_model=list[TransactionResponse])
async def get_specific_account_transactions(
    bank_account_id: int,
    db: AsyncDb,
) -> Sequence[TransactionOrm]:
    query = select(TransactionOrm).where(
        TransactionOrm.bank_account_id == bank_account_id
    )
    result = await db.execute(query)
    return result.scalars().all()
