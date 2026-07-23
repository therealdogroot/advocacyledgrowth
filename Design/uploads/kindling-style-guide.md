# Kindling Design System & Style Guide

Use this reference to ensure the app interface (app.kindlinghq.com) matches the marketing site (kindlinghq.com).

---

## Colors

### Core Palette

| Token | Hex | Usage |
|---|---|---|
| **Background** | `#FFFCF7` | Page background, warm cream/off-white |
| **Card Background** | `#FFFFFF` | Cards, inputs, elevated surfaces |
| **Text Primary** | `#1A1A1A` | Headings, body text, primary content |
| **Text Muted** | `#5A5A5A` | Secondary text, descriptions, labels |
| **Accent** | `#E85D04` | Primary brand orange — buttons, links, highlights, badges |
| **Accent Hover** | `#D45200` | Darker orange for hover/active states |
| **Accent Light** | `#FFF0E6` | Light orange tint — badges, highlighted backgrounds |
| **Border** | `#E5E0D8` | Warm gray — card borders, dividers, section separators |
| **Dark** | `#1A1A1A` | Dark sections (CTA blocks, table headers) |

### Dark Section Colors (CTA blocks, dark backgrounds)

| Token | Hex | Usage |
|---|---|---|
| **Background** | `#1A1A1A` | Dark section background |
| **Heading text** | `#FFFFFF` | White headings on dark |
| **Body text** | `rgba(255,255,255,0.65)` | Muted white for paragraphs on dark |
| **Subtle text** | `rgba(255,255,255,0.4)` | Fine print, footnotes on dark |

### Semantic Usage

- **Success/positive**: `#E85D04` (accent orange — we don't use green)
- **Highlighted table column header**: `#E85D04` on dark header row
- **Accent left border** (featured cards): `4px solid #E85D04`
- **Section dividers**: `1px solid #E5E0D8`

---

## Typography

### Font Families

| Role | Font | Fallbacks |
|---|---|---|
| **Display / Headings** | `Fraunces` (Google Fonts) | `Georgia, serif` |
| **Body / UI** | `Inter` (Google Fonts) | `-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif` |
| **Logo** | `Georgia, serif` | (no custom font — just Georgia bold) |

**Google Fonts import:**
```
Fraunces: ital,opsz,wght@0,9..144,400;0,9..144,600;0,9..144,700;1,9..144,400
Inter: wght@400;500;600
```

### Type Scale

| Element | Font | Size | Weight | Line Height | Letter Spacing |
|---|---|---|---|---|---|
| **H1 (hero)** | Fraunces/Georgia | `3.25rem` (58.5px) | 700 | 1.12 | `-0.025em` |
| **H2 (section)** | Fraunces/Georgia | `2.25rem` (40.5px) | 600 | — | `-0.015em` |
| **H3 (card title)** | Fraunces/Georgia | `1.1–1.25rem` | 600 | — | — |
| **Body** | Inter | `1rem` (18px base) | 400 | 1.7 | — |
| **Body large (lead)** | Inter | `1.15rem` | 400 | 1.65 | — |
| **Body small** | Inter | `0.9rem` | 400 | 1.6 | — |
| **Section label** | Inter | `0.7rem` | 600 | — | `0.12em`, uppercase |
| **Badge** | Inter | `0.85rem` | 600 | — | `0.08em`, uppercase |
| **Nav link** | Inter | `0.875rem` | 500 | — | — |
| **Button text** | Inter | `0.95rem` | 600 | — | — |
| **Fine print** | Inter | `0.8rem` | 400 | — | — |
| **Stat number** | Fraunces/Georgia | `2.5rem` | 700 | 1 | — |

### Base Font Size

- Desktop: `18px`
- Mobile (<=768px): `16px`

---

## Buttons

### Primary Button

```css
background: #E85D04;
color: #FFFFFF;
padding: 0.9rem 2rem;
font-size: 0.95rem;
font-weight: 600;
border-radius: 6px;
```

**Hover:**
```css
background: #D45200;
transform: translateY(-2px);
box-shadow: 0 6px 20px rgba(232, 93, 4, 0.3);
```

### Secondary Button (ghost/outline)

```css
background: transparent;
color: #1A1A1A;
padding: 0.9rem 2rem;
font-size: 0.95rem;
font-weight: 500;
border: 1px solid #E5E0D8;
border-radius: 6px;
```

**Hover:**
```css
border-color: #5A5A5A;
background: #FFFFFF;
```

### Nav CTA (small primary)

```css
background: #E85D04;
color: #FFFFFF;
padding: 0.5rem 1.25rem;
font-size: 0.875rem;
font-weight: 600;
border-radius: 6px;
```

### Nav CTA Alternate (outline, used on content pages)

```css
background: transparent;
color: #E85D04;
padding: 0.5rem 1rem;
font-size: 0.875rem;
font-weight: 500;
border: 1px solid #E85D04;
border-radius: 4px;
```

**Hover:**
```css
background: #E85D04;
color: #FFFFFF;
```

---

## Cards

### Standard Card

```css
background: #FFFFFF;
border: 1px solid #E5E0D8;
border-radius: 8px;
padding: 2rem;
```

### Featured/Highlighted Card

```css
background: #FFFFFF;
border: 1px solid #E5E0D8;
border-left: 4px solid #E85D04;
border-radius: 8px;
padding: 2rem;
```

### Definition Box (callout)

```css
background: #FFFFFF;
border: 1px solid #E5E0D8;
border-left: 4px solid #E85D04;
border-radius: 0 8px 8px 0;
padding: 2rem 2.5rem;
```

---

## Layout

### Max Widths

| Context | Width |
|---|---|
| **Content (articles, text)** | `720px` |
| **Wide (grids, nav, sections)** | `960px` |

### Spacing

- Section padding: `5rem 2rem` (desktop), `3.5rem 1.5rem` (mobile)
- Card padding: `2rem`
- Grid gaps: `1.5rem` (cards), `2rem` (steps)
- Section borders: `1px solid #E5E0D8` top border between sections

### Grid Patterns

- 3-column: problem cards, steps, trust stats
- 2-column: comparison cards, results grid
- All collapse to 1-column at `<=768px`

---

## Navigation

### Sticky Nav Bar

```css
padding: 1.5rem 2rem;
border-bottom: 1px solid #E5E0D8;
background: rgba(255, 252, 247, 0.95);
backdrop-filter: blur(12px);
position: sticky;
top: 0;
z-index: 100;
```

- Logo: Georgia serif, 700 weight, `1.25rem`, color `#1A1A1A`
- Nav links: Inter, 500 weight, `0.875rem`, color `#5A5A5A`, hover `#1A1A1A`
- Nav links hidden on mobile (<=768px) — only logo + CTA shown

---

## Tables

### Comparison Table

- Header row: `background: #1A1A1A`, white text, `0.8rem`, 600 weight
- Highlighted column header: `background: #E85D04`
- Top-left corner radius: `8px`, top-right corner radius: `8px`
- Cell padding: `1rem 1.25rem`
- Row divider: `1px solid #E5E0D8`
- Even rows: `background: #FFFFFF`
- First column (labels): 500 weight, `#5A5A5A`
- Second column (Kindling): 500 weight, `#1A1A1A`

---

## Blockquotes

```css
border-left: 3px solid #E85D04;
padding-left: 1.5rem;
font-family: Georgia, serif;  /* Fraunces on marketing site */
font-size: 1.15rem;
font-style: italic;
color: #5A5A5A;
```

### Pull Quote (centered, larger)

```css
font-family: Georgia, serif;
font-size: 1.5rem;
font-style: italic;
line-height: 1.5;
color: #1A1A1A;
text-align: center;
```

---

## Form Inputs (from calculator pages)

```css
background: #FFFFFF;
border: 1px solid #E5E0D8;
border-radius: 6px;
padding: 0.75rem 1rem;
font-size: 0.95rem;
color: #1A1A1A;
font-family: Inter, sans-serif;
```

**Focus:**
```css
border-color: #E85D04;
outline: none;
box-shadow: 0 0 0 3px rgba(232, 93, 4, 0.1);
```

---

## Badges & Labels

### Section Label (eyebrow text)

```css
font-size: 0.7rem;
font-weight: 600;
letter-spacing: 0.12em;
text-transform: uppercase;
color: #E85D04;
```

### Pill Badge

```css
font-size: 0.85rem;
font-weight: 600;
letter-spacing: 0.08em;
text-transform: uppercase;
color: #E85D04;
background: #FFF0E6;
padding: 0.5rem 1.25rem;
border-radius: 100px;
```

---

## Step Indicators (numbered circles)

```css
width: 2.25rem;
height: 2.25rem;
background: #E85D04;
color: #FFFFFF;
border-radius: 50%;
font-size: 0.875rem;
font-weight: 700;
display: flex;
align-items: center;
justify-content: center;
```

---

## Animations

### Hero Fade-Up (respects prefers-reduced-motion)

```css
@media (prefers-reduced-motion: no-preference) {
  opacity: 0;
  transform: translateY(20px);
  animation: fadeUp 0.6s ease forwards;
}
```

Stagger delays: 0s, 0.1s, 0.2s, 0.3s, 0.4s for sequential elements.

### Hover Transitions

- Buttons: `transition: transform 0.2s, box-shadow 0.2s, background 0.2s`
- Links: `transition: color 0.2s`
- Nav CTA: `transition: background 0.2s, transform 0.15s`

---

## Rendering

```css
-webkit-font-smoothing: antialiased;
line-height: 1.7;  /* base body */
```

---

## Quick Reference: Most Used Values

```
Background:      #FFFCF7
Card:            #FFFFFF
Text:            #1A1A1A
Text muted:      #5A5A5A
Accent:          #E85D04
Accent hover:    #D45200
Accent light:    #FFF0E6
Border:          #E5E0D8
Dark bg:         #1A1A1A
Border radius:   6px (buttons), 8px (cards), 100px (pills)
Display font:    Fraunces / Georgia, serif
Body font:       Inter / system sans-serif
Base size:       18px desktop, 16px mobile
Max width:       960px (wide), 720px (content)
```
