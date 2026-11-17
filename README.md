# Dahlia Tracker

[![CI](https://github.com/Auk14HP/dahlia-tracker/actions/workflows/ci.yml/badge.svg)](https://github.com/Auk14HP/dahlia-tracker/actions/workflows/ci.yml)

An app for one home grower's dahlia garden: the Varieties they keep, the yearly Spring Count of tubers on the phone, and, later, sharing surplus tubers with Friends. Domain words are defined in [GLOSSARY.md](GLOSSARY.md), and [docs/architecture.md](docs/architecture.md) shows how the pieces fit together.

## The repo

An npm workspaces monorepo:

| Folder         | What it is                                                                                   |
| -------------- | -------------------------------------------------------------------------------------------- |
| `apps/mobile`  | The phone app (Expo / React Native, Redux Toolkit and RTK Query), run in Expo Go.            |
| `apps/web`     | The Next.js web app. It serves the API at `/api/graphql`.                                    |
| `packages/api` | The GraphQL API (GraphQL Yoga): the domain rules, as one request handler the web app mounts. |
| `packages/db`  | The Prisma schema, migrations and client for the Postgres database.                          |

## Setting up

You'll need Node 24 and Docker Desktop. Docker runs the Postgres database in a container, so nothing database-related is installed on your Mac itself.

1. Install [Docker Desktop](https://www.docker.com/products/docker-desktop/) and open it once. It needs to be running (the whale icon in the menu bar) whenever you work on the app.
2. Install the packages: `npm install`
3. Copy the settings file: `cp .env.example .env`
4. Start the database: `npm run db:up`. It starts Postgres in Docker and waits until it's ready. The data survives restarts; `npm run db:down` stops it.

Everything finds the database through `DATABASE_URL` in `.env`, so any Postgres 17 works in place of Docker's.

## Running it

1. Start the web app and API: `npm run dev`. It serves `http://localhost:3000` and listens on your home network too.
2. In another terminal, start the phone app: `npm run mobile`.
3. On the iPhone, on the same Wi-Fi as the Mac, install Expo Go from the App Store and scan the QR code the second command prints with the Camera app.

The phone app talks to the API on the Mac that served it. To point it at another API, such as the deployed one, set `EXPO_PUBLIC_API_URL` in `apps/mobile/.env` (for example `EXPO_PUBLIC_API_URL=https://dahlia.example.com`).

### When the phone can't reach the Mac

If Expo Go says "The request timed out", and Safari on the iPhone can't open `http://<the Mac's address>:3000` either, the phone can't reach the Mac over the home network. A content filter or VPN on the phone, or a router that keeps devices apart, does this. Serve both the app and the API through public tunnels instead:

1. Install Cloudflare's tunnel tool once: `brew install cloudflared`
2. Start the web app and API as usual: `npm run dev`
3. In another terminal, instead of `npm run mobile`: `npm run mobile:tunnel`. It opens a Cloudflare tunnel to the API, builds the app pointing at it, and serves the app through an ngrok tunnel. Neither needs an account.
4. Scan the QR code it prints. Ctrl+C stops both tunnels.

Each run gets new tunnel addresses, so the first load takes a little longer while the app rebuilds.

## Checks

- `npm run check` runs everything the pre-commit hook does: GraphQL codegen freshness, type-check, lint, formatting, and both test seams. The tests need the database running (`npm run db:up`).
- `npm run e2e` runs the Playwright browser tests, which CI also runs.
- `npm run codegen` regenerates the GraphQL types after the schema (`packages/api/src/typeDefs.ts`) or a phone app operation (`apps/mobile/src/**/*.graphql`) changes.

How code is written and tested here is in [CODING_STANDARDS.md](CODING_STANDARDS.md).
