# DahliaV2

## Architecture

`docs/architecture.md` shows how the pieces fit together (phone app, web app, API, database, outside services). A change that adds, removes, or moves a piece, or changes how two pieces talk, updates that diagram and its table in the same PR.

## Agent skills

### Issue tracker

Issues are tracked in GitHub Issues on `Auk14HP/dahlia-tracker`, via the `gh` CLI. See `docs/agents/issue-tracker.md`.

### Triage labels

Uses the five default triage labels: `needs-triage`, `needs-info`, `ready-for-agent`, `ready-for-human`, `wontfix`. See `docs/agents/triage-labels.md`.

### Domain docs

Single-context: one `GLOSSARY.md` and `docs/adr/` at the repo root. See `docs/agents/domain.md`.
