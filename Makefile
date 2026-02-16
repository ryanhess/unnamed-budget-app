.PHONY: run

run:
	cd frontend && npm run dev & cd backend/src && uv run uvicorn main:app --reload

install:
	cd frontend && npm install
	cd backend && uv sync

.envrc:
	echo 'source backend/.venv/bin/activate' > .envrc
	direnv allow