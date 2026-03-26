# Contributing to DevRev Guide

Thank you for your interest in contributing!

## Getting Started

1. Fork the repository and clone it locally.
2. Install dependencies: `npm install`
3. Run the dev server: `npm run dev`
4. Open [http://localhost:3000](http://localhost:3000) to verify your changes.

## How to Contribute

- **Bug fixes / typos:** Open a PR directly with a clear description.
- **New content or features:** Open an issue first to discuss the approach before starting work.
- **Session content:** Edit Markdown files under `docs/en/` or `docs/ja/`. Each file requires frontmatter with `title`, `level`, and `duration`.

## Pull Request Guidelines

- Keep PRs focused — one concern per PR.
- Write a clear PR description explaining what changed and why.
- Ensure `npm run build` passes before submitting.
- For content changes, verify the page renders correctly in the dev server.

## i18n Rules

This project supports English (`docs/en/`) and Japanese (`docs/ja/`).

- Every session file must exist in **both** `docs/en/` and `docs/ja/`.
- File names must match across languages (e.g., `s01.md` in both directories).
- Do not add new languages without opening an issue first.
- README is bilingual: `README.md` (English primary), `README.ja.md` (Japanese). Keep both in sync when updating project-level information.
- `CONTRIBUTING.md` is English only.

## Code Style

- TypeScript: follow the existing patterns in `src/`.
- Tailwind CSS: use utility classes; avoid custom CSS unless necessary.
- No new dependencies without discussion in an issue.

## Questions

Open a GitHub Issue for questions or suggestions.
