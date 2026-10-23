# DepGraph

Next.js frontend for [Dependency-Track](https://dependencytrack.org) by Open Elements.

## Getting started

```bash
nvm use && corepack enable
pnpm install
cp .env.example .env.local   # set DT_API_KEY
pnpm dev
```

| Variable | Description |
| --- | --- |
| `DT_API_URL` | Dependency-Track API server |
| `DT_API_KEY` | API key with `VIEW_PORTFOLIO`, `VIEW_VULNERABILITY` and `VIEW_POLICY_VIOLATION` (server-side only) |

## Docker

```bash
docker build -t depgraph .
docker run -p 3000:3000 -e DT_API_URL=... -e DT_API_KEY=... depgraph
```

## Scripts

`pnpm lint` · `pnpm typecheck` · `pnpm build` (also run in CI on every push and pull request)

## License

[Apache License 2.0](LICENSE). See [NOTICE](NOTICE) for bundled fonts and trademarks.

## Structure

```
src/app         Routes
src/components  UI components, grouped by page
src/lib/dt      Dependency-Track API client
src/lib/data    Data access layer
src/lib/query   URL query parsing
src/messages    UI strings
```
