import React from "react";
import { Sparkles, Twitter, Linkedin, Github, Instagram } from "lucide-react";

const Footer = () => {
  const cols = [
    {
      title: "For Candidates",
      links: ["Browse jobs", "Build profile", "Skill assessments", "Career resources", "Salary guide"],
    },
    {
      title: "For Employers",
      links: ["Search talent", "Post a job", "AI matching", "Pricing", "Success stories"],
    },
    {
      title: "Company",
      links: ["About", "Careers", "Press", "Trust & Safety", "Contact"],
    },
    {
      title: "Resources",
      links: ["Blog", "Help center", "API docs", "Integrations", "Community"],
    },
  ];

  return (
    <footer className="bg-white border-t border-slate-200">
      <div className="mx-auto max-w-7xl px-5 lg:px-8 py-16">
        <div className="grid lg:grid-cols-6 gap-10">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2">
              <div className="h-9 w-9 rounded-xl bg-gradient-to-br from-brand-500 to-brand-600 flex items-center justify-center">
                <Sparkles className="h-5 w-5 text-white" strokeWidth={2.5} />
              </div>
              <div className="font-display text-xl font-bold text-slate-900">
                vizarto<span className="text-brand-600">.</span>
              </div>
            </div>
            <p className="mt-4 text-sm text-slate-600 max-w-xs">
              The AI-powered hiring platform that matches verified skills with the right opportunity.
            </p>
            <div className="mt-5 flex gap-3">
              {[Twitter, Linkedin, Github, Instagram].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="h-9 w-9 rounded-full border border-slate-200 flex items-center justify-center text-slate-500 hover:text-brand-600 hover:border-brand-300 transition-colors"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {cols.map((col) => (
            <div key={col.title}>
              <div className="font-semibold text-slate-900 text-sm">{col.title}</div>
              <ul className="mt-4 space-y-2.5">
                {col.links.map((l) => (
                  <li key={l}>
                    <a href="#" className="text-sm text-slate-600 hover:text-brand-700 transition-colors">
                      {l}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-14 pt-6 border-t border-slate-100 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-slate-500">
          <div>© {new Date().getFullYear()} Vizarto. All rights reserved.</div>
          <div className="flex gap-6">
            <a href="#" className="hover:text-slate-900">Privacy</a>
            <a href="#" className="hover:text-slate-900">Terms</a>
            <a href="#" className="hover:text-slate-900">Cookies</a>
            <a href="#" className="hover:text-slate-900">Sitemap</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
