# Vexaled — Full Product List

_Last updated from source data in `productCategoryData.ts` and `productDetailData.ts`._

---

## Category: LED Screens (`/products/led-screens`)

---

### Indoor

| # | Name | Slug | Pixel Pitch | Page Type |
|---|------|------|-------------|-----------|
| 1 | City Light 500×500 Standard Cabinet | `city-light-500x500` | P1.6 / P1.9 / P2.6 / P2.9 / P3.9 / P4.8 | Rich (Product.tsx) |
| 2 | City Light 500×500 Flexible Cabinet | `city-light-500x500-flexible` | P1.6 / P1.9 / P2.6 / P2.9 / P3.9 / P4.8 | Rich (Product.tsx) |
| 3 | City Light 500×500 Right Angle Cabinet | `city-light-500x500-right-angle` | P1.6 / P1.9 / P2.6 / P2.9 / P3.9 / P4.8 | Rich (Product.tsx) |
| 4 | Small Pitch Series | `indoor-small-pitch` | P0.9375–P2.5 (4 cabinet sizes) | Spec Table (LedScreenProduct.tsx) |
| 5 | Rental Series | `indoor-rental` | P2.604 / P2.976 / P3.91 / P4.81 | Spec Table |
| 6 | Soft Board Series | `indoor-soft-board` | P1.667 / P1.875 / P2 / P2.5 / P3 / P4 | Spec Table |
| 7 | Regular Series | `indoor-regular` | P2 / P2.5 / P3 / P3.84 / P4 / P5 | Spec Table |
| 8 | Mirror Screen Series | `indoor-mirror-screen` | P1.53 / P1.667 / P1.86 / P2 / P2.5 | Spec Table |
| 9 | Transparent Screen Series | `transparent-screen` | P3.91–7.82 / P10.4–10.4 | Spec Table |

#### Indoor — Small Pitch Series cabinet variants

| Cabinet Size | Pixel Pitch Options |
|---|---|
| 400×300mm | P1.25 / P1.388 / P1.56 / P1.667 / P1.923 |
| 480×480mm | P1.57 / P1.667 / P1.875 / P2 / P2.5 |
| 600×337.5mm | P0.9375 / P1.25 / P1.56 / P1.875 |
| 640×480mm | P1.25 / P1.53 / P1.667 / P1.86 / P1.904 / P2 |

---

### Outdoor

| # | Name | Slug | Pixel Pitch | Page Type |
|---|------|------|-------------|-----------|
| 1 | Rental Series | `outdoor-rental` | P2.604 / P2.976 / P3.91 / P4.81 | Spec Table |
| 2 | Small Pitch Series | `outdoor-small-pitch` | P2.5 / P3 / P3.076 / P3.33 | Spec Table |
| 3 | Regular Series | `outdoor-regular` | P4 / P5 / P6 / P6.67 / P8 / P10 | Spec Table |
| 4 | Front Maintenance Series | `outdoor-front-maintenance` | P4.81–P16 (2 variant tabs) | Spec Table |
| 5 | In-line Series | `outdoor-inline` | P10 / P12 / P16 / P20 / P25 | Spec Table |

#### Outdoor — Front Maintenance Series variant tabs

| Tab | Pixel Pitch Options |
|---|---|
| Screw Type | P5 / P6 / P8 / P10 / P10 (DIP) / P16 |
| Hexagonal Lock Type | P4.81 / P6.67 / P8 / P10 / P10 (DIP) |

---

### Poster

| # | Name | Slug | Pixel Pitch | Page Type |
|---|------|------|-------------|-----------|
| 1 | LED Poster Display | `led-poster-display` | P1.25 / P1.56 / P1.95 / P2.5 / P2.6 / P2.9 / P3.91 | Rich (Product.tsx) |

---

## Category: Lighting (`/products/lighting`)

| Status |
|--------|
| Coming Soon — placeholder page at `/products/lighting` |

---

## Special Pages

| Name | Route | Notes |
|------|-------|-------|
| Folding Screen | `/products/folding-screen` | Legacy dedicated page (FoldingScreen.tsx) |

---

## Summary

| Group | Count | Has full rich page | Has spec table only |
|-------|-------|--------------------|---------------------|
| Indoor | 9 | 3 (City Light series) | 6 |
| Outdoor | 5 | 0 | 5 |
| Poster | 1 | 1 (LED Poster Display) | 0 |
| Lighting | — | — | Coming Soon |
| Special | 1 | 1 (Folding Screen) | — |
| **Total** | **16** | **5** | **11** |

---

## URL Structure

```
/products                              → redirects to /products/led-screens
/products/led-screens                  → landing grid (all 15 products grouped by Indoor / Outdoor / Poster)
/products/led-screens/{slug}           → product page
/products/lighting                     → Coming Soon placeholder
/products/folding-screen               → Folding Screen dedicated page
/products/led-screen/vx-led-poster     → redirects to /products/led-screens/led-poster-display
```
