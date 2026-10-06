# The Office / Paperwork

A pixel-art office simulation driven by a four-column Kanban board. Michael, Dwight, Jim, Pam, and Kelly work, meet, take breaks, and celebrate as their assigned tasks change.

## Run locally

Requires Node.js 22.12 or newer.

```sh
npm ci
npm run dev
```

Open the local URL printed by Vite. Use `npm run build` to create `dist/`, then `npm run preview` to inspect the production build. Serve this app over HTTP; do not open `index.html` directly as a file.

## Use the app

- Create tasks with **New Task** or a column's **+** button.
- Click a card to edit its title, notes, priority, assignee, or column.
- Use **Start work**, **Complete**, or **Reopen** on a card for a one-tap status change. **Move to…** sends it directly to any other column, with **Undo** available after a move.
- Drag cards between columns on desktop, or use the same direct controls.
- Hover a colleague, tap their character, or select their roster entry to inspect tasks.
- Collapse the board or pause the simulation using the header and scene controls.
- On phones, switch between **Office** and **Tasks** using the bottom navigation. Select a column above the full-width task cards.
- Use **Zoom** to explore the office by scrolling, then **Fit office** to see the complete floor plan. Tap any of the five colleagues below the scene to inspect their work.
- The mobile editor opens as a bottom sheet; saving a task takes you to its column.

Tasks save to IndexedDB in the current browser. Six example tasks appear only when no saved board exists. The original `scranton-paperwork` database and `tasks` key are retained, so existing tasks survive when served from the same origin. A different domain or port has separate browser storage. There is no account, server, or cross-device synchronization.

## Project structure

| Location               | Responsibility                                                         |
| ---------------------- | ---------------------------------------------------------------------- |
| `index.html`           | Semantic page shell and task dialog                                    |
| `src/main.js`          | App startup and wiring                                                 |
| `src/config.js`        | Columns and priority colours                                           |
| `src/state.js`         | Task state, initial examples, character definitions                    |
| `src/storage.js`       | IndexedDB loading and serialized saves                                 |
| `src/tasks.js`         | Notify the UI and characters of task changes                           |
| `src/ui/`              | Board, task editor, inspector, DOM helpers                             |
| `src/office/`          | Scene artwork, character rendering, routing, behaviour, animation loop |
| `src/styles.css`       | Theme and responsive layouts                                           |
| `tests/`               | Routing and character behaviour regression tests                       |
| `docs/architecture.md` | Data flow and extension notes                                          |

## Development checks

```sh
npm test
npm run build
npm run format:check
```

Run `npm run format` after editing. GitHub Actions runs these checks on pushes and pull requests. Production assets are generated from source and are not committed.

## Hosting

For GitHub Pages, open repository **Settings → Pages** and set **Source** to **GitHub Actions**. Then open **Actions → Deploy to GitHub Pages → Run workflow** and select `main`. Subsequent pushes to `main` build, test, and deploy automatically.

The expected address is https://dalecri.github.io/Office-Kanban-Board/ (unless a custom domain is configured). The workflow publishes only `dist/`, not the source tree. Tasks remain browser-local; saved tasks from the ChatGPT Site do not automatically transfer to the GitHub Pages origin.

For another static host, upload the contents of `dist/`. Vite uses relative asset URLs to support subdirectory hosting. No environment variables or backend are required. This repository does not automatically publish to the separate ChatGPT Site.

This is an unofficial fan project inspired by The Office; it is not affiliated with the show or its owners.
