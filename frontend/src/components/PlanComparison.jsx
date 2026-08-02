import React from "react";
import { Check, Minus } from "lucide-react";

// Feature matrix: rows are features, columns are plans.
// Value: true = check, false = minus, string = custom label.
const CANDIDATE_MATRIX = {
  columns: [
    { key: "free", name: "Free" },
    { key: "pro", name: "Pro", popular: true },
  ],
  groups: [
    {
      label: "Job discovery",
      rows: [
        { name: "Browse jobs", free: true, pro: true },
        { name: "Applications per month", free: "5", pro: "Unlimited" },
        { name: "AI-ranked personalised feed", free: false, pro: true },
        { name: "WhatsApp + email job alerts", free: true, pro: true },
      ],
    },
    {
      label: "AI tools",
      rows: [
        { name: "AI resume parser", free: "1 / month", pro: "Unlimited" },
        { name: "AI cover letter", free: "1 / month", pro: "Unlimited" },
        { name: "AI resume builder", free: false, pro: "Unlimited" },
        { name: "ATS score + tips", free: false, pro: true },
        { name: "Career path & skill gap", free: false, pro: true },
      ],
    },
    {
      label: "Profile & messaging",
      rows: [
        { name: "Resume uploads", free: "1", pro: "Unlimited" },
        { name: "Verified profile badge", free: false, pro: true },
        { name: "Direct messages to employers", free: "3 / month", pro: "Unlimited" },
        { name: "Priority support", free: false, pro: true },
      ],
    },
  ],
};

const EMPLOYER_MATRIX = {
  columns: [
    { key: "basic", name: "Basic" },
    { key: "starter", name: "Starter", popular: true },
    { key: "growth", name: "Growth" },
    { key: "premium", name: "Premium" },
    { key: "enterprise", name: "Enterprise" },
  ],
  groups: [
    {
      label: "Job posting",
      rows: [
        { name: "Active job posts / month", basic: "2", starter: "5", growth: "15", premium: "50", enterprise: "Unlimited" },
        { name: "AI job description", basic: "1 / mo", starter: "Unlimited", growth: "Unlimited", premium: "Unlimited", enterprise: "Unlimited" },
        { name: "Auto-post to LinkedIn", basic: false, starter: false, growth: true, premium: true, enterprise: true },
        { name: "Custom branding on posts", basic: false, starter: true, growth: true, premium: true, enterprise: true },
      ],
    },
    {
      label: "AI matching",
      rows: [
        { name: "Best-fit candidate suggestions", basic: true, starter: true, growth: true, premium: true, enterprise: true },
        { name: "AI ranking by match score", basic: false, starter: "Basic", growth: true, premium: true, enterprise: true },
        { name: "Bulk shortlisting", basic: false, starter: false, growth: true, premium: true, enterprise: true },
        { name: "Profile view credits / mo", basic: "—", starter: "100", growth: "500 (20% rollover)", premium: "2000 (30% rollover)", enterprise: "Custom" },
      ],
    },
    {
      label: "Team & workflow",
      rows: [
        { name: "Recruiter accounts", basic: "1", starter: "1", growth: "3", premium: "Unlimited", enterprise: "Unlimited" },
        { name: "Export candidates (CSV)", basic: false, starter: true, growth: true, premium: true, enterprise: true },
        { name: "Audit logs", basic: false, starter: false, growth: true, premium: true, enterprise: true },
        { name: "API access", basic: false, starter: false, growth: false, premium: false, enterprise: true },
        { name: "Custom ATS integration", basic: false, starter: false, growth: false, premium: false, enterprise: true },
      ],
    },
    {
      label: "Support",
      rows: [
        { name: "Support channel", basic: "Community", starter: "Email", growth: "Priority chat", premium: "SLA", enterprise: "Dedicated CSM" },
        { name: "Onboarding assistance", basic: false, starter: false, growth: false, premium: true, enterprise: true },
        { name: "SSO / SAML", basic: false, starter: false, growth: false, premium: false, enterprise: true },
      ],
    },
  ],
};

const Cell = ({ value }) => {
  if (value === true) {
    return (
      <div className="flex justify-center">
        <div className="h-6 w-6 rounded-full bg-emerald-500 text-white flex items-center justify-center">
          <Check className="h-3.5 w-3.5" strokeWidth={3} />
        </div>
      </div>
    );
  }
  if (value === false) {
    return (
      <div className="flex justify-center text-slate-300">
        <Minus className="h-4 w-4" />
      </div>
    );
  }
  return (
    <div className="text-center text-sm font-medium text-slate-700">{value}</div>
  );
};

const PlanComparison = ({ audience }) => {
  const matrix = audience === "employer" ? EMPLOYER_MATRIX : CANDIDATE_MATRIX;

  return (
    <section className="py-16 lg:py-20 bg-white">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="text-sm font-semibold uppercase tracking-widest text-brand-700">
            Compare plans
          </div>
          <h2 className="font-display mt-2 text-3xl sm:text-4xl font-bold text-slate-900">
            Every feature, side by side.
          </h2>
        </div>

        <div className="rounded-3xl border border-slate-200 overflow-hidden bg-white">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[720px]">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200">
                  <th className="text-left px-6 py-4 text-xs font-semibold uppercase tracking-widest text-slate-500 w-1/3">
                    Features
                  </th>
                  {matrix.columns.map((c) => (
                    <th
                      key={c.key}
                      className={`px-4 py-4 text-sm font-bold ${
                        c.popular ? "text-brand-700" : "text-slate-900"
                      }`}
                    >
                      <div className="flex flex-col items-center gap-1">
                        <span>{c.name}</span>
                        {c.popular && (
                          <span className="text-[10px] font-semibold tracking-wider text-brand-600 bg-brand-50 border border-brand-200 rounded-full px-2 py-0.5">
                            POPULAR
                          </span>
                        )}
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {matrix.groups.map((group) => (
                  <React.Fragment key={group.label}>
                    <tr>
                      <td
                        colSpan={matrix.columns.length + 1}
                        className="px-6 py-3 bg-slate-50/60 text-xs font-semibold uppercase tracking-widest text-slate-500 border-t border-b border-slate-100"
                      >
                        {group.label}
                      </td>
                    </tr>
                    {group.rows.map((row, i) => (
                      <tr
                        key={row.name}
                        className={i % 2 === 1 ? "bg-slate-50/30" : ""}
                      >
                        <td className="px-6 py-3.5 text-sm text-slate-700 font-medium">
                          {row.name}
                        </td>
                        {matrix.columns.map((c) => (
                          <td key={c.key} className="px-4 py-3.5">
                            <Cell value={row[c.key]} />
                          </td>
                        ))}
                      </tr>
                    ))}
                  </React.Fragment>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PlanComparison;
