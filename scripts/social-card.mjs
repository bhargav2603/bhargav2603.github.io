/**
 * Renders public/social-card.svg to public/social-card.png at 1200x630.
 *
 * Social platforms (LinkedIn, X, Slack, WhatsApp, iMessage) do not render SVG
 * preview images, so the PNG is what og:image actually points at. Run this
 * after editing the SVG: `npm run social-card`.
 *
 * sharp comes in transitively via Astro's image pipeline. This script is
 * manual-only and never runs in CI, so that dependency is safe to lean on.
 */
import sharp from "sharp";

const source = "public/social-card.svg";
const output = "public/social-card.png";

const info = await sharp(source, { density: 144 })
  .resize(1200, 630, { fit: "fill" })
  .png({ compressionLevel: 9 })
  .toFile(output);

console.log(`${output} — ${info.width}x${info.height}, ${info.size} bytes`);
