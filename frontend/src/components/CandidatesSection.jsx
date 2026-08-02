import React from "react";
import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import { candidates } from "../mock/mock";
import { ShieldCheck, MapPin, ArrowRight } from "lucide-react";

const CandidatesSection = () => {
  return (
    <section className="py-20 lg:py-28 bg-white">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10">
          <div>
            <div className="text-sm font-semibold uppercase tracking-widest text-brand-700">
              Featured talent
            </div>
            <h2 className="font-display mt-2 text-4xl sm:text-5xl font-bold text-slate-900">
              Verified professionals, ready to hire.
            </h2>
          </div>
          <Link to="/candidates">
            <Button variant="ghost" className="text-brand-700 hover:text-brand-800 hover:bg-brand-50">
              View all candidates <ArrowRight className="h-4 w-4 ml-1" />
            </Button>
          </Link>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {candidates.map((c) => (
            <CandidateCard key={c.id} c={c} />
          ))}
        </div>
      </div>
    </section>
  );
};

export const CandidateCard = ({ c }) => (
  <div className="lift rounded-2xl border border-slate-200 bg-white p-5 text-center relative overflow-hidden">
    <div className="absolute top-3 right-3 flex items-center gap-1 bg-brand-50 text-brand-700 rounded-full px-2 py-1 text-xs font-semibold">
      {c.match}% match
    </div>

    <div className={`mx-auto h-16 w-16 rounded-2xl ${c.color} flex items-center justify-center text-xl font-bold`}>
      {c.avatar}
    </div>
    <div className="mt-3 flex items-center justify-center gap-1.5">
      <div className="font-semibold text-slate-900">{c.name}</div>
      {c.verified && <ShieldCheck className="h-4 w-4 text-brand-600" />}
    </div>
    <div className="text-sm text-slate-500">{c.role}</div>
    <div className="mt-1.5 flex items-center justify-center gap-1 text-xs text-slate-400">
      <MapPin className="h-3 w-3" /> {c.location} · {c.exp}
    </div>

    <div className="mt-4 flex flex-wrap justify-center gap-1.5">
      {c.skills.slice(0, 3).map((s) => (
        <span key={s} className="text-xs bg-slate-100 text-slate-700 rounded-full px-2 py-0.5">
          {s}
        </span>
      ))}
    </div>

    <div className="mt-5 flex gap-2">
      <Button variant="outline" size="sm" className="flex-1 rounded-full border-slate-300">
        View
      </Button>
      <Button size="sm" className="flex-1 bg-brand-600 hover:bg-brand-700 rounded-full">
        Invite
      </Button>
    </div>
  </div>
);

export default CandidatesSection;
