import React, { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Badge } from "./ui/badge";
import { Search, MapPin, Sparkles, ArrowRight, Star, ShieldCheck, Zap } from "lucide-react";
import { Link } from "react-router-dom";

const Hero = () => {
  const [q, setQ] = useState("");
  const [loc, setLoc] = useState("");

  return (
    <section className="relative overflow-hidden">
      {/* Soft gradient blobs */}
      <div className="blob blob-emerald h-[420px] w-[420px] -top-24 -left-24" />
      <div className="blob blob-mint h-[380px] w-[380px] top-40 right-[-120px]" />

      <div className="absolute inset-0 dot-grid opacity-40 pointer-events-none" />

      <div className="relative mx-auto max-w-7xl px-5 lg:px-8 pt-16 lg:pt-24 pb-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left */}
          <div className="fade-up">
            <Badge className="bg-brand-50 text-brand-700 hover:bg-brand-100 border-brand-200 rounded-full px-3 py-1 font-medium">
              <Sparkles className="h-3.5 w-3.5 mr-1.5" />
              AI Skill-Based Hiring · New
            </Badge>

            <h1 className="font-display mt-5 text-5xl sm:text-6xl lg:text-[68px] leading-[1.02] font-bold text-slate-900">
              Hire by <span className="relative inline-block">
                <span className="relative z-10 text-brand-600">skills,</span>
                <span className="absolute inset-x-0 bottom-2 h-3 bg-brand-100 -z-0 rounded"></span>
              </span>
              <br />
              not by keywords.
            </h1>

            <p className="mt-6 text-lg text-slate-600 max-w-xl">
              Vizarto is the AI‑powered hiring platform that matches verified talent to the
              right roles — in minutes, not months. Fair, fast, and delightfully human.
            </p>

            {/* Search bar */}
            <div className="mt-8 bg-white border border-slate-200 rounded-2xl shadow-sm p-2 flex flex-col sm:flex-row gap-2">
              <div className="flex items-center gap-2 flex-1 px-3">
                <Search className="h-5 w-5 text-slate-400" />
                <Input
                  value={q}
                  onChange={(e) => setQ(e.target.value)}
                  placeholder="Job title, skill, or company"
                  className="border-0 focus-visible:ring-0 shadow-none h-11 px-0"
                />
              </div>
              <div className="hidden sm:block w-px bg-slate-200 my-2" />
              <div className="flex items-center gap-2 flex-1 px-3">
                <MapPin className="h-5 w-5 text-slate-400" />
                <Input
                  value={loc}
                  onChange={(e) => setLoc(e.target.value)}
                  placeholder="City or Remote"
                  className="border-0 focus-visible:ring-0 shadow-none h-11 px-0"
                />
              </div>
              <Link to="/jobs">
                <Button className="h-12 bg-brand-600 hover:bg-brand-700 text-white rounded-xl px-6 w-full sm:w-auto">
                  Search jobs
                  <ArrowRight className="h-4 w-4 ml-1" />
                </Button>
              </Link>
            </div>

            {/* Dual CTA */}
            <div className="mt-5 flex flex-col sm:flex-row gap-3">
              <Link to="/jobs" className="flex-1">
                <div className="lift group rounded-2xl border border-slate-200 bg-white p-4 flex items-center gap-3 cursor-pointer">
                  <div className="h-10 w-10 rounded-xl bg-brand-50 text-brand-700 flex items-center justify-center">
                    <Search className="h-5 w-5" />
                  </div>
                  <div className="flex-1">
                    <div className="text-sm font-semibold text-slate-900">I’m looking for a job</div>
                    <div className="text-xs text-slate-500">Get AI-matched to top roles</div>
                  </div>
                  <ArrowRight className="h-4 w-4 text-slate-400 group-hover:text-brand-600 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
              <Link to="/candidates" className="flex-1">
                <div className="lift group rounded-2xl border border-slate-200 bg-white p-4 flex items-center gap-3 cursor-pointer">
                  <div className="h-10 w-10 rounded-xl bg-slate-900 text-white flex items-center justify-center">
                    <Sparkles className="h-5 w-5" />
                  </div>
                  <div className="flex-1">
                    <div className="text-sm font-semibold text-slate-900">I’m hiring talent</div>
                    <div className="text-xs text-slate-500">Find verified candidates</div>
                  </div>
                  <ArrowRight className="h-4 w-4 text-slate-400 group-hover:text-brand-600 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            </div>

            {/* Trust markers */}
            <div className="mt-8 flex flex-wrap items-center gap-6 text-sm text-slate-500">
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="h-4 w-4 text-brand-600" /> Verified talent
              </div>
              <div className="flex items-center gap-1.5">
                <Zap className="h-4 w-4 text-brand-600" /> Shortlist in 5 min
              </div>
              <div className="flex items-center gap-1.5">
                <Star className="h-4 w-4 text-amber-500 fill-amber-500" /> 4.9 / 5 rated
              </div>
            </div>
          </div>

          {/* Right - visual card */}
          <div className="relative fade-up" style={{ animationDelay: "120ms" }}>
            <HeroMatchCard />
          </div>
        </div>
      </div>
    </section>
  );
};

const HeroMatchCard = () => {
  return (
    <div className="relative">
      {/* Background image collage */}
      <div className="absolute -top-8 -right-6 w-64 h-72 rounded-3xl overflow-hidden shadow-xl rotate-3 border-4 border-white">
        <img
          src="https://images.unsplash.com/photo-1622675363311-3e1904dc1885?q=80&w=800&auto=format&fit=crop"
          alt="team"
          className="w-full h-full object-cover"
        />
      </div>
      <div className="absolute -bottom-6 -left-2 w-52 h-60 rounded-3xl overflow-hidden shadow-xl -rotate-3 border-4 border-white hidden sm:block">
        <img
          src="https://images.pexels.com/photos/5257005/pexels-photo-5257005.jpeg?auto=compress&cs=tinysrgb&w=800"
          alt="candidate"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Main match card */}
      <div className="relative bg-white rounded-3xl shadow-2xl shadow-brand-500/10 border border-slate-100 p-6 max-w-md ml-auto">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-full bg-brand-500 flex items-center justify-center">
              <Sparkles className="h-4 w-4 text-white" />
            </div>
            <div className="text-xs font-semibold uppercase tracking-wide text-brand-700">
              AI Match
            </div>
          </div>
          <div className="text-2xl font-bold text-brand-600">96%</div>
        </div>

        <div className="mt-4 flex items-center gap-3">
          <div className="h-12 w-12 rounded-2xl bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold">
            AM
          </div>
          <div>
            <div className="font-semibold text-slate-900">Aarav Mehta</div>
            <div className="text-xs text-slate-500">Senior Frontend Engineer · Pune</div>
          </div>
        </div>

        <div className="mt-4 space-y-2">
          {[
            { skill: "React & Next.js", pct: 98 },
            { skill: "TypeScript", pct: 94 },
            { skill: "System Design", pct: 88 },
          ].map((s) => (
            <div key={s.skill}>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-slate-700 font-medium">{s.skill}</span>
                <span className="text-slate-500">{s.pct}%</span>
              </div>
              <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-brand-400 to-brand-600 rounded-full"
                  style={{ width: `${s.pct}%` }}
                />
              </div>
            </div>
          ))}
        </div>

        <div className="mt-5 flex items-center justify-between border-t border-slate-100 pt-4">
          <div>
            <div className="text-xs text-slate-500">Match for</div>
            <div className="text-sm font-semibold text-slate-900">Senior FE @ Brightform</div>
          </div>
          <Button size="sm" className="bg-brand-600 hover:bg-brand-700 rounded-full">
            Invite
          </Button>
        </div>
      </div>

      {/* Floating stats chip */}
      <div className="absolute -bottom-6 right-6 bg-white rounded-2xl shadow-xl px-4 py-3 border border-slate-100 flex items-center gap-3">
        <div className="h-9 w-9 rounded-xl bg-amber-50 flex items-center justify-center">
          <Zap className="h-4 w-4 text-amber-600" />
        </div>
        <div>
          <div className="text-xs text-slate-500">Avg. shortlist time</div>
          <div className="text-sm font-bold text-slate-900">4m 32s</div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
