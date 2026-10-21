# Multe

Keep track of your collections, from wishlist to owned. Live at [multe.app](https://multe.app).

> [!NOTE]
> Under construction. The frontend is being rebuilt from scratch, and for now it only shows a placeholder page.

## What it does

- **Collections** for the things you own, like discs, hiking gear or books, each with an emoji.
- **Custom fields** per collection, shared by every item in it, on top of price, location and date bought.
- **Wishlist** for items you want. A wished item shows in its collection and on a global wishlist, and becomes owned when you buy it.
- **Totals** per collection, with owned and wishlisted items counted separately.

## Stack

- React 19 with the React Compiler
- TypeScript
- Tailwind CSS v4
- shadcn/ui on Base UI
- [Vite+](https://viteplus.dev) and pnpm

The API lives in `multe_backend` (Go and Postgres) and is served from `api.multe.app`. Authentication is handled by [TideAuth](https://github.com/threetides/tideauth).

## Getting started

```sh
vp install
vp dev
```

## Commands

| Command      | Description                  |
| ------------ | ---------------------------- |
| `vp dev`     | Start the dev server         |
| `vp build`   | Build for production         |
| `vp preview` | Preview the production build |
| `vp lint`    | Lint the project             |

## Part of Threetides

Multe is one of the projects from [Threetides](https://threetides.dev), an independent studio in Norway. Its name is Norwegian for cloudberry: a collection of many small parts.
