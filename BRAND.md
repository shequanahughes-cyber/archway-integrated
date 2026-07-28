# Brand

## Colors

| Name         | Hex       | Usage                                                        |
| ------------ | --------- | ------------------------------------------------------------- |
| Navy         | `#16324F` | Primary brand color — navbar, footer, buttons, headings       |
| Teal Accent  | `#00798E` | Accent — eyebrow labels, hover states, borders, icon accents (previously "Warm Gold", `#C99B4E`) |
| Teal Accent (light) | `#5FC8D6` | Same accent, lightened for text sitting on navy backgrounds — `#00798E` doesn't have enough contrast against `#16324F` |

`--primary` in `globals.css` (`#0b3554`) is a separate, slightly darker navy used for body text/link states; `#16324F` is the explicit brand navy used for the navbar, footer, and hero overlay.

## Logo

The logo is an image-based lockup (`public/logo.png`), not a generated SVG icon. It combines the Gateway Arch silhouette with a heartbeat/EKG line and the "Archway Medical & Integrated Services" wordmark, in navy + teal.

For use on navy backgrounds (navbar, footer), `public/logo-white.png` is a recolored variant with the navy elements swapped to white — the original navy is nearly the same shade as the brand navy background, so the unrecolored logo is illegible there. The teal stays teal in both versions.

Favicon and app icons (`src/app/favicon.ico`, `icon.png`, `apple-icon.png`) are cropped from just the arch + heartbeat mark, since the full lockup with wordmark isn't legible at favicon sizes.
