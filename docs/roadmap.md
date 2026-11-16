# Roadmap

Milestones in build order. Each one gets its own `/to-spec` run when its turn comes, so this file holds what has already been decided about each. Terms are defined in `GLOSSARY.md`, and architectural decisions are in `docs/adr/`. Check a milestone off once its tickets are done.

## Already decided across all milestones

- Clean rewrite of `~/Code/Dahlia` (V1). It keeps V1's domain lessons, not its code.
- Agent-written code, following the workflow from `~/Code/CribbageTournament`: GitHub issues, `issue-<n>-<slug>` branches, PRs only, a pre-commit `check`, code review, and retros. Copy its repo settings, ESLint, Prettier, `CODING_STANDARDS.md`, husky hook, and CI as closely as the stack allows.
- Stack: TypeScript end to end (ADR-0001). npm workspaces monorepo (`apps/mobile`, `apps/web`, `packages/api`, `packages/db`), no Turborepo until builds get slow. Prisma ORM on Neon Postgres. GraphQL Yoga mounted in Next.js on Vercel (ADR-0003). Photos in Cloudflare R2. GraphQL Code Generator types both clients. Vitest, plus Playwright for the web.
- Web: Next.js with Apollo Client. Mobile: Expo / React Native with Redux Toolkit and RTK Query. The Redux story is the offline write queue, so writes are structured as commands from the start, even though offline mode is a stretch goal.
- One Grower per deployment, and other growers self-host (ADR-0002).
- Sign-in: an email magic link via Auth.js and Resend. The Grower is the email set in an environment variable. Sessions are rolling, 90 days. The mobile app keeps its token in the iPhone keychain. Links go only to invited or Grower emails, the "check your inbox" response is the same whether or not the email is invited, and the form is rate-limited per email and per IP.
- iPhone: develop in Expo Go (free, needs the Mac dev server on home Wi-Fi). Decide on the $99/yr Apple account and TestFlight after March 2027.
- Hosting stays $0/month as long as possible.
- Varieties are never deleted. They become **Gone**.

## M1: Spring Count on the phone (by ~1 March 2027)

- Repo setup in the Cribbage style, deployed to Vercel and Neon from the start.
- Catalog import from `data/import/varieties.csv` (gitignored, the spring 2026 sheet, 93 rows):
  - Each row becomes a Variety.
  - `YY-NN` names become Seedlings from that year.
  - `?-2026` and `?-2024` become Seedlings with lost labels and no Seed Parent.
  - `131`, `801`, `804`, `S2`, and `S30` get Source "another grower" and will be renamed later.
  - Counts are not imported (they were the 2026 Free Pile).
- The Grower can add or edit a Variety: rename it (former names stay searchable), and set an optional Seed Parent and Pollen Parent to backfill from the stickers. Names are unique; a clash gets a letter suffix (`?-2026b`).
- Spring Count for Season 2027 on the phone:
  - The checklist is the whole catalog this first year. In later years it is last Season's plantings that weren't marked "didn't come up".
  - Search plus the checklist ("62 of 93 counted").
  - Typed budded, non-budded, and rotten counts (V1's typed-input decision: no steppers).
  - Quick-add a Variety missing from the catalog, during the count.
  - **Finish Spring Count** lists the uncounted Varieties and confirms they will be marked Gone. A late count still works afterwards and brings a Variety back.
- Ledger entries after the Spring Count: rotted in storage, and a correction with a required note.
- Export everything to CSV (data safety before real data goes in).

## M2: Sharing and planting (by ~April 2027)

- **Plan the Season** (desktop):
  - Every Variety with its counts and a Keep Count field, plus a running total of what Friends will see.
  - The Keep Count takes budded tubers first.
  - Suggestions favor a high Favorites Ranking and ≥2 budded tubers. Both count, and the exact weighting is decided at spec time. The ranking itself arrives in M3, so until then suggestions use budded counts alone.
- **Storefront**:
  - Anyone can browse, even while it's closed. The Grower opens and closes it by hand, between the Spring Count and planting.
  - It shows Available split into budded and non-budded.
  - An optional price can be displayed, with no in-app payments.
- **Friends**:
  - The Grower invites them by name and email.
  - Someone who isn't invited sees "Ask the Grower for an invite" when trying to reserve.
  - Friends don't see each other's Reservations.
- **Reservations**:
  - Instant, and they reduce Available right away.
  - There can be an optional per-Variety cap per Friend, set when the Storefront opens.
  - The Grower can cancel one, with an optional note.
  - Fulfilling records the actual count handed over and how many were budded (budded first). Any shortfall is either **rotted** (leaves inventory) or **back to Available**.
- **Free Pile**: a give-away to no one in particular.
- **Planting log**:
  - Variety, count, and Bed (Backbed 1–3) or the Fenceline. No positions until M5.
  - A planting can be marked "didn't come up". A Variety whose plantings all didn't come up stays off next spring's checklist.

## M3: Photos, Season Notes, Favorites Ranking

- Photos are taken in the phone app or uploaded on desktop, and attached to a Variety and a Season. Several are allowed, with one Cover Photo.
- The Storefront shows each Variety's most recent Cover Photo. The Variety page shows Cover Photos side by side across Seasons.
- Season Notes per Variety per Season. The general Variety notes stay as they are.
- **Favorites Ranking**:
  - One ongoing ranking, built from pairwise "which do you like more?" choices using Cover Photos, on both phone and desktop.
  - It is built Quicksort-style, using transitivity to minimise comparisons. A new Variety is inserted with a binary search.
  - Seedlings join after their first bloom, and any Variety can be re-rated.

## M4: Lineage and stats (desktop)

- A family tree from Seed and Pollen Parents. Gone Seedlings appear in it ("Asagi Choi: 9 Seedlings, 2 kept").
- Stats: overwintering survival per Variety across Seasons, sprout rate from "didn't come up", and others the data supports.

## M5: Bed planner (desktop)

- Beds and the Fenceline are rectangles with dimensions. Odd shapes come later.
- Drag Varieties onto them as spots, with a minimum-spacing check (default 18", adjustable).
- A plan belongs to a Season. "Planted as planned" records all of its plantings at once, which becomes the planting history.
- The total spots become a planting budget in Plan the Season.

## Stretch (unscheduled)

- Voice counting during the Spring Count: on-device speech recognition plus our own parser, so it's free. An LLM parser is optional. This is first in line after M1.
- Seasonal reminders by email (start seeds, dig after first frost, mid-winter rot check, Spring Count). Push notifications if the Apple account happens.
- Offline mode on the phone (the Redux command queue).
- Fall Count, which the next Spring Count is checked against.
- Passkey sign-in (Face ID / Touch ID).
- Odd-shaped beds.
- A one-click "deploy your own" for other growers.
