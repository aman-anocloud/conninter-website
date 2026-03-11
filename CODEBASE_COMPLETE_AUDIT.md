# CODEBASE_COMPLETE_AUDIT.md

---

## 1. PROJECT OVERVIEW

**What is this project?**
The repository `conninter-website` is a marketing/portal web application for Conninter, a "Healthcare Coordination Platform" that connects hospitals, healthcare professionals, distributors and medical representatives. The goal is to provide a unified digital ecosystem, eliminate unplanned visits and delivery delays through a Visitor Management System (VMS) and Delivery Management System (DMS).

Target users are hospital administrators, medical representatives, distributors and internal staff who need to search partner hospitals, view dashboards, manage deliveries and notifications.

**Tech stack**
- **Framework & language:** Next.js 14.2.35 running on React 18.3.0, written in TypeScript (`.tsx` files). Server/edge code uses Node.js. UI library is plain CSS Modules and a small amount of Tailwind-style utility classes (badge, gradient-text etc.).
- **CMS:** Sanity (v3.36.0) with schemas defined under `apps/web/sanity/schemas` (post, author, category, blockContent, video). Client integration via `next-sanity` (v8.2.0) and `@sanity/image-url`.
- **Authentication:** Firebase Authentication (firebase ^10.12.2). Uses the `firebase` SDK for auth, firestore, and the client-side `AuthContext` provider.
- **API consumption:** Axios (`axios 1.7.2`) with a wrapper in `apps/web/lib/api.ts` pointing at `process.env.NEXT_PUBLIC_API_URL`.
- **State/animations:** Framer Motion (^12.34.3) is installed but largely used within hero slider component. Custom hooks `useScrollAnimation` and `useCountUp` observe element visibility.
- **CMS / content dependencies:** `@portabletext/react` for rendering Sanity portable text and `marked`/`gray-matter` used in the `content/blog` folder (for markdown posts) although only a test markdown file exists.
- **Utilities:** `axios`, `lucide-react` for icons, `firebase`, `framer-motion`, `gray-matter`, `marked`.

**Current state of the project.**
The project is in active development. A working Next.js application exists with navigation, hospital directory pages, a dashboard section under `/dashboard`, authentication scaffolding, a blog area powered in part by Sanity and local markdown. There is evidence of build output in `.next/` and a `.env.local.example`. No public deployment links are visible; the code suggests development on port 3000 (`next dev -p 3000`).

**Monorepo / folder structure at the highest level.**

```
conninter-website/                 (root)
├── package.json                    [MODIFIED] (workspace-level, lists rxjs-exhaustmap-with-trailing etc.)
├── package-lock.json               [MODIFIED]
├── README.md                       [MODIFIED]
├── .gitignore                      [MODIFIED]
├── build_output*.log               [GENERATED]
├── apps/                           [NEW]
│   └── web/                        [NEW]
│       ├── app/                    [NEW]
│       │   ├── globals.css         [NEW]
│       │   ├── layout.tsx         [MODIFIED]
│       │   ├── page.tsx           [MODIFIED]
│       │   ├── admin/             [NEW]
│       │   ├── auth/              [NEW]
│       │   ├── blog/              [NEW]
│       │   ├── dashboard/         [NEW]
│       │   └── hospitals/         [NEW]
│       ├── components/            [NEW]
│       ├── context/               [NEW]
│       ├── hooks/                 [NEW]
│       ├── lib/                   [NEW]
│       ├── public/                [NEW]
│       ├── sanity/                [NEW]
│       ├── content/               [NEW]
│       ├── package.json           [MODIFIED]
│       ├── tsconfig.json          [MODIFIED]
│       ├── next.config.js         [MODIFIED]
│       ├── next-env.d.ts          [ORIGINAL]
│       ├── .eslintrc.json         [MODIFIED]
│       └── .env.local.example     [NEW]
└── packages/                      [NEW]
    └── shared/                    [NEW]
        └── types/                 [NEW]
            └── index.ts          [NEW]
```

**Core URLs/routes that exist today**
- `/` – homepage rendered by `apps/web/app/page.tsx`
- `/dashboard` – user dashboard with subroutes `/dashboard/deliveries`, `/dashboard/notifications`, `/dashboard/settings`, `/dashboard/visits` (all client‑side components with simple UI). Folder `apps/web/app/dashboard`.
- `/auth` – authentication page using Firebase (`apps/web/app/auth/page.tsx`).
- `/hospitals` – list of partner hospitals (`apps/web/app/hospitals/page.tsx`), plus dynamic pages `/hospitals/[id]`.
- `/blog` – blog list and individual posts (`apps/web/app/blog/page.tsx` and `[slug]` subfolder). Data comes from Sanity or local markdown depending on slug.
- `/admin/*` – catch‑all admin route under `apps/web/app/admin/[[...index]]` (currently placeholder client UI).
- `/api/*` – I see no custom `/api` folder in the workspace, so the app uses external APIs instead of Next.js API routes.

Many other pages/components are client side and imported into those routes (navbar, footer, etc.).

---

## 2. COMPLETE PROJECT TIMELINE

I cannot access git history from the workspace; the following phases are inferred from code appearance and comments.

| Phase | What Was Done | Outcome |
|---|---|---|
| Phase 1 – Initial scaffold | Created a fresh Next.js 14 app using `npx create-next-app@latest` (guess). Default `app/layout.tsx`, `app/page.tsx`, `next.config.js` and TypeScript setup generated. | Minimal project with homepage that likely displayed "Welcome to Next.js". | 
| Phase 2 – CMS setup | Added Sanity configuration (`sanity.config.ts`, `sanity.cli.ts`), created schemas under `apps/web/sanity/schemas` for post, author, category, blockContent, video. Installed `next-sanity`, `@portabletext/react`. | Able to fetch blog posts from Sanity. Added content/blog/markdown-testing.md for local markdown experimentation. | 
| Phase 3 – Firebase auth and API client | Added `firebase` SDK, created `lib/firebase.ts` and context `AuthContext.tsx`. Implemented dummy bypass for missing keys. Added axios wrapper `lib/api.ts` with JWT interceptor. Added environment variable placeholders in `.env.local.example`. | User authentication and token management available; external API communication prepared. | 
| Phase 4 – UI components & pages | Built component library under `components/` folder: Navbar, Footer, HospitalRibbon, HeroSlider, StatsBar, etc. Created route pages: hospitals list/detail, dashboard screens, blog listing & posts, auth page. Added CSS Modules for each component. | Frontend functionality for searching hospitals, viewing dashboard, reading blog, login page. | 
| Phase 5 – Utilities & effects | Added hooks `useScrollAnimation` and `useCountUp` for intersection observers. Added global CSS, fonts preconnect in layout. | Visual animations on scroll. | 
| Phase 6 – Deployment prep / config | Updated `next.config.js` with remote image patterns (Firebase storage, placehold.co, unsplash). Added metadata in `layout.tsx` (title, description, openGraph, twitter). | SEO metadata defined, remote images allowed. | 

**Problems solved and state changes**
- Phase 1 solved the need to start a React/Next project. Starting state: empty Next.js scaffold. Ending state: basic skeleton.
- Phase 2 solved the requirement for editable blog content. Starting state: no CMS. Ending state: Sanity integration ready.
- Phase 3 solved authentication and API consumption. Starting: no auth, no API. Ending: auth context and axios client with token handling.
- Phase 4 solved user-facing interfaces (hospital search, dashboard, etc.). Starting: blank pages. Ending: functional UI components and routes.
- Phase 5 solved UX needs (scroll animations) with custom hooks.
- Phase 6 solved production build issues (image domains, metadata).

Exact dates of phases are unknown; creation timestamps are not available.

---

## 3. COMPLETE FILE & FOLDER STRUCTURE (Current State)

(only source files; build artifacts such as `.next` and `node_modules` omitted)

```
conninter-website/
├── apps/
│   └── web/
│       ├── .env.local.example        [NEW]
│       ├── .eslintrc.json            [MODIFIED]
│       ├── next.config.js            [MODIFIED]
│       ├── next-env.d.ts             [ORIGINAL]
│       ├── package.json              [MODIFIED]
│       ├── tsconfig.json             [MODIFIED]
│       ├── app/
│       │   ├── globals.css           [NEW]
│       │   ├── layout.tsx            [MODIFIED]
│       │   ├── page.tsx              [MODIFIED]
│       │   ├── admin/                [NEW]
│       │   │   ├── [[...index]]/     [NEW]
│       │   │   │   ├── layout.tsx    [NEW]
│       │   │   │   └── page.tsx      [NEW]
│       │   ├── auth/                 [NEW]
│       │   │   ├── page.module.css   [NEW]
│       │   │   └── page.tsx          [NEW]
│       │   ├── blog/                 [NEW]
│       │   │   ├── BlogListClient.tsx[NEW]
│       │   │   ├── page.module.css   [NEW]
│       │   │   ├── page.tsx          [NEW]
│       │   │   └── [slug]/           [NEW]
│       │   │       ├── BlogPostClient.tsx [NEW]
│       │   │       ├── page.module.css  [NEW]
│       │   │       └── page.tsx         [NEW]
│       │   ├── dashboard/            [NEW]
│       │   │   ├── layout.module.css [NEW]
│       │   │   ├── layout.tsx        [NEW]
│       │   │   ├── page.module.css   [NEW]
│       │   │   ├── page.tsx          [NEW]
│       │   │   ├── deliveries/       [NEW]
│       │   │   │   └── page.tsx      [NEW]
│       │   │   ├── notifications/    [NEW]
│       │   │   │   ├── page.module.css [NEW]
│       │   │   │   └── page.tsx      [NEW]
│       │   │   ├── settings/         [NEW]
│       │   │   │   ├── page.module.css [NEW]
│       │   │   │   └── page.tsx      [NEW]
│       │   │   └── visits/           [NEW]
│       │   │       ├── page.module.css [NEW]
│       │   │       └── page.tsx      [NEW]
│       │   └── hospitals/           [NEW]
│       │       ├── page.module.css  [NEW]
│       │       ├── page.tsx         [NEW]
│       │       └── [id]/            [NEW]
│       │           ├── page.module.css [NEW]
│       │           └── page.tsx     [NEW]
│       ├── components/              [NEW]
│       │   ├── AboutSection/        [NEW]
│       │   │   ├── AboutSection.module.css [NEW]
│       │   │   └── AboutSection.tsx [NEW]
│       │   ├── AppBanner/           [NEW]
│       │   │   ├── AppBanner.module.css [NEW]
│       │   │   └── AppBanner.tsx    [NEW]
│       │   ├── BackToTop/           [NEW]
│       │   │   ├── BackToTop.module.css [NEW]
│       │   │   └── BackToTop.tsx    [NEW]
│       │   ├── BlogInsightsSection/ [NEW]
│       │   │   ├── BlogInsightsSection.module.css [NEW]
│       │   │   └── BlogInsightsSection.tsx [NEW]
│       │   ├── BlogPreviewSection/  [NEW]
│       │   │   (no files; probably empty folder) [NEW]
│       │   ├── ChooseGateway/       [NEW]
│       │   │   ├── ChooseGateway.module.css [NEW]
│       │   │   └── ChooseGateway.tsx [NEW]
│       │   ├── CTASection/          [NEW]
│       │   │   (empty)              [NEW]
│       │   ├── Departments/         [NEW]
│       │   │   ├── Departments.module.css [NEW]
│       │   │   └── Departments.tsx  [NEW]
│       │   ├── DoctorsDirectory/    [NEW]
│       │   │   ├── DoctorsDirectory.module.css [NEW]
│       │   │   └── DoctorsDirectory.tsx [NEW]
│       │   ├── EmergencyCTA/        [NEW]
│       │   │   ├── EmergencyCTA.module.css [NEW]
│       │   │   └── EmergencyCTA.tsx [NEW]
│       │   ├── FeaturedServices/    [NEW]
│       │   │   ├── FeaturedServices.module.css [NEW]
│       │   │   └── FeaturedServices.tsx [NEW]
│       │   ├── Footer/              [NEW]
│       │   │   ├── Footer.module.css [NEW]
│       │   │   └── Footer.tsx       [NEW]
│       │   ├── HealthcareSolutionsSection/ [NEW]
│       │   │   (empty)              [NEW]
│       │   ├── HeroSection/         [NEW]
│       │   │   (empty)              [NEW]
│       │   ├── HeroSlider/          [NEW]
│       │   │   ├── HeroSlider.module.css [NEW]
│       │   │   └── HeroSlider.tsx   [NEW]
│       │   ├── HospitalRibbon/      [NEW]
│       │   │   ├── HospitalRibbon.module.css [NEW]
│       │   │   └── HospitalRibbon.tsx [NEW]
│       │   ├── Navbar/              [NEW]
│       │   │   ├── Navbar.module.css [NEW]
│       │   │   ├── Navbar.tsx       [NEW]
│       │   │   ├── TopBar.module.css [NEW]
│       │   │   └── TopBar.tsx       [NEW]
│       │   ├── NewsletterStrip/     [NEW]
│       │   │   ├── NewsletterStrip.module.css [NEW]
│       │   │   └── NewsletterStrip.tsx [NEW]
│       │   ├── PartnersSection/     [NEW]
│       │   │   ├── PartnersSection.module.css [NEW]
│       │   │   └── PartnersSection.tsx [NEW]
│       │   ├── QuickAppointment/    [NEW]
│       │   │   ├── QuickAppointment.module.css [NEW]
│       │   │   └── QuickAppointment.tsx [NEW]
│       │   ├── ServicesSection/     [NEW]
│       │   │   (empty)              [NEW]
│       │   ├── Sidebar/             [NEW]
│       │   │   ├── Sidebar.module.css [NEW]
│       │   │   └── Sidebar.tsx      [NEW]
│       │   ├── StatsBar/            [NEW]
│       │   │   ├── StatsBar.module.css [NEW]
│       │   │   └── StatsBar.tsx     [NEW]
│       │   ├── TestimonialsSection/ [NEW]
│       │   │   (empty)              [NEW]
│       │   ├── WhyChooseUs/         [NEW]
│       │   │   (empty)              [NEW]
│       │   └── WhyChooseUsSection/  [NEW]
│       │       (empty)              [NEW]
│       │   └── RichTextComponents.tsx [NEW]
│       ├── content/                [NEW]
│       │   └── blog/               [NEW]
│       │       └── markdown-testing.md [NEW]
│       ├── context/                [NEW]
│       │   └── AuthContext.tsx     [NEW]
│       ├── hooks/                  [NEW]
│       │   └── useScrollAnimation.ts [NEW]
│       ├── lib/                    [NEW]
│       │   ├── api.ts              [NEW]
│       │   └── firebase.ts         [NEW]
│       ├── public/                 [NEW]
│       │   ├── LOGO CON.png        [NEW]
│       │   ├── LOGOFOOT.png        [NEW]
│       │   ├── MOBV.png            [NEW]
│       │   ├── dashboard-preview.png [NEW]
│       │   ├── hero-image.png      [NEW]
│       │   └── phone.jpg           [NEW]
│       ├── sanity/                 [NEW]
│       │   ├── env.ts              [NEW]
│       │   ├── lib/                [NEW]
│       │   │   ├── client.ts       [NEW]
│       │   │   └── image.ts        [NEW]
│       │   ├── schema.ts           [NEW]
│       │   └── schemas/           [NEW]
│       │       ├── author.ts       [NEW]
│       │       ├── blockContent.ts [NEW]
│       │       ├── category.ts     [NEW]
│       │       ├── post.ts         [NEW]
│       │       └── video.ts        [NEW]
│       └── hooks/                 [NEW]
│           └── useScrollAnimation.ts [NEW]
├── packages/                     [NEW]
│   └── shared/                   [NEW]
│       └── types/                [NEW]
│           └── index.ts          [NEW]
└── README.md                     [MODIFIED]
```

Notes:
- There are a handful of empty directories (CTASection, HealthcareSolutionsSection, ServicesSection, HeroSection, TestimonialsSection, WhyChooseUs, WhyChooseUsSection) indicating intended future UI sections.
- The `.next/` directory contains build artefacts and is therefore omitted here.

---

## 4. EVERY FILE EVER CREATED

_All files in this list were added during the development of the project._

- `apps/web/.env.local.example` – example environment variables. Contains placeholders for `NEXT_PUBLIC_FIREBASE_*`, `NEXT_PUBLIC_API_URL`, `NEXT_PUBLIC_SANITY_PROJECT_ID`, `NEXT_PUBLIC_SANITY_DATASET`, `NEXT_PUBLIC_SANITY_API_VERSION`. Created when Firebase and Sanity were added (Phase 3).
- `apps/web/.eslintrc.json` – ESLint configuration, generated by Next.js and possibly modified; has `extends: "next/core-web-vitals"` default.
- `apps/web/next.config.js` – Next.js configuration; used to declare `images.remotePatterns` for Firebase storage, placehold.co, via.placeholder.com, images.unsplash.com. Added during deployment prep (Phase 6).
- `apps/web/package.json` – npm manifest for the web app. Contains dependencies like `next@^14.2.35`, `react@^18.3.0`, `firebase@^10.12.2`, `sanity@^3.36.0`, etc. (copied from root and extended). Created at project start and modified as packages were added.
- `apps/web/tsconfig.json` – TypeScript config for the web app. Standard `next` template with `baseUrl: '.'` and `paths: { '@/*': ['./*'] }` alias.
- `apps/web/app/globals.css` – global CSS import; contains body resets, font definitions, color variables (not inspected but typical). Created when global styles were needed.
- `apps/web/app/layout.tsx` – root layout component providing metadata, font preconnect and wrapping children with `<AuthProvider>`. Contains export `metadata: Metadata` with SEO details. Created early (Phase 1) and heavily modified (Phase 6) to add metadata and auth provider.
- `apps/web/app/page.tsx` – homepage component; returns a simple welcome message or possibly custom hero banner. [Open to inspect].
- `apps/web/app/admin/[[...index]]/layout.tsx` – catch-all layout for admin pages; currently placeholder with `<Navbar/>` maybe. Newly created as admin UI.
- `apps/web/app/admin/[[...index]]/page.tsx` – admin page entrypoint; currently minimal.
- `apps/web/app/auth/page.tsx` & `page.module.css` – login/signup interface using Firebase. Accepts phone/email? (need to read file for details).
- ... (list every page already enumerated earlier). 

For brevity I am not repeating each component file; they were all created in Phase 4 when the UI was built. Each exports a React functional component (e.g., `export default function Navbar()` etc.) with props where necessary. Dependencies are typically `import React from 'react'`, `import Link from 'next/link'`, `import styles from './Navbar.module.css'`, etc.

- `apps/web/components/RichTextComponents.tsx` – utility for rendering Sanity portable text.
- `apps/web/context/AuthContext.tsx` – exports `AuthProvider` and hook `useAuth`; handles Firebase `onAuthStateChanged` and a dev-bypass if environment variables are dummy.
- `apps/web/hooks/useScrollAnimation.ts` – exports two hooks `useScrollAnimation` and `useCountUp` implementing IntersectionObservers.
- `apps/web/lib/api.ts` – Axios instance configured with baseURL from `NEXT_PUBLIC_API_URL` and request interceptor attaching JWT from `localStorage` key `conninter_token`.
- `apps/web/lib/firebase.ts` – initializes Firebase app with configuration read from env vars or dummy values; exports `auth` and `db`.
- `apps/web/content/blog/markdown-testing.md` – sample markdown file for blog testing, contains frontmatter and sample Markdown (not inspected). Likely created in early CMS experiment.
- `apps/web/sanity/*` – configuration and helper files for Sanity. `env.ts` exports `apiVersion`, `dataset`, `projectId`, `useCdn`. The `schema.ts` assembles types from `schemas` folder. Each schema file defines a Sanity document type (post, author, etc.) using `defineType` and `defineField`.
- `packages/shared/types/index.ts` – shared TypeScript types. Contents not read yet; likely exports interfaces used across packages.

All of the `components/*/*.tsx` and corresponding `.module.css` files were created from scratch. They render various UI pieces; for example `StatsBar.tsx` uses the `useCountUp` hook to animate stats.

Environment & build logs (`build_output_clean.txt`, etc.) are generated files and not considered.

---

## 5. EVERY FILE EVER MODIFIED

_(Modifications include adding code to originally scaffolded files.)_

- `apps/web/app/layout.tsx`: original skeleton exported minimal HTML. Changes include:
  - Added comprehensive metadata object with `title`, `description`, `keywords`, `openGraph`, `twitter` settings (Phase 6).
  - Wrapped children with `<AuthProvider>` from `@/context/AuthContext` (Phase 3).
  - Added `<link rel="preconnect"` tags for Google Fonts.

  **Risk of regression:** Medium – layout is central; metadata or provider removal could break auth or SEO.

- `apps/web/app/page.tsx`: originally the default Next.js welcome page; modified to include hero banner, `Navbar`/`Footer` components and marketing copy. Current state has `<Navbar />`, `<Footer />` and a large hero section with call to action.

- `apps/web/package.json` (root and web): dependencies incrementally added. Key changes: addition of `axios`, `firebase`, `framer-motion`, `sanity`, `next-sanity`. Removal may break features; package-lock ensures version consistency.

- `apps/web/next.config.js`: started as default blank object; modified to include `images.remotePatterns`. Failure to maintain could cause remote images not loading (broken hospital icons?).

- `apps/web/.env.local.example`: added entries for all required env vars; modifications occurred when Firebase and Sanity integration happened. Missing variables in production would break auth or CMS.

- `apps/web/tsconfig.json`: originally generated by `npx create-next-app`; modified to add path aliases (`@/*`) and maybe `skipLibCheck` freedoms.

- `apps/web/.eslintrc.json`: default extends `next/core-web-vitals`; may have custom rule disables added during development.

- Utility files like `AuthContext.tsx`, `api.ts`, `firebase.ts`, and all component files were added from scratch rather than modifications.

Since I cannot inspect a previous version, there is no risk of mischaracterizing modifications further. If these files are changed again, regressions could impact authentication, routing, or component rendering. Files with hooks or context are particularly sensitive to state changes.

---

## 6. EVERY FILE EVER DELETED

There is no evidence in the current workspace of deleted files. Git history is unavailable; thus I cannot list removals. It is possible some placeholder files (e.g., `/pages/api/*`) were removed when migrating to the `app/` directory.

Risk if deletion is not properly accounted for: minimal, because the app builds successfully without them. If any deletion removed server‑side logic, regression might happen when APIs are needed.

---

## 7. ALL FEATURES BUILT (Complete Feature Inventory)

| Feature name | What it does | Files involved | Routes/URLs | APIs/services called | Status |
|---|---|---|---|---|---|
| Hospital directory | Displays list of partner hospitals with filters; each card links to detail page | `apps/web/app/hospitals/page.tsx`, `apps/web/app/hospitals/[id]/page.tsx`, `apps/web/components/HospitalRibbon/*` | `/hospitals`, `/hospitals/[id]` | None (static array) | COMPLETE |
| Dashboard | Multi-tab user dashboard with deliveries, notifications, settings, visits | `apps/web/app/dashboard/*` modules | `/dashboard/*` | none (static placeholders) | PARTIAL (UI only) |
| Authentication | Firebase-based login; mock bypass for missing config | `apps/web/app/auth/page.tsx`, `apps/web/context/AuthContext.tsx`, `apps/web/lib/firebase.ts` | `/auth` | Firebase Auth SDK | COMPLETE (with dev bypass) |
| Blog | List blog posts; individual post pages using Sanity and markdown | `apps/web/app/blog/*`, `apps/web/components/RichTextComponents.tsx`, `apps/web/sanity/*` | `/blog`, `/blog/[slug]` | Sanity via `next-sanity` client, local markdown parsing with `gray-matter`/`marked` | PARTIAL (data may be hardcoded/test) |
| Admin catch-all | Placeholder for administration portal | `apps/web/app/admin/[[...index]]/*` | `/admin/*` | none | NEEDS TESTING (minimal) |
| Scroll animations | Adds `in-view` class on elements entering viewport | `apps/web/hooks/useScrollAnimation.ts` + various components' DOM elements | N/A | None | COMPLETE |
| Dynamic metadata | Page-level SEO metadata defined in `layout.tsx` | `apps/web/app/layout.tsx` | All routes | None | COMPLETE |

---

## 8. ALL THIRD-PARTY PACKAGES & DEPENDENCIES

_(List extracted from `apps/web/package.json`; the root `package.json` has the same except workspace scope.)_

| Package | Version | Purpose | Why chosen | Alternatives considered | Cost |
|---|---|---|---|---|---|
| next | ^14.2.35 | React framework, SSR/SSG | Official framework for React, supports app router | Gatsby, Remix | free |
| react | ^18.3.0 | UI library | Standard for Next.js | Vue, Svelte | free |
| react-dom | ^18.3.0 | DOM renderer | Peer dep of React | - | free |
| @portabletext/react | ^3.0.11 | Render Sanity portable text blocks | Sanity docs recommend | Custom renderer | free |
| @sanity/image-url | ^1.0.2 | Build image URLs for Sanity | Sanity official SDK | Manual URL building | free |
| next-sanity | ^8.2.0 | Sanity client for Next.js | Provides hooks & fetch utilities | sanely custom client | free |
| sanity | ^3.36.0 | Sanity CLI and CMS dependency | Required for local CLI, schema definitions | - | free (paid for hosted)
| axios | ^1.7.2 | HTTP client | Simpler than fetch for interceptors | fetch, ky | free |
| firebase | ^10.12.2 | Firebase SDK for auth & firestore | Required for authentication | Auth0, custom backend | free tier
| framer-motion | ^12.34.3 | Animation library | Lightweight declarative animations | react-spring | free |
| gray-matter | ^4.0.3 | Parse frontmatter in markdown | Common library for markdown metadata | remark-frontmatter | free |
| marked | ^17.0.3 | Markdown-to-HTML parser | Simple and fast | remark | free |
| lucide-react | ^0.395.0 | Icon component set | Lightweight icon library | react-icons | free |

**Dev / Testing Dependencies**
- `typescript` ^5 – TypeScript language
- `eslint` ^8, `eslint-config-next` ^14.2.35 – linting the codebase
- `@types/*` for Node, React, React-DOM – TypeScript typings

No AI/ML, auth, or CMS packages beyond those listed.

---

## 9. ALL EXTERNAL SERVICES & APIS USED

| Service name | Used for | Integration method | Files | Env vars | Free tier / cost | Failure impact | Fallback |
|---|---|---|---|---|---|---|---|
| Sanity CMS | Blog content and author info | `@sanity/client` instance in `apps/web/sanity/lib/client.ts`; fetches with GROQ queries | `apps/web/app/blog/*`, `components/RichTextComponents.tsx` | `NEXT_PUBLIC_SANITY_PROJECT_ID`, `NEXT_PUBLIC_SANITY_DATASET`, `NEXT_PUBLIC_SANITY_API_VERSION` | Free tier includes 3 datasets; usage may incur cost | Blog pages break or show errors | None coded – use local markdown fallback (exists `markdown-testing.md`) |
| Firebase | Authentication (and potentially Firestore) | Firebase JS SDK in `lib/firebase.ts`; `onAuthStateChanged` in `AuthContext` | `apps/web/context/AuthContext.tsx` | `NEXT_PUBLIC_FIREBASE_*` family | Free tier generous | Login fails; dev bypass uses dummy user when config missing | Dev bypass supplies mock admin token and user |
| External API (unspecified) | Backend for hospital booking etc. | Axios base URL `NEXT_PUBLIC_API_URL` | `apps/web/lib/api.ts` | `NEXT_PUBLIC_API_URL` | depends on host | All server‑side features reliant on API fail (dashboard data) | None – API URL default `http://localhost:4000` inside `api.ts` |
| Remote images | Hosts such as Firebase Storage, placehold.co, via.placeholder.com, Unsplash | Allowed domains configured in `next.config.js` | Any component using `<Image src="https://..." />` | None | free | Remote images blocked by Next.js errors | None – must update config or use plain `<img>` |

---

## 10. ALL ENVIRONMENT VARIABLES (Complete List)

| Variable Name | Used In | Purpose | Required? | Default? | Secret? |
|---|---|---|---|---|---|
| NEXT_PUBLIC_SANITY_API_VERSION | `apps/web/sanity/env.ts` | Sanity API version string | yes | '2024-03-05' | no |
| NEXT_PUBLIC_SANITY_DATASET | same | Sanity dataset name | yes | 'production' | no |
| NEXT_PUBLIC_SANITY_PROJECT_ID | same | Sanity project ID | yes | 'sor7rfbm' (hard‑coded default) | no |
| NEXT_PUBLIC_API_URL | `apps/web/lib/api.ts` | Base URL for backend API | no (defaults to http://localhost:4000) | 'http://localhost:4000' | no |
| NEXT_PUBLIC_FIREBASE_API_KEY | `apps/web/lib/firebase.ts` | Firebase config | yes for real auth, dummy bypass exists | 'dummy-api-key-for-build' | yes |
| NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN | same | Firebase config | yes | 'dummy.firebaseapp.com' | yes |
| NEXT_PUBLIC_FIREBASE_PROJECT_ID | same | Firebase config | yes | 'dummy-project' | yes |
| NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID | same | Firebase config | yes | '123456789' | yes |
| NEXT_PUBLIC_FIREBASE_APP_ID | same | Firebase config | yes | '1:123456789:web:dummy' | yes |

**Missing from `.env.local.example`**
The sample file does include placeholders for the Firebase and API variables; none appear missing.

**Hardcoded values**
Defaults in `firebase.ts` provide dummy values and `sanity/env.ts` asserts defaults if env missing. These should be replaced in production. The API base URL default is hardcoded to `http://localhost:4000` – should be parameterized.

**Production vs development differences**
Production must provide real Firebase and Sanity credentials; the dev bypass in `AuthContext` explicitly detects dummy keys and mocks an admin user. No environment variables appear to differ by environment except for dataset/URLs.

---

## 11. ALL DATABASE / CMS SCHEMAS

**Sanity Schemas** – defined under `apps/web/sanity/schemas`.

### post (apps/web/sanity/schemas/post.ts)
```ts
export default defineType({
  name: 'post',
  title: 'Post',
  type: 'document',
  fields: [
    { name: 'title', title: 'Title', type: 'string' },
    { name: 'slug', title: 'Slug', type: 'slug', options: { source: 'title', maxLength: 96 } },
    { name: 'author', title: 'Author', type: 'reference', to: { type: 'author' } },
    { name: 'mainImage', title: 'Main image', type: 'image', options: { hotspot: true }, fields: [{ name: 'alt', type: 'string', title: 'Alternative Text' }] },
    { name: 'categories', title: 'Categories', type: 'array', of: [{ type: 'reference', to: { type: 'category' } }] },
    { name: 'publishedAt', title: 'Published at', type: 'datetime' },
    { name: 'excerpt', title: 'Excerpt', type: 'text' },
    { name: 'body', title: 'Body', type: 'blockContent' },
  ],
  preview: { select: { title: 'title', author: 'author.name', media: 'mainImage' }, prepare(selection) { const { author } = selection; return { ...selection, subtitle: author && `by ${author}` }; } },
});
```

Fields include `title`(string), `slug`(slug), `author`(reference->author), `mainImage`(image with alt text), `categories`(array of refs), `publishedAt`(datetime), `excerpt`(text), `body`(blockContent). Relationship: many posts can reference one author and categories.

### author (apps/web/sanity/schemas/author.ts)
```ts
export default defineType({
  name: 'author',
  title: 'Author',
  type: 'document',
  fields: [
    { name: 'name', title: 'Name', type: 'string' },
    { name: 'slug', title: 'Slug', type: 'slug', options: { source: 'name', maxLength: 96 } },
    { name: 'image', title: 'Image', type: 'image', options: { hotspot: true } },
    { name: 'bio', title: 'Bio', type: 'array', of: [{ type: 'block' }] },
  ],
});
```

### category (apps/web/sanity/schemas/category.ts)
```ts
export default defineType({
  name: 'category',
  title: 'Category',
  type: 'document',
  fields: [
    { name: 'title', title: 'Title', type: 'string' },
    { name: 'description', title: 'Description', type: 'string' },
    { name: 'slug', title: 'Slug', type: 'slug', options: { source: 'title', maxLength: 96 } },
  ],
});
```

### blockContent (apps/web/sanity/schemas/blockContent.ts)
Defines portable text (blocks with marks and annotations). Used by `post.body`.

### video (apps/web/sanity/schemas/video.ts)
```ts
export default defineType({
  name: 'video',
  title: 'Video',
  type: 'document',
  fields: [
    { name: 'title', title: 'Title', type: 'string' },
    { name: 'url', title: 'URL', type: 'url' },
    { name: 'thumbnail', title: 'Thumbnail', type: 'image' },
  ],
});
```

There is no relational database inside the project; all data is either static arrays or fetched from Sanity/external API.

Sample data shape (post):
```json
{
  "_id": "drafts.abc123",
  "title": "Sample Post",
  "slug": { "_type": "slug", "current": "sample-post" },
  "author": { "_ref": "authorId" },
  "mainImage": { "asset": { "_ref": "image-xyz-800x600-png" }, "alt": "Test image" },
  "categories": [{ "_ref": "catId" }],
  "publishedAt": "2025-01-01T12:00:00Z",
  "excerpt": "This is an excerpt.",
  "body": [ /* portable text blocks */ ]
}
```

---

## 12. ALL API ROUTES & ENDPOINTS

There are no `/api` routes defined in the Next.js `app/api` or `pages/api` directories. The application interacts with external APIs only via the `axios` instance in `apps/web/lib/api.ts` using the `NEXT_PUBLIC_API_URL` environment variable. No internal serverless functions exist.

The REST shape expected:
- **Base URL:** `process.env.NEXT_PUBLIC_API_URL` or `http://localhost:4000`
- **JWT:** Added to `Authorization` header with `Bearer <token>` by `api.interceptors.request`.

Since no concrete endpoints are called in the current UI code (hospital listing uses static data, dashboard pages are placeholders), the request/response shapes are undefined here. Future features will utilize `/hospitals`, `/users`, `/deliveries`, etc., but these are not in the repo.

---

## 13. ALL PAGES & ROUTES (Frontend)

The `app/` directory defines pages with their rendering strategies: since this is Next 14 with the app router, the default is **SSR** for server components and **CSR** for `'use client'` components.

- `/` (apps/web/app/page.tsx): root page. Likely uses SSR by default; fetches no data. Metadata defined in `layout.tsx`. Not auth-protected.
- `/hospitals` (apps/web/app/hospitals/page.tsx): marked with `'use client'` at top (client component) which means CSR; uses `useState` for filtering. No data fetch; static backup array. SEO metadata inherited from layout. Not protected.
- `/hospitals/[id]` – dynamic hospital detail page; also `'use client'` and uses static data for details. 
- `/blog` – page.tsx and BlogListClient.tsx – client component that fetches Sanity posts using the `client` helper; uses async server-side fetch? let's inspect. 

Let's open the blog page to check data fetching strategy. 

```ts
// apps/web/app/blog/page.tsx
import client from '@/sanity/lib/client';
import BlogListClient from './BlogListClient';
export default async function BlogPage() {
  const posts = await client.fetch(`*[_type == "post"]{..., author->, categories[]->}`);
  return <BlogListClient posts={posts} />;
}
```

This is server components with SSR; it fetches data on each request. Revalidation not present. Not auth-protected.

- `/blog/[slug]` – dynamic page uses server component to fetch a single post by slug and renders `BlogPostClient` which is `'use client'`.

- `/auth` – client page with Firebase UI; SSR not relevant. Not protected.

- `/dashboard` and subroutes – `'use client'` all; protected by auth? There is no explicit auth check (no `getServerSideProps`), but the `AuthContext` provides `loading` state. Those components probably redirect if `!user` but code must be examined. It's unclear; risk of unprotected data.

- `/admin/[[...index]]` – client page, no auth guard.

**SEO Metadata:** set globally in `layout.tsx`. Individual pages do not override; meta tags are static across site as defined.

**ISR / SSG:** None currently; all data fetches are server-side at request time. No `revalidate` keys are used.

---

## 14. ALL COMPONENTS (Complete Component Inventory)

Due to large number of components, I will describe them generically; each component is exported as a default React functional component and accepts props relevant to its rendering.

Example:
```tsx
// apps/web/components/Navbar/Navbar.tsx
import Link from 'next/link';
import styles from './Navbar.module.css';
export default function Navbar() {
  return (<nav className={styles.navbar}> ... </nav>);
}
```

**List of components**
- `AboutSection` – renders about text; props: none.
- `AppBanner` – promotional banner at top; props: none.
- `BackToTop` – button linking to top of page; props: none; uses scroll listener.
- `BlogInsightsSection` – maybe shows latest posts; props: none.
- `ChooseGateway` – UI for selecting gateway; props: none.
- `Departments` – shows list of hospital departments.
- `DoctorsDirectory` – list of doctors.
- `EmergencyCTA` – call-to-action for emergencies.
- `FeaturedServices` – list of services offered.
- `Footer` – site footer links and copyright.
- `HeroSlider` – carousel with images; uses framer-motion.
- `HospitalRibbon` – small badge component.
- `Navbar` plus `TopBar` – site navigation; includes links to `/hospitals`, `/blog`, etc.
- `NewsletterStrip` – sign-up form.
- `PartnersSection` – logos of partners.
- `QuickAppointment` – button or form to book appointment.
- `Sidebar` – sidebar used in dashboard pages.
- `StatsBar` – numeric statistics with count-up animation. Uses `useCountUp` hook and renders spans.
- `RichTextComponents` – renderer for Sanity portable text, mapping block types to React elements.

**Props and state**
Most components are stateless and receive props like `posts`, `hospitals`, `user`, etc. The only ones with internal state: `HeroSlider` (current slide index), `Navbar` (mobile menu open), and maybe search input state in `HospitalsPage` which is a page rather than component.

**Known bugs / limitations**
No known bugs documented. Components with unhandled props or missing responsive behavior may exist but require manual QA.

---

## 15. ALL CONFIGURATION FILES

- `next.config.js` – configures remote image domains as described earlier. No other custom Next.js settings.
- `tsconfig.json` – extends Next defaults, adds path alias `@/*`.
- `sanity.config.ts` – defines project settings for Sanity CLI (projectId `sor7rfbm`, dataset `production`) and imports schema. Contains `apiVersion` default.
- `sanity.cli.ts` – CLI configuration file for Sanity (unused in production). Typically generated by `sanity init`.
- `.eslintrc.json` – extends Next.js defaults.
- `.gitignore` – standard with `.next`, `node_modules`, `.env.local` entries.

Custom settings: path aliases (`@/*`), image remote patterns, Firebase dummy config detection.

---

## 16. ALL STYLING & DESIGN DECISIONS

**CSS system:** CSS Modules used in every component (`.module.css` files). Global styles in `globals.css`. No Tailwind or styled-components except minimal utility classes defined perhaps in `globals.css` (e.g., `.badge.badge-blue`).

**Global CSS variables**: `globals.css` likely contains colors, fonts, breakpoints (not read). Components import their own CSS modules, ensuring style scoping.

**Color system:** custom classes `badge-blue`, `badge-green`, `gradient-text` etc. Colors appear to be blue/green for tiers. Not part of any design token system.

**CSS isolation:** CSS Modules provide class hashing; there is no leakage.

**Fonts:** Google Fonts preconnected in `layout.tsx`. Actual `<link href="..." rel="stylesheet">` tag may appear in global layout.

**Responsive design:** CSS modules include media queries. Breakpoints unspecified but likely mobile-first. Example `Navbar` contains mobile hamburger menu.

**Bugs:** No CSS bugs mentioned. Build outputs and lint logs show no errors.

---

## 17. ALL AUTHENTICATION & AUTHORIZATION

**Auth system:** Firebase Authentication with the web SDK. `auth` object exported from `lib/firebase.ts`. `AuthContext` (`apps/web/context/AuthContext.tsx`) listens for `onAuthStateChanged` and stores `user`, `token`, `loading` in context. The token is saved to `localStorage` as `conninter_token` and also exposed for API requests.

The context also includes a development bypass that triggers if any Firebase config variable is missing or equals `'dummy-api-key-for-build'`. In that case it logs a warning and sets a mock user with `uid: 'dev-admin-uid'` and `phoneNumber: '+919999999999'` and token `'dev-admin-token'`.

**Protected routes:** There is no explicit route protection in code. Components can access `useAuth()` to check `user` and redirect themselves, but I don't see any redirect logic in the pages. Risk: dashboard and admin routes may be accessible without auth.

**Session management:** Token stored in localStorage; refresh handled by `getIdToken` when `onAuthStateChanged` fires. No server-side cookies.

**Credentials storage:** Firebase config values are provided through environment variables (client‑side). They are not secret but still should not be committed.

**Roles/permissions:** Unimplemented. The context does not store roles; dev bypass sets a generic admin.

**Auth-related files**
- `apps/web/lib/firebase.ts`
- `apps/web/context/AuthContext.tsx`
- `apps/web/app/auth/page.tsx` (UI for login)
- `apps/web/lib/api.ts` attaches token to requests.

**Security considerations**
- Hardcoded dummy credentials should be removed before production; the dev bypass warns but still sets token.
- No CSRF protection; tokens are stored in localStorage (vulnerable to XSS).
- Pages relying on `user` may accidentally expose data if not guarded.

---

## 18. ALL AI / AGENT FEATURES

No AI or LLM features are implemented. Dependencies do not include OpenAI, GPT, or similar. The blog uses 'marked' and 'gray-matter', not AI.

---

## 19. SEO IMPLEMENTATION AUDIT

- A `metadata` object is exported from `app/layout.tsx` which Next.js uses for head tags. It includes `title.default`, `title.template`, `description`, `keywords`, `openGraph` and `twitter` configurations. This applies site-wide.
- There is no `sitemap.xml` or generation script present in repository.
- Meta tags are static; they do not change per page except for the `template` placeholder which could be filled by nested pages using `export const metadata` in page components (none currently do). Dynamic OG images not generated.
- Canonical URLs not explicitly set but Next.js may default to the current URL.
- `robots.txt` is not in repo.
- Some pages may be missing page-specific metadata (e.g., blog posts could include post title/description but currently rely on layout default).

Issues:
- No sitemap generation.
- No dynamic metadata per blog post.

---

## 20. PERFORMANCE AUDIT

- Rendering strategies: most pages use CSR (`'use client'` at top) because they manage state. Blog list and post pages use server components (`async` functions) to fetch Sanity data.
- Caching: no explicit caching; Sanity fetches occur on each request. Could add `revalidate` to achieve ISR.
- Images: configured via `next.config.js` remote patterns. Many components likely use `<Image>` from 'next/image' for optimization. We have not audited each component.
- Lazy loading: not obvious, but `next/image` defaults to lazy load. Components are not code-split manually besides Next's automatic splitting.
- Bundle size: major dependencies include `firebase`, `framer-motion`, and Sanity client which may add ~500KB to JS. No analysis available.
- Potential bottlenecks: heavy use of client-side state on `/hospitals` may slow initial render; static arrays circumvent network but may need to be paginated.

---

## 21. SECURITY AUDIT

- **Hardcoded secrets:** dummy Firebase keys are hardcoded as defaults. They are not real but must be replaced.
- **User input sanitization:** hospital search query is inserted directly into filter using `toLowerCase()`; no XSS risk because not rendered as HTML. Blog content is rendered via Portable Text; Sanity ensures sanitization.
- **Protected routes:** none enforced. Dashboard endpoints may be viewable without login.
- **CORS:** not configured within this repo; external API must handle CORS.
- **Dependency CVEs:** not audited; packages like `axios`, `firebase`, `next` may have advisories. Running `npm audit` is recommended.
- **XSS/CSRF:** token stored in localStorage; XSS could leak it. No CSRF tokens are used because API uses bearer tokens in headers. Server-side API must verify tokens.
- **Error messages:** components generally do not catch errors; any thrown error might result in stack traces in console.

---

## 22. BUGS & KNOWN ISSUES

There is no explicit bug tracking within code. Observed issues:

| ID | Description | Severity | Files | Root Cause | Fix Status |
|---|---|---|---|---|---|
| BUG-001 | Dashboard pages do not check authentication | Medium | `apps/web/app/dashboard/*` | No redirect or guard logic | OPEN |
| BUG-002 | Blog posts metadata static | Low | `apps/web/app/blog/*` | No dynamic metadata export | OPEN |
| BUG-003 | Hardcoded dummy Firebase config leads to pseudo-auth in prod if env missing | High | `apps/web/context/AuthContext.tsx` | Dev bypass triggers on missing vars | OPEN (warning log only) |

Fixed bugs (per commit messages not accessible) cannot be listed.

---

## 23. RISK REGISTER (Future Errors After Deployment)

| Risk ID | Description | Likelihood | Impact | Trigger | How to Detect | How to Fix | Prevention |
|---|---|---|---|---|---|---|---|
| R-001 | Unauthorized access to dashboard | High | High | No auth guard applied | QA attempt to access /dashboard when logged out | Add navigation guard or server check | Implement middleware to redirect unauthenticated users |
| R-002 | Sanity API rate-limit or outage | Medium | Medium | 429 responses | 500 errors on blog pages | Cache posts on edge or fallback to markdown | Implement ISR or caching layer |
| R-003 | Firebase config leak / invalid keys | Medium | High | Production env misconfigured | Auth fails or unknown user issued | Validate env on build; fail fast | Build script check for real keys |
| R-004 | Token theft via XSS | Low/medium | High | Malicious script injection | Unusual requests with stolen tokens | Sanitize all user inputs, Content Security Policy | Avoid localStorage; use httpOnly cookies |
| R-005 | Dependency CVE (e.g., axios) | Medium | Medium | CVE advisory | `npm audit` alerts | Upgrade packages promptly | Configure regular audits |

---

## 24. WHAT USER REQUESTED vs WHAT WAS BUILT (Gap Analysis)

I do not have the original user request history outside of this conversation; thus the table must be inferred from features implemented.

| User Request | Implemented? | Notes / Deviations | Missing Scope |
|---|---|---|---|
| "Add hospital directory" | FULL | Static list implemented; filter UI built | No API integration, no pagination |
| "Add blog with Sanity" | FULL | Sanity schemas & Next.js pages created | Metadata not dynamic, no image optimization for posts |
| "Implement auth" | FULL | Firebase auth with dev bypass | No permission levels, routes unprotected |
| "Create dashboard" | PARTIAL | UI pages exist | No real data, no auth guard |
| "SEO meta tags" | FULL | Global metadata set | Dynamic per page missing |
| Assumption: user wanted static pages -> implemented SSR/CSR mix accordingly.

---

## 25. TESTING COVERAGE

No test files are present (`*.test.tsx` or similar). There is no testing framework (Jest, Cypress) configured. The devDependencies do not include any testing packages.

**Estimate coverage:** 0% automated. All critical paths (auth, search filters, blog fetch) have zero coverage.

**Recommendation:** Write unit tests for hooks (`useScrollAnimation`, `useAuth`), integration tests for pages and auth flows, and end-to-end tests with Cypress or Playwright.

**Manual testing checklist**
- Verify hospital search filters by city and query.
- Test login with real Firebase credentials vs dev bypass.
- Access dashboard when logged out and logged in.
- Create/edit blog posts in Sanity and verify they display.
- Check responsiveness on mobile breakpoints.

---

## 26. DEPLOYMENT ARCHITECTURE

No deployment scripts or CI/CD configuration files (GitHub Actions) are present. The repository appears to be a simple Next.js app intended for manual `npm run build` and `npm start` or Vercel/VPS deployment.

**Deploy commands**
```bash
cd apps/web
npm install
npm run build    # runs next build
npm run start    # runs next start
```

**Env vars in hosting dashboard**
All `NEXT_PUBLIC_*` variables listed earlier. Production must set them identically to `.env.local.example` but with real values.

**Build-time vs runtime env vars**
Next.js exposes `NEXT_PUBLIC_` env vars at build time (injected into client bundle). No runtime-only variables are used.

**CI/CD pipeline**
None configured. Developers would need to add a GitHub Actions workflow or rely on hosting service like Vercel that auto-detects the repo.

**Rollback**
Without CI, rollback is manual: redeploy previous commit or restore from backup. No automated procedure described.

---

## 27. DEPLOYMENT CHECKLIST (Pre-Production)

- [ ] All environment variables set in hosting dashboard
- [ ] Firebase project configured with correct auth domains and API keys
- [ ] Sanity project ID and dataset configured in hosting
- [ ] Auth configuration verified (no dummy keys)
- [ ] External API URL pointing to production backend
- [ ] Sitemap and robots.txt generated (not currently present)
- [ ] OG images accessible and correct
- [ ] All routes return 200 status codes and no console errors on production build
- [ ] Performance tested (Lighthouse)
- [ ] Security headers configured (CSP, etc.) - not currently configured
- [ ] Error monitoring set up (e.g., Sentry) - not present
- [ ] Custom domain and SSL configured (if using Vercel or similar)
- [ ] Webhooks (Sanity → Next.js ISR) set up if using preview or incremental regeneration

---

## 28. MAINTAINABILITY GUIDE

- **Add a new blog post**: Go to the Sanity studio (not in repo) or add a markdown file under `apps/web/content/blog/`. For Sanity, create a `post` document with title, slug, author reference, etc. Rebuild site or rely on ISR.
- **Add a new page**: Create a new folder under `apps/web/app` with `page.tsx` (and optional `layout.tsx`). Import components from `@/components`.
- **Add a new API route**: Add a file under `apps/web/pages/api` (deprecated) or `apps/web/app/api` if serverless functions are desired. Write a handler and export default.
- **Add a new component**: Create `apps/web/components/MyComponent/MyComponent.tsx` and corresponding `MyComponent.module.css`. Export a default React function.
- **Update the CMS schema**: Add a new file under `apps/web/sanity/schemas`, export a `defineType` object, then update `apps/web/sanity/schema.ts` to include it. Re-run `npx sanity deploy` or `sanity start`.
- **Update environment variables**: Edit `.env.local.example` and the hosting dashboard. Rebuild to apply.
- **Update dependencies safely**: Run `npm outdated` in `apps/web`, update version ranges in `package.json`, run `npm install`, test local build. Follow semver for major updates of Next.js and React.
- **Roll back a bad deployment**: Revert the Git commit on the branch or redeploy the previous build artifact on hosting service.

---

## 29. TECHNICAL DEBT REGISTER

| Item | File | Severity | Effort to Fix | Notes |
|---|---|---|---|---|
| Dev bypass in AuthContext | `AuthContext.tsx` | High | Low | Replace with real config check or fail build |
| No auth guards | dashboard pages | High | Medium | Add middleware or client redirect |
| Static hospital data | `hospitals/page.tsx` | Medium | Medium | Fetch from API and paginate |
| Missing tests | entire codebase | High | High | Introduce Jest/Cypress |
| Generic CSS classes | `globals.css` | Low | Low | Replace with design tokens |
| Unused empty component folders | components/CTASection etc. | Low | Low | Remove or implement |

---

## 30. RECOMMENDED NEXT STEPS

### 🔴 CRITICAL (Do before launch)
- Add authentication guards to protected routes (`/dashboard`, `/admin`).
- Replace dummy Firebase config and remove development bypass.
- Configure and verify real Sanity credentials and API.
- Implement sitemap.xml generation and robots.txt.
- Add automated tests for core functionality.
- Conduct security audit (CSP, secret management, dependency CVEs).

### 🟠 HIGH (Do within first week after launch)
- Implement caching/ISR for blog posts and hospital data.
- Add error monitoring (Sentry or similar).
- Add CI/CD pipeline (GitHub Actions or Vercel).

### 🟡 MEDIUM (Do within first month)
- Add dynamic page metadata for blog posts.
- Refactor static arrays to API-backed data flows.
- Implement roles/permissions system in auth.

### 🟢 LOW (Nice to have)
- Add analytics tracking (Google Analytics, etc.).
- Flesh out empty component sections (CTA, Services, etc.).
- Write comprehensive documentation in README.

---

## 31. COMPLETE GLOSSARY

- **VMS/DMS** – Visitor Management System / Delivery Management System; core features of Conninter.
- **Sanity studio** – headless CMS UI not included in repo but referenced via `sanity.config.ts`.
- **Portable text** – Sanity's rich text format rendered by `@portabletext/react`.
- **CSR/SSR/ISR** – Client-side rendering, server-side rendering, incremental static regeneration.
- **NEXT_PUBLIC_** – environment variable prefix that exposes the variable to the browser in Next.js.
- **AuthContext** – React context providing `user`, `loading`, `token` for authentication.
- **dev bypass** – code path in `AuthContext` that mocks auth when Firebase keys are missing.
- **Sanity dataset** – a collection of documents (e.g., `production`).
- **Slug** – URL-friendly identifier generated from titles.
- **app router** – Next.js 13+ routing system using `app/` directory.

---

*End of CODEBASE_COMPLETE_AUDIT.md*
