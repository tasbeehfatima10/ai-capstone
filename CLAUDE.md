# AI Capstone — Project Guidelines

## Project Stack

- **Node.js** — application runtime and package management
- **Git** — local version control
- **GitHub** — remote repository and collaboration

## Coding Conventions

- Write clean, readable, and maintainable code.
- Add comments where logic is non-obvious or business rules need explanation; avoid stating the obvious.
- Follow existing patterns and naming in the codebase before introducing new ones.
- Keep changes focused and minimal for the task at hand.

## Commit Messages

Use [Conventional Commits](https://www.conventionalcommits.org/):

- `feat:` — new feature
- `fix:` — bug fix
- `docs:` — documentation only
- `chore:` — maintenance, tooling, or config
- `refactor:` — code change that neither fixes a bug nor adds a feature

Example: `feat: add user authentication endpoint`

## Development Conventions

- **Branch per change** — Create a dedicated branch for each feature, fix, or docs update (e.g. `feat/add-login`, `fix/handle-empty-input`). Open a pull request on GitHub to merge into `main`; avoid committing directly to `main` for non-trivial work.
- **Environment configuration** — Store secrets and environment-specific values in `.env` (never commit this file). When adding a new variable, document its name and purpose in the README so others can configure the project locally.

## General Principles

- Prefer clarity over cleverness.
- Test meaningful behavior when tests are in scope.
- Do not commit secrets (e.g. `.env` files or API keys).
