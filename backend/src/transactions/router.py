from fastapi import APIRouter

router = APIRouter()

@router.get("")
def get_all_transactions():
    return {"message": "all transactions"}