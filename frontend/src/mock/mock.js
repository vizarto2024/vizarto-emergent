// Mock data for Vizarto AI Recruitment Platform

export const stats = [
  { label: "Active Jobs", value: "15,000+", sub: "Openings" },
  { label: "Leading Employers", value: "1,200+", sub: "Companies" },
  { label: "Skilled Candidates", value: "85,000+", sub: "Talent Pool" },
  { label: "AI Matches Made", value: "320K+", sub: "This Year" },
];

export const features = [
  {
    title: "AI Skill Matching",
    desc: "Our AI parses skills, projects, and outcomes—not just keywords—to match talent with the right role.",
    icon: "Sparkles",
  },
  {
    title: "Verified Talent",
    desc: "Every candidate’s core skills are validated through project signals and assessments.",
    icon: "ShieldCheck",
  },
  {
    title: "Bias‑Aware Hiring",
    desc: "Skill‑first ranking removes noise from names, schools, and gaps—fair by design.",
    icon: "Scale",
  },
  {
    title: "Real‑Time Insights",
    desc: "Live dashboards show pipeline health, match quality, and time‑to‑hire trends.",
    icon: "LineChart",
  },
];

export const categories = [
  { name: "Engineering", count: 4321, icon: "Code2" },
  { name: "Design", count: 1289, icon: "Palette" },
  { name: "Product", count: 987, icon: "Package" },
  { name: "Data & AI", count: 2134, icon: "BrainCircuit" },
  { name: "Marketing", count: 1567, icon: "Megaphone" },
  { name: "Sales", count: 1802, icon: "TrendingUp" },
  { name: "Finance", count: 743, icon: "Landmark" },
  { name: "Operations", count: 654, icon: "Settings2" },
];

export const jobs = [
  {
    id: "j1",
    title: "Senior AI/ML Engineer",
    company: "Northwind Labs",
    logo: "NL",
    logoColor: "bg-brand-100 text-brand-700",
    location: "Remote · Global",
    type: "Full‑time",
    salary: "$140k – $180k",
    match: 96,
    skills: ["PyTorch", "LLMs", "RAG", "AWS"],
    posted: "2d",
    featured: true,
  },
  {
    id: "j2",
    title: "Product Designer, Growth",
    company: "Brightform",
    logo: "BF",
    logoColor: "bg-indigo-100 text-indigo-700",
    location: "Bengaluru, IN",
    type: "Full‑time",
    salary: "₹28L – ₹42L",
    match: 92,
    skills: ["Figma", "Design Systems", "A/B Testing"],
    posted: "1d",
    featured: true,
  },
  {
    id: "j3",
    title: "Full‑Stack Engineer (React + Go)",
    company: "Helio Cloud",
    logo: "HC",
    logoColor: "bg-amber-100 text-amber-700",
    location: "Berlin, DE · Hybrid",
    type: "Full‑time",
    salary: "€75k – €95k",
    match: 88,
    skills: ["React", "Go", "Postgres", "K8s"],
    posted: "3d",
    featured: false,
  },
  {
    id: "j4",
    title: "Data Scientist, Personalization",
    company: "Loomstack",
    logo: "LS",
    logoColor: "bg-rose-100 text-rose-700",
    location: "New York, US",
    type: "Full‑time",
    salary: "$130k – $165k",
    match: 90,
    skills: ["Python", "SQL", "Recsys", "Airflow"],
    posted: "5h",
    featured: true,
  },
  {
    id: "j5",
    title: "DevOps / Platform Engineer",
    company: "Coralstone",
    logo: "CS",
    logoColor: "bg-sky-100 text-sky-700",
    location: "Remote · EMEA",
    type: "Contract",
    salary: "$90 – $120 / hr",
    match: 84,
    skills: ["Terraform", "AWS", "CI/CD", "Argo"],
    posted: "1w",
    featured: false,
  },
  {
    id: "j6",
    title: "Head of Product Marketing",
    company: "Vertex Peak",
    logo: "VP",
    logoColor: "bg-violet-100 text-violet-700",
    location: "London, UK",
    type: "Full‑time",
    salary: "£110k – £140k",
    match: 81,
    skills: ["GTM", "Positioning", "Analytics"],
    posted: "4d",
    featured: false,
  },
];

export const candidates = [
  {
    id: "c1",
    name: "Aarav Mehta",
    role: "Senior Frontend Engineer",
    location: "Pune, IN",
    avatar: "AM",
    color: "bg-brand-100 text-brand-700",
    match: 94,
    skills: ["React", "TypeScript", "Next.js", "GraphQL"],
    exp: "7 yrs",
    verified: true,
  },
  {
    id: "c2",
    name: "Sofia Alvarez",
    role: "ML Engineer",
    location: "Madrid, ES",
    avatar: "SA",
    color: "bg-indigo-100 text-indigo-700",
    match: 91,
    skills: ["PyTorch", "LLMs", "MLOps"],
    exp: "5 yrs",
    verified: true,
  },
  {
    id: "c3",
    name: "Ken Watanabe",
    role: "Product Designer",
    location: "Tokyo, JP",
    avatar: "KW",
    color: "bg-rose-100 text-rose-700",
    match: 89,
    skills: ["Figma", "UX Research", "Prototyping"],
    exp: "6 yrs",
    verified: true,
  },
  {
    id: "c4",
    name: "Priya Nair",
    role: "Data Scientist",
    location: "Bengaluru, IN",
    avatar: "PN",
    color: "bg-amber-100 text-amber-700",
    match: 93,
    skills: ["Python", "SQL", "Causal Inference"],
    exp: "4 yrs",
    verified: false,
  },
];

export const locations = [
  { city: "Bengaluru", country: "India", jobs: 1240 },
  { city: "Mumbai", country: "India", jobs: 890 },
  { city: "Remote", country: "Global", jobs: 3420 },
  { city: "London", country: "UK", jobs: 760 },
  { city: "New York", country: "US", jobs: 980 },
  { city: "Berlin", country: "Germany", jobs: 540 },
  { city: "Singapore", country: "SG", jobs: 430 },
  { city: "Toronto", country: "CA", jobs: 380 },
];

export const companies = [
  "Northwind", "Brightform", "Helio Cloud", "Loomstack", "Coralstone",
  "Vertex Peak", "Ironbark", "Meridian", "Nimbus", "Solstice",
];

export const testimonials = [
  {
    quote: "We cut time‑to‑hire by 47% in one quarter. The AI shortlists actually feel like a great recruiter did the work.",
    name: "Amanda Chen",
    role: "VP People, Global Brands",
    avatar: "AC",
    color: "bg-brand-100 text-brand-700",
  },
  {
    quote: "I found a role that matched my niche skills in 9 days. Every conversation felt relevant—no cold spam.",
    name: "Robert Wilson",
    role: "Staff Engineer, Tech Solutions",
    avatar: "RW",
    color: "bg-indigo-100 text-indigo-700",
  },
  {
    quote: "The match scores are transparent and the panel loves the skill breakdown. It changed how we screen.",
    name: "Lisa Rodriguez",
    role: "Head of Talent, Retail Plus",
    avatar: "LR",
    color: "bg-rose-100 text-rose-700",
  },
];

export const howItWorks = {
  candidates: [
    { step: "01", title: "Build your skill graph", desc: "Import from LinkedIn, GitHub, or resume. AI extracts real skills and outcomes." },
    { step: "02", title: "Get matched", desc: "Roles are ranked by fit—with a clear explanation of why." },
    { step: "03", title: "Apply in one tap", desc: "Track every stage, get feedback, and interview with confidence." },
  ],
  employers: [
    { step: "01", title: "Describe the role", desc: "Paste a JD or answer 6 questions—our AI builds the skill rubric." },
    { step: "02", title: "Review a smart shortlist", desc: "Top candidates ranked by verified skills, not keywords." },
    { step: "03", title: "Hire faster, fairer", desc: "Panel tools, structured interviews, and analytics baked in." },
  ],
};
