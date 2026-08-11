---
version: 2.0.0
name: Nguyen-An-Corporate-Design-System
description: "High-end corporate manufacturing design system for NGUYEN AN CO., LTD. Built on crisp white/ice-blue canvas (#ffffff, #f4f8fc), deep ocean navy (#0b3558, #061e33), and signature corporate blue (#1c7dc7). Incorporates hairline glass borders, dark-gradient image overlays for 100% text legibility, GSAP scroll micro-interactions, and SVG vector iconography."

# ============================================================
# 1. COLOR
# ============================================================
colors:
  primary: "#1c7dc7"
  primary-hover: "#1464a3"
  primary-active: "#0f4d7d"
  primary-light: "#48a0e5"
  primary-accent: "#00a3e0"
  primary-ice: "#f0f7fc"
  dark-navy: "#0b3558"
  dark-deep: "#061e33"

  canvas: "#ffffff"
  canvas-subtle: "#f8fafc"
  canvas-ice: "#f4f8fc"

  surface-card: "#ffffff"
  surface-dark: "#0b3558"
  surface-dark-elevated: "#061e33"

  ink: "#0f172a"
  ink-muted: "#475569"
  ink-subtle: "#94a3b8"
  ink-inverse: "#ffffff"
  ink-inverse-muted: "rgba(255, 255, 255, 0.72)"

  hairline: "rgba(28, 125, 199, 0.15)"
  hairline-strong: "rgba(28, 125, 199, 0.35)"
  hairline-dark: "rgba(255, 255, 255, 0.15)"

  status-success: "#10b981"
  status-success-bg: "#ecfdf5"
  status-warning: "#f59e0b"
  status-warning-bg: "#fffbeb"
  status-error: "#ef4444"
  status-error-bg: "#fef2f2"
  status-accent: "#0284c7"

  focus-ring: "#00a3e0"

# ============================================================
# 2. TYPOGRAPHY
# ============================================================
typography:
  font-family-display: "'Gilroy', 'Plus Jakarta Sans', system-ui, -apple-system, sans-serif"
  font-family-body: "'Gilroy', 'Plus Jakarta Sans', system-ui, -apple-system, sans-serif"
  font-family-mono: "'JetBrains Mono', 'SF Mono', monospace"

  scale:
    display-xl: "font-size: 56px; line-height: 1.1; font-weight: 800; letter-spacing: -0.02em;"
    display-lg: "font-size: 40px; line-height: 1.15; font-weight: 800; letter-spacing: -0.01em;"
    display-md: "font-size: 32px; line-height: 1.2; font-weight: 700; letter-spacing: -0.01em;"
    heading-lg: "font-size: 28px; line-height: 1.25; font-weight: 700;"
    heading-md: "font-size: 24px; line-height: 1.25; font-weight: 700;"
    heading-sm: "font-size: 20px; line-height: 1.3; font-weight: 700;"
    body-lg: "font-size: 17px; line-height: 1.6; font-weight: 400;"
    body-md: "font-size: 15px; line-height: 1.6; font-weight: 400;"
    body-sm: "font-size: 13px; line-height: 1.55; font-weight: 400;"
    caption-sm: "font-size: 12px; line-height: 1.4; font-weight: 700; letter-spacing: 0.05em; text-transform: uppercase;"
    label-sm: "font-size: 13px; line-height: 1.4; font-weight: 600; letter-spacing: 0.01em;"

  responsive-clamp:
    display-xl: "font-size: clamp(34px, 4vw + 1rem, 56px);"
    display-lg: "font-size: clamp(28px, 3vw + 1rem, 40px);"
    display-md: "font-size: clamp(24px, 2.4vw + 1rem, 32px);"

# ============================================================
# 3. SPACING & GRID
# ============================================================
spacing:
  scale:
    "0": "0px"
    "1": "4px"
    "2": "8px"
    "3": "12px"
    "4": "16px"
    "5": "20px"
    "6": "24px"
    "8": "32px"
    "10": "40px"
    "12": "48px"
    "16": "64px"
    "20": "80px"
    "24": "96px"
    "32": "128px"

  section-padding:
    mobile: "64px 20px"
    tablet: "88px 40px"
    desktop: "120px 80px"

  container:
    max-width: "1440px"
    max-width-narrow: "960px"  # copy-heavy sections (about, policy)
    max-width-wide: "1440px"   # full-bleed manufacturing / gallery sections
    gutter-desktop: "80px"
    gutter-tablet: "40px"
    gutter-mobile: "20px"

  radius:
    sm: "8px"
    md: "12px"
    lg: "16px"
    xl: "24px"
    pill: "999px"
    card-default: "16px"

breakpoints:
  mobile: "0 – 639px"
  tablet: "640px – 1023px"
  desktop: "1024px – 1439px"
  wide: "1440px+"
  media-queries:
    tablet-up: "@media (min-width: 640px)"
    desktop-up: "@media (min-width: 1024px)"
    wide-up: "@media (min-width: 1440px)"

layout-grid:
  desktop: "12-column, 24px gap, 80px outer margin"
  tablet: "8-column, 20px gap, 40px outer margin"
  mobile: "4-column, 16px gap, 20px outer margin"

# ============================================================
# 4. EFFECTS
# ============================================================
effects:
  hero-overlay: "background: linear-gradient(to top, rgba(6, 30, 51, 0.9) 0%, rgba(6, 30, 51, 0.4) 50%, rgba(0, 0, 0, 0) 100%);"
  hero-overlay-full: "background: linear-gradient(180deg, rgba(6,30,51,0.55) 0%, rgba(6,30,51,0.75) 100%);"  # for text-on-image cards with full-height copy
  glass-nav: "background: rgba(255, 255, 255, 0.88); backdrop-filter: blur(16px); border-bottom: 1px solid rgba(28, 125, 199, 0.1);"
  glass-card: "background: rgba(255, 255, 255, 0.95); backdrop-filter: blur(12px); border: 1px solid rgba(28, 125, 199, 0.15);"
  glass-card-dark: "background: rgba(11, 53, 88, 0.55); backdrop-filter: blur(12px); border: 1px solid rgba(255, 255, 255, 0.15);"
  card-shadow: "box-shadow: 0 10px 25px -5px rgba(12, 59, 102, 0.1), 0 8px 10px -6px rgba(12, 59, 102, 0.05);"
  card-shadow-elevated: "box-shadow: 0 20px 40px -8px rgba(12, 59, 102, 0.18), 0 10px 16px -6px rgba(12, 59, 102, 0.08);"
  hover-lift: "transition: transform 0.35s cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 0.35s ease; transform: translateY(-6px);"
  focus-ring: "outline: none; box-shadow: 0 0 0 3px rgba(0, 163, 224, 0.35);"

# ============================================================
# 5. ICONOGRAPHY
# ============================================================
icons:
  style: "Outline-first, 1.75px stroke, rounded joins/caps, 24x24 viewBox as the base unit"
  sizes:
    xs: "16px  (stroke-width: 1.5px) — inline with caption/label text"
    sm: "20px  (stroke-width: 1.75px) — inline with body text, form fields"
    md: "24px  (stroke-width: 1.75px) — nav items, buttons, list bullets"
    lg: "32px  (stroke-width: 2px)   — feature/service cards"
    xl: "48px  (stroke-width: 2px)   — hero stat icons, empty states"
  color-usage: "Icons inherit currentColor by default; use primary (#1c7dc7) for interactive/active icons, ink-muted (#475569) for static/decorative icons, ink-inverse on dark-navy surfaces."
  rule: "Never use emoji characters in production UI. Every icon is a hand-set inline SVG (no icon-font, no external sprite fetch) sized via the scale above, so stroke-width stays crisp at every zoom level."
  construction: "Build icons on a 24x24 grid with 2px live-area padding on all sides so icons align optically inside 40px/48px touch targets."

# ============================================================
# 6. MOTION
# ============================================================
motion:
  durations:
    instant: "100ms"   # micro state changes: checkbox check, input focus
    fast: "200ms"       # hover states, tooltips
    base: "350ms"        # card lift, modal open, accordion
    slow: "600ms"        # section reveals, hero entrance
    counter: "1400ms"    # stat counters (GSAP)
  easings:
    standard: "cubic-bezier(0.4, 0, 0.2, 1)"       # general UI transitions
    overshoot: "cubic-bezier(0.34, 1.56, 0.64, 1)"  # hover-lift, playful emphasis
    decel: "cubic-bezier(0, 0, 0.2, 1)"              # entrances (elements arriving)
    accel: "cubic-bezier(0.4, 0, 1, 1)"              # exits (elements leaving)
  gsap-patterns:
    card-entry-reveal: "gsap.from(card, { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out', scrollTrigger: { trigger: card, start: 'top 85%' } })"
    stagger-grid: "gsap.from('.card', { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.5, stagger: 0.08, ease: 'power2.out', scrollTrigger: { trigger: grid, start: 'top 80%' } })"
    stat-counter: "gsap.to(counterEl, { innerText: target, duration: 1.4, snap: { innerText: 1 }, ease: 'power1.out', scrollTrigger: { trigger: counterEl, start: 'top 90%', once: true } })"
    progress-bar-fill: "gsap.to(bar, { width: '{value}%', duration: 1.2, ease: 'power2.out', scrollTrigger: { trigger: bar, start: 'top 85%', once: true } })"
    nav-on-scroll: "ScrollTrigger to toggle .glass-nav (transparent → blurred white) once scrollY > 80px; transition background/border over 250ms."
  reduced-motion: "Wrap every ScrollTrigger/GSAP animation in a check against `window.matchMedia('(prefers-reduced-motion: reduce)').matches`; when true, set end-state styles directly with duration: 0 (no transform/opacity animation, content still appears)."

# ============================================================
# 7. IMAGE TREATMENT
# ============================================================
imagery:
  aspect-ratios:
    hero: "16:9 (desktop), 4:5 (mobile crop)"
    product-card: "4:3"
    facility-gallery: "3:2"
    portrait-leadership: "1:1"
    logo-lockup: "auto, max-height constrained"
  rules:
    - "Every image behind text uses `hero-overlay` or `hero-overlay-full` — never place text directly on an un-treated photo."
    - "Photography is desaturated -10% and color-graded 2% toward dark-navy to unify factory/product photos shot under different lighting."
    - "Product/close-up shots get a 1px hairline border (hairline token) at 12px radius; environmental/factory shots are full-bleed, no border."
    - "Use `loading=\"lazy\"` and explicit width/height (or aspect-ratio CSS) on every non-hero image to prevent layout shift."
    - "Provide a low-color placeholder (solid canvas-ice or a blurred 20px thumbnail) while the full asset loads."
  crop-guidance: "Crop for the story, not just the frame: leadership portraits crop tight to shoulders-up; facility photos preserve environmental context (machinery + scale reference); product shots isolate on ice/white."

# ============================================================
# 8. COMPONENTS
# ============================================================
components:

  button:
    primary:
      default: "background: #1c7dc7; color: #ffffff; padding: 12px 24px; border-radius: 8px; font: label-sm; border: none;"
      hover: "background: #1464a3; transform: translateY(-2px); box-shadow: card-shadow;"
      active: "background: #0f4d7d; transform: translateY(0);"
      disabled: "background: #94a3b8; color: rgba(255,255,255,0.7); cursor: not-allowed; transform: none;"
      focus: "focus-ring token applied on :focus-visible"
    secondary:
      default: "background: transparent; color: #1c7dc7; padding: 12px 24px; border-radius: 8px; border: 1px solid hairline-strong;"
      hover: "background: primary-ice; border-color: #1c7dc7;"
      disabled: "color: #94a3b8; border-color: #e2e8f0; cursor: not-allowed;"
    ghost-on-dark:
      default: "background: transparent; color: #ffffff; border: 1px solid hairline-dark; padding: 12px 24px; border-radius: 8px;"
      hover: "background: rgba(255,255,255,0.08); border-color: rgba(255,255,255,0.35);"
    sizes:
      sm: "padding: 8px 16px; font-size: 13px;"
      md: "padding: 12px 24px; font-size: 15px;"
      lg: "padding: 16px 32px; font-size: 16px;"
    icon-button:
      default: "40x40px square, 8px radius, icon centered at md (24px) size"

  input-field:
    default: "height: 48px; padding: 0 16px; border: 1px solid #e2e8f0; border-radius: 8px; background: #ffffff; font: body-md; color: ink;"
    focus: "border-color: #1c7dc7; box-shadow: focus-ring;"
    error: "border-color: status-error; background: status-error-bg;"
    disabled: "background: canvas-subtle; color: ink-subtle; cursor: not-allowed;"
    label: "label-sm typography, ink-muted, 8px margin-bottom"
    helper-text: "body-sm, ink-subtle, 6px margin-top; switches to status-error color on error state"

  badge:
    default: "display: inline-flex; align-items: center; gap: 6px; padding: 4px 10px; border-radius: pill; font: caption-sm; background: primary-ice; color: primary;"
    success: "background: status-success-bg; color: #047857;"
    warning: "background: status-warning-bg; color: #b45309;"
    on-dark: "background: rgba(255,255,255,0.12); color: #ffffff;"

  tag:
    default: "padding: 6px 14px; border-radius: pill; border: 1px solid hairline; font: label-sm; color: ink-muted; background: transparent;"
    selected: "border-color: #1c7dc7; color: #1c7dc7; background: primary-ice;"

  card:
    surface: "glass-card token; radius: card-default (16px); card-shadow; padding: 32px"
    interactive: "adds hover-lift on :hover; card-shadow-elevated on hover"
    dark-variant: "glass-card-dark token on surface-dark background; ink-inverse text"
    anatomy: "icon/image (top) → caption-sm eyebrow → heading-sm title → body-md description → optional link/CTA row"

  stat-counter:
    anatomy: "display-lg number (GSAP counter target) + caption-sm label beneath, 8px gap"
    layout: "grid of 3–4 across desktop, 2 across tablet, 1 across mobile; hairline dividers between items on desktop only"

  tooltip:
    default: "background: dark-deep; color: #ffffff; padding: 8px 12px; border-radius: 8px; font: body-sm; box-shadow: card-shadow; max-width: 240px"
    arrow: "6px CSS triangle, dark-deep, positioned per placement"

  modal:
    overlay: "background: rgba(6, 30, 51, 0.6); backdrop-filter: blur(4px);"
    panel: "background: #ffffff; border-radius: 16px (desktop) / 16px 16px 0 0 (mobile sheet); max-width: 560px; card-shadow-elevated; padding: 40px"
    entry-motion: "opacity 0→1 + scale 0.96→1, 250ms, decel easing; mobile variant slides up from bottom instead of scaling"

  dropdown:
    trigger: "input-field styling + chevron-down icon (sm), rotates 180deg when open (200ms)"
    panel: "background: #ffffff; border: 1px solid hairline; border-radius: 12px; card-shadow; padding: 8px; margin-top: 4px"
    item: "padding: 10px 12px; border-radius: 8px; hover: background primary-ice"

  navigation:
    desktop: "glass-nav token; height: 80px; logo left, nav links center/right, primary CTA button far right; links use label-sm, ink-muted default → primary on hover with 2px underline animating in from center (200ms)"
    mobile: "height: 64px; hamburger icon (24px) opens full-screen glass-nav overlay; links stack at heading-sm size"
    scroll-behavior: "transparent over hero (ink-inverse text) → glass-nav with shadow once scrolled past hero (per motion.nav-on-scroll)"

  footer:
    background: "surface-dark-elevated (#061e33)"
    layout: "4-column grid desktop (brand+address / products / company / contact), collapses to accordion on mobile"
    typography: "links body-sm in ink-inverse-muted, hover to full ink-inverse; column headers caption-sm in primary-light"
    divider: "hairline-dark 1px rule above bottom copyright bar"

  hero-section:
    anatomy: "full-bleed background image/video + hero-overlay → eyebrow badge → display-xl headline → body-lg subhead (max-width 640px) → CTA button row → optional stat-counter strip at bottom edge"
    min-height: "100vh desktop, 85vh mobile (avoid mobile browser chrome jump)"

  progress-bar:
    track: "height: 8px; border-radius: pill; background: canvas-ice"
    fill: "background: linear-gradient(90deg, #1c7dc7, #00a3e0); border-radius: pill; animates width via GSAP progress-bar-fill pattern"

# ============================================================
# 9. ACCESSIBILITY
# ============================================================
accessibility:
  contrast:
    - "Body text (ink #0f172a) on canvas (#ffffff): 16.1:1 — passes AAA."
    - "ink-inverse (#ffffff) on dark-navy (#0b3558): 11.9:1 — passes AAA."
    - "primary (#1c7dc7) on white for text/icons smaller than 18px must be checked: raw ratio is ~3.1:1 (fails AA for small text). Use primary only for large text (≥18px/bold) or non-text UI (icons, borders); for small interactive text on white, use primary-hover (#1464a3) instead, which reaches 4.6:1."
    - "ink-inverse-muted (rgba(255,255,255,0.72)) on surface-dark: verify ≥4.5:1 at actual size; drop opacity to 0.85+ if used below 15px."
  focus-states: "Every interactive element (button, link, input, card-as-link) must show the `focus-ring` token on :focus-visible — never remove outline without replacing it."
  motion: "All GSAP ScrollTrigger animations respect prefers-reduced-motion (see motion.reduced-motion)."
  semantics: "Use real <button>/<a> elements for actions/navigation, not styled <div>s with onClick. Icon-only buttons require aria-label. Decorative SVG icons get aria-hidden='true'; meaningful icons (e.g., status indicators) get a visible or sr-only text label."
  targets: "Minimum tappable area 40x40px (icon-button), 44x44px preferred on mobile nav items."

# ============================================================
# 10. RULES (Do / Don't)
# ============================================================
rules:
  - do: "Use pixel-perfect inline SVG vector icons at the sizes defined in `icons.sizes`."
    dont: "Never use emoji characters or icon-font glyphs in production UI."
  - do: "Always add a dark gradient overlay (hero-overlay / hero-overlay-full) on any background image carrying text."
    dont: "Never set text color to ink-inverse directly on a raw, un-treated photograph."
  - do: "Maintain the strict corporate blue (#1c7dc7) + crisp white palette for primary branding moments (header CTA, key stats, links)."
    dont: "Don't introduce a second accent hue outside `colors.status-*` for anything except status/system feedback."
  - do: "Use GSAP ScrollTrigger for card entry reveals, stat counters, and progress-bar fills, using the durations/easings in `motion`."
    dont: "Don't animate more than one orchestrated moment per viewport at once — stagger, don't stack, competing motions."
  - do: "Use `primary-hover` (#1464a3) for small interactive text/icons on white backgrounds."
    dont: "Don't set small (<18px) body or label text in raw `primary` (#1c7dc7) on white — it fails AA contrast."
  - do: "Build every button, badge, and card state (hover/active/disabled/focus) from the tokens in `components`."
    dont: "Don't hand-roll one-off component styles inline; extend the token set instead if something new is needed."
---
