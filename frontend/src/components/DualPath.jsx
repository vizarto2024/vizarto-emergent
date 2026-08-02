import React from "react";
import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import { howItWorks } from "../mock/mock";
import { ArrowRight, Check, Users, Building2 } from "lucide-react";

const DualPath = () => {
  return (
    <section className="py-20 lg:py-28 bg-white">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="text-sm font-semibold uppercase tracking-widest text-brand-700">
            Two sides, one platform
          </div>
          <h2 className="font-display mt-3 text-4xl sm:text-5xl font-bold text-slate-900">
            Built for candidates <span className="text-brand-600">and</span> employers.
          </h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Candidates */}
          <div className="relative rounded-3xl border border-slate-200 bg-gradient-to-br from-brand-50/60 to-white p-8 lg:p-10 overflow-hidden">
            <div className="absolute -top-16 -right-16 w-64 h-64 rounded-full bg-brand-100/60 blur-2xl pointer-events-none" />
            <div className="relative">
              <div className="inline-flex items-center gap-2 rounded-full bg-white border border-brand-200 px-3 py-1 text-xs font-semibold text-brand-700">
                <Users className="h-3.5 w-3.5" /> For Candidates
              </div>
              <h3 className="font-display mt-5 text-3xl font-bold text-slate-900">
                Land the role you actually want.
              </h3>
              <p className="mt-3 text-slate-600">
                Turn your experience into a rich skill graph. Get discovered by companies who need exactly what you do best.
              </p>

              <div className="mt-8 space-y-4">
                {howItWorks.candidates.map((s) => (
                  <div key={s.step} className="flex gap-4">
                    <div className="h-10 w-10 shrink-0 rounded-xl bg-brand-600 text-white flex items-center justify-center font-bold text-sm">
                      {s.step}
                    </div>
                    <div>
                      <div className="font-semibold text-slate-900">{s.title}</div>
                      <div className="text-sm text-slate-600">{s.desc}</div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-8 flex flex-wrap items-center gap-3">
                <Link to="/jobs">
                  <Button className="bg-brand-600 hover:bg-brand-700 rounded-full px-6">
                    Explore opportunities <ArrowRight className="h-4 w-4 ml-1" />
                  </Button>
                </Link>
                <Link to="/candidates/signup">
                  <Button variant="outline" className="rounded-full px-6 border-slate-300">
                    Build free profile
                  </Button>
                </Link>
              </div>
            </div>
          </div>

          {/* Employers */}
          <div className="relative rounded-3xl border border-slate-900 bg-slate-900 text-white p-8 lg:p-10 overflow-hidden">
            <div className="absolute -top-24 -right-24 w-72 h-72 rounded-full bg-brand-500/20 blur-3xl pointer-events-none" />
            <div className="relative">
              <div className="inline-flex items-center gap-2 rounded-full bg-white/10 border border-white/20 px-3 py-1 text-xs font-semibold text-brand-300">
                <Building2 className="h-3.5 w-3.5" /> For Employers
              </div>
              <h3 className="font-display mt-5 text-3xl font-bold">
                Hire the right people, faster.
              </h3>
              <p className="mt-3 text-slate-300">
                Replace endless keyword searches with a smart shortlist. Fair, explainable, and ready in minutes.
              </p>

              <div className="mt-8 space-y-4">
                {howItWorks.employers.map((s) => (
                  <div key={s.step} className="flex gap-4">
                    <div className="h-10 w-10 shrink-0 rounded-xl bg-brand-500 text-slate-900 flex items-center justify-center font-bold text-sm">
                      {s.step}
                    </div>
                    <div>
                      <div className="font-semibold">{s.title}</div>
                      <div className="text-sm text-slate-300">{s.desc}</div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-8 flex flex-wrap items-center gap-3">
                <Link to="/candidates">
                  <Button className="bg-brand-500 hover:bg-brand-400 text-slate-900 rounded-full px-6 font-semibold">
                    Explore candidates <ArrowRight className="h-4 w-4 ml-1" />
                  </Button>
                </Link>
                <Link to="/employers/post-job">
                  <Button variant="outline" className="rounded-full px-6 bg-transparent text-white border-white/30 hover:bg-white/10 hover:text-white">
                    Post a job
                  </Button>
                </Link>
              </div>

              <div className="mt-8 pt-6 border-t border-white/10 grid grid-cols-3 gap-4 text-center">
                {[
                  { v: "47%", l: "Faster hires" },
                  { v: "3.2x", l: "Better match rate" },
                  { v: "$0", l: "To try" },
                ].map((s) => (
                  <div key={s.l}>
                    <div className="text-2xl font-bold text-brand-400">{s.v}</div>
                    <div className="text-xs text-slate-400">{s.l}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DualPath;
