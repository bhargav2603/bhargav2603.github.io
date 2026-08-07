export const resume = {
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
      period: "Jul 2026 — Present",
      role: "Quantum Algorithm Engineer",
      organization: "QuantumIntegrated Machines",
      location: "Hyderabad, Hybrid",
      url: "https://qimlabs.com/",
      bullets: [
        "Design hybrid quantum-classical algorithms for strongly correlated chemistry, targeting chemical accuracy for drug-discovery workloads.",
        "Build ML pipelines that accelerate electronic-structure calculations and benchmark emerging quantum methods against DMRG and CCSD(T) references.",
        "Partner with research and commercial teams to validate pharmaceutical use cases and translate quantum capabilities into deployable solutions.",
      ],
    },
    {
      period: "Mar 2026 — Jun 2026",
      role: "Quantum Research Intern",
      organization: "QuantumIntegrated Machines",
      location: "Hyderabad, Hybrid",
      url: "https://qimlabs.com/",
      bullets: [
        "Implemented hybrid quantum-classical algorithms (VQE, SQD) with Python, PySCF, Qiskit, and Qiskit Nature, running end-to-end molecular ground-state energy simulations (FMO–VQE, classical shadow tomography).",
        "Validated an FMO–VQE workflow on H₂/H₄/H₆ benchmarks; FMO2 corrections reduced the maximum absolute FCI deviation from 8.3 mHa to 1.03 mHa.",
        "Profiled circuit depth, gate counts, and error budgets across ansatz choices to assess NISQ-hardware feasibility, and benchmarked UCCSD–VQE across 25 molecular simulator cases under controlled shot budgets.",
        "Analyzed quantum hardware limits, noise, and error-correction techniques, and assessed practical near-term use cases in drug discovery.",
      ],
    },
    {
      period: "Oct 2024 — Jan 2026",
      role: "Associate – Risk Consulting",
      organization: "PwC India",
      location: "Gurugram, India",
      bullets: [
        "Analyzed 60+ security alerts daily in a 24×7 Security Operations Center (SOC) using SIEM and SOAR tools (Chronicle, ArcSight), improving incident response time by 30% with 99% SLA adherence.",
        "Performed log analysis across 20+ critical assets, delivering client-facing remediation reports that cut resolution time by 30% and ensured 100% monitoring continuity.",
      ],
    },
  ],
  leadership: [
    {
      period: "Jan 2024 — May 2024",
      role: "Draftsperson",
      organization: "Student Governance Reform Initiative, NIT Nagpur",
      bullets: [
        "Authored a 20+ page Student Constitution and Election Commission framework, presented to 3 college deans to establish the foundation for campus-wide governance reform.",
        "Translated stakeholder interviews into structured policy recommendations and proposed 3 new council roles, reshaping accountability and decision-making for 3,500+ students.",
      ],
    },
    {
      period: "Aug 2023 — May 2024",
      role: "Co-Founder",
      organization: "VNIT_TSS Committee, NIT Nagpur",
      bullets: [
        "Founded and scaled a cultural body representing 800+ Telugu students, driving inclusive participation across campus life.",
        "Directed 3 large-scale events (Sankranti and Ugadi ’23–’24) on a self-funded budget, drawing 1,200+ attendees per event.",
      ],
    },
    {
      period: "Aug 2022 — May 2024",
      role: "Student Mentor",
      organization: "NIT Nagpur",
      bullets: [
        "Mentored 15 first-year students over 2 years under the Student Mentorship Program (SMP), guiding academic performance, well-being, and campus integration.",
        "Managed high-impact cases, including mental-health crises and suicide prevention, coordinating with faculty and counselors to ensure timely intervention and student safety.",
      ],
    },
    {
      period: "Aug 2022 — May 2023",
      role: "Founder",
      organization: "CTD (Code, Think, Develop) Tech Community, NIT Nagpur",
      bullets: [
        "Founded a student tech community running peer-led project work and mentorship over its first 10 months.",
      ],
    },
  ],
  skills: [
    {
      group: "Programming",
      items: ["Python", "Machine Learning"],
    },
    {
      group: "Quantum Stack",
      items: ["Qiskit", "Qiskit Nature", "VQE", "QPE", "QAOA", "Quantum Error Correction (Basics)"],
    },
    {
      group: "Professional",
      items: ["Communication Strategy (PwC)", "Cross-Functional Work", "Use-Case Validation"],
    },
  ],
  interests: [
    "Volunteered with Prayaas, the college's social service club.",
    "Developed an interest in reading, exploring philosophy, nonfiction, and fiction.",
    "Passionate about world cinema, exploring storytelling styles across different cultures and genres.",
    "Deep appreciation for Indian classical music and dance — their rhythm, history, and expressive depth.",
  ],
} as const;
