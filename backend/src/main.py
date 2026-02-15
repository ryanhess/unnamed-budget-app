from fastapi import FastAPI
from transactions.router import router as transactions_routes

app = FastAPI()

app.include_router(transactions_routes, prefix="/transactions")

@app.get("/")
async def serve_root():
    return {"message": "TEST! Hello World"}