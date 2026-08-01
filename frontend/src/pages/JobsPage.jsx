import React, { useMemo, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { JobCard } from "../components/JobsSection";
import { jobs, categories, locations } from "../mock/mock";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import { Checkbox } from "../components/ui/checkbox";
import { Search, MapPin, SlidersHorizontal } from "lucide-react";

const JobsPage = () => {
  const [q, setQ] = useState("");
  const [selectedTypes, setSelectedTypes] = useState([]);
  const [selectedLocations, setSelectedLocations] = useState([]);

  const filtered = useMemo(() => {
    return jobs.filter((j) => {
      const matchQ = !q || (j.title + j.company + j.skills.join(" ")).toLowerCase().includes(q.toLowerCase());
      const matchType = selectedTypes.length === 0 || selectedTypes.includes(j.type);
      const matchLoc = selectedLocations.length === 0 || selectedLocations.some((l) => j.location.includes(l));
      return matchQ && matchType && matchLoc;
    });
  }, [q, selectedTypes, selectedLocations]);

  const toggle = (list, setList, val) =>
    setList(list.includes(val) ? list.filter((v) => v !== val) : [...list, val]);

  return (
    <div className="bg-white min-h-screen">
      <Header />

      <section className="bg-gradient-to-b from-emerald-50/60 to-white border-b border-slate-100 py-14">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <div className="text-sm font-semibold uppercase tracking-widest text-emerald-700">Job Board</div>
          <h1 className="font-display mt-2 text-4xl sm:text-5xl font-bold text-slate-900">
            Find your next role.
          </h1>
          <p className="mt-3 text-slate-600 max-w-xl">
            {jobs.length}+ curated openings, ranked by AI-powered skill match.
          </p>

          <div className="mt-6 bg-white border border-slate-200 rounded-2xl shadow-sm p-2 flex flex-col sm:flex-row gap-2 max-w-3xl">
            <div className="flex items-center gap-2 flex-1 px-3">
              <Search className="h-5 w-5 text-slate-400" />
              <Input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Search jobs, skills, companies"
                className="border-0 focus-visible:ring-0 shadow-none h-11 px-0"
              />
            </div>
            <Button className="h-12 bg-emerald-600 hover:bg-emerald-700 rounded-xl px-6">
              Search
            </Button>
          </div>
        </div>
      </section>

      <section className="py-12">
        <div className="mx-auto max-w-7xl px-5 lg:px-8 grid lg:grid-cols-4 gap-8">
          {/* Sidebar filters */}
          <aside className="lg:col-span-1 space-y-6">
            <div className="rounded-2xl border border-slate-200 p-5">
              <div className="flex items-center gap-2 font-semibold text-slate-900 mb-4">
                <SlidersHorizontal className="h-4 w-4 text-emerald-600" /> Filters
              </div>

              <div>
                <div className="text-xs font-semibold uppercase tracking-wide text-slate-500 mb-3">Job Type</div>
                <div className="space-y-2">
                  {["Full‑time", "Contract", "Part‑time", "Internship"].map((t) => (
                    <label key={t} className="flex items-center gap-2 text-sm text-slate-700 cursor-pointer">
                      <Checkbox
                        checked={selectedTypes.includes(t)}
                        onCheckedChange={() => toggle(selectedTypes, setSelectedTypes, t)}
                      />
                      {t}
                    </label>
                  ))}
                </div>
              </div>

              <div className="mt-6">
                <div className="text-xs font-semibold uppercase tracking-wide text-slate-500 mb-3">Location</div>
                <div className="space-y-2 max-h-56 overflow-y-auto pr-2">
                  {locations.map((l) => (
                    <label key={l.city} className="flex items-center gap-2 text-sm text-slate-700 cursor-pointer">
                      <Checkbox
                        checked={selectedLocations.includes(l.city)}
                        onCheckedChange={() => toggle(selectedLocations, setSelectedLocations, l.city)}
                      />
                      <MapPin className="h-3.5 w-3.5 text-slate-400" />
                      {l.city}
                      <span className="ml-auto text-xs text-slate-400">{l.jobs}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="mt-6">
                <div className="text-xs font-semibold uppercase tracking-wide text-slate-500 mb-3">Categories</div>
                <div className="flex flex-wrap gap-1.5">
                  {categories.slice(0, 6).map((c) => (
                    <span key={c.name} className="text-xs bg-slate-100 text-slate-700 rounded-full px-2.5 py-1">
                      {c.name}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </aside>

          {/* Results */}
          <div className="lg:col-span-3">
            <div className="flex items-center justify-between mb-4">
              <div className="text-sm text-slate-600">
                Showing <span className="font-semibold text-slate-900">{filtered.length}</span> jobs
              </div>
              <select className="text-sm border border-slate-200 rounded-lg px-3 py-2 bg-white">
                <option>Best match</option>
                <option>Most recent</option>
                <option>Highest salary</option>
              </select>
            </div>

            <div className="grid md:grid-cols-2 gap-5">
              {filtered.map((j) => <JobCard key={j.id} job={j} />)}
            </div>

            {filtered.length === 0 && (
              <div className="text-center py-20 border border-dashed border-slate-200 rounded-2xl">
                <div className="text-slate-500">No jobs match your filters.</div>
              </div>
            )}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default JobsPage;
