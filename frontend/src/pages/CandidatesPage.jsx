import React, { useMemo, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { CandidateCard } from "../components/CandidatesSection";
import { candidates } from "../mock/mock";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import { Search, ShieldCheck } from "lucide-react";

// Expand candidate list a bit
const extra = [
  { id: "c5", name: "Diego Silva", role: "Backend Engineer", location: "São Paulo, BR", avatar: "DS", color: "bg-sky-100 text-sky-700", match: 87, skills: ["Go", "Postgres", "gRPC"], exp: "6 yrs", verified: true },
  { id: "c6", name: "Emily Zhang", role: "Product Manager", location: "Singapore", avatar: "EZ", color: "bg-violet-100 text-violet-700", match: 90, skills: ["Roadmapping", "Analytics", "UX"], exp: "8 yrs", verified: true },
  { id: "c7", name: "Marcus Ali", role: "DevOps Engineer", location: "Toronto, CA", avatar: "MA", color: "bg-teal-100 text-teal-700", match: 85, skills: ["K8s", "Terraform", "AWS"], exp: "5 yrs", verified: false },
  { id: "c8", name: "Yuki Tanaka", role: "UX Designer", location: "Osaka, JP", avatar: "YT", color: "bg-fuchsia-100 text-fuchsia-700", match: 88, skills: ["Research", "Prototyping", "UI"], exp: "4 yrs", verified: true },
];

const all = [...candidates, ...extra];

const CandidatesPage = () => {
  const [q, setQ] = useState("");
  const [onlyVerified, setOnlyVerified] = useState(false);

  const filtered = useMemo(() => {
    return all.filter((c) => {
      const matchQ = !q || (c.name + c.role + c.skills.join(" ")).toLowerCase().includes(q.toLowerCase());
      const matchVer = !onlyVerified || c.verified;
      return matchQ && matchVer;
    });
  }, [q, onlyVerified]);

  return (
    <div className="bg-white min-h-screen">
      <Header />

      <section className="bg-gradient-to-b from-brand-50/60 to-white border-b border-slate-100 py-14">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <div className="text-sm font-semibold uppercase tracking-widest text-brand-700">Talent Pool</div>
          <h1 className="font-display mt-2 text-4xl sm:text-5xl font-bold text-slate-900">
            Discover verified talent.
          </h1>
          <p className="mt-3 text-slate-600 max-w-xl">
            AI-ranked by skill match, seniority, and delivery signal — not by resume keywords.
          </p>

          <div className="mt-6 bg-white border border-slate-200 rounded-2xl shadow-sm p-2 flex flex-col sm:flex-row gap-2 max-w-3xl">
            <div className="flex items-center gap-2 flex-1 px-3">
              <Search className="h-5 w-5 text-slate-400" />
              <Input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Search by skill, role, or name"
                className="border-0 focus-visible:ring-0 shadow-none h-11 px-0"
              />
            </div>
            <Button className="h-12 bg-brand-600 hover:bg-brand-700 rounded-xl px-6">
              Search
            </Button>
          </div>

          <div className="mt-4 flex items-center gap-2">
            <button
              onClick={() => setOnlyVerified(!onlyVerified)}
              className={`inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-sm border transition-colors ${
                onlyVerified
                  ? "bg-emerald-600 text-white border-emerald-600"
                  : "bg-white text-slate-700 border-slate-200 hover:border-emerald-400"
              }`}
            >
              <ShieldCheck className="h-4 w-4" /> Verified only
            </button>
          </div>
        </div>
      </section>

      <section className="py-12">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <div className="text-sm text-slate-600 mb-4">
            Showing <span className="font-semibold text-slate-900">{filtered.length}</span> candidates
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {filtered.map((c) => <CandidateCard key={c.id} c={c} />)}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default CandidatesPage;
