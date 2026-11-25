# Design System: City Pulse (Lagoon Paper)

> Adapted from UI/UX Pro Max “Accessible & Ethical” guidance with a custom civic palette.
> User-selected direction: **Lagoon Paper** — avoid corporate navy/sky-blue SaaS defaults and AI purple/cream clusters.

## Product
Neighborhood livability explorer that encodes city open-data signals.

## Style
- Accessible, calm, civic
- Light mode first
- High contrast text
- Visible focus rings
- Reduced motion respected
- No glassmorphism stacks, glow blobs, emoji icons, or pill overload

## Colors
| Role | Hex | Token |
|------|-----|-------|
| Background | `#F3F6F2` | `--background` |
| Foreground | `#1A2420` | `--foreground` |
| Muted | `#5E6B63` | `--muted` |
| Surface | `#FFFFFF` | `--surface` |
| Border | `#D5DED6` | `--border` |
| Accent | `#0F7A6B` | `--accent` |
| On Accent | `#FFFFFF` | `--accent-foreground` |
| Accent Soft | `#E4F2EE` | `--accent-soft` |
| Highlight | `#E8A317` | `--highlight` |
| Danger | `#8C4A4A` | `--danger` |
| Ring | `#0F7A6B` | `--ring` |

## Typography
- Display: Newsreader (readable serif, already in product)
- Body: Source Sans 3
- Body ≥ 16px, line-height ~1.5
- Avoid ultra-heavy display weights

## Spacing / Density
Standard density: 8 / 12 / 16 / 24 / 40

## Motion
Subtle only (2–3 purposeful moments):
- rise-in ≤ 12–16px Y offset
- 250–400ms ease
- honor `prefers-reduced-motion`

## Interaction
- Clickable elements: `cursor-pointer`
- Touch targets ≥ 44px where practical
- Hover transitions 150–300ms
- Focus: visible 2px ring + offset

## Anti-patterns
- AI purple/pink gradients
- Cream + terracotta default
- Soft sky-blue SaaS cliché as primary brand
- Low-contrast gray-on-gray
- Placeholder-only labels
- Hover-only actions
