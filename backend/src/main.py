from fastapi import FastAPI

app = FastAPI()

@app.get("/")
async def serve_root():
    return {"message": "Hello, World!"}
