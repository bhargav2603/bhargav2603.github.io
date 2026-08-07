/**
 * Tags and categories are authored as prose ("quantum advantage", "Qiskit
 * Nature") so they read well on the page. URLs need them without spaces or
 * capitals, so every route and every link runs the name through here — keeping
 * one function means the two can never drift apart.
 */
export const slugify = (value: string) =>
  value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
