import React, { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Textarea } from "../components/ui/textarea";
import { Label } from "../components/ui/label";
import { Progress } from "../components/ui/progress";
import { Badge } from "../components/ui/badge";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "../components/ui/select";
import { RadioGroup, RadioGroupItem } from "../components/ui/radio-group";
import {
  Check,
  Building2,
  Briefcase,
  DollarSign,
  Sparkles,
  ArrowLeft,
  ArrowRight,
  X,
  Loader2,
} from "lucide-react";
import { useToast } from "../hooks/use-toast";

const STEPS = [
  { key: "role", label: "Role details", icon: Briefcase },
  { key: "requirements", label: "Requirements", icon: Sparkles },
  { key: "comp", label: "Compensation", icon: DollarSign },
  { key: "company", label: "Company", icon: Building2 },
  { key: "review", label: "Review & Publish", icon: Check },
];

const defaultForm = {
  title: "",
  department: "",
  employmentType: "Full-time",
  workMode: "Hybrid",
  location: "",
  description: "",
  skills: [],
  seniority: "Mid",
  minExp: "3",
  maxExp: "6",
  currency: "INR",
  salaryMin: "",
  salaryMax: "",
  showSalary: true,
  equity: false,
  companyName: "",
  companyWebsite: "",
  companySize: "11-50",
  contactEmail: "",
};

const PostJobPage = () => {
  const [step, setStep] = useState(0);
  const [form, setForm] = useState(defaultForm);
  const [skillInput, setSkillInput] = useState("");
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [published, setPublished] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const setField = (k, v) => setForm((f) => ({ ...f, [k]: v }));
  const progress = ((step + 1) / STEPS.length) * 100;

  const addSkill = () => {
    const s = skillInput.trim();
    if (!s) return;
    if (form.skills.includes(s)) return;
    setField("skills", [...form.skills, s]);
    setSkillInput("");
  };
  const removeSkill = (s) => setField("skills", form.skills.filter((x) => x !== s));

  const validateStep = () => {
    const e = {};
    if (step === 0) {
      if (!form.title.trim()) e.title = "Job title is required";
      if (!form.location.trim()) e.location = "Location is required";
      if (!form.description.trim() || form.description.length < 40)
        e.description = "Add at least 40 characters";
    }
    if (step === 1) {
      if (form.skills.length === 0) e.skills = "Add at least one skill";
    }
    if (step === 2) {
      if (form.showSalary) {
        if (!form.salaryMin) e.salaryMin = "Required";
        if (!form.salaryMax) e.salaryMax = "Required";
        if (form.salaryMin && form.salaryMax && Number(form.salaryMin) > Number(form.salaryMax))
          e.salaryMax = "Max must be ≥ min";
      }
    }
    if (step === 3) {
      if (!form.companyName.trim()) e.companyName = "Company name required";
      if (!form.contactEmail.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.contactEmail))
        e.contactEmail = "Valid email required";
    }
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const next = () => {
    if (!validateStep()) return;
    if (step < STEPS.length - 1) setStep(step + 1);
  };
  const back = () => step > 0 && setStep(step - 1);

  const publish = async () => {
    setSubmitting(true);
    // Simulate API call
    await new Promise((r) => setTimeout(r, 900));
    // Save to localStorage as mock
    const drafts = JSON.parse(localStorage.getItem("vizarto_jobs") || "[]");
    drafts.push({ ...form, id: crypto.randomUUID?.() || String(Date.now()), createdAt: new Date().toISOString() });
    localStorage.setItem("vizarto_jobs", JSON.stringify(drafts));
    setSubmitting(false);
    setPublished(true);
    toast({
      title: "Job posted!",
      description: `${form.title} at ${form.companyName} is now live for AI matching.`,
    });
  };

  if (published) {
    return (
      <div className="bg-white min-h-screen">
        <Header />
        <section className="py-20">
          <div className="mx-auto max-w-xl px-5 text-center">
            <div className="mx-auto h-16 w-16 rounded-2xl bg-emerald-500 text-white flex items-center justify-center">
              <Check className="h-8 w-8" strokeWidth={3} />
            </div>
            <h1 className="font-display mt-6 text-4xl font-bold text-slate-900">
              Your job is live!
            </h1>
            <p className="mt-3 text-slate-600">
              We've started matching <span className="font-semibold text-slate-900">{form.title}</span> against 85,000+ verified candidates.
              You'll see your first shortlist in minutes.
            </p>
            <div className="mt-8 flex justify-center gap-3">
              <Button
                onClick={() => navigate("/candidates")}
                className="bg-emerald-600 hover:bg-emerald-700 rounded-full px-6"
              >
                See top matches <ArrowRight className="h-4 w-4 ml-1" />
              </Button>
              <Button
                variant="outline"
                onClick={() => {
                  setForm(defaultForm);
                  setStep(0);
                  setPublished(false);
                }}
                className="rounded-full border-slate-300"
              >
                Post another
              </Button>
            </div>
          </div>
        </section>
        <Footer />
      </div>
    );
  }

  const StepIcon = STEPS[step].icon;

  return (
    <div className="bg-white min-h-screen">
      <Header />

      <section className="bg-gradient-to-b from-emerald-50/60 to-white border-b border-slate-100 py-12">
        <div className="mx-auto max-w-4xl px-5 lg:px-8">
          <Badge className="bg-emerald-50 text-emerald-700 hover:bg-emerald-100 border-emerald-200 rounded-full">
            <Sparkles className="h-3.5 w-3.5 mr-1.5" /> Post a Job
          </Badge>
          <h1 className="font-display mt-4 text-4xl sm:text-5xl font-bold text-slate-900">
            Hire your next great teammate.
          </h1>
          <p className="mt-3 text-slate-600">
            Answer a few questions and we'll AI-match your role to the right candidates in minutes.
          </p>
        </div>
      </section>

      <section className="py-10">
        <div className="mx-auto max-w-4xl px-5 lg:px-8 grid lg:grid-cols-[220px_1fr] gap-8">
          {/* Stepper */}
          <aside className="lg:sticky lg:top-24 h-max">
            <div className="mb-4 lg:hidden">
              <Progress value={progress} className="h-2" />
              <div className="mt-2 text-xs text-slate-500">
                Step {step + 1} of {STEPS.length} · {STEPS[step].label}
              </div>
            </div>
            <ol className="hidden lg:block space-y-1">
              {STEPS.map((s, i) => {
                const Icon = s.icon;
                const active = i === step;
                const complete = i < step;
                return (
                  <li key={s.key}>
                    <button
                      onClick={() => i < step && setStep(i)}
                      disabled={i > step}
                      className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-left transition-colors ${
                        active
                          ? "bg-emerald-50 text-emerald-800 font-semibold"
                          : complete
                          ? "text-slate-700 hover:bg-slate-50"
                          : "text-slate-400 cursor-not-allowed"
                      }`}
                    >
                      <div
                        className={`h-7 w-7 rounded-lg flex items-center justify-center text-xs font-bold ${
                          active
                            ? "bg-emerald-600 text-white"
                            : complete
                            ? "bg-emerald-500 text-white"
                            : "bg-slate-100 text-slate-500"
                        }`}
                      >
                        {complete ? <Check className="h-4 w-4" /> : <Icon className="h-4 w-4" />}
                      </div>
                      {s.label}
                    </button>
                  </li>
                );
              })}
            </ol>
          </aside>

          {/* Form */}
          <div className="rounded-3xl border border-slate-200 bg-white p-6 lg:p-8">
            <div className="hidden lg:flex items-center justify-between mb-5">
              <div className="flex items-center gap-2 text-emerald-700">
                <StepIcon className="h-5 w-5" />
                <span className="font-display text-xl font-semibold">{STEPS[step].label}</span>
              </div>
              <div className="text-xs text-slate-500">Step {step + 1} of {STEPS.length}</div>
            </div>

            {step === 0 && (
              <RoleStep form={form} setField={setField} errors={errors} />
            )}
            {step === 1 && (
              <RequirementsStep
                form={form}
                setField={setField}
                skillInput={skillInput}
                setSkillInput={setSkillInput}
                addSkill={addSkill}
                removeSkill={removeSkill}
                errors={errors}
              />
            )}
            {step === 2 && <CompStep form={form} setField={setField} errors={errors} />}
            {step === 3 && <CompanyStep form={form} setField={setField} errors={errors} />}
            {step === 4 && <ReviewStep form={form} />}

            <div className="mt-8 flex items-center justify-between border-t border-slate-100 pt-5">
              <Button
                variant="ghost"
                onClick={back}
                disabled={step === 0}
                className="text-slate-600"
              >
                <ArrowLeft className="h-4 w-4 mr-1" /> Back
              </Button>
              {step < STEPS.length - 1 ? (
                <Button
                  onClick={next}
                  className="bg-emerald-600 hover:bg-emerald-700 rounded-full px-6"
                >
                  Continue <ArrowRight className="h-4 w-4 ml-1" />
                </Button>
              ) : (
                <Button
                  onClick={publish}
                  disabled={submitting}
                  className="bg-emerald-600 hover:bg-emerald-700 rounded-full px-6 min-w-[160px]"
                >
                  {submitting ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin mr-2" /> Publishing...
                    </>
                  ) : (
                    <>Publish job <Sparkles className="h-4 w-4 ml-1" /></>
                  )}
                </Button>
              )}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

const Field = ({ label, error, children, hint }) => (
  <div>
    <Label className="text-sm font-medium text-slate-800">{label}</Label>
    <div className="mt-1.5">{children}</div>
    {hint && !error && <p className="mt-1 text-xs text-slate-500">{hint}</p>}
    {error && <p className="mt-1 text-xs text-red-600">{error}</p>}
  </div>
);

const RoleStep = ({ form, setField, errors }) => (
  <div className="space-y-5">
    <Field label="Job title" error={errors.title}>
      <Input
        value={form.title}
        onChange={(e) => setField("title", e.target.value)}
        placeholder="e.g. Senior AI/ML Engineer"
        className="h-11"
      />
    </Field>
    <div className="grid sm:grid-cols-2 gap-4">
      <Field label="Department">
        <Select value={form.department} onValueChange={(v) => setField("department", v)}>
          <SelectTrigger className="h-11"><SelectValue placeholder="Select" /></SelectTrigger>
          <SelectContent>
            {["Engineering", "Design", "Product", "Data & AI", "Marketing", "Sales", "Finance", "Operations", "Other"].map((d) => (
              <SelectItem key={d} value={d}>{d}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </Field>
      <Field label="Employment type">
        <Select value={form.employmentType} onValueChange={(v) => setField("employmentType", v)}>
          <SelectTrigger className="h-11"><SelectValue /></SelectTrigger>
          <SelectContent>
            {["Full-time", "Part-time", "Contract", "Internship"].map((t) => (
              <SelectItem key={t} value={t}>{t}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </Field>
    </div>
    <div className="grid sm:grid-cols-2 gap-4">
      <Field label="Work mode">
        <RadioGroup value={form.workMode} onValueChange={(v) => setField("workMode", v)} className="flex gap-2">
          {["Remote", "Hybrid", "Onsite"].map((m) => (
            <label
              key={m}
              className={`flex items-center gap-2 border rounded-lg px-3 py-2 text-sm cursor-pointer flex-1 ${
                form.workMode === m ? "border-emerald-500 bg-emerald-50 text-emerald-800" : "border-slate-200"
              }`}
            >
              <RadioGroupItem value={m} className="sr-only" />
              {m}
            </label>
          ))}
        </RadioGroup>
      </Field>
      <Field label="Location" error={errors.location}>
        <Input
          value={form.location}
          onChange={(e) => setField("location", e.target.value)}
          placeholder="e.g. Bengaluru, IN or Remote"
          className="h-11"
        />
      </Field>
    </div>
    <Field
      label="Job description"
      error={errors.description}
      hint="Describe the role, impact, and day-to-day. Our AI uses this to match candidates."
    >
      <Textarea
        value={form.description}
        onChange={(e) => setField("description", e.target.value)}
        placeholder="What will they build? Who will they work with? What outcomes matter?"
        rows={6}
      />
    </Field>
  </div>
);

const RequirementsStep = ({ form, setField, skillInput, setSkillInput, addSkill, removeSkill, errors }) => (
  <div className="space-y-5">
    <Field label="Required skills" error={errors.skills} hint="Press Enter to add. Add 3–10 skills.">
      <div className="flex gap-2">
        <Input
          value={skillInput}
          onChange={(e) => setSkillInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              addSkill();
            }
          }}
          placeholder="e.g. React, PyTorch, Product Strategy"
          className="h-11"
        />
        <Button onClick={addSkill} variant="outline" className="rounded-lg border-slate-300">
          Add
        </Button>
      </div>
      {form.skills.length > 0 && (
        <div className="mt-3 flex flex-wrap gap-2">
          {form.skills.map((s) => (
            <span
              key={s}
              className="inline-flex items-center gap-1 bg-emerald-50 text-emerald-800 border border-emerald-200 rounded-full px-3 py-1 text-sm"
            >
              {s}
              <button onClick={() => removeSkill(s)} className="hover:text-emerald-900">
                <X className="h-3 w-3" />
              </button>
            </span>
          ))}
        </div>
      )}
    </Field>
    <div className="grid sm:grid-cols-3 gap-4">
      <Field label="Seniority">
        <Select value={form.seniority} onValueChange={(v) => setField("seniority", v)}>
          <SelectTrigger className="h-11"><SelectValue /></SelectTrigger>
          <SelectContent>
            {["Junior", "Mid", "Senior", "Staff", "Principal", "Lead"].map((s) => (
              <SelectItem key={s} value={s}>{s}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </Field>
      <Field label="Min experience (yrs)">
        <Input
          type="number"
          value={form.minExp}
          onChange={(e) => setField("minExp", e.target.value)}
          className="h-11"
          min="0"
        />
      </Field>
      <Field label="Max experience (yrs)">
        <Input
          type="number"
          value={form.maxExp}
          onChange={(e) => setField("maxExp", e.target.value)}
          className="h-11"
          min="0"
        />
      </Field>
    </div>
  </div>
);

const CompStep = ({ form, setField, errors }) => (
  <div className="space-y-5">
    <div className="flex items-center justify-between rounded-xl border border-slate-200 bg-slate-50/60 p-4">
      <div>
        <div className="font-semibold text-slate-900 text-sm">Show salary on the job post</div>
        <div className="text-xs text-slate-500">Roles with visible pay get 2.4× more applications.</div>
      </div>
      <button
        onClick={() => setField("showSalary", !form.showSalary)}
        className={`h-6 w-11 rounded-full relative transition-colors ${
          form.showSalary ? "bg-emerald-500" : "bg-slate-300"
        }`}
      >
        <span
          className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform ${
            form.showSalary ? "translate-x-5" : "translate-x-0.5"
          }`}
        />
      </button>
    </div>

    {form.showSalary && (
      <div className="grid sm:grid-cols-3 gap-4">
        <Field label="Currency">
          <Select value={form.currency} onValueChange={(v) => setField("currency", v)}>
            <SelectTrigger className="h-11"><SelectValue /></SelectTrigger>
            <SelectContent>
              {["INR", "USD", "EUR", "GBP", "SGD"].map((c) => (
                <SelectItem key={c} value={c}>{c}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </Field>
        <Field label="Min salary / year" error={errors.salaryMin}>
          <Input
            type="number"
            value={form.salaryMin}
            onChange={(e) => setField("salaryMin", e.target.value)}
            placeholder="e.g. 1500000"
            className="h-11"
          />
        </Field>
        <Field label="Max salary / year" error={errors.salaryMax}>
          <Input
            type="number"
            value={form.salaryMax}
            onChange={(e) => setField("salaryMax", e.target.value)}
            placeholder="e.g. 2500000"
            className="h-11"
          />
        </Field>
      </div>
    )}

    <label className="flex items-center gap-3 rounded-xl border border-slate-200 p-4 cursor-pointer">
      <input
        type="checkbox"
        checked={form.equity}
        onChange={(e) => setField("equity", e.target.checked)}
        className="h-4 w-4 accent-emerald-600"
      />
      <div>
        <div className="text-sm font-semibold text-slate-900">Includes equity / ESOPs</div>
        <div className="text-xs text-slate-500">We'll show a badge on the job card.</div>
      </div>
    </label>
  </div>
);

const CompanyStep = ({ form, setField, errors }) => (
  <div className="space-y-5">
    <div className="grid sm:grid-cols-2 gap-4">
      <Field label="Company name" error={errors.companyName}>
        <Input
          value={form.companyName}
          onChange={(e) => setField("companyName", e.target.value)}
          placeholder="e.g. Northwind Labs"
          className="h-11"
        />
      </Field>
      <Field label="Website">
        <Input
          value={form.companyWebsite}
          onChange={(e) => setField("companyWebsite", e.target.value)}
          placeholder="https://example.com"
          className="h-11"
        />
      </Field>
    </div>
    <div className="grid sm:grid-cols-2 gap-4">
      <Field label="Company size">
        <Select value={form.companySize} onValueChange={(v) => setField("companySize", v)}>
          <SelectTrigger className="h-11"><SelectValue /></SelectTrigger>
          <SelectContent>
            {["1-10", "11-50", "51-200", "201-1000", "1000+"].map((s) => (
              <SelectItem key={s} value={s}>{s} employees</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </Field>
      <Field label="Contact email" error={errors.contactEmail} hint="We'll send applications here.">
        <Input
          type="email"
          value={form.contactEmail}
          onChange={(e) => setField("contactEmail", e.target.value)}
          placeholder="hiring@company.com"
          className="h-11"
        />
      </Field>
    </div>
  </div>
);

const ReviewStep = ({ form }) => {
  const salary = form.showSalary && form.salaryMin && form.salaryMax
    ? `${form.currency} ${Number(form.salaryMin).toLocaleString()} – ${Number(form.salaryMax).toLocaleString()}`
    : "Not disclosed";
  return (
    <div className="space-y-5">
      <div className="rounded-2xl border border-slate-200 p-5">
        <div className="text-xs font-semibold uppercase tracking-widest text-slate-500">Role</div>
        <div className="mt-1 font-display text-2xl font-bold text-slate-900">
          {form.title || "Untitled role"}
        </div>
        <div className="mt-1 text-sm text-slate-600">
          {form.companyName || "Your company"} · {form.location} · {form.workMode} · {form.employmentType}
        </div>
        <div className="mt-4 flex flex-wrap gap-1.5">
          {form.skills.map((s) => (
            <span key={s} className="text-xs bg-slate-100 text-slate-700 rounded-full px-2.5 py-1">
              {s}
            </span>
          ))}
        </div>
      </div>
      <ReviewRow label="Experience" value={`${form.minExp}–${form.maxExp} yrs · ${form.seniority}`} />
      <ReviewRow label="Compensation" value={`${salary}${form.equity ? " · Equity" : ""}`} />
      <ReviewRow label="Description" value={form.description || "—"} multi />
      <div className="rounded-xl bg-emerald-50 border border-emerald-200 p-4 text-sm text-emerald-900">
        <div className="font-semibold flex items-center gap-2">
          <Sparkles className="h-4 w-4" /> AI matching starts instantly
        </div>
        <div className="mt-1 text-emerald-800">
          Once you publish, we'll rank 85,000+ candidates and surface your top matches within minutes.
        </div>
      </div>
    </div>
  );
};

const ReviewRow = ({ label, value, multi }) => (
  <div className="grid sm:grid-cols-[160px_1fr] gap-3 py-3 border-b border-slate-100 last:border-0">
    <div className="text-sm font-semibold text-slate-500">{label}</div>
    <div className={`text-sm text-slate-800 ${multi ? "whitespace-pre-wrap" : ""}`}>{value}</div>
  </div>
);

export default PostJobPage;
