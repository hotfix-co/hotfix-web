# i18n Language Picker - Implementation Plan

## Overview
Add bilingual support (HR/EN) using `next-intl` with URL-based routing. Croatian stays the default (no URL prefix); English lives under `/en/`.

**URL structure:**
- `/` → Croatian home (unchanged)
- `/o-nama` → Croatian about (unchanged)
- `/en` → English home
- `/en/about` → English about

## Scope

### Phase 1 — Infrastructure + Core Pages
1. Install `next-intl` and configure middleware
2. Create translation dictionaries (`messages/hr.json`, `messages/en.json`)
3. Restructure `app/` to use `[locale]` segment
4. Update `layout.tsx` with `NextIntlClientProvider`
5. Add `LanguagePicker` component to Navbar
6. Translate core pages: home, about, services (+ 3 sub-pages), contact
7. Translate shared components: Navbar, Footer, Hero, ContactForm, ServiceCard
8. Update `next.config.ts` (remove old rewrites, add i18n-aware redirects)
9. Update `sitemap.ts` for both locales

### Phase 2 — Legal + Blog (deferred)
- Privacy & Terms translations
- Blog translations (long-form content, handled separately)

## File Changes

### New files
- `i18n/routing.ts` — locale config, pathnames
- `i18n/request.ts` — server-side locale loading
- `middleware.ts` — locale detection & routing
- `messages/hr.json` — Croatian dictionary
- `messages/en.json` — English dictionary
- `components/LanguagePicker.tsx` — dropdown in navbar

### Restructured
- `app/layout.tsx` → `app/[locale]/layout.tsx`
- `app/page.tsx` → `app/[locale]/page.tsx`
- `app/about/page.tsx` → `app/[locale]/about/page.tsx`
- `app/services/page.tsx` → `app/[locale]/services/page.tsx`
- `app/services/*/page.tsx` → `app/[locale]/services/*/page.tsx`
- `app/contact/page.tsx` → `app/[locale]/contact/page.tsx`
- `app/privacy/page.tsx` → `app/[locale]/privacy/page.tsx`
- `app/terms/page.tsx` → `app/[locale]/terms/page.tsx`
- `app/blog/page.tsx` → `app/[locale]/blog/page.tsx`
- `app/blog/*/page.tsx` → `app/[locale]/blog/*/page.tsx`
- `app/not-found.tsx` → stays at root (no locale)
- `app/globals.css` → stays at root or moves to locale layout

### Updated
- `components/Navbar.tsx` — add LanguagePicker, use translations
- `components/Footer.tsx` — use translations
- `components/Hero.tsx` — use translations
- `components/ContactForm.tsx` — use translations
- `components/ServiceCard.tsx` — use translations
- `lib/constants.ts` — locale-aware ROUTES
- `next.config.ts` — add `createNextIntlPlugin()`, update redirects
- `app/sitemap.ts` — generate for both locales

## Key Decisions
- **`localePrefix: 'as-needed'`** — Croatian (default) has no prefix, English uses `/en/`
- **Slug strategy**: Keep English slugs internally for file paths; Croatian URLs via localized pathnames config in next-intl routing
- **Blog posts**: Moved to `[locale]` but keep Croatian content in both locales initially (Phase 2 for EN translations)
- **SEO**: `hreflang` alternates generated automatically by next-intl
