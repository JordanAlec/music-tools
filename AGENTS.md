<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

## Project conventions

- File names are kebab-case (`circle-wheel.tsx`, `key-signature.ts`). Exports keep their normal casing.
- `lib/` holds framework-free logic, such as music theory. `app/lib/` holds Next-specific helpers, such as metadata.
- `app/components/` holds generic UI. Feature-specific UI goes in `app/components/<feature>/`.
- Import root `lib/` as `@/lib/...`. Use relative paths inside `app/`.
- Note names use `♯` and `♭`, never `#` or `b`.
- Tests: Jest via `next/jest`, Node environment, for `lib/` only. Test files sit next to the code as `*.test.ts`. There are no component tests.
- A new tool needs an entry in `tools` in `lib/site.ts`, which drives the home page tiles.
