# Coding standards

Judgement calls for review. Anything mechanical is enforced by `npm run check` (ESLint, Prettier, TypeScript, GraphQL codegen) instead of written here. Architecture decisions live in `docs/adr/`; domain words in `GLOSSARY.md`. Adapted from CribbageTournament's: the Naming, Readability, Comments and Tests rules are the same, with this project's examples.

## Naming

- Give every function a verb-first name (`createRequestHandler`, `findApiUrl`), including helpers and test helpers, so it is never mistaken for a value. A predicate starts with `is` or `has`. ESLint has no rule that can check this.
- Name every value for what it holds, in code and tests alike: an element for what it finds (`buddedField`), not the screen that element suggests. One of several, taken by its place, carries its place and what it is: `firstVariety`, `firstEntry`, never `first` alone.
- Say which one a name means wherever two could be confused. A number of things ends in `Count` (`varietyCount`); a plural (`varieties`) is the things themselves. Two Varieties side by side are `varietyA` and `varietyB`, never `a` and `b`. A field qualifies a generic word with its subject: `seedParentName` beside a Variety's `name`. A single letter is for a one-line callback's parameter alone (`varieties.find((v) => …)`).
- Name a type or state for what it holds, not for an activity: `CountAwaitingConfirmation`, not `Confirming`.
- Name a test helper for the role it finds, not for the test data that fills it: `findSeedlingRow`, not `findCafeAuLait`.
- Give a step whose job isn't obvious at a glance a named helper.
- React components and hooks keep React's conventions: a component is a PascalCase noun (`ViewerScreen`), a hook starts with `use`.
- GraphQL types and fields use the domain's words from `GLOSSARY.md` (`Variety`, `springCount`), never their _Avoid_ list.

## Readability

- Don't nest a call two or more levels deep inside another call's arguments: name the inner result first, so each line does one thing and the name says what it is. One level is fine: `expect(screen.getByRole('heading')).toHaveTextContent('Spring Count')`. A callback's body starts afresh. ESLint catches a call nested in arguments two deep; a call made on a call's result, like `within(...).getByRole(...)`, is left to review.
- Name a number or boolean literal at the call when the function's name doesn't say what it is. A function in this repo takes it in an options object: `recordSpringCount({ budded: 8, nonBudded: 2 })`, not `recordSpringCount(8, 2)`. A call into code we don't own, or a value used more than once, names it in a const first. String literals read as words and are exempt. This is left to review: no lint rule catches it.

## Comments

- A comment is plain explanation for a reader new to the code: first what the code does, then why, in whole sentences and the Grower's terms. Spell out shorthand coined while writing.
- Speak from the vantage of the code the comment sits on, describing only what it does and knows. A pure function's comment says what it returns.
- Describe each GraphQL type and field in the schema with a description string: codegen copies it onto the generated types, so both apps see it.

## Components

- Define a helper at module level when it reads no props, state or hooks, passing in what it needs. Only what reads the component's own state lives inside it.
- Every API call goes through RTK Query, through a hook generated from a `.graphql` file beside the screen that uses it. Screens never call `fetch` themselves.

## Wording

- A dialog asks one question about one subject, and its buttons answer it: "Mark 31 Varieties Gone?" with Finish and Keep counting, not a question that also explains what follows for someone else.

## Phone screens

- The Grower counts with cold, wet hands: tap targets are large and count fields open the numeric keypad.
- Style with `StyleSheet.create` beside the component that uses it.
- Show a refusal beside the controls that caused it, where the Grower is already looking.

## The API

- A command the domain can refuse (a name already taken, a count below zero) returns the refusal as a typed GraphQL result with a sentence the Grower reads on screen, in `GLOSSARY.md` terms. A transport error is for what the Grower can't fix, such as the database being unreachable.
- The API package holds the domain rules; the web app reaches the database only through its request handler (ADR-0003).

## Tests

- Test at the two seams, never against internals (Prisma calls, Redux state, private functions):
    - **API tests** (Vitest, `packages/api`) send real GraphQL to the request handler in-process, as the Grower or anonymously, against a throwaway Postgres database (`startTestApi`). They drive commands and assert on what queries then return.
    - **Screen tests** (Jest with React Native Testing Library, `apps/mobile`) render the app with the real store, its fetch answered by that same in-process handler, and drive it through what the Grower sees and can do.
- Describe scenarios in the Grower's terms, using `GLOSSARY.md` words.
- Find an element by [Testing Library's query priority](https://testing-library.com/docs/queries/about#priority), as a person finds it: role, label, placeholder, text or display value first. A test ID comes last, for an element nothing on screen names.
- Set-up that two tests in a file share becomes a module-level test helper (`showApp`), so each test shows only what it is about. Once a helper exists, call it wherever its steps appear.
- A test helper's name and comment claim only what it asserts, on the screens that call it.
- A test written after its code earns its place by failing once the behaviour is broken: break it, watch the test go red, restore.
- Tests fail on any console error or warning (`failOnConsoleOutput.ts` in each test setup).
