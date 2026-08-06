export const siteConfig = {
  name: "Bhargav Krishna",
  givenName: "Bhargav",
  familyName: "Krishna",
  role: "Quantum Algorithm Engineer",
  positioning:
    "I'm focused on developing and evaluating hybrid quantum-classical algorithms for computationally challenging problems. My work includes designing and implementing quantum algorithms, benchmarking them against classical methods, analyzing performance, and building practical solutions for real-world applications.",
  focus:
    "I currently focus on developing hybrid algorithms for strongly correlated electronic systems in computational drug discovery, while exploring practical use cases where quantum computing can deliver meaningful value alongside classical computing.",
  background:
    "Previously, I worked at PwC India as an Associate in Risk Consulting, where I analyzed security data and worked with clients to identify risks and implement effective solutions.",
  broaderInterests:
    "Broader interests: quantum error correction, quantum communication, post-quantum cryptography, and quantum computing for finance.",
  description:
    "Bhargav Krishna is a Quantum Algorithm Engineer developing and evaluating hybrid quantum-classical algorithms: algorithm design, benchmarking against classical methods, performance analysis, and hybrid workflow development.",
  location: "Warangal, Telangana",
  email: "cbky2603@gmail.com",
  github: "https://github.com/bhargav2603",
  linkedin: "https://www.linkedin.com/in/bhargav2603/",
  resume: "/Bhargav-Krishna-CV.pdf",
  url: "https://bhargav2603.github.io",
  nav: [
    { label: "About", href: "/" },
    { label: "CV", href: "/cv/" },
    { label: "Research & Projects", href: "/projects/" },
    { label: "Blogs", href: "/blog/" },
    { label: "Interests", href: "/interests/" },
  ],
} as const;

export type NavItem = (typeof siteConfig.nav)[number];
