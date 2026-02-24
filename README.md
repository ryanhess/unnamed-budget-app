# Initial Setup

## Prerequisites:

1. Docker desktop (or other option to get docker going)
2. uv for python (actually having python is unecessary-uv will install it.)
3. npm/npx for next app
4. Clone the repo
5. In the root directory for the project, run:

`make install`

- This sets up all frontend and backend deps, sets up the backend venv as well

6. Setup automatic venv activation for backend (optional)

- Makefile has support to build an .envrc that activates the venv upon entering the dir if you have direnv installed.

`make .envrc`

# Standing up the app:

Run:
`make clean`

- This runs any migrations, starts the db container, and starts the front and backend servers.

connect to the dev database in a shell if necessary:
`make db-sh`
