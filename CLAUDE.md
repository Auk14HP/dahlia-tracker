# DahliaV2

## Architecture

`docs/architecture.md` shows how the pieces fit together (phone app, web app, API, database, outside services). A change that adds, removes, or moves a piece, or changes how two pieces talk, updates that diagram and its table in the same PR.

## Branches

`main` changes only through a pull request. Start each ticket on a branch named `issue-<number>-<slug>` before the first commit; the pre-commit hook refuses commits on `main`.

## Checks

`npm run check` must pass to commit (pre-commit hook). Its tests need Postgres: start it with `npm run db:up` (README.md). CI also runs `npm run e2e`, the Playwright browser tests the hook skips; run it before pushing a web change.

After changing the GraphQL schema (`packages/api/src/typeDefs.ts`) or a phone app operation (`apps/mobile/src/**/*.graphql`), run `npm run codegen` and commit what it writes; `check` fails while the generated files are stale.

Commits made after the branch's last `code-review` (a fix the user asks for, a follow-up) get their own `code-review` before they are pushed, and each of its findings is fixed or named in the PR body.

## Agent skills

### Issue tracker

Issues are tracked in GitHub Issues on `Auk14HP/dahlia-tracker`, via the `gh` CLI. See `docs/agents/issue-tracker.md`.

### Triage labels

Uses the five default triage labels: `needs-triage`, `needs-info`, `ready-for-agent`, `ready-for-human`, `wontfix`. See `docs/agents/triage-labels.md`.

### Domain docs

Single-context: one `GLOSSARY.md` and `docs/adr/` at the repo root. See `docs/agents/domain.md`.
