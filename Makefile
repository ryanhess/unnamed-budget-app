.PHONY: run

run:
	db-start
	cd frontend && npm run dev & cd backend/src && uv run uvicorn main:app --reload

install:
	cd frontend && npm install
	cd backend && uv sync

.envrc:
	echo 'source backend/.venv/bin/activate' > .envrc
	direnv allow

db-start: 
	docker compose up -d

db-stop:
	docker compose down

db-stop-and-delete:
	docker compose down -v