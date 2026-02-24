# Initial Setup

1. Clone the repo
2. In the root directory, run:

`make install`

## Optional: Makefile has support to build an .envrc that activates the venv upon entering the dir if you have direnv installed.

`make .envrc`

# Standing up the app:

`npm run dev`
starts the frontend server.

connect to the dev database in a shell:
`docker compose exec database psql -U postgres -d budget_app`
