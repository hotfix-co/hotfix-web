# Fixing the Google site name and favicon (May 2026)

This document explains why the Google search result for HOTFIX d.o.o. was
showing `hotfix-doo.com` as the site name and a tiny illegible logo, and
exactly what was changed to fix it. Keep this around for future debugging
— most of these signals are non-obvious and easy to break again.

If the site name regresses to the bare domain, or the favicon goes back to
a default placeholder, read [Verifying after deploy](#verifying-after-deploy)
first, then re-check the signals listed below in priority order.

---

## Symptoms (what the user saw)

Searching `HOTFIX DOO` on Google produced a result that:

1. Showed `hotfix-doo.com` as the site name **instead of** `HOTFIX d.o.o.`
2. Showed a tiny, unreadable smudge of a favicon instead of a recognisable
   brand mark.

```
hotfix-doo.com
https://www.hotfix-doo.com
HOTFIX d.o.o.: AI i software consulting za pouzdanu isporuku
HOTFIX pomaže tvrtkama uvesti AI u stvarne procese, …
```

Both are Google-side rendering decisions driven by signals on the page.
Both were diagnosed and fixed in this branch.

---

## Root causes

### 1. The favicon was not square

Google's favicon doc
([developers.google.com/search/docs/appearance/favicon-in-search](https://developers.google.com/search/docs/appearance/favicon-in-search))
says:

> Your favicon must be a square (1:1 aspect ratio) that's at least 8x8px.
> We recommend that you use a favicon that's larger than 48x48px so that
> it looks good on various surfaces.

The shipped icon files were **661 × 377 PNG** (landscape):

- `app/icon.png` — 661×377
- `public/favicon.ico` — 661×377 (identical bytes, just renamed)
- `public/logo.png` — 772×666 (also not square)

At 32×32 Google letterboxes a 661×377 image to ~32×18, which crushes the
"HOTFIX" wordmark below readability. The favicon became visual noise.

Compounding this, the Organization-schema `logo` declared dimensions of
`512 × 512` but pointed at `logo.png` which is actually `772 × 666`. Google
validates declared dimensions against the real file when it crawls the
image — a mismatch reduces confidence in the entire structured-data block.

### 2. The home page redirected to a subdirectory

Google's site-name doc
([developers.google.com/search/docs/appearance/site-names](https://developers.google.com/search/docs/appearance/site-names))
explicitly lists which URL levels are supported and unsupported:

> Supported: `https://example.com`, `https://www.example.com`,
> `https://m.example.com`, `https://news.example.com` (root + subdomains).
> **Not supported: `https://example.com/news`** (subdirectories cannot have
> their own site name).

The site's routing was producing this chain:

```
hotfix-doo.com         → 307 → www.hotfix-doo.com
www.hotfix-doo.com     → 307 → www.hotfix-doo.com/hr
www.hotfix-doo.com/hr  → 200  (this is where WebSite schema lived)
```

So Google's only crawlable "home page" was the subdirectory `/hr`. The
WebSite schema with `name: "HOTFIX d.o.o."` was correct, but it lived on
a subdirectory where site names are not supported. Google's algorithm
fell back to its documented backup ("show a domain or subdomain name").
The 307 status (instead of 308/301) further weakened the canonical
cluster.

The root cause of *that* was next-intl's `localePrefix: 'always'` setting
in `i18n/routing.ts`, which forces every path — including `/` — to carry
a locale segment.

---

## The fix

### Favicon side

Generated a true 1:1 square icon by extracting the Z mark from
`public/logo.png` (trim non-white bounding box → centre on a square white
canvas with 10 % safe-area padding → resize). The script lives at
[`scripts/make-favicons.py`](../../scripts/make-favicons.py) and produces:

- `app/icon.png` — 512×512 (Next.js auto-emits `<link rel="icon">`)
- `app/apple-icon.png` — 180×180 (Next.js auto-emits `<link rel="apple-touch-icon">`)
- `public/favicon.ico` — multi-resolution ICO (16/32/48/64/128/256) for
  legacy clients.

The wordmark "HOTFIX" was deliberately dropped from the favicon. At 32×32
text is unreadable; mark-only icons stay recognisable down to 16×16.

In `app/layout.tsx`, the manual `icons:` metadata block was removed.
Next.js's file-based metadata convention takes over and emits the correct
`<link>` tags with `sizes` and `type` attributes from the actual files in
`app/icon.png` / `app/apple-icon.png`. Manually declaring `icons` would
override the auto-detection with stale references.

`app/manifest.ts` was updated so PWA / Android home-screen icons point at
the same `/icon.png` and `/apple-icon.png` — single source of truth.

`lib/structuredData.ts` and `lib/blogSeo.ts` `logo` fields were re-pointed
to `/icon.png` (which is actually 512×512), so the schema dimensions stop
lying about the underlying image.

### Routing side

Switched the multilingual routing model. With **`localePrefix: 'as-needed'`**
the default locale (HR) serves from the bare URL while the non-default
locale (EN) keeps its `/en` prefix. After the change:

| URL | Status | Serves |
|---|---|---|
| `/` | 200 | HR home page (with WebSite schema) |
| `/o-nama`, `/usluge`, `/kontakt`, `/blog` | 200 | HR pages |
| `/en`, `/en/about`, `/en/services` | 200 | EN pages |
| `/hr`, `/hr/o-nama`, `/hr/...` | **308** | redirected to `/`, `/o-nama`, `/...` |

The 308 redirects are explicit `redirects()` rules in `next.config.ts` so
they run at the edge before middleware. This guarantees a permanent
status that transfers link equity, instead of the 307 that next-intl
middleware would otherwise emit.

The `withLocalePrefix` helper in `lib/seo.ts` was taught about the
default locale so canonical URLs, sitemap entries, hreflang `alternate`
links, and JSON-LD `url` fields all generate the unprefixed HR form
consistently. There is no schema/middleware drift to debug later.

### Site-name fallback

Per Google's documented troubleshooting advice:

> if the site name system isn't confident enough to use your preferred
> name, it strongly considers the domain or subdomain as a backup option.
> To provide this, add your domain or subdomain name as your alternative
> name in lowercase format.

`'hotfix-doo.com'` was added to the WebSite schema `alternateName` array
in `lib/structuredData.ts:167`. If Google still won't pick `HOTFIX d.o.o.`
after all the above, at least it will pick the explicit lowercase string
we approved rather than synthesising one.

---

## Files touched

| File | Why |
|---|---|
| `app/icon.png` | replaced 661×377 → 512×512 square |
| `app/apple-icon.png` | new 180×180 |
| `public/favicon.ico` | replaced 661×377 → multi-res square ICO |
| `app/layout.tsx` | removed manual `icons:` override; let Next.js auto-emit |
| `app/manifest.ts` | manifest icons → `/icon.png` + `/apple-icon.png` |
| `i18n/routing.ts` | `localePrefix: 'always'` → `'as-needed'` |
| `lib/seo.ts` | default locale serves without prefix |
| `lib/structuredData.ts` | `logo` → `/icon.png` with honest dimensions; `alternateName` adds `'hotfix-doo.com'` |
| `lib/blogSeo.ts` | publisher logo → `/icon.png` |
| `next.config.ts` | added 308 redirects for `/hr` and `/hr/:path*` |
| `scripts/make-favicons.py` | new — reproducible favicon generation |

---

## Verifying after deploy

After deploying these changes, walk through this list before assuming the
fix is live. Each row maps to a Google signal that can independently break.

### Local / build-time

```bash
# Square icons
file app/icon.png app/apple-icon.png public/favicon.ico
# Expect: 512 x 512, 180 x 180, multi-icon ICO with 16x16/32x32/48x48...

# Build is clean
pnpm build
```

### Against the running app (production or `pnpm start` locally)

```bash
# Bare / serves HR content with 200 (not 30x)
curl -s -o /dev/null -w "%{http_code}\n" https://www.hotfix-doo.com/

# Old /hr/* URLs 308-redirect to unprefixed equivalents
curl -s -o /dev/null -w "%{http_code} %{redirect_url}\n" https://www.hotfix-doo.com/hr
curl -s -o /dev/null -w "%{http_code} %{redirect_url}\n" https://www.hotfix-doo.com/hr/o-nama

# EN paths unchanged
curl -s -o /dev/null -w "%{http_code}\n" https://www.hotfix-doo.com/en/about

# WebSite schema on the bare root
curl -s https://www.hotfix-doo.com/ \
  | grep -oE '<script[^>]*application/ld\+json[^>]*>.*?</script>' \
  | head -1
# Expect: WebSite block with name="HOTFIX d.o.o." and alternateName
#         containing "hotfix-doo.com"

# Canonical points at bare root
curl -s https://www.hotfix-doo.com/ | grep canonical
# Expect: <link rel="canonical" href="https://www.hotfix-doo.com"/>

# Icon link tags auto-emitted by Next.js
curl -s https://www.hotfix-doo.com/ | grep -oE '<link[^>]*icon[^>]*>'
# Expect: rel="icon" href="/icon.png" sizes="512x512" type="image/png"
#         rel="apple-touch-icon" href="/apple-icon.png" sizes="180x180" type="image/png"
```

### Google-side

- **Rich Results Test**
  [search.google.com/test/rich-results](https://search.google.com/test/rich-results) —
  inspect `https://www.hotfix-doo.com/`. WebSite, Organization, and
  ProfessionalService schemas should all parse without errors.
- **Google Search Console** → URL Inspection on
  `https://www.hotfix-doo.com/`, `/o-nama`, `/en`. Click *Request Indexing*
  on the canonical home page so Google re-crawls quickly.
- **Favicon cache** — Google associates favicons with the URL declaring
  them. The new `/icon.png` is a new URL Google has never cached, which
  forces a fresh fetch:

  ```bash
  curl -sL "https://t0.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=http://www.hotfix-doo.com&size=64" -o /tmp/g.png && file /tmp/g.png
  ```

  After 3–7 days the response should be a 64×64 PNG of the orange Z mark,
  not a 32×18 letterboxed smear.

### Timing expectations

- **Favicon**: 3–7 days for Google's image cache to refresh once the page
  is recrawled. Sometimes up to 4 weeks.
- **Site name**: A few days to several weeks. Subdirectory-induced
  fallbacks tend to be cached aggressively. If Search Console shows the
  new canonical home page recrawled but the SERP still says `hotfix-doo.com`,
  give it three weeks before further action.

---

## Things still owed (outside this codebase)

### 1. Vercel: change apex → www redirect from 307 to 308

This is set in the **Vercel dashboard**, not in code:

Project → Settings → Domains → `hotfix-doo.com` → Edit → set redirect
type to **Permanent (308)**.

Google's redirect doc:

> 301/308 are the only "permanent" signals that "display the new target
> URL in search results."

A 307 keeps `hotfix-doo.com` as a separate canonical from
`www.hotfix-doo.com` in Google's view, splitting the signal cluster.

Verify after toggling:

```bash
curl -sI https://hotfix-doo.com/ | head -3
# Expect HTTP/2 308 (or 301), not 307
```

### 2. Strengthen external brand signal (slow, ongoing)

The site-name model also weighs how external sites refer to the entity:

- LinkedIn company page named exactly `HOTFIX d.o.o.` Once it exists,
  add the URL to `ORG_SAME_AS` in `lib/structuredData.ts:11` (currently
  commented out). Same for GitHub org and any Croatian business
  directories (Crunchbase, Bisnode, etc.).
- A Google Business Profile is one of the strongest entity signals
  Google has — if HOTFIX operates as a local business at any address,
  this dramatically improves both the Knowledge Panel surface and
  site-name confidence.

---

## How to regenerate favicons in the future

If the brand mark ever changes:

1. Update `public/logo.png` with the new master logo.
2. Run:

   ```bash
   python3 scripts/make-favicons.py
   ```

3. Rebuild and verify (`pnpm build`, then the curl checks in
   [Verifying after deploy](#verifying-after-deploy)).
4. If Google has aggressively cached the old favicon, **rename the icon
   file** (e.g. `app/icon-v2.png`). Next.js will emit a new URL, and
   Google will fetch fresh — this is the most reliable cache-bust.

---

## References

- [Site Names in Google Search](https://developers.google.com/search/docs/appearance/site-names)
- [Favicon in Google Search](https://developers.google.com/search/docs/appearance/favicon-in-search)
- [Organization structured data](https://developers.google.com/search/docs/appearance/structured-data/organization)
- [Redirects and Google Search](https://developers.google.com/search/docs/crawling-indexing/301-redirects)
- [Next.js file-based metadata (app icons)](https://nextjs.org/docs/app/api-reference/file-conventions/metadata/app-icons)
- [next-intl `localePrefix` options](https://next-intl.dev/docs/routing#locale-prefix)
