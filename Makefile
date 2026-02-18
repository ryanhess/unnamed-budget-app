.PHONY: run install db-start db-stop db-stop-delete

run: db-start
	@cd frontend && npm run dev -- -p 3000 & cd backend/src && uv run uvicorn main:app --reload --port 8000

stop:
	@lsof -ti :3000 | xargs kill -9 2>/dev/null || true           
	@lsof -ti :8000 | xargs kill -9 2>/dev/null || true
	@make db-stop
	@echo "database container stopped"

install:
	@cd frontend && npm install
	@cd backend && uv sync

stop-delete: stop db-stop-delete
	@echo "Servers stopped, database container stopped, volume erased."


.envrc:
	@echo 'source backend/.venv/bin/activate' > .envrc
	@direnv allow

db-start: 
	@docker compose up database -d

db-stop:
	@docker compose down database

db-stop-delete: db-stop
	@docker volume rm unnamed-budget-app_pgdata