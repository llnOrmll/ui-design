# Choi's Interior Design - Style Guide

## Table of Contents
1. [Overview](#overview)
2. [Color Palette](#color-palette)
3. [Typography](#typography)
4. [Spacing System](#spacing-system)
5. [Layout System](#layout-system)
6. [Component Styles](#component-styles)
7. [Shadows & Elevation](#shadows--elevation)
8. [Animations & Transitions](#animations--transitions)
9. [Border Radius](#border-radius)
10. [Opacity & Transparency](#opacity--transparency)
11. [Responsive Design](#responsive-design)
12. [Interactive States](#interactive-states)
13. [Tailwind CSS Equivalents](#tailwind-css-equivalents)
14. [Example Components](#example-components)
15. [Best Practices](#best-practices)

---

## Overview

### Design Philosophy
Choi's Interior Design follows a **minimalist, modern architectural aesthetic** with emphasis on:
- Clean, uncluttered layouts
- Generous white space
- Subtle, sophisticated interactions
- Content-first approach
- Timeless elegance

### Key Characteristics
- **Minimalist Color Palette**: Pure black and white with subtle gray accents
- **System Fonts**: Native font stacks for optimal performance and readability
- **Fluid Responsiveness**: Smooth scaling across all device sizes
- **Subtle Animations**: Gentle transitions that enhance without distracting
- **Performance-First**: Optimized rendering with hardware acceleration

### Browser Compatibility
- Modern browsers (Chrome, Firefox, Safari, Edge)
- CSS Grid and Flexbox support required
- Backdrop filter support (graceful degradation)
- Intersection Observer API for lazy loading

---

## Color Palette

### Primary Colors

#### Pure Black
```css
/* Vanilla CSS */
color: #000;

/* Tailwind */
text-black
bg-black
```
**Usage**: Primary text, navigation, headings, borders

#### Pure White
```css
/* Vanilla CSS */
color: #fff;
background: #fff;

/* Tailwind */
text-white
bg-white
```
**Usage**: Background, inverted text

### Neutral Colors

#### Light Gray (Background)
```css
/* Vanilla CSS */
background: #f5f5f5;

/* Tailwind */
bg-gray-100
```
**Usage**: Image placeholder backgrounds, subtle section backgrounds

### Transparent Colors

#### Semi-Transparent White (Header)
```css
/* Vanilla CSS */
background: rgba(255, 255, 255, 0.95);

/* Tailwind */
bg-white/95
```
**Usage**: Header backdrop with glassmorphism effect

#### Subtle Border - 5% Opacity
```css
/* Vanilla CSS */
border: 1px solid rgba(0, 0, 0, 0.05);

/* Tailwind */
border border-black/5
```
**Usage**: Very subtle dividers (header bottom border)

#### Light Border - 10% Opacity
```css
/* Vanilla CSS */
border-bottom: 1px solid rgba(0, 0, 0, 0.1);

/* Tailwind */
border-b border-black/10
```
**Usage**: Section dividers, filter bar

#### Tap Highlight (Mobile)
```css
/* Vanilla CSS */
-webkit-tap-highlight-color: rgba(0, 0, 0, 0);

/* Tailwind */
tap-transparent
```
**Usage**: Remove default mobile tap highlight

### Color Usage Guidelines

| Element | Color | Contrast Ratio |
|---------|-------|----------------|
| Body Text | #000 on #fff | 21:1 (AAA) |
| Headings | #000 on #fff | 21:1 (AAA) |
| Links | #000 on #fff | 21:1 (AAA) |
| Hover States | 60% opacity | 12.6:1 (AAA) |

---

## Typography

### Font Stack

#### System Font Stack
```css
/* Vanilla CSS */
font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto,
             'Helvetica Neue', Arial, sans-serif;

/* Tailwind */
font-sans
```

**Rationale**: Uses native system fonts for:
- Zero latency (no font loading)
- Native OS feel
- Optimal readability
- Better performance

### Font Sizes

#### Logo / Brand
```css
/* Vanilla CSS */
font-size: 11px;
font-weight: 600;
letter-spacing: 1.5px;
text-transform: uppercase;

/* Tailwind */
text-[11px] font-semibold tracking-[1.5px] uppercase
```
**Usage**: Header logo, brand name

#### Page Labels
```css
/* Vanilla CSS */
font-size: 12px;
font-weight: 500;
letter-spacing: 1px;
text-transform: uppercase;

/* Tailwind */
text-xs font-medium tracking-wide uppercase
```
**Usage**: Section labels, category tags

#### Filter & Search Text
```css
/* Vanilla CSS */
font-size: 13px;
font-weight: 500;
letter-spacing: 0.5px;

/* Tailwind */
text-[13px] font-medium tracking-wide
```
**Usage**: Filter controls, interactive elements

#### Navigation Links
```css
/* Vanilla CSS */
font-size: 14px;
font-weight: 400;
letter-spacing: 0.5px;

/* Tailwind */
text-sm font-normal tracking-wide
```
**Usage**: Primary navigation, secondary text

#### Project Titles
```css
/* Vanilla CSS */
font-size: 14px;
font-weight: 400;
letter-spacing: 0.3px;

/* Tailwind */
text-sm font-normal tracking-wide
```
**Usage**: Card titles, list items

#### Mobile Page Title
```css
/* Vanilla CSS */
font-size: 28px;
font-weight: 400;
line-height: 1.3;

/* Tailwind */
text-[28px] font-normal leading-tight
```
**Usage**: Mobile page titles

#### Desktop Page Title (Fluid)
```css
/* Vanilla CSS */
font-size: clamp(32px, 5vw, 56px);
font-weight: 400;
line-height: 1.3;

/* Tailwind */
text-[clamp(32px,5vw,56px)] font-normal leading-tight
/* or custom class: */
.text-title { font-size: clamp(32px, 5vw, 56px); }
```
**Usage**: Main page headings, hero titles

### Font Weight Scale

| Weight | Value | Tailwind | Usage |
|--------|-------|----------|-------|
| Normal | 400 | `font-normal` | Body text, titles, most text |
| Medium | 500 | `font-medium` | Labels, filter text, emphasis |
| Semibold | 600 | `font-semibold` | Logo, strong emphasis |

### Letter Spacing Scale

| Value | Tailwind | Usage |
|-------|----------|-------|
| 0.3px | `tracking-wide` | Project titles |
| 0.5px | `tracking-wide` | Navigation, filters |
| 1px | `tracking-wide` | Page labels |
| 1.5px | `tracking-[1.5px]` | Logo |

### Line Height

```css
/* Page Titles */
line-height: 1.3;

/* Tailwind */
leading-tight  /* 1.25 */
leading-snug   /* 1.375 */
```

### Typography Best Practices

1. **Hierarchy**: Use size, weight, and letter-spacing together
2. **Readability**: Maintain 1.3-1.5 line height for headings
3. **Consistency**: Stick to 400, 500, 600 weights only
4. **Uppercase**: Only for labels and logo (11-12px sizes)
5. **Letter Spacing**: More spacing for smaller, uppercase text

---

## Spacing System

### CSS Custom Properties

#### Page Margins (Responsive)
```css
/* Vanilla CSS */
:root {
    --page-margin: 6.66667vw;  /* Mobile: ~6.67% of viewport */
    --footer-height: 0;
}

@media only screen and (min-width: 768px) {
    :root {
        --page-margin: 2.32558vw;  /* Desktop: ~2.33% of viewport */
        --footer-height: 76px;
    }
}

/* Usage */
padding: 20px var(--page-margin);

/* Tailwind Equivalent */
px-[6.66667vw] md:px-[2.32558vw]
/* or custom config in tailwind.config.js */
```

### Standard Spacing Values

#### Gap Values
```css
/* 8px - Tight spacing */
gap: 8px;
/* Tailwind: */ gap-2

/* 15px - Small spacing */
margin-bottom: 15px;
/* Tailwind: */ mb-[15px]

/* 20px - Medium spacing */
gap: 20px;
padding: 20px;
/* Tailwind: */ gap-5, p-5

/* 30px - Large spacing */
gap: 30px;
margin-bottom: 30px;
/* Tailwind: */ gap-[30px], mb-[30px]

/* 40px - Extra large spacing */
gap: 40px;
margin-bottom: 40px;
/* Tailwind: */ gap-10, mb-10

/* 60px - Section spacing */
margin-bottom: 60px;
/* Tailwind: */ mb-[60px]

/* 80px - Large section spacing */
padding-bottom: 80px;
/* Tailwind: */ pb-20

/* 100px - Header offset */
padding-top: 100px;
/* Tailwind: */ pt-[100px]
```

### Spacing Scale Reference

| Size | Value | Tailwind | Usage |
|------|-------|----------|-------|
| XXS | 8px | `gap-2` | Icon-text gap, tight spacing |
| XS | 15px | `gap-[15px]` | Image-title spacing |
| SM | 20px | `gap-5, p-5` | Card grid gap (desktop), padding |
| MD | 30px | `gap-[30px]` | Card grid gap (mobile), section spacing |
| LG | 40px | `gap-10, mb-10` | Nav items, section bottom margin |
| XL | 60px | `mb-[60px]` | Page header bottom margin |
| 2XL | 80px | `pb-20` | Main content bottom padding |
| 3XL | 100px | `pt-[100px]` | Main content top padding (header offset) |

### Spacing Patterns

#### Card Spacing
```css
/* Vanilla CSS */
.project-image {
    margin-bottom: 15px;
}

.projects-grid {
    gap: 30px;  /* Mobile */
}

@media (min-width: 768px) {
    .projects-grid {
        gap: 20px;  /* Desktop */
    }
}

/* Tailwind */
<div class="mb-[15px]"></div>
<div class="grid gap-[30px] md:gap-5"></div>
```

#### Header Padding
```css
/* Vanilla CSS */
header {
    padding: 20px var(--page-margin);
}

/* Tailwind */
<header class="py-5 px-[6.66667vw] md:px-[2.32558vw]"></header>
```

#### Main Content Spacing
```css
/* Vanilla CSS */
main {
    padding-top: 100px;
    padding-left: var(--page-margin);
    padding-right: var(--page-margin);
    padding-bottom: 80px;
}

/* Tailwind */
<main class="pt-[100px] px-[6.66667vw] md:px-[2.32558vw] pb-20"></main>
```

---

## Layout System

### Grid Layout

#### Projects Grid (Responsive Columns)
```css
/* Vanilla CSS */
.projects-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    gap: 30px;
}

/* Responsive breakpoints */
@media (max-width: 480px) {
    grid-template-columns: 1fr;  /* 1 column */
}

@media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);  /* 2 columns */
}

@media (max-width: 968px) and (min-width: 768px) {
    grid-template-columns: repeat(3, 1fr);  /* 3 columns */
}

@media (max-width: 1200px) and (min-width: 768px) {
    grid-template-columns: repeat(4, 1fr);  /* 4 columns */
}

@media (min-width: 768px) {
    grid-template-columns: repeat(5, 1fr);  /* 5 columns */
    gap: 20px;
}

/* Tailwind */
<div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5
            gap-[30px] md:gap-5">
</div>
```

### Flexbox Patterns

#### Header Container
```css
/* Vanilla CSS */
.header-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

/* Tailwind */
<div class="flex justify-between items-center"></div>
```

#### Navigation
```css
/* Vanilla CSS */
nav {
    display: flex;
    align-items: center;
    gap: 40px;
}

@media (max-width: 768px) {
    nav {
        gap: 20px;
    }
}

/* Tailwind */
<nav class="flex items-center gap-10 md:gap-5"></nav>
```

#### Filter Bar
```css
/* Vanilla CSS */
.filter-bar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 40px;
    padding-bottom: 20px;
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
}

@media (max-width: 768px) {
    .filter-bar {
        flex-direction: column;
        align-items: flex-start;
        gap: 15px;
    }
}

/* Tailwind */
<div class="flex flex-col md:flex-row md:justify-between md:items-center
            items-start gap-[15px] md:gap-0 mb-10 pb-5
            border-b border-black/10">
</div>
```

#### Search Box
```css
/* Vanilla CSS */
.search-box {
    display: flex;
    align-items: center;
    gap: 8px;
}

/* Tailwind */
<div class="flex items-center gap-2"></div>
```

---

## Component Styles

### Header Component

#### Fixed Header with Glassmorphism
```css
/* Vanilla CSS */
header {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 1000;
    background: rgba(255, 255, 255, 0.95);
    backdrop-filter: blur(10px);
    padding: 20px var(--page-margin);
    border-bottom: 1px solid rgba(0, 0, 0, 0.05);
}

/* Tailwind */
<header class="fixed top-0 left-0 right-0 z-[1000]
               bg-white/95 backdrop-blur-[10px]
               py-5 px-[6.66667vw] md:px-[2.32558vw]
               border-b border-black/5">
</header>
```

#### Logo Styling
```css
/* Vanilla CSS */
.logo {
    font-size: 11px;
    font-weight: 600;
    letter-spacing: 1.5px;
    text-transform: uppercase;
    color: #000;
    text-decoration: none;
}

/* Tailwind */
<a href="#" class="text-[11px] font-semibold tracking-[1.5px]
                   uppercase text-black no-underline">
    Choi's Interior Design
</a>
```

#### Navigation Links
```css
/* Vanilla CSS */
nav a {
    color: #000;
    text-decoration: none;
    font-size: 14px;
    font-weight: 400;
    letter-spacing: 0.5px;
    transition: opacity 0.3s ease;
}

nav a:hover {
    opacity: 0.6;
}

/* Tailwind */
<a href="#" class="text-sm font-normal tracking-wide text-black
                   no-underline transition-opacity duration-300
                   hover:opacity-60">
    Projects
</a>
```

### Page Header Component

```css
/* Vanilla CSS */
.page-header {
    margin-bottom: 60px;
}

.page-label {
    font-size: 12px;
    font-weight: 500;
    letter-spacing: 1px;
    text-transform: uppercase;
    margin-bottom: 30px;
    color: #000;
}

.page-title {
    font-size: clamp(32px, 5vw, 56px);
    font-weight: 400;
    line-height: 1.3;
    max-width: 900px;
    margin-bottom: 40px;
    color: #000;
}

/* Tailwind */
<div class="mb-[60px]">
    <div class="text-xs font-medium tracking-wide uppercase mb-[30px] text-black">
        Projects
    </div>
    <h1 class="text-[clamp(32px,5vw,56px)] font-normal leading-tight
               max-w-[900px] mb-10 text-black">
        시대를 초월하는 공간 디자인과 미적 가치
    </h1>
</div>
```

### Project Card Component

#### Card Container
```css
/* Vanilla CSS */
.project-card {
    cursor: pointer;
    transition: transform 0.4s ease, opacity 0.3s ease;
    animation: fadeIn 0.6s ease-in;
}

.project-card:hover {
    transform: translateY(-5px);
    opacity: 0.85;
}

/* Tailwind */
<div class="cursor-pointer transition-all duration-400 ease-in-out
            hover:transform hover:-translate-y-[5px] hover:opacity-85
            animate-fadeIn">
</div>

/* Note: fadeIn animation requires custom config in Tailwind */
```

#### Project Image
```css
/* Vanilla CSS */
.project-image {
    width: 100%;
    aspect-ratio: 4 / 3;
    overflow: hidden;
    margin-bottom: 15px;
    background: #f5f5f5;
}

.project-image img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
    transition: transform 0.6s ease;
}

.project-card:hover .project-image img {
    transform: scale(1.05);
}

/* Tailwind */
<div class="w-full aspect-[4/3] overflow-hidden mb-[15px] bg-gray-100">
    <img src="..."
         class="w-full h-full object-cover block
                transition-transform duration-600 ease-in-out
                group-hover:scale-105" />
</div>

/* Note: Add 'group' class to parent .project-card */
```

#### Project Title
```css
/* Vanilla CSS */
.project-title {
    font-size: 14px;
    font-weight: 400;
    color: #000;
    letter-spacing: 0.3px;
}

/* Tailwind */
<h3 class="text-sm font-normal text-black tracking-wide">
    Project Title
</h3>
```

### Filter Bar Component

```css
/* Vanilla CSS */
.filter-bar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 40px;
    padding-bottom: 20px;
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
}

.filter-label {
    font-size: 13px;
    font-weight: 500;
    letter-spacing: 0.5px;
    color: #000;
    cursor: pointer;
    transition: opacity 0.3s ease;
}

.filter-label:hover {
    opacity: 0.6;
}

/* Tailwind */
<div class="flex justify-between items-center mb-10 pb-5
            border-b border-black/10">
    <div class="text-[13px] font-medium tracking-wide text-black
                cursor-pointer transition-opacity duration-300
                hover:opacity-60">
        Filter
    </div>
    <!-- Search box here -->
</div>
```

### Search Box Component

```css
/* Vanilla CSS */
.search-box {
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 13px;
    color: #000;
    cursor: pointer;
    transition: opacity 0.3s ease;
}

.search-box:hover {
    opacity: 0.6;
}

.search-icon {
    width: 16px;
    height: 16px;
}

/* Tailwind */
<div class="flex items-center gap-2 text-[13px] text-black
            cursor-pointer transition-opacity duration-300
            hover:opacity-60">
    <svg class="w-4 h-4" viewBox="0 0 24 24"
         fill="none" stroke="currentColor" stroke-width="2">
        <circle cx="11" cy="11" r="8"></circle>
        <path d="m21 21-4.35-4.35"></path>
    </svg>
    <span>Search</span>
</div>
```

---

## Shadows & Elevation

### No Traditional Shadows
This design intentionally **avoids box-shadows** for a flat, modern aesthetic. Instead, it uses:

1. **Borders** for subtle definition
2. **Backdrop blur** for depth
3. **Transform** for elevation perception

### Backdrop Filter (Glassmorphism)

```css
/* Vanilla CSS */
header {
    background: rgba(255, 255, 255, 0.95);
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);  /* Safari support */
}

/* Tailwind */
<header class="bg-white/95 backdrop-blur-[10px]"></header>
```

**Usage**: Creates a frosted glass effect on the fixed header

### Subtle Borders Instead of Shadows

```css
/* Very subtle divider */
border-bottom: 1px solid rgba(0, 0, 0, 0.05);
/* Tailwind: */ border-b border-black/5

/* Light divider */
border-bottom: 1px solid rgba(0, 0, 0, 0.1);
/* Tailwind: */ border-b border-black/10
```

### Perceived Elevation Through Transform

```css
/* Vanilla CSS */
.project-card:hover {
    transform: translateY(-5px);
}

/* Tailwind */
hover:-translate-y-[5px]
```

**Effect**: Creates perception of elevation without shadows

---

## Animations & Transitions

### Fade In Animation

#### Keyframe Definition
```css
/* Vanilla CSS */
@keyframes fadeIn {
    from {
        opacity: 0;
        transform: translateY(20px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

.project-card {
    animation: fadeIn 0.6s ease-in;
}

/* Tailwind Config (tailwind.config.js) */
module.exports = {
    theme: {
        extend: {
            keyframes: {
                fadeIn: {
                    'from': {
                        opacity: '0',
                        transform: 'translateY(20px)'
                    },
                    'to': {
                        opacity: '1',
                        transform: 'translateY(0)'
                    }
                }
            },
            animation: {
                fadeIn: 'fadeIn 0.6s ease-in'
            }
        }
    }
}

/* Usage: */ animate-fadeIn
```

### Staggered Animation Delays

```css
/* Vanilla CSS */
.project-card:nth-child(1) { animation-delay: 0.05s; }
.project-card:nth-child(2) { animation-delay: 0.1s; }
.project-card:nth-child(3) { animation-delay: 0.15s; }
.project-card:nth-child(4) { animation-delay: 0.2s; }
.project-card:nth-child(5) { animation-delay: 0.25s; }
.project-card:nth-child(6) { animation-delay: 0.3s; }
.project-card:nth-child(7) { animation-delay: 0.35s; }
.project-card:nth-child(8) { animation-delay: 0.4s; }
.project-card:nth-child(9) { animation-delay: 0.45s; }
.project-card:nth-child(10) { animation-delay: 0.5s; }

/* Tailwind - Requires custom classes */
.delay-50 { animation-delay: 0.05s; }
.delay-100 { animation-delay: 0.1s; }
/* ... etc */
```

**Pattern**: Each card delays by 0.05s (50ms) for cascading effect

### Transition Timing

#### Fast Transitions (0.3s)
```css
/* Vanilla CSS */
transition: opacity 0.3s ease;

/* Tailwind */
transition-opacity duration-300 ease-in-out
```
**Usage**: Hover states, opacity changes

#### Medium Transitions (0.4s)
```css
/* Vanilla CSS */
transition: transform 0.4s ease;

/* Tailwind */
transition-transform duration-[400ms] ease-in-out
```
**Usage**: Card hover transform

#### Slow Transitions (0.6s)
```css
/* Vanilla CSS */
transition: transform 0.6s ease;

/* Tailwind */
transition-transform duration-[600ms] ease-in-out
```
**Usage**: Image scale effect

#### Combined Transitions
```css
/* Vanilla CSS */
transition: transform 0.4s ease, opacity 0.3s ease;

/* Tailwind */
transition-all duration-400 ease-in-out
```

### Performance Optimization

#### Hardware Acceleration
```css
/* Already applied in base reset */
-webkit-backface-visibility: hidden;
backface-visibility: hidden;

/* Tailwind Config */
.hardware-accelerate {
    -webkit-backface-visibility: hidden;
    backface-visibility: hidden;
}
```

**Properties that trigger GPU acceleration**:
- `transform`
- `opacity`
- `filter`
- `backdrop-filter`

**Avoid animating**:
- `width`, `height`
- `top`, `left`, `right`, `bottom`
- `margin`, `padding`

---

## Border Radius

### Flat Design Approach
This design **intentionally avoids border-radius** for a clean, architectural aesthetic.

- **No rounded corners** on cards
- **No rounded corners** on images
- **No rounded corners** on buttons

### When to Use Border Radius
If you need to add border radius for new components:

```css
/* Subtle rounding */
border-radius: 2px;
/* Tailwind: */ rounded-sm

/* Small rounding */
border-radius: 4px;
/* Tailwind: */ rounded

/* Medium rounding */
border-radius: 8px;
/* Tailwind: */ rounded-lg
```

**Recommendation**: Keep it minimal (2-4px max) to maintain design consistency

---

## Opacity & Transparency

### Opacity Values

#### Hover State - 60% Opacity
```css
/* Vanilla CSS */
opacity: 0.6;

/* Tailwind */
opacity-60
hover:opacity-60
```
**Usage**: Hovered navigation links, filter controls, search box

#### Hover State - 85% Opacity
```css
/* Vanilla CSS */
opacity: 0.85;

/* Tailwind */
opacity-85
hover:opacity-85
```
**Usage**: Hovered project cards

#### Header Background - 95% Opacity
```css
/* Vanilla CSS */
background: rgba(255, 255, 255, 0.95);

/* Tailwind */
bg-white/95
```
**Usage**: Semi-transparent header for glassmorphism

### Transparent Colors

#### Border Opacity
```css
/* 5% opacity - Very subtle */
rgba(0, 0, 0, 0.05)
/* Tailwind: */ border-black/5

/* 10% opacity - Subtle */
rgba(0, 0, 0, 0.1)
/* Tailwind: */ border-black/10
```

#### Background Opacity
```css
/* 95% opacity - Nearly opaque */
rgba(255, 255, 255, 0.95)
/* Tailwind: */ bg-white/95
```

#### Tap Highlight (Remove)
```css
/* Vanilla CSS */
-webkit-tap-highlight-color: rgba(0, 0, 0, 0);

/* Tailwind */
tap-transparent
```

### Opacity Usage Guidelines

| Element | Opacity | Purpose |
|---------|---------|---------|
| Header background | 95% | Glassmorphism effect |
| Nav hover | 60% | Subtle feedback |
| Card hover | 85% | Gentle emphasis |
| Border (subtle) | 5% | Barely visible divider |
| Border (normal) | 10% | Visible but soft divider |
| Tap highlight | 0% | Remove mobile highlight |

---

## Responsive Design

### Breakpoint System

```css
/* Mobile First Approach */

/* Extra Small: < 480px */
/* 1 column grid */

/* Small: 480px - 768px */
@media (max-width: 768px)
/* 2 column grid on mobile */

/* Medium: 768px - 968px */
@media (max-width: 968px) and (min-width: 768px)
/* 3 column grid */

/* Large: 968px - 1200px */
@media (max-width: 1200px) and (min-width: 768px)
/* 4 column grid */

/* Extra Large: > 1200px */
@media (min-width: 768px)
/* 5 column grid */

/* Tailwind Breakpoints */
/* sm: 640px */
/* md: 768px */
/* lg: 1024px */
/* xl: 1280px */
/* 2xl: 1536px */
```

### Custom Breakpoints for This Project

```js
// tailwind.config.js
module.exports = {
    theme: {
        screens: {
            'xs': '480px',
            'sm': '768px',
            'md': '968px',
            'lg': '1200px',
            'xl': '1536px',
        }
    }
}
```

### Responsive Patterns

#### Page Margins
```css
/* Vanilla CSS */
:root {
    --page-margin: 6.66667vw;  /* Mobile: wider margins */
}

@media only screen and (min-width: 768px) {
    :root {
        --page-margin: 2.32558vw;  /* Desktop: narrower margins */
    }
}

/* Tailwind */
px-[6.66667vw] md:px-[2.32558vw]
```

#### Grid Columns
```css
/* Vanilla CSS */
.projects-grid {
    grid-template-columns: 1fr;  /* Mobile default */
}

@media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
}

@media (min-width: 768px) {
    grid-template-columns: repeat(5, 1fr);
}

/* Tailwind */
grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5
```

#### Typography Scaling
```css
/* Vanilla CSS */
.page-title {
    font-size: clamp(32px, 5vw, 56px);  /* Fluid scaling */
}

@media (max-width: 768px) {
    .page-title {
        font-size: 28px;  /* Fixed mobile size */
    }
}

/* Tailwind */
text-[28px] md:text-[clamp(32px,5vw,56px)]
```

#### Navigation Gap
```css
/* Vanilla CSS */
nav {
    gap: 20px;  /* Mobile: tighter */
}

@media (min-width: 768px) {
    nav {
        gap: 40px;  /* Desktop: wider */
    }
}

/* Tailwind */
gap-5 md:gap-10
```

#### Filter Bar Direction
```css
/* Vanilla CSS */
.filter-bar {
    flex-direction: column;  /* Mobile: stack */
    align-items: flex-start;
    gap: 15px;
}

@media (min-width: 768px) {
    .filter-bar {
        flex-direction: row;  /* Desktop: horizontal */
        justify-content: space-between;
        align-items: center;
    }
}

/* Tailwind */
flex flex-col gap-[15px] items-start
md:flex-row md:justify-between md:items-center
```

#### Grid Gap
```css
/* Vanilla CSS */
.projects-grid {
    gap: 30px;  /* Mobile */
}

@media (min-width: 768px) {
    .projects-grid {
        gap: 20px;  /* Desktop */
    }
}

/* Tailwind */
gap-[30px] md:gap-5
```

### Mobile-Specific Adjustments

```css
/* Font sizes smaller on mobile */
@media (max-width: 768px) {
    nav a {
        font-size: 12px;
    }
}

/* Tailwind */
text-xs md:text-sm
```

---

## Interactive States

### Hover States

#### Navigation & Buttons
```css
/* Vanilla CSS */
nav a:hover {
    opacity: 0.6;
}

/* Tailwind */
hover:opacity-60
```

#### Project Cards
```css
/* Vanilla CSS */
.project-card:hover {
    transform: translateY(-5px);
    opacity: 0.85;
}

/* Tailwind */
hover:-translate-y-[5px] hover:opacity-85
```

#### Project Images (Nested)
```css
/* Vanilla CSS */
.project-card:hover .project-image img {
    transform: scale(1.05);
}

/* Tailwind - requires 'group' class on parent */
<div class="group">
    <img class="group-hover:scale-105" />
</div>
```

### Cursor States

```css
/* Clickable elements */
cursor: pointer;
/* Tailwind: */ cursor-pointer
```

### Focus States (Recommended Additions)

```css
/* Vanilla CSS - Add for accessibility */
nav a:focus {
    outline: 2px solid #000;
    outline-offset: 4px;
}

/* Tailwind */
focus:outline-2 focus:outline-black focus:outline-offset-4
```

### Active States (Recommended Additions)

```css
/* Vanilla CSS */
.project-card:active {
    transform: translateY(-3px);
}

/* Tailwind */
active:-translate-y-[3px]
```

---

## Tailwind CSS Equivalents

### Complete Mapping Reference

#### Colors
| Vanilla CSS | Tailwind |
|-------------|----------|
| `color: #000` | `text-black` |
| `color: #fff` | `text-white` |
| `background: #fff` | `bg-white` |
| `background: #f5f5f5` | `bg-gray-100` |
| `rgba(255,255,255,0.95)` | `bg-white/95` |
| `rgba(0,0,0,0.05)` | `border-black/5` or `bg-black/5` |
| `rgba(0,0,0,0.1)` | `border-black/10` or `bg-black/10` |

#### Typography
| Vanilla CSS | Tailwind |
|-------------|----------|
| `font-size: 11px` | `text-[11px]` |
| `font-size: 12px` | `text-xs` |
| `font-size: 13px` | `text-[13px]` |
| `font-size: 14px` | `text-sm` |
| `font-size: 28px` | `text-[28px]` |
| `font-size: clamp(32px,5vw,56px)` | `text-[clamp(32px,5vw,56px)]` |
| `font-weight: 400` | `font-normal` |
| `font-weight: 500` | `font-medium` |
| `font-weight: 600` | `font-semibold` |
| `letter-spacing: 0.3px` | `tracking-wide` |
| `letter-spacing: 0.5px` | `tracking-wide` |
| `letter-spacing: 1px` | `tracking-wide` |
| `letter-spacing: 1.5px` | `tracking-[1.5px]` |
| `text-transform: uppercase` | `uppercase` |
| `line-height: 1.3` | `leading-tight` |
| `text-decoration: none` | `no-underline` |

#### Spacing
| Vanilla CSS | Tailwind |
|-------------|----------|
| `margin-bottom: 15px` | `mb-[15px]` |
| `margin-bottom: 20px` | `mb-5` |
| `margin-bottom: 30px` | `mb-[30px]` |
| `margin-bottom: 40px` | `mb-10` |
| `margin-bottom: 60px` | `mb-[60px]` |
| `padding: 20px` | `p-5` |
| `padding-bottom: 80px` | `pb-20` |
| `padding-top: 100px` | `pt-[100px]` |
| `gap: 8px` | `gap-2` |
| `gap: 20px` | `gap-5` |
| `gap: 30px` | `gap-[30px]` |
| `gap: 40px` | `gap-10` |

#### Layout
| Vanilla CSS | Tailwind |
|-------------|----------|
| `display: flex` | `flex` |
| `display: grid` | `grid` |
| `justify-content: space-between` | `justify-between` |
| `align-items: center` | `items-center` |
| `flex-direction: column` | `flex-col` |
| `grid-template-columns: 1fr` | `grid-cols-1` |
| `grid-template-columns: repeat(2,1fr)` | `grid-cols-2` |
| `aspect-ratio: 4/3` | `aspect-[4/3]` |

#### Positioning
| Vanilla CSS | Tailwind |
|-------------|----------|
| `position: fixed` | `fixed` |
| `top: 0` | `top-0` |
| `left: 0` | `left-0` |
| `right: 0` | `right-0` |
| `z-index: 1000` | `z-[1000]` |

#### Sizing
| Vanilla CSS | Tailwind |
|-------------|----------|
| `width: 100%` | `w-full` |
| `height: 100%` | `h-full` |
| `max-width: 900px` | `max-w-[900px]` |
| `min-height: 100vh` | `min-h-screen` |
| `width: 16px` | `w-4` |
| `height: 16px` | `h-4` |

#### Effects
| Vanilla CSS | Tailwind |
|-------------|----------|
| `backdrop-filter: blur(10px)` | `backdrop-blur-[10px]` |
| `opacity: 0.6` | `opacity-60` |
| `opacity: 0.85` | `opacity-85` |
| `object-fit: cover` | `object-cover` |
| `overflow: hidden` | `overflow-hidden` |

#### Transitions
| Vanilla CSS | Tailwind |
|-------------|----------|
| `transition: opacity 0.3s ease` | `transition-opacity duration-300` |
| `transition: transform 0.4s ease` | `transition-transform duration-[400ms]` |
| `transition: transform 0.6s ease` | `transition-transform duration-[600ms]` |
| `transform: translateY(-5px)` | `-translate-y-[5px]` |
| `transform: scale(1.05)` | `scale-105` |

#### Borders
| Vanilla CSS | Tailwind |
|-------------|----------|
| `border-bottom: 1px solid` | `border-b` |
| `border: 1px solid` | `border` |

#### Hover States
| Vanilla CSS | Tailwind |
|-------------|----------|
| `:hover { opacity: 0.6 }` | `hover:opacity-60` |
| `:hover { transform: translateY(-5px) }` | `hover:-translate-y-[5px]` |
| `:hover { transform: scale(1.05) }` | `hover:scale-105` |

#### Responsive
| Vanilla CSS | Tailwind |
|-------------|----------|
| `@media (min-width: 768px)` | `md:` prefix |
| `@media (max-width: 768px)` | `max-md:` prefix |

---

## Example Components

### 1. Complete Header Component

#### Vanilla CSS Version
```html
<header>
    <div class="header-container">
        <a href="index.html" class="logo">Choi's Interior Design</a>
        <nav>
            <a href="projects.html">Projects</a>
            <a href="#team">Team</a>
            <a href="#about">About</a>
            <a href="#contact">Contact</a>
        </nav>
    </div>
</header>

<style>
header {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 1000;
    background: rgba(255, 255, 255, 0.95);
    backdrop-filter: blur(10px);
    padding: 20px var(--page-margin);
    border-bottom: 1px solid rgba(0, 0, 0, 0.05);
}

.header-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.logo {
    font-size: 11px;
    font-weight: 600;
    letter-spacing: 1.5px;
    text-transform: uppercase;
    color: #000;
    text-decoration: none;
}

nav {
    display: flex;
    align-items: center;
    gap: 40px;
}

nav a {
    color: #000;
    text-decoration: none;
    font-size: 14px;
    font-weight: 400;
    letter-spacing: 0.5px;
    transition: opacity 0.3s ease;
}

nav a:hover {
    opacity: 0.6;
}

@media (max-width: 768px) {
    nav {
        gap: 20px;
    }
    nav a {
        font-size: 12px;
    }
}
</style>
```

#### Tailwind Version
```html
<header class="fixed top-0 left-0 right-0 z-[1000]
               bg-white/95 backdrop-blur-[10px]
               py-5 px-[6.66667vw] md:px-[2.32558vw]
               border-b border-black/5">
    <div class="flex justify-between items-center">
        <a href="index.html"
           class="text-[11px] font-semibold tracking-[1.5px]
                  uppercase text-black no-underline">
            Choi's Interior Design
        </a>
        <nav class="flex items-center gap-5 md:gap-10">
            <a href="projects.html"
               class="text-xs md:text-sm font-normal tracking-wide
                      text-black no-underline
                      transition-opacity duration-300
                      hover:opacity-60">
                Projects
            </a>
            <a href="#team"
               class="text-xs md:text-sm font-normal tracking-wide
                      text-black no-underline
                      transition-opacity duration-300
                      hover:opacity-60">
                Team
            </a>
            <a href="#about"
               class="text-xs md:text-sm font-normal tracking-wide
                      text-black no-underline
                      transition-opacity duration-300
                      hover:opacity-60">
                About
            </a>
            <a href="#contact"
               class="text-xs md:text-sm font-normal tracking-wide
                      text-black no-underline
                      transition-opacity duration-300
                      hover:opacity-60">
                Contact
            </a>
        </nav>
    </div>
</header>
```

### 2. Complete Project Card Component

#### Vanilla CSS Version
```html
<div class="project-card">
    <div class="project-image">
        <img src="project-image.jpg"
             alt="Modern office interior"
             loading="lazy">
    </div>
    <h3 class="project-title">삼성동 오피스 빌딩</h3>
</div>

<style>
.project-card {
    cursor: pointer;
    transition: transform 0.4s ease, opacity 0.3s ease;
}

.project-card:hover {
    transform: translateY(-5px);
    opacity: 0.85;
}

.project-image {
    width: 100%;
    aspect-ratio: 4 / 3;
    overflow: hidden;
    margin-bottom: 15px;
    background: #f5f5f5;
}

.project-image img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
    transition: transform 0.6s ease;
}

.project-card:hover .project-image img {
    transform: scale(1.05);
}

.project-title {
    font-size: 14px;
    font-weight: 400;
    color: #000;
    letter-spacing: 0.3px;
}
</style>
```

#### Tailwind Version
```html
<div class="group cursor-pointer
            transition-all duration-[400ms] ease-in-out
            hover:-translate-y-[5px] hover:opacity-85">
    <div class="w-full aspect-[4/3] overflow-hidden
                mb-[15px] bg-gray-100">
        <img src="project-image.jpg"
             alt="Modern office interior"
             loading="lazy"
             class="w-full h-full object-cover block
                    transition-transform duration-[600ms] ease-in-out
                    group-hover:scale-105">
    </div>
    <h3 class="text-sm font-normal text-black tracking-wide">
        삼성동 오피스 빌딩
    </h3>
</div>
```

### 3. Projects Grid Layout

#### Vanilla CSS Version
```html
<div class="projects-grid">
    <!-- Multiple project cards here -->
</div>

<style>
.projects-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    gap: 30px;
}

@media (max-width: 480px) {
    .projects-grid {
        grid-template-columns: 1fr;
    }
}

@media (max-width: 768px) {
    .projects-grid {
        grid-template-columns: repeat(2, 1fr);
    }
}

@media (max-width: 968px) and (min-width: 768px) {
    .projects-grid {
        grid-template-columns: repeat(3, 1fr);
    }
}

@media (max-width: 1200px) and (min-width: 768px) {
    .projects-grid {
        grid-template-columns: repeat(4, 1fr);
    }
}

@media (min-width: 768px) {
    .projects-grid {
        grid-template-columns: repeat(5, 1fr);
        gap: 20px;
    }
}
</style>
```

#### Tailwind Version
```html
<div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3
            lg:grid-cols-4 xl:grid-cols-5
            gap-[30px] md:gap-5">
    <!-- Multiple project cards here -->
</div>
```

### 4. Page Header Component

#### Vanilla CSS Version
```html
<div class="page-header">
    <div class="page-label">Projects</div>
    <h1 class="page-title">
        시대를 초월하는 공간 디자인과 미적 가치,
        그리고 업무 환경의 품격을 높이는 데 대한 전문성을 담고 있습니다.
    </h1>
</div>

<style>
.page-header {
    margin-bottom: 60px;
}

.page-label {
    font-size: 12px;
    font-weight: 500;
    letter-spacing: 1px;
    text-transform: uppercase;
    margin-bottom: 30px;
    color: #000;
}

.page-title {
    font-size: clamp(32px, 5vw, 56px);
    font-weight: 400;
    line-height: 1.3;
    max-width: 900px;
    margin-bottom: 40px;
    color: #000;
}

@media (max-width: 768px) {
    .page-title {
        font-size: 28px;
    }
}
</style>
```

#### Tailwind Version
```html
<div class="mb-[60px]">
    <div class="text-xs font-medium tracking-wide uppercase
                mb-[30px] text-black">
        Projects
    </div>
    <h1 class="text-[28px] md:text-[clamp(32px,5vw,56px)]
               font-normal leading-tight
               max-w-[900px] mb-10 text-black">
        시대를 초월하는 공간 디자인과 미적 가치,
        그리고 업무 환경의 품격을 높이는 데 대한 전문성을 담고 있습니다.
    </h1>
</div>
```

### 5. Filter Bar Component

#### Vanilla CSS Version
```html
<div class="filter-bar">
    <div class="filter-label">Filter</div>
    <div class="search-box">
        <svg class="search-icon" viewBox="0 0 24 24"
             fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="11" cy="11" r="8"></circle>
            <path d="m21 21-4.35-4.35"></path>
        </svg>
        <span>Search</span>
    </div>
</div>

<style>
.filter-bar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 40px;
    padding-bottom: 20px;
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
}

.filter-label {
    font-size: 13px;
    font-weight: 500;
    letter-spacing: 0.5px;
    color: #000;
    cursor: pointer;
    transition: opacity 0.3s ease;
}

.filter-label:hover {
    opacity: 0.6;
}

.search-box {
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 13px;
    color: #000;
    cursor: pointer;
    transition: opacity 0.3s ease;
}

.search-box:hover {
    opacity: 0.6;
}

.search-icon {
    width: 16px;
    height: 16px;
}

@media (max-width: 768px) {
    .filter-bar {
        flex-direction: column;
        align-items: flex-start;
        gap: 15px;
    }
}
</style>
```

#### Tailwind Version
```html
<div class="flex flex-col gap-[15px] items-start
            md:flex-row md:justify-between md:items-center
            mb-10 pb-5 border-b border-black/10">
    <div class="text-[13px] font-medium tracking-wide text-black
                cursor-pointer transition-opacity duration-300
                hover:opacity-60">
        Filter
    </div>
    <div class="flex items-center gap-2 text-[13px] text-black
                cursor-pointer transition-opacity duration-300
                hover:opacity-60">
        <svg class="w-4 h-4" viewBox="0 0 24 24"
             fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="11" cy="11" r="8"></circle>
            <path d="m21 21-4.35-4.35"></path>
        </svg>
        <span>Search</span>
    </div>
</div>
```

---

## Best Practices

### 1. Performance Optimization

#### Use Hardware Acceleration
```css
/* Always include in animated elements */
-webkit-backface-visibility: hidden;
backface-visibility: hidden;
```

#### Optimize Images
- Use `loading="lazy"` for images below the fold
- Maintain 4:3 aspect ratio (recommended: 800x600px minimum)
- Compress images (WebP format recommended)
- Provide `alt` text for accessibility

#### Minimize Repaints
- Animate `transform` and `opacity` only
- Avoid animating layout properties (`width`, `height`, `margin`, `padding`)

### 2. Accessibility

#### Keyboard Navigation
```css
/* Add visible focus states */
a:focus,
button:focus {
    outline: 2px solid #000;
    outline-offset: 4px;
}
```

#### Color Contrast
- Maintain 21:1 contrast ratio (current: black on white)
- Test hover states (60% opacity = 12.6:1 ratio - still AAA)

#### Screen Readers
```html
<!-- Descriptive alt text -->
<img src="..." alt="Modern minimalist office interior with floor-to-ceiling windows">

<!-- ARIA labels for interactive elements -->
<div class="search-box" role="button" aria-label="Search projects">
```

### 3. Responsive Design

#### Mobile-First Approach
```css
/* Base styles for mobile */
.element {
    font-size: 14px;
}

/* Enhance for larger screens */
@media (min-width: 768px) {
    .element {
        font-size: 16px;
    }
}
```

#### Fluid Typography
```css
/* Prefer clamp() for smooth scaling */
font-size: clamp(32px, 5vw, 56px);
```

#### Touch Targets
- Minimum 44x44px for touch targets (iOS guideline)
- Add padding to small clickable elements

### 4. Code Organization

#### CSS Structure
```css
/* 1. Base & Reset */
*, *:after, *:before { ... }

/* 2. CSS Custom Properties */
:root { --page-margin: ... }

/* 3. Layout */
header { ... }
main { ... }

/* 4. Components */
.project-card { ... }

/* 5. Utilities */
.sr-only { ... }

/* 6. Animations */
@keyframes fadeIn { ... }

/* 7. Media Queries */
@media (min-width: 768px) { ... }
```

#### Naming Conventions
- Use BEM for component classes: `.component__element--modifier`
- Keep class names descriptive: `.project-card` not `.card`
- Avoid overly specific selectors

### 5. Browser Compatibility

#### Vendor Prefixes
```css
/* Include for Safari support */
-webkit-backdrop-filter: blur(10px);
backdrop-filter: blur(10px);

-webkit-backface-visibility: hidden;
backface-visibility: hidden;

-webkit-overflow-scrolling: touch;
-webkit-tap-highlight-color: rgba(0, 0, 0, 0);
```

#### Graceful Degradation
```css
/* Fallback for backdrop-filter */
background: rgba(255, 255, 255, 0.95);
backdrop-filter: blur(10px);

/* If backdrop-filter not supported, solid background still works */
```

### 6. Maintenance Guidelines

#### Consistency Checklist
- [ ] Use only #000 and #fff for primary colors
- [ ] Stick to 400, 500, 600 font weights
- [ ] Use system font stack only
- [ ] Avoid border-radius (keep flat)
- [ ] No box-shadows (use borders instead)
- [ ] Animate only `transform` and `opacity`
- [ ] Maintain 4:3 aspect ratio for images
- [ ] Use 0.3s, 0.4s, 0.6s transition durations

#### When Adding New Components
1. Check if existing component can be reused
2. Follow established spacing scale
3. Use existing typography sizes
4. Maintain hover state pattern (opacity: 0.6)
5. Add responsive breakpoints
6. Test on mobile first

---

## Tailwind Configuration File

For complete Tailwind setup, add this to `tailwind.config.js`:

```js
/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./*.html",
        "./src/**/*.{js,jsx,ts,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                // Project uses default black/white/gray
            },
            spacing: {
                // Custom spacing values
                '15': '15px',
                '30': '30px',
            },
            screens: {
                'xs': '480px',
                'sm': '768px',
                'md': '968px',
                'lg': '1200px',
                'xl': '1536px',
            },
            fontFamily: {
                sans: [
                    '-apple-system',
                    'BlinkMacSystemFont',
                    'Segoe UI',
                    'Roboto',
                    'Helvetica Neue',
                    'Arial',
                    'sans-serif',
                ],
            },
            fontSize: {
                '2xs': '11px',
                '13': '13px',
            },
            letterSpacing: {
                'widest': '1.5px',
            },
            keyframes: {
                fadeIn: {
                    'from': {
                        opacity: '0',
                        transform: 'translateY(20px)'
                    },
                    'to': {
                        opacity: '1',
                        transform: 'translateY(0)'
                    }
                }
            },
            animation: {
                fadeIn: 'fadeIn 0.6s ease-in',
            },
            transitionDuration: {
                '400': '400ms',
                '600': '600ms',
            },
            backdropBlur: {
                '10': '10px',
            },
            aspectRatio: {
                '4/3': '4 / 3',
            }
        },
    },
    plugins: [],
}
```

---

## Quick Reference Card

### Most Used Values

#### Colors
- Black: `#000` / `text-black`
- White: `#fff` / `bg-white`
- Light Gray: `#f5f5f5` / `bg-gray-100`

#### Typography
- Logo: `11px / 600 / 1.5px spacing`
- Nav: `14px / 400 / 0.5px spacing`
- Title: `clamp(32px, 5vw, 56px) / 400`

#### Spacing
- Card gap: `30px` (mobile), `20px` (desktop)
- Nav gap: `20px` (mobile), `40px` (desktop)
- Section margin: `60px`, `80px`, `100px`

#### Transitions
- Fast: `0.3s` (opacity)
- Medium: `0.4s` (transform)
- Slow: `0.6s` (image scale)

#### Hover States
- Nav/Buttons: `opacity: 0.6`
- Cards: `opacity: 0.85` + `translateY(-5px)`
- Images: `scale(1.05)`

---

## Conclusion

This style guide captures the minimalist, architectural aesthetic of Choi's Interior Design website. The design emphasizes:

- **Simplicity**: Pure black and white with minimal decoration
- **Elegance**: Subtle animations and refined typography
- **Performance**: Hardware-accelerated animations and optimized rendering
- **Responsiveness**: Fluid layouts that adapt gracefully across devices
- **Consistency**: A tight, cohesive design system

When extending this design:
- Maintain the minimalist approach
- Use the established spacing and typography scales
- Keep animations subtle and purposeful
- Test thoroughly across devices
- Prioritize content and imagery

For questions or suggestions, refer to the original `projects.html` file for canonical implementations.

---

**Version**: 1.0
**Last Updated**: 2025
**Project**: Choi's Interior Design
**Author**: Style Guide Documentation
