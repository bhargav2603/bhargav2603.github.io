export const siteConfig = {
  name: "Bhargav Krishna",
  givenName: "Bhargav",
  familyName: "Krishna",
  role: "Quantum Algorithms Researcher",
  positioning: "I build hybrid quantum-classical software for scientific problems.",
  currentWork:
    "My current work explores quantum chemistry methods relevant to drug repurposing, with a focus on small, chemically important regions that are difficult to model accurately.",
  broaderInterests:
    "Broader interests: quantum communication, post-quantum cryptography, and quantum computing for finance.",
  description:
    "Bhargav Krishna builds hybrid quantum-classical software for scientific problems, with current work in quantum chemistry methods relevant to drug repurposing.",
  location: "Warangal, Telangana",
  email: "cbky2603@gmail.com",
  github: "https://github.com/bhargav2603",
  linkedin: "https://www.linkedin.com/in/bhargav2603/",
  resume: "/bhargav-krishna-resume.pdf",
  url: "https://bhargav2603.github.io",
  nav: [
    { label: "About", href: "/" },
    { label: "CV", href: "/cv/" },
    { label: "Research & Projects", href: "/projects/" },
    { label: "Blog", href: "/blog/" },
    { label: "Interests", href: "/interests/" },
  ],
} as const;

export type NavItem = (typeof siteConfig.nav)[number];
