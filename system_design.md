# System Design - One Tribe Brand Identity

This document defines the core styling guidelines, color systems, typography choices, and motion principles for the **One Tribe (Bologna Ultimate)** web identity.

---

## 1. Color System

The palette represents an athletic, high-performance sports brand. It balances deep navy structures with energetic, vibrant accents.

| Category | Token | Hex | RGB | Description |
|---|---|---|---|---|
| **Background / Core Navy** | `brand-navy` | `#232C51` | `rgb(35, 44, 81)` | The base background of all sections, deep slate blue providing maximum contrast for sport accents. |
| **Accent / Highlight Blue**| `brand-blue` | `#70A5ED` | `rgb(112, 165, 237)` | North Carolina Blue. Used for links, subtle border outlines, glow effects, and subheaders. |
| **Action / Strong Red** | `brand-red` | `#92172E` | `rgb(146, 23, 46)` | Rosso. Used for primary CTA buttons, badges, key hover highlights, and urgency actions. |
| **Text Primary** | `text-light` | `#F5F6FA` | `rgb(245, 246, 250)` | Off-white text to prevent eye-strain on dark backgrounds. |
| **Card / Surface Dark** | `surface-navy`| `#2E3966` | `rgb(46, 57, 102)` | Slightly lighter navy blue for card decks, dropdown tables, and tooltips. |

---

## 2. Typography

The type scale combines a tall, heavy athletic grotesque display font with a modern, geometric neutral grotesque body font.

*   **Primary Display / Headlines**: **Bebas Neue** (`font-bebas`)
    *   *Aesthetic*: Tall, condensed, uppercase, high impact.
    *   *Usage*: Page titles, hero section headers, numeric highlights, big call-out banners.
    *   *Styling*: Often combined with `transform -skew-x-12` and `italic` to mimic motion and speed (similar to Nike branding).
*   **Secondary Headlines / Subtitles**: **Montserrat** (`font-montserrat`)
    *   *Aesthetic*: Geometric, modern, elegant sans-serif.
    *   *Usage*: Category titles, navigational tabs, card labels, secondary headings.
*   **Body Copy**: **Geist Sans** (`font-sans`)
    *   *Aesthetic*: Clean, neutral, technical body font.
    *   *Usage*: Paragraph text, lists, table content.

---

## 3. UI Component Styles

### 3.1 Buttons
*   **Primary Action**: Filled Rosso background, text white, sharp edges (or standard radius), transition to brand-blue with slight glow.
*   **Secondary Action / Athletic Button**: Hollow button with a brand-blue border, text brand-blue. Upon hover, it fills with brand-red/brand-blue using a diagonal slide transition.
*   **Magnetic / Micro-interaction**: Icons and buttons shift slightly towards the cursor on proximity using custom React hooks.

### 3.2 Cards & Boards
*   **Glassmorphism Surfaces**: Semi-transparent Navy (`rgba(35, 44, 81, 0.6)`) with a backdrop blur and a thin North Carolina Blue border (`1px border-[#70A5ED]/20`).
*   **Hover states**: Image zooms in inside the card, content skews slightly, border glow intensity increases from `20%` to `80%`.

---

## 4. Motion Guidelines

Animations should feel snappy, athletic, and direct, avoiding overly slow decorative transitions.

*   **Entrance Animations**: Fast slide-ins and fade-ups (duration `0.5s` to `0.8s` with `easeOutExpo` or custom spring physics).
*   **Interactive Ticker / Marquee**: Continuous, linear scrolling banners used for dynamic announcements ("FREEDOM • LOYALTY • INCLUSION").
*   **Parallax / Depth**: Mouse movement triggers subtle shifts in background images based on depth sensitivity factor.
*   **Mouse Trail / Drag**: Free-flowing canvas elements allowing the user to interact with the team images.
