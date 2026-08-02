import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Button } from "../components/ui/button";
import { Switch } from "../components/ui/switch";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "../components/ui/tabs";
import { Badge } from "../components/ui/badge";
import { Check, Sparkles, HelpCircle } from "lucide-react";
import { candidatePlans, employerPlans, pricingFAQ } from "../mock/pricing";
import NotifyDialog from "../components/NotifyDialog";
import PlanComparison from "../components/PlanComparison";

const PricingPage = () => {
  const [annual, setAnnual] = useState(false);
  const [tab, setTab] = useState("candidate");
  const [notifyPlan, setNotifyPlan] = useState(null);
  const navigate = useNavigate();

  const openNotify = (plan) => setNotifyPlan(plan);
  const handleCta = (plan) => {
    if (plan.priceMonthly === 0) {
      // Free plan → signup
      if (tab === "candidate") navigate("/candidates/signup");
      else navigate("/employers/post-job");
    } else {
      openNotify(plan);
    }
  };

  const heading =
    tab === "candidate"
      ? {
          eyebrow: "Candidate plans",
          title: "Find your plan. Start your job search today.",
          sub: "No hidden fees. No long-term contracts. Cancel any time.",
        }
      : {
          eyebrow: "Employer plans",
          title: "Find your hiring plan. Start finding the right talent today.",
          sub: "No hidden fees. No long-term contracts. Cancel any time.",
        };

  return (
    <div className="bg-white min-h-screen">
      <Header />

      {/* Hero */}
      <section className="relative bg-gradient-to-b from-brand-50/60 to-white pt-16 pb-10 overflow-hidden">
        <div className="absolute -top-20 -left-20 w-72 h-72 rounded-full bg-brand-100/50 blur-3xl" />
        <div className="absolute -top-10 right-0 w-64 h-64 rounded-full bg-brand-100/40 blur-3xl" />

        <div className="relative mx-auto max-w-6xl px-5 lg:px-8 text-center">
          <Badge className="bg-brand-50 text-brand-700 hover:bg-brand-100 border-brand-200 rounded-full px-3 py-1 font-medium">
            <Sparkles className="h-3.5 w-3.5 mr-1.5" />
            {heading.eyebrow}
          </Badge>

          <h1 className="font-display mt-5 text-4xl sm:text-5xl lg:text-6xl font-bold text-slate-900 leading-tight max-w-4xl mx-auto">
            {heading.title}
          </h1>
          <p className="mt-4 text-slate-600 text-lg">{heading.sub}</p>

          {/* Tab switch */}
          <Tabs value={tab} onValueChange={setTab} className="mt-8 inline-block">
            <TabsList className="bg-white border border-slate-200 rounded-full p-1 h-auto shadow-sm">
              <TabsTrigger
                value="candidate"
                className="rounded-full px-6 py-2 text-sm font-semibold data-[state=active]:bg-slate-900 data-[state=active]:text-white"
              >
                For Candidates
              </TabsTrigger>
              <TabsTrigger
                value="employer"
                className="rounded-full px-6 py-2 text-sm font-semibold data-[state=active]:bg-slate-900 data-[state=active]:text-white"
              >
                For Employers
              </TabsTrigger>
            </TabsList>
          </Tabs>

          {/* Billing toggle */}
          <div className="mt-6 flex items-center justify-center gap-3">
            <span className={`text-sm font-semibold ${!annual ? "text-slate-900" : "text-slate-500"}`}>
              Monthly
            </span>
            <Switch
              checked={annual}
              onCheckedChange={setAnnual}
              className="data-[state=checked]:bg-brand-600"
            />
            <span className={`text-sm font-semibold ${annual ? "text-slate-900" : "text-slate-500"}`}>
              Annual
            </span>
            <Badge className="bg-brand-100 text-brand-700 hover:bg-brand-100 border-brand-200 rounded-full">
              2 months free
            </Badge>
          </div>
        </div>
      </section>

      {/* Plans */}
      <section className="py-12 lg:py-16 bg-white">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          {tab === "candidate" ? (
            <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
              {candidatePlans.map((p) => (
                <PlanCard key={p.name} plan={p} annual={annual} onCta={handleCta} />
              ))}
            </div>
          ) : (
            <EmployerGrid annual={annual} onCta={handleCta} />
          )}
        </div>
      </section>

      {/* Comparison */}
      <PlanComparison audience={tab} />

      {/* Comparison strip */}
      <section className="py-12 bg-slate-50/60 border-y border-slate-100">
        <div className="mx-auto max-w-5xl px-5 lg:px-8 text-center">
          <div className="text-sm font-semibold uppercase tracking-widest text-brand-700">
            Why upgrade
          </div>
          <h2 className="font-display mt-2 text-3xl sm:text-4xl font-bold text-slate-900">
            Pay only when you're getting real value.
          </h2>
          <div className="mt-8 grid sm:grid-cols-3 gap-5 text-left">
            {[
              { t: "AI that actually understands you", d: "Deep skill graph, not keyword matching. Fair, explainable, fast." },
              { t: "Transparent pricing", d: "Simple monthly or annual. Cancel any time — no surprises." },
              { t: "Support that shows up", d: "Real humans, response in hours (SLA on higher tiers)." },
            ].map((f) => (
              <div key={f.t} className="rounded-2xl bg-white border border-slate-200 p-5">
                <div className="h-9 w-9 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-3">
                  <Check className="h-5 w-5" strokeWidth={2.5} />
                </div>
                <div className="font-semibold text-slate-900">{f.t}</div>
                <div className="mt-1 text-sm text-slate-600">{f.d}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 bg-white">
        <div className="mx-auto max-w-3xl px-5 lg:px-8">
          <div className="text-center mb-10">
            <div className="text-sm font-semibold uppercase tracking-widest text-brand-700">FAQ</div>
            <h2 className="font-display mt-2 text-3xl sm:text-4xl font-bold text-slate-900">
              Answers before you ask.
            </h2>
          </div>
          <div className="space-y-3">
            {pricingFAQ.map((q) => (
              <FAQItem key={q.q} q={q.q} a={q.a} />
            ))}
          </div>
        </div>
      </section>

      <Footer />

      <NotifyDialog
        open={!!notifyPlan}
        onOpenChange={(v) => !v && setNotifyPlan(null)}
        plan={notifyPlan}
        audience={tab}
      />
    </div>
  );
};

const PlanCard = ({ plan, annual, onCta, wide = false }) => {
  const isFree = plan.priceMonthly === 0;
  const isCustom = plan.custom;
  const hidden = plan.hidden;

  const price = annual ? plan.priceAnnual : plan.priceMonthly;
  const priceLabel = isCustom
    ? "Custom"
    : hidden
    ? "Prices not revealed yet"
    : price === 0
    ? "₹0"
    : `₹${price.toLocaleString("en-IN")}`;

  return (
    <div
      className={`relative rounded-3xl border p-7 lg:p-8 flex flex-col ${
        plan.popular
          ? "border-brand-500 bg-white shadow-xl shadow-brand-500/10"
          : "border-slate-200 bg-white"
      } ${wide ? "md:flex-row md:gap-8 md:items-start" : ""}`}
    >
      {plan.popular && (
        <div className="absolute top-0 right-0 overflow-hidden w-32 h-32 rounded-tr-3xl pointer-events-none">
          <div className="absolute top-5 right-[-38px] rotate-45 bg-brand-600 text-white text-[10px] font-bold tracking-widest px-10 py-1 shadow-md">
            MOST POPULAR
          </div>
        </div>
      )}

      <div className={wide ? "md:w-72 md:shrink-0" : ""}>
        <h3 className="font-display text-2xl font-bold text-slate-900">{plan.name}</h3>
        <p className="mt-1 text-sm text-slate-500">{plan.tagline}</p>

        <div className="mt-5">
          {hidden ? (
            <div className="italic text-slate-500">{priceLabel}</div>
          ) : isCustom ? (
            <div>
              <div className="font-display text-4xl font-bold text-slate-900">Custom</div>
              <div className="text-xs text-slate-500 mt-1">{plan.customSub || "Tailored to your scale"}</div>
            </div>
          ) : (
            <div className="flex items-baseline gap-1">
              <span className="font-display text-4xl font-bold text-slate-900">{priceLabel}</span>
              <span className="text-sm text-slate-500">
                /{isFree ? "month · forever" : annual ? "year" : "month"}
              </span>
            </div>
          )}
          {!isFree && !isCustom && !hidden && annual && plan.saves && (
            <div className="text-xs font-semibold text-brand-700 mt-1">
              saves ₹{plan.saves.toLocaleString("en-IN")} vs monthly
            </div>
          )}
          {isFree && <div className="text-xs text-slate-500 mt-1">No card required</div>}
        </div>

        <Button
          onClick={() => onCta?.(plan)}
          className={`mt-6 w-full rounded-full h-11 font-semibold ${
            plan.popular
              ? "bg-brand-600 hover:bg-brand-700 text-white"
              : isFree
              ? "bg-slate-900 hover:bg-slate-800 text-white"
              : "bg-slate-900 hover:bg-slate-800 text-white"
          }`}
        >
          {plan.cta}
        </Button>
      </div>

      <div className={`mt-7 ${wide ? "md:mt-0 md:flex-1" : ""}`}>
        <div className="text-xs font-semibold uppercase tracking-widest text-slate-500 mb-3 border-t border-slate-100 pt-5">
          What's included
        </div>
        <ul className={`space-y-2.5 ${wide ? "md:grid md:grid-cols-2 md:gap-x-6 md:gap-y-2.5 md:space-y-0" : ""}`}>
          {plan.features.map((f) => (
            <li key={f} className="flex items-start gap-2.5">
              <div className="h-5 w-5 rounded-full bg-emerald-500 text-white flex items-center justify-center shrink-0 mt-0.5">
                <Check className="h-3 w-3" strokeWidth={3} />
              </div>
              <span className="text-sm text-slate-700 leading-snug">{f}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

const EmployerGrid = ({ annual, onCta }) => {
  const basic = employerPlans.find((p) => p.slug === "basic");
  const paid = employerPlans.filter((p) => ["starter", "growth", "premium"].includes(p.slug));
  const enterprise = employerPlans.find((p) => p.slug === "enterprise");

  return (
    <div className="space-y-6">
      {/* Basic - wide */}
      {basic && <PlanCard plan={basic} annual={annual} onCta={onCta} wide />}

      {/* Paid tiers */}
      <div className="grid md:grid-cols-3 gap-6">
        {paid.map((p) => (
          <PlanCard key={p.slug} plan={p} annual={annual} onCta={onCta} />
        ))}
      </div>

      {/* Enterprise - wide */}
      {enterprise && <PlanCard plan={enterprise} annual={annual} onCta={onCta} wide />}
    </div>
  );
};

const FAQItem = ({ q, a }) => {
  const [open, setOpen] = useState(false);
  return (
    <div className="rounded-2xl border border-slate-200 bg-white overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between text-left px-5 py-4 hover:bg-slate-50 transition-colors"
      >
        <span className="font-semibold text-slate-900">{q}</span>
        <HelpCircle
          className={`h-5 w-5 text-brand-600 transition-transform ${open ? "rotate-45" : ""}`}
        />
      </button>
      {open && (
        <div className="px-5 pb-4 text-sm text-slate-600 leading-relaxed border-t border-slate-100 pt-3">
          {a}
        </div>
      )}
    </div>
  );
};

export default PricingPage;
