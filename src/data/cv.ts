export const cv = {
  education: [
    {
      period: "Jul 2020 — May 2024",
      institution: "Visvesvaraya National Institute of Technology, Nagpur",
      degree: "Bachelor of Technology, Electrical and Electronics Engineering",
      details:
        "Optional subjects included Principles of Economics, Psychology, and Human Resource Management.",
    },
  ],
  experience: [
    {
      period: "Mar 2026 — Present",
      role: "Quantum Research Intern",
      organization: "QuantumIntegrated Machines",
      location: "Remote",
      url: "https://qimlabs.com/",
      bullets: [
        "Built modular quantum-chemistry and measurement workflows with Python, PySCF, Qiskit, and Qiskit Nature, including active-space Hamiltonians, UCCSD–VQE, FMO2 energy assembly, classical shadows, testing, and resource analysis.",
        "Validated an FMO–VQE workflow on H₂/H₄/H₆ benchmarks; FMO2 corrections reduced the maximum absolute FCI deviation from 8.3 mHa to 1.03 mHa.",
        "Benchmarked UCCSD–VQE across 25 molecular simulator cases and compared uniform with Hamiltonian-adaptive classical shadows under controlled shot budgets.",
      ],
    },
    {
      period: "Oct 2024 — Jan 2026",
      role: "Associate — Cybersecurity Risk Consulting",
      organization: "PwC India",
      location: "India",
      bullets: [
        "Analyzed more than 60 security alerts daily in a 24×7 SOC and contributed to a 30% improvement in incident-response time.",
        "Used Chronicle, ArcSight, and SOAR workflows to improve alert triage while maintaining 99% SLA adherence for high-severity threats.",
        "Produced client-facing incident summaries and log-analysis recommendations while tracking monitoring continuity across more than 20 critical assets.",
      ],
    },
  ],
  leadership: [
    {
      period: "Jan 2024 — May 2024",
      role: "Draftsperson",
      organization: "Student Governance Reform Initiative, NIT Nagpur",
      details:
        "Drafted a 20+ page Student Constitution and Election Commission framework, translating interviews and stakeholder feedback into governance recommendations for a community of 3,500+ students.",
    },
    {
      period: "Aug 2023 — May 2024",
      role: "Co-Founder",
      organization: "VNIT TSS Committee",
      details:
        "Founded a cultural body representing 800+ Telugu students and led three large festivals with a combined reach of more than 1,200 students.",
    },
    {
      period: "Aug 2022 — May 2024",
      role: "Student Mentor",
      organization: "NIT Nagpur",
      details:
        "Mentored 15 first-year students across two years, coordinated with faculty and counsellors in high-impact wellbeing cases, and improved engagement through regular, tailored support.",
    },
    {
      period: "Aug 2022 — May 2023",
      role: "Founder",
      organization: "CTD — Code, Think, Develop",
      details:
        "Started a campus technology community for collaboration, mentorship, and project-based learning; documented the lessons from a ten-month initiative that did not scale.",
    },
  ],
  skills: [
    {
      group: "Quantum computing",
      items: ["Qiskit", "Qiskit Nature", "Qiskit Aer", "VQE", "Classical shadows"],
    },
    {
      group: "Scientific software",
      items: ["Python", "PySCF", "NumPy", "SciPy", "Testing", "Benchmarking"],
    },
    {
      group: "Cybersecurity",
      items: ["SIEM", "SOAR", "Threat detection", "MITRE ATT&CK", "Log analysis"],
    },
  ],
  certifications: [
    {
      name: "Communication Strategy",
      issuer: "PwC",
      url: "https://drive.google.com/file/d/1Spd31sdPL1_z7elWnKWH2k7FoXAmGIFf/view?usp=sharing",
    },
    {
      name: "Network Security",
      issuer: "LinkedIn Learning",
      url: "https://drive.google.com/file/d/1mHXMzFemN5vP4iCpV05APhrSIJJqvQ5I/view?usp=sharing",
    },
  ],
  interests: [
    "Philosophy, nonfiction, and fiction",
    "World cinema and cross-cultural storytelling",
    "Indian classical music and dance",
    "Robotics, biology, spacetime, and cosmology",
  ],
} as const;
