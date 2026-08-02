import React from "react";
import { features, companies } from "../mock/mock";
import * as Icons from "lucide-react";

const Features = () => {
  return (
    <section className="py-20 lg:py-28 bg-slate-50/50">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        {/* Company marquee */}
        <div className="mb-16">
          <div className="text-center text-xs font-semibold uppercase tracking-widest text-slate-500 mb-6">
            Trusted by fast-moving teams worldwide
          </div>
          <div className="relative overflow-hidden">
            <div className="flex marquee-track gap-14 whitespace-nowrap">
              {[...companies, ...companies].map((c, i) => (
                <div key={i} className="text-xl font-semibold text-slate-400 hover:text-slate-700 transition-colors">
                  {c}
                </div>
              ))}
            </div>
            <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-slate-50 to-transparent pointer-events-none" />
            <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-slate-50 to-transparent pointer-events-none" />
          </div>
        </div>

        <div className="text-center max-w-2xl mx-auto">
          <div className="text-sm font-semibold uppercase tracking-widest text-brand-700">
            Why Vizarto
          </div>
          <h2 className="font-display mt-3 text-4xl sm:text-5xl font-bold text-slate-900">
            An entire hiring stack, <span className="text-brand-600">rebuilt with AI.</span>
          </h2>
          <p className="mt-4 text-slate-600">
            Skill graphs, transparent match scores, and fair ranking — so the best person for the role actually wins.
          </p>
        </div>

        <div className="mt-14 grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {features.map((f) => {
            const Icon = Icons[f.icon] || Icons.Sparkles;
            return (
              <div
                key={f.title}
                className="lift group relative rounded-2xl border border-slate-200 bg-white p-6"
              >
                <div className="h-11 w-11 rounded-xl bg-brand-50 text-brand-600 flex items-center justify-center group-hover:bg-brand-600 group-hover:text-white transition-colors">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="mt-5 font-display text-lg font-semibold text-slate-900">
                  {f.title}
                </h3>
                <p className="mt-2 text-sm text-slate-600 leading-relaxed">{f.desc}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Features;
