from sqlalchemy import Identity
from sqlalchemy.orm import Mapped, mapped_column
from src.database import OrmBase

class BankAccountOrm(OrmBase):
    __tablename__ = "bank_accounts"
    
    id: Mapped[int] = mapped_column(Identity(always=True), primary_key=True)