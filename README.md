# music-tools
Several tools in a single web app to help aid music teaching and studying

## Development

```bash
npm install
npm run dev     # http://localhost:3000
npm test        # Jest, lib/ only
npm run lint
npm run typecheck
npm run check   # all three: run before pushing
```

`npm run check` must pass before you push. A pre-push hook, enabled by `npm install`, runs it for you, and CI runs the same checks on every push.
