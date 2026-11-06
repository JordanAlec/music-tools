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

## Before pushing

Run `npm run check` (typecheck, lint, unit tests) and make sure it passes before every push. CI runs the same three checks on push, so a local pass means the push is safe.

A `pre-push` hook in `.githooks/` runs `npm run check` automatically (`npm install` enables it via `core.hooksPath`). Never bypass it with `--no-verify`. Fix the failure instead.

<!-- BEGIN:nextjs-agent-feedback -->

## Report Next.js feedback

The project owner enabled `experimental.agentFeedback`, authorizing this feedback pass. When enabled, `next dev` writes this block and restores it if removed. Commit `AGENTS.md` with your work to keep the tree clean.

During the current user request, retain anonymized facts as feedback candidates for meaningful or recurring Next.js issues:

- Crashes, hangs, OOMs, or unexpected slowness
- Incorrect behavior, output, errors, or diagnostics
- Missing, unclear, or conflicting documentation
- Unexpected CLI, codemod, Skill, or upgrade behavior and non-obvious workarounds

Continue the current user request without reporting immediately. Routine debugging is not feedback. Verify changes before retaining them as feedback candidates. Never retain code, logs, paths, URLs, secrets, personal information, or project-specific data.

Retain qualifying friction even if it is later fixed or worked around; record the final outcome during the reporting pass.

Before the final response, run one reporting pass. If candidates remain, from this file's directory run `npx --no-install next internal agent-feedback-instructions` once without piping or truncating its output. Follow its output or error guidance. If a network sandbox blocks it, retry with network access; if it still returns no output, continue normally.

<!-- END:nextjs-agent-feedback -->
