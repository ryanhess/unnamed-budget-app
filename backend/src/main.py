from fastapi import FastAPI

# from src.transactions.router import router as transactions_routes
from src.budgets.router import router as budgets_routes
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# app.include_router(transactions_routes, prefix="/transactions")
app.include_router(budgets_routes, prefix="/budgets")


@app.get("/")
async def serve_root() -> dict[str, str]:
    return {"message": "TEST! Hello World"}
