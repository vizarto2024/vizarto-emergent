import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { jobs, categories } from "../mock/mock";
import * as Icons from "lucide-react";
import { MapPin, Clock, DollarSign, Bookmark, ArrowRight } from "lucide-react";

const JobsSection = () => {
  const [activeCat, setActiveCat] = useState("All");
  const list = activeCat === "All" ? jobs : jobs;

  return (
    <section className="py-20 lg:py-28 bg-slate-50/50" id="jobs">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10">
          <div>
            <div className="text-sm font-semibold uppercase tracking-widest text-brand-700">
              Featured openings
            </div>
            <h2 className="font-display mt-2 text-4xl sm:text-5xl font-bold text-slate-900">
              Roles matched for real skills.
            </h2>
          </div>
          <Link to="/jobs">
            <Button variant="ghost" className="text-brand-700 hover:text-brand-800 hover:bg-brand-50">
              View all jobs <ArrowRight className="h-4 w-4 ml-1" />
            </Button>
          </Link>
        </div>

        {/* Category chips */}
        <div className="flex flex-wrap gap-2 mb-8">
          <CategoryChip name="All" active={activeCat === "All"} onClick={() => setActiveCat("All")} />
          {categories.map((c) => {
            const Icon = Icons[c.icon] || Icons.Briefcase;
            return (
              <button
                key={c.name}
                onClick={() => setActiveCat(c.name)}
                className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm transition-colors ${
                  activeCat === c.name
                    ? "bg-slate-900 text-white border-slate-900"
                    : "bg-white text-slate-700 border-slate-200 hover:border-brand-400 hover:text-brand-700"
                }`}
              >
                <Icon className="h-4 w-4" />
                {c.name}
                <span className="text-xs opacity-70">({c.count.toLocaleString()})</span>
              </button>
            );
          })}
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {list.map((job) => (
            <JobCard key={job.id} job={job} />
          ))}
        </div>
      </div>
    </section>
  );
};

const CategoryChip = ({ name, active, onClick }) => (
  <button
    onClick={onClick}
    className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm transition-colors ${
      active
        ? "bg-slate-900 text-white border-slate-900"
        : "bg-white text-slate-700 border-slate-200 hover:border-brand-400 hover:text-brand-700"
    }`}
  >
    {name}
  </button>
);

export const JobCard = ({ job }) => {
  const [saved, setSaved] = useState(false);
  return (
    <div className="lift group rounded-2xl border border-slate-200 bg-white p-5 flex flex-col">
      <div className="flex items-start justify-between">
        <div className={`h-11 w-11 rounded-xl ${job.logoColor} flex items-center justify-center font-bold`}>
          {job.logo}
        </div>
        <div className="flex items-center gap-2">
          {job.featured && (
            <Badge className="bg-amber-50 text-amber-700 hover:bg-amber-50 border-amber-200 rounded-full text-xs">
              Featured
            </Badge>
          )}
          <button
            onClick={() => setSaved(!saved)}
            className="h-8 w-8 rounded-full flex items-center justify-center hover:bg-slate-100 transition-colors"
          >
            <Bookmark className={`h-4 w-4 ${saved ? "fill-brand-600 text-brand-600" : "text-slate-400"}`} />
          </button>
        </div>
      </div>

      <h3 className="mt-4 font-display text-lg font-semibold text-slate-900 leading-snug">
        {job.title}
      </h3>
      <div className="text-sm text-slate-500">{job.company}</div>

      <div className="mt-4 flex flex-wrap gap-1.5">
        {job.skills.slice(0, 4).map((s) => (
          <span key={s} className="text-xs bg-slate-100 text-slate-700 rounded-full px-2.5 py-1">
            {s}
          </span>
        ))}
      </div>

      <div className="mt-5 space-y-2 text-sm text-slate-600">
        <div className="flex items-center gap-2">
          <MapPin className="h-4 w-4 text-slate-400" /> {job.location}
        </div>
        <div className="flex items-center gap-2">
          <DollarSign className="h-4 w-4 text-slate-400" /> {job.salary}
        </div>
        <div className="flex items-center gap-2">
          <Clock className="h-4 w-4 text-slate-400" /> {job.type} · {job.posted} ago
        </div>
      </div>

      <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="relative h-9 w-9">
            <svg viewBox="0 0 36 36" className="h-9 w-9 -rotate-90">
              <circle cx="18" cy="18" r="16" fill="none" stroke="#e2e8f0" strokeWidth="3" />
              <circle
                cx="18"
                cy="18"
                r="16"
                fill="none"
                stroke="#10b981"
                strokeWidth="3"
                strokeDasharray={`${(job.match / 100) * 100.5} 100.5`}
                strokeLinecap="round"
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center text-[10px] font-bold text-brand-700">
              {job.match}
            </div>
          </div>
          <div className="text-xs">
            <div className="font-semibold text-slate-900">AI Match</div>
            <div className="text-slate-500">Skills fit</div>
          </div>
        </div>
        <Button size="sm" className="bg-slate-900 hover:bg-slate-800 text-white rounded-full">
          Apply
        </Button>
      </div>
    </div>
  );
};

export default JobsSection;
