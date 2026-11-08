# music-tools
A collection of tools in a single web app to support music teaching and study.

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

## Contributing

Contributions are welcome. Please open a pull request from a feature branch into `main`.

Every commit to `main`, including merges, deploys to Vercel and goes live at [music-tools.jordanalec.co.uk](https://music-tools.jordanalec.co.uk/).

AI-generated code is welcome, but it will need review and approval before it is merged.

## A note on AI

This project is almost entirely written by AI. I know that may not sit well with everyone, particularly in a project about music.

My view, and this project's position, is that AI is a perfectly acceptable tool for writing and reviewing code. I work as a software developer, where AI is used extensively, and this project is also a chance for me to learn more about tools like Copilot and Claude.

That view does not extend to creative work. I do not support AI in music, art, or other creative works, and I do not endorse AI music generation apps like Suno.

If you would rather not use or contribute to this project for that reason, I completely understand and respect your decision. It has been built extensively with Claude, and that is unlikely to change.
