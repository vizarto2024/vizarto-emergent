import React from "react";
import { Sparkles, BrainCircuit, Target, Layers, ArrowRight, CheckCircle2 } from "lucide-react";
import { Button } from "./ui/button";

const AIMatching = () => {
  return (
    <section className="py-20 lg:py-28 bg-white relative overflow-hidden">
      <div className="absolute inset-0 dot-grid opacity-30 pointer-events-none" />
      <div className="relative mx-auto max-w-7xl px-5 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-14 items-center">
          {/* Left copy */}
          <div>
            <div className="text-sm font-semibold uppercase tracking-widest text-brand-700">
              AI Matching Engine
            </div>
            <h2 className="font-display mt-3 text-4xl sm:text-5xl font-bold text-slate-900">
              A match score you can <span className="text-brand-600">actually trust.</span>
            </h2>
            <p className="mt-5 text-slate-600 text-lg">
              Every match comes with a transparent breakdown — skills, seniority signals, domain
              overlap, and delivery outcomes. No black boxes.
            </p>

            <div className="mt-8 space-y-3">
              {[
                "Skill graph built from resume, projects & code activity",
                "Seniority scored by real impact, not just years",
                "Bias-aware ranking with fairness audits",
                "Explainable results your hiring panel understands",
              ].map((t) => (
                <div key={t} className="flex items-start gap-3">
                  <div className="h-6 w-6 rounded-full bg-brand-100 text-brand-700 flex items-center justify-center mt-0.5 shrink-0">
                    <CheckCircle2 className="h-4 w-4" />
                  </div>
                  <div className="text-slate-700">{t}</div>
                </div>
              ))}
            </div>

            <div className="mt-8">
              <Button className="bg-slate-900 hover:bg-slate-800 rounded-full px-6">
                See how matching works <ArrowRight className="h-4 w-4 ml-1" />
              </Button>
            </div>
          </div>

          {/* Right visual */}
          <div className="relative">
            <div className="rounded-3xl border border-slate-200 bg-white shadow-xl shadow-brand-500/5 p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="h-9 w-9 rounded-xl bg-brand-600 text-white flex items-center justify-center">
                    <BrainCircuit className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="font-semibold text-slate-900">Match Breakdown</div>
                    <div className="text-xs text-slate-500">Role: Senior AI/ML Engineer</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-3xl font-bold text-brand-600">96</div>
                  <div className="text-xs text-slate-500">Overall</div>
                </div>
              </div>

              <div className="mt-6 grid grid-cols-2 gap-3">
                {[
                  { label: "Core Skills", val: 98, icon: Target },
                  { label: "Domain Fit", val: 94, icon: Layers },
                  { label: "Seniority", val: 92, icon: Sparkles },
                  { label: "Culture Signal", val: 88, icon: BrainCircuit },
                ].map((s) => {
                  const Icon = s.icon;
                  return (
                    <div key={s.label} className="rounded-xl border border-slate-100 p-4">
                      <div className="flex items-center justify-between">
                        <div className="h-8 w-8 rounded-lg bg-brand-50 text-brand-600 flex items-center justify-center">
                          <Icon className="h-4 w-4" />
                        </div>
                        <div className="text-lg font-bold text-slate-900">{s.val}</div>
                      </div>
                      <div className="mt-2 text-xs font-semibold text-slate-700">{s.label}</div>
                      <div className="mt-2 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-brand-400 to-brand-600"
                          style={{ width: `${s.val}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="mt-5 rounded-xl bg-slate-900 text-white p-4">
                <div className="text-xs text-brand-300 font-semibold uppercase tracking-wide">
                  Why this match
                </div>
                <div className="mt-1.5 text-sm text-slate-200 leading-relaxed">
                  Deep experience shipping RAG systems at scale, strong PyTorch fundamentals,
                  and prior work in similar domain (fintech + LLM tooling).
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AIMatching;
