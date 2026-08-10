# multe_frontend

The frontend of multe, the threetides studio's app for personal collections,
deployed at [multe.app](https://multe.app).

multe lets you build collections of the things you own — discs, hiking gear,
gym equipment, books. Custom fields are defined per collection, so every item
in it shares the same fields (speed/glide/turn/fade for discs, weight and
category for hiking gear) on top of standard ones like price, location, and
date bought. Each collection tracks totals such as its number of items and
total price — kept visibly distinct for owned and wishlisted items. Items in
any collection can be wishlisted: a wishlisted item shows that state in its
collection and appears on a global wishlist across all collections, and when
bought it transitions to owned in place — filling in price and date bought at
that moment — rather than being re-added. The core of the app is item
management and wishlists; further out, wishlists may become shareable with
others (for birthdays and christmases) and the web app may be joined by a
native one.

## Development

multe_frontend uses [Bun](https://bun.sh) as its package manager. Clone the
repo, install dependencies, and start the dev server:

```sh
bun install
bun run dev      # serves the app at http://localhost:5173
```

The app expects the backend's URL in `.env` as `VITE_BACKEND_URL`.

Other scripts:

```sh
bun run build    # format, lint, type-check, and build into dist/
bun run preview  # preview the production build locally
bun run check    # format + lint + type-check
```

## Project structure

```
src/
├── components/   UI components built on Base UI primitives
├── routes/       file-based routes (TanStack Router), split into
│                 _authenticated and _unauthenticated groups
├── shared/       app-wide state (jotai atoms) and types
├── styles/       reset, design tokens, and global styles
└── assets/       fonts and svgs
```

## License

See [LICENSE](LICENSE).
