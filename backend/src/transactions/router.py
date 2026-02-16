from fastapi import APIRouter

router = APIRouter()

@router.get("/")
def get_all_transactions() -> dict[str, str]:
    return {"message": "all transactions"}

@router.get("/{bankAccountId}")
def get_specific_account_transactions(bankAccountId: str) -> dict[str, str]:
    return {"message": f'got id: {bankAccountId}'}