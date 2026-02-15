# Initial Setup

1. Clone the repo
2. In the root directory, run:

`make install`

## Optional: use the makefile to build an .envrc file if you use the direnv utility

`make .envrc`

I have added:

- automatic venv activation when entering the root directory.
  `source backend/.venv/bin/activate`
  This does not prepend (venv) to the terminal prompt.

There is also the process of getting VSCode to auto activate the venv. I won't go into it here, but basically VSCode expects the .vscode directory with the settings file for the project, to be in the same directory as the venv.

That makes the venv activate upon opening the root project dir in VSCode.

Do one or the other, they kind of conflict with each other.

# Standing up the app:

`npm run dev`
starts the frontend server.

Note: if having troubles getting css classes to apply to elements, try deleting the .next cache and restarting Dev server:
`rm -rf .next`
`npm run dev`
