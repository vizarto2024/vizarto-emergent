import React from "react";
import { stats, testimonials, locations } from "../mock/mock";
import { Star, Quote, MapPin, ArrowUpRight } from "lucide-react";

export const Stats = () => (
  <section className="py-16 bg-gradient-to-b from-white to-emerald-50/40">
    <div className="mx-auto max-w-7xl px-5 lg:px-8">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
        {stats.map((s) => (
          <div key={s.label} className="rounded-2xl bg-white border border-slate-200 p-6 text-center lift">
            <div className="font-display text-4xl lg:text-5xl font-bold text-slate-900">{s.value}</div>
            <div className="mt-1 text-sm font-semibold text-emerald-700">{s.label}</div>
            <div className="text-xs text-slate-500">{s.sub}</div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export const Testimonials = () => (
  <section className="py-20 lg:py-28 bg-white">
    <div className="mx-auto max-w-7xl px-5 lg:px-8">
      <div className="text-center max-w-2xl mx-auto mb-14">
        <div className="text-sm font-semibold uppercase tracking-widest text-emerald-700">Testimonials</div>
        <h2 className="font-display mt-3 text-4xl sm:text-5xl font-bold text-slate-900">
          Loved by teams and talent.
        </h2>
      </div>

      <div className="grid md:grid-cols-3 gap-5">
        {testimonials.map((t, i) => (
          <div key={i} className="lift rounded-2xl border border-slate-200 bg-white p-7 relative">
            <Quote className="absolute top-6 right-6 h-8 w-8 text-emerald-100" />
            <div className="flex gap-0.5">
              {[...Array(5)].map((_, j) => (
                <Star key={j} className="h-4 w-4 fill-amber-400 text-amber-400" />
              ))}
            </div>
            <p className="mt-4 text-slate-700 leading-relaxed">"{t.quote}"</p>
            <div className="mt-6 flex items-center gap-3 border-t border-slate-100 pt-4">
              <div className={`h-10 w-10 rounded-xl ${t.color} flex items-center justify-center font-bold`}>
                {t.avatar}
              </div>
              <div>
                <div className="font-semibold text-slate-900 text-sm">{t.name}</div>
                <div className="text-xs text-slate-500">{t.role}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export const LocationsSection = () => (
  <section className="py-20 lg:py-28 bg-slate-50/50">
    <div className="mx-auto max-w-7xl px-5 lg:px-8">
      <div className="text-center max-w-2xl mx-auto mb-12">
        <div className="text-sm font-semibold uppercase tracking-widest text-emerald-700">Explore by location</div>
        <h2 className="font-display mt-3 text-4xl sm:text-5xl font-bold text-slate-900">
          Opportunities everywhere.
        </h2>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {locations.map((l) => (
          <a
            key={l.city}
            href="#"
            className="lift group rounded-2xl border border-slate-200 bg-white p-5 flex items-start justify-between"
          >
            <div>
              <div className="flex items-center gap-2 text-slate-900 font-semibold">
                <MapPin className="h-4 w-4 text-emerald-600" /> {l.city}
              </div>
              <div className="text-xs text-slate-500 mt-0.5">{l.country}</div>
              <div className="mt-3 text-sm font-semibold text-emerald-700">
                {l.jobs.toLocaleString()} open jobs
              </div>
            </div>
            <ArrowUpRight className="h-4 w-4 text-slate-400 group-hover:text-emerald-600 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-transform" />
          </a>
        ))}
      </div>
    </div>
  </section>
);
