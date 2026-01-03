# Changelog

All notable changes to the "Which AI" project will be documented in this file.

## [2.0.0] - 2026-01-04

### 🚀 Major Features & Enhancements
- **Infinite Scroll & Server-Side Pagination:** Replaced client-side pagination with a robust server-side implementation. The "Tools Directory" now supports infinite scrolling, loading 24 items at a time for optimal performance.
- **Advanced Search & Filtering:** Implemented server-side debounced search and filtering by category and pricing. This ensures scalability as the database grows to thousands of tools.
- **Enhanced Share Functionality:** Introduced a new, premium "Share Modal" on tool detail pages. Users can now:
  - Copy the tool URL with visual feedback.
  - Share directly to **WhatsApp, Twitter/X, LinkedIn, and Facebook**.
  - Enjoy a sleek, dark-themed backdrop with smooth animations.

### 🎨 UI/UX Redesign
- **Premium Dark Aesthetics:** Refined the entire application with a "Deep Midnight" theme, utilizing standard Tailwind colors (slate-950) and glassmorphism (backdrops, blurs).
- **Clean Tool Cards:** Removed the rating system from tool cards and detail pages for a cleaner, more objective look.
- **Dynamic Feedback:** Added loading indicators ("Loading more intelligence...") and "No results found" empty states to directory pages.

### 📈 Content & Data
- **Massive Database Expansion:** Seeded **100+ high-quality AI tools** across 15+ categories.
- **New Categories Filled:** Populated previously empty sectors including:
  - *Education AI* (Khanmigo, Duolingo)
  - *Finance AI* (BloombergGPT, Cleo)
  - *Healthcare AI* (Ada Health, Merative)
  - *Gaming & VR* (NVIDIA DLSS, Unity Muse)
  - *IoT & Smart Home* (Ecobee, Google Nest)
- **Rich Data:** All new tools feature detailed descriptions, specific **Pros & Cons**, feature tags, and accurate pricing models.

### 🔍 SEO & Technical
- **Dynamic Sitemap:** Added `sitemap.xml` (via `app/sitemap.js`) that automatically generates URLs for all static pages, dynamic tool pages (`/tool/[slug]`), and category pages (`/category/[slug]`).
- **Robots.txt:** Implemented a dynamic `robots.txt` to guide search engine crawlers and secure private API routes.
- **Dynamic Metadata:** Enhanced SEO with dynamic Open Graph image generation, page titles, and meta descriptions for individual tools and categories.

### 🛠 Fixes
- **Share API:** Resolved console errors related to the native Web Share API cancellation (`AbortError`), replacing it with the custom modal for a consistent experience across all devices.
- **Performance:** Optimized API queries with `lean()` and selective field fetching.

---

## [1.0.0] - Initial Release
- Basic directory functionality.
- Client-side filtering.
- Static tool data.
