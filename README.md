# Lendsqr (React + TypeScript + Vite)

Frontend assessment app: **Login**, **Dashboard**, **Users** (500 records), and **User Details** pages. Mock API via **mocky.io** or **json-generator.com**; User Details cached in **IndexedDB**. Mobile responsive.

## What’s in the repo

- **Pages:** Login (auth layout), Dashboard (stat cards), Users (table, filters, pagination), User Details (summary, tabs, sections).
- **Stack:** React 19, TypeScript, Vite 7, React Router, SCSS modules, Vitest + Testing Library.
- **Data:** Mock users (500); optional `VITE_MOCKY_USERS_URL` for mocky.io; User Details read/write via IndexedDB.
- **Structure:** Feature-style: each main page has `components/`, `constants/`, `hooks/`; shared UI in `src/components/`, shared constants in `src/constants/`.

## Quick start

```bash
npm install
npm run dev
```

Open the URL shown (e.g. `http://localhost:5173`). Default route redirects to `/login`; after login you can use `/users`, `/users/:id`, `/dashboard`.

## Scripts

| Command | Description |
|--------|-------------|
| `npm run dev` | Start dev server |
| `npm run build` | Production build |
| `npm run preview` | Preview production build |
| `npm run lint` | Run ESLint |
| `npm test` | Run unit tests (Vitest) |
| `npm run generate-mock-users` | Generate 500-user JSON for mocky.io → `public/mock-users.json` |

## Mock API (mocky.io / json-generator.com)

- **Setup:** [MOCK_API.md](./MOCK_API.md) — how to use mocky.io or json-generator.com.
- **Generate payload:** `npm run generate-mock-users` → paste result into mocky.io, then set in `.env`:
  ```env
  VITE_MOCKY_USERS_URL=https://run.mocky.io/v3/your-id
  ```
- Without this env var, the app uses in-code fallback (500 users).

## Testing

- **Run tests:** `npm test` or `npx vitest run`
- **Coverage:** API (api.ts), storage (userDetailsStorage), AuthContext, Login (positive + negative), format utils (formatNGN, formatDateJoined, slugToTitle), UserDetails (formatNGN).
- **Assessment checklist:** [ASSESSMENT_CHECKLIST.md](./ASSESSMENT_CHECKLIST.md) — maps assessment criteria to what’s implemented and what to verify.

## Architecture (high level)

```
src/
├── app/           # Router, protected route
├── components/    # Shared UI (PageState, Pagination, StatCard, UsersTable, FilterDrawer, Header, Sidebar, …)
├── constants/    # PAGE_SIZES, STAT_CARDS
├── layouts/      # AppLayout, AuthLayout
├── pages/
│   ├── Login/
│   ├── Dashboard/
│   ├── Users/         # components/, constants/, hooks/, Users.tsx
│   └── UserDetails/   # components/, constants/, hooks/, UserDetails.tsx
├── services/     # api/, storage/ (IndexedDB)
├── styles/       # Variables, mixins, global
├── types/        # User, FilterState, …
└── utils/        # format (NGN, date, slugToTitle)
```


---

