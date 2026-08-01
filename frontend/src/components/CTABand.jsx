import React from "react";
import { Button } from "./ui/button";
import { ArrowRight, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";

export const CTABand = () => (
  <section className="py-20">
    <div className="mx-auto max-w-7xl px-5 lg:px-8">
      <div className="relative overflow-hidden rounded-3xl bg-slate-900 p-10 lg:p-16">
        <div className="absolute -top-32 -right-24 w-96 h-96 rounded-full bg-emerald-500/20 blur-3xl" />
        <div className="absolute -bottom-24 -left-24 w-80 h-80 rounded-full bg-emerald-400/10 blur-3xl" />

        <div className="relative grid lg:grid-cols-2 gap-8 items-center">
          <div className="text-white">
            <div className="inline-flex items-center gap-2 rounded-full bg-white/10 border border-white/20 px-3 py-1 text-xs font-semibold text-emerald-300">
              <Sparkles className="h-3.5 w-3.5" /> Ready in 5 minutes
            </div>
            <h2 className="font-display mt-4 text-4xl sm:text-5xl font-bold leading-tight">
              Meet your next hire — <span className="text-emerald-400">or next role.</span>
            </h2>
            <p className="mt-4 text-slate-300 max-w-xl">
              Join 85,000+ candidates and 1,200+ companies using Vizarto to match talent to opportunity fairly.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 lg:justify-end">
            <Link to="/jobs">
              <Button size="lg" className="bg-emerald-500 hover:bg-emerald-400 text-slate-900 rounded-full px-7 font-semibold w-full sm:w-auto">
                Find a job <ArrowRight className="h-4 w-4 ml-1" />
              </Button>
            </Link>
            <Link to="/candidates">
              <Button size="lg" variant="outline" className="rounded-full px-7 bg-transparent text-white border-white/30 hover:bg-white/10 hover:text-white w-full sm:w-auto">
                Post a job
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default CTABand;
