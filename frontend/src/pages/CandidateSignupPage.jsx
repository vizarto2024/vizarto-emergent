import React, { useState } from "react";
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
import {
  Check,
  User,
  Sparkles,
  Briefcase,
  Upload,
  ArrowLeft,
  ArrowRight,
  X,
  Loader2,
  FileText,
} from "lucide-react";
import { useToast } from "../hooks/use-toast";

const STEPS = [
  { key: "basics", label: "About you", icon: User },
  { key: "skills", label: "Skills & experience", icon: Sparkles },
  { key: "prefs", label: "Preferences", icon: Briefcase },
  { key: "resume", label: "Resume & finish", icon: Upload },
];

const SUGGESTED_SKILLS = [
  "React", "TypeScript", "Node.js", "Python", "PyTorch",
  "SQL", "AWS", "Figma", "Product Strategy", "Data Analysis",
];

const defaultForm = {
  fullName: "",
  email: "",
  location: "",
  headline: "",
  bio: "",
  skills: [],
  currentRole: "",
  yearsExp: "3",
  desiredRoles: [],
  workMode: "Hybrid",
  minSalary: "",
  currency: "INR",
  openToWork: true,
  resumeFileName: "",
  agree: false,
};

const CandidateSignupPage = () => {
  const [step, setStep] = useState(0);
  const [form, setForm] = useState(defaultForm);
  const [skillInput, setSkillInput] = useState("");
  const [roleInput, setRoleInput] = useState("");
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const setField = (k, v) => setForm((f) => ({ ...f, [k]: v }));
  const progress = ((step + 1) / STEPS.length) * 100;

  const toggleSkill = (s) => {
    if (form.skills.includes(s)) {
      setField("skills", form.skills.filter((x) => x !== s));
    } else {
      setField("skills", [...form.skills, s]);
    }
  };
  const addCustomSkill = () => {
    const s = skillInput.trim();
    if (!s || form.skills.includes(s)) return;
    setField("skills", [...form.skills, s]);
    setSkillInput("");
  };
  const removeSkill = (s) => setField("skills", form.skills.filter((x) => x !== s));

  const addRole = () => {
    const s = roleInput.trim();
    if (!s || form.desiredRoles.includes(s)) return;
    setField("desiredRoles", [...form.desiredRoles, s]);
    setRoleInput("");
  };
  const removeRole = (r) => setField("desiredRoles", form.desiredRoles.filter((x) => x !== r));

  const validateStep = () => {
    const e = {};
    if (step === 0) {
      if (!form.fullName.trim()) e.fullName = "Full name required";
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = "Valid email required";
      if (!form.location.trim()) e.location = "Location required";
      if (!form.headline.trim()) e.headline = "Add a short headline";
    }
    if (step === 1) {
      if (form.skills.length < 3) e.skills = "Add at least 3 skills";
      if (!form.currentRole.trim()) e.currentRole = "Current role required";
    }
    if (step === 2) {
      if (form.desiredRoles.length === 0) e.desiredRoles = "Add at least one desired role";
    }
    if (step === 3) {
      if (!form.agree) e.agree = "Please accept the terms";
    }
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const next = () => {
    if (!validateStep()) return;
    if (step < STEPS.length - 1) setStep(step + 1);
  };
  const back = () => step > 0 && setStep(step - 1);

  const finish = async () => {
    if (!validateStep()) return;
    setSubmitting(true);
    await new Promise((r) => setTimeout(r, 900));
    const profiles = JSON.parse(localStorage.getItem("vizarto_candidates") || "[]");
    profiles.push({
      ...form,
      id: crypto.randomUUID?.() || String(Date.now()),
      createdAt: new Date().toISOString(),
    });
    localStorage.setItem("vizarto_candidates", JSON.stringify(profiles));
    setSubmitting(false);
    setDone(true);
    toast({
      title: "Profile created!",
      description: `Welcome, ${form.fullName.split(" ")[0]}. AI matching is running.`,
    });
  };

  if (done) {
    return (
      <div className="bg-white min-h-screen">
        <Header />
        <section className="py-20">
          <div className="mx-auto max-w-xl px-5 text-center">
            <div className="mx-auto h-16 w-16 rounded-2xl bg-brand-500 text-white flex items-center justify-center">
              <Check className="h-8 w-8" strokeWidth={3} />
            </div>
            <h1 className="font-display mt-6 text-4xl font-bold text-slate-900">
              You're in, {form.fullName.split(" ")[0]}!
            </h1>
            <p className="mt-3 text-slate-600">
              We're building your skill graph and matching you to open roles right now.
              Expect your first shortlist within an hour.
            </p>
            <div className="mt-6 rounded-2xl border border-brand-200 bg-brand-50/50 p-4 text-left">
              <div className="text-xs font-semibold uppercase tracking-widest text-brand-700 mb-2">
                Profile summary
              </div>
              <div className="text-sm text-slate-800">
                <div><span className="text-slate-500">Name:</span> {form.fullName}</div>
                <div><span className="text-slate-500">Role:</span> {form.currentRole} · {form.yearsExp} yrs</div>
                <div><span className="text-slate-500">Skills:</span> {form.skills.slice(0, 5).join(", ")}{form.skills.length > 5 ? "…" : ""}</div>
                <div><span className="text-slate-500">Looking for:</span> {form.desiredRoles.join(", ")}</div>
              </div>
            </div>
            <div className="mt-6 flex justify-center gap-3">
              <Button
                onClick={() => navigate("/jobs")}
                className="bg-brand-600 hover:bg-brand-700 rounded-full px-6"
              >
                See matched jobs <ArrowRight className="h-4 w-4 ml-1" />
              </Button>
              <Button
                variant="outline"
                onClick={() => navigate("/")}
                className="rounded-full border-slate-300"
              >
                Back to home
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

      <section className="bg-gradient-to-b from-brand-50/60 to-white border-b border-slate-100 py-12">
        <div className="mx-auto max-w-4xl px-5 lg:px-8">
          <Badge className="bg-brand-50 text-brand-700 hover:bg-brand-100 border-brand-200 rounded-full">
            <Sparkles className="h-3.5 w-3.5 mr-1.5" /> Candidate Sign-up
          </Badge>
          <h1 className="font-display mt-4 text-4xl sm:text-5xl font-bold text-slate-900">
            Build your skill profile.
          </h1>
          <p className="mt-3 text-slate-600">
            Takes 3 minutes. Our AI turns it into a rich skill graph so the right roles find you.
          </p>
        </div>
      </section>

      <section className="py-10">
        <div className="mx-auto max-w-4xl px-5 lg:px-8 grid lg:grid-cols-[220px_1fr] gap-8">
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
                          ? "bg-brand-50 text-brand-800 font-semibold"
                          : complete
                          ? "text-slate-700 hover:bg-slate-50"
                          : "text-slate-400 cursor-not-allowed"
                      }`}
                    >
                      <div
                        className={`h-7 w-7 rounded-lg flex items-center justify-center text-xs font-bold ${
                          active
                            ? "bg-brand-600 text-white"
                            : complete
                            ? "bg-brand-500 text-white"
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

          <div className="rounded-3xl border border-slate-200 bg-white p-6 lg:p-8">
            <div className="hidden lg:flex items-center justify-between mb-5">
              <div className="flex items-center gap-2 text-brand-700">
                <StepIcon className="h-5 w-5" />
                <span className="font-display text-xl font-semibold">{STEPS[step].label}</span>
              </div>
              <div className="text-xs text-slate-500">Step {step + 1} of {STEPS.length}</div>
            </div>

            {step === 0 && <BasicsStep form={form} setField={setField} errors={errors} />}
            {step === 1 && (
              <SkillsStep
                form={form}
                setField={setField}
                skillInput={skillInput}
                setSkillInput={setSkillInput}
                addCustomSkill={addCustomSkill}
                toggleSkill={toggleSkill}
                removeSkill={removeSkill}
                errors={errors}
              />
            )}
            {step === 2 && (
              <PrefsStep
                form={form}
                setField={setField}
                roleInput={roleInput}
                setRoleInput={setRoleInput}
                addRole={addRole}
                removeRole={removeRole}
                errors={errors}
              />
            )}
            {step === 3 && <ResumeStep form={form} setField={setField} errors={errors} />}

            <div className="mt-8 flex items-center justify-between border-t border-slate-100 pt-5">
              <Button variant="ghost" onClick={back} disabled={step === 0} className="text-slate-600">
                <ArrowLeft className="h-4 w-4 mr-1" /> Back
              </Button>
              {step < STEPS.length - 1 ? (
                <Button onClick={next} className="bg-brand-600 hover:bg-brand-700 rounded-full px-6">
                  Continue <ArrowRight className="h-4 w-4 ml-1" />
                </Button>
              ) : (
                <Button
                  onClick={finish}
                  disabled={submitting}
                  className="bg-brand-600 hover:bg-brand-700 rounded-full px-6 min-w-[160px]"
                >
                  {submitting ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin mr-2" /> Creating profile...
                    </>
                  ) : (
                    <>Create profile <Sparkles className="h-4 w-4 ml-1" /></>
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

const BasicsStep = ({ form, setField, errors }) => (
  <div className="space-y-5">
    <div className="grid sm:grid-cols-2 gap-4">
      <Field label="Full name" error={errors.fullName}>
        <Input value={form.fullName} onChange={(e) => setField("fullName", e.target.value)} placeholder="e.g. Aarav Mehta" className="h-11" />
      </Field>
      <Field label="Email" error={errors.email}>
        <Input type="email" value={form.email} onChange={(e) => setField("email", e.target.value)} placeholder="you@email.com" className="h-11" />
      </Field>
    </div>
    <Field label="Location" error={errors.location}>
      <Input value={form.location} onChange={(e) => setField("location", e.target.value)} placeholder="e.g. Pune, India" className="h-11" />
    </Field>
    <Field label="Headline" error={errors.headline} hint="One line about your professional identity.">
      <Input value={form.headline} onChange={(e) => setField("headline", e.target.value)} placeholder="e.g. Senior Frontend Engineer · React + Design Systems" className="h-11" />
    </Field>
    <Field label="Short bio (optional)" hint="Impact stories work better than titles.">
      <Textarea value={form.bio} onChange={(e) => setField("bio", e.target.value)} placeholder="Anything you'd like hiring teams to know" rows={4} />
    </Field>
  </div>
);

const SkillsStep = ({ form, setField, skillInput, setSkillInput, addCustomSkill, toggleSkill, removeSkill, errors }) => (
  <div className="space-y-5">
    <div className="grid sm:grid-cols-2 gap-4">
      <Field label="Current role" error={errors.currentRole}>
        <Input value={form.currentRole} onChange={(e) => setField("currentRole", e.target.value)} placeholder="e.g. Senior Frontend Engineer" className="h-11" />
      </Field>
      <Field label="Years of experience">
        <Select value={form.yearsExp} onValueChange={(v) => setField("yearsExp", v)}>
          <SelectTrigger className="h-11"><SelectValue /></SelectTrigger>
          <SelectContent>
            {["0-1", "1-2", "2-4", "3", "5", "7", "10", "12+"].map((y) => (
              <SelectItem key={y} value={y}>{y} yrs</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </Field>
    </div>

    <Field label="Skills" error={errors.skills} hint="Tap suggestions or type your own. Pick 3+ core skills.">
      <div className="flex gap-2">
        <Input
          value={skillInput}
          onChange={(e) => setSkillInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              addCustomSkill();
            }
          }}
          placeholder="Add a skill and press Enter"
          className="h-11"
        />
        <Button onClick={addCustomSkill} variant="outline" className="rounded-lg border-slate-300">
          Add
        </Button>
      </div>

      <div className="mt-3">
        <div className="text-xs font-semibold uppercase tracking-widest text-slate-500 mb-2">Suggestions</div>
        <div className="flex flex-wrap gap-2">
          {SUGGESTED_SKILLS.map((s) => {
            const active = form.skills.includes(s);
            return (
              <button
                key={s}
                onClick={() => toggleSkill(s)}
                className={`text-sm rounded-full border px-3 py-1.5 transition-colors ${
                  active
                    ? "bg-brand-600 text-white border-brand-600"
                    : "bg-white text-slate-700 border-slate-200 hover:border-brand-400 hover:text-brand-700"
                }`}
              >
                {s}
              </button>
            );
          })}
        </div>
      </div>

      {form.skills.length > 0 && (
        <div className="mt-4 rounded-xl border border-slate-200 p-3">
          <div className="text-xs font-semibold uppercase tracking-widest text-slate-500 mb-2">
            Your skills ({form.skills.length})
          </div>
          <div className="flex flex-wrap gap-2">
            {form.skills.map((s) => (
              <span
                key={s}
                className="inline-flex items-center gap-1 bg-brand-50 text-brand-800 border border-brand-200 rounded-full px-3 py-1 text-sm"
              >
                {s}
                <button onClick={() => removeSkill(s)} className="hover:text-brand-900">
                  <X className="h-3 w-3" />
                </button>
              </span>
            ))}
          </div>
        </div>
      )}
    </Field>
  </div>
);

const PrefsStep = ({ form, setField, roleInput, setRoleInput, addRole, removeRole, errors }) => (
  <div className="space-y-5">
    <Field label="Desired roles" error={errors.desiredRoles} hint="Press Enter to add each.">
      <div className="flex gap-2">
        <Input
          value={roleInput}
          onChange={(e) => setRoleInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              addRole();
            }
          }}
          placeholder="e.g. Senior Frontend Engineer"
          className="h-11"
        />
        <Button onClick={addRole} variant="outline" className="rounded-lg border-slate-300">
          Add
        </Button>
      </div>
      {form.desiredRoles.length > 0 && (
        <div className="mt-3 flex flex-wrap gap-2">
          {form.desiredRoles.map((r) => (
            <span
              key={r}
              className="inline-flex items-center gap-1 bg-slate-100 text-slate-800 border border-slate-200 rounded-full px-3 py-1 text-sm"
            >
              {r}
              <button onClick={() => removeRole(r)} className="hover:text-slate-900">
                <X className="h-3 w-3" />
              </button>
            </span>
          ))}
        </div>
      )}
    </Field>

    <Field label="Preferred work mode">
      <div className="grid grid-cols-3 gap-2">
        {["Remote", "Hybrid", "Onsite"].map((m) => (
          <button
            key={m}
            onClick={() => setField("workMode", m)}
            className={`rounded-lg border px-3 py-2.5 text-sm transition-colors ${
              form.workMode === m
                ? "border-brand-500 bg-brand-50 text-brand-800 font-semibold"
                : "border-slate-200 text-slate-700 hover:border-brand-300"
            }`}
          >
            {m}
          </button>
        ))}
      </div>
    </Field>

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
      <Field label="Min expected salary / year (optional)" hint="Only visible to matched employers.">
        <Input
          type="number"
          value={form.minSalary}
          onChange={(e) => setField("minSalary", e.target.value)}
          placeholder="e.g. 1500000"
          className="h-11"
        />
      </Field>
      <Field label="Availability">
        <div className="flex items-center gap-3 rounded-lg border border-slate-200 h-11 px-3">
          <button
            onClick={() => setField("openToWork", !form.openToWork)}
            className={`h-5 w-9 rounded-full relative transition-colors ${
              form.openToWork ? "bg-brand-500" : "bg-slate-300"
            }`}
          >
            <span
              className={`absolute top-0.5 h-4 w-4 rounded-full bg-white shadow transition-transform ${
                form.openToWork ? "translate-x-4" : "translate-x-0.5"
              }`}
            />
          </button>
          <span className="text-sm text-slate-700">Open to work</span>
        </div>
      </Field>
    </div>
  </div>
);

const ResumeStep = ({ form, setField, errors }) => {
  const onFile = (e) => {
    const file = e.target.files?.[0];
    if (file) setField("resumeFileName", file.name);
  };
  return (
    <div className="space-y-5">
      <Field label="Upload your resume (optional)" hint="PDF or DOCX. Our AI will extract skills automatically.">
        <label className="block cursor-pointer">
          <div className="rounded-2xl border-2 border-dashed border-slate-300 hover:border-brand-400 transition-colors p-6 text-center">
            {form.resumeFileName ? (
              <div className="flex items-center justify-center gap-3">
                <div className="h-10 w-10 rounded-lg bg-brand-50 text-brand-700 flex items-center justify-center">
                  <FileText className="h-5 w-5" />
                </div>
                <div className="text-left">
                  <div className="text-sm font-semibold text-slate-900">{form.resumeFileName}</div>
                  <div className="text-xs text-slate-500">Ready to upload</div>
                </div>
                <button
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    setField("resumeFileName", "");
                  }}
                  className="ml-2 text-slate-500 hover:text-slate-800"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            ) : (
              <>
                <Upload className="h-8 w-8 text-slate-400 mx-auto" />
                <div className="mt-2 text-sm font-semibold text-slate-800">
                  Click to upload or drag & drop
                </div>
                <div className="text-xs text-slate-500 mt-0.5">PDF, DOC, DOCX · up to 5 MB</div>
              </>
            )}
          </div>
          <input type="file" accept=".pdf,.doc,.docx" className="hidden" onChange={onFile} />
        </label>
      </Field>

      <div className="rounded-2xl border border-brand-200 bg-brand-50/50 p-4">
        <div className="text-xs font-semibold uppercase tracking-widest text-brand-700">
          What happens next
        </div>
        <ul className="mt-2 space-y-1.5 text-sm text-brand-900">
          <li className="flex items-start gap-2">
            <Check className="h-4 w-4 mt-0.5 text-brand-600 shrink-0" />
            We build your skill graph and match you to open roles.
          </li>
          <li className="flex items-start gap-2">
            <Check className="h-4 w-4 mt-0.5 text-brand-600 shrink-0" />
            You'll get a shortlist within an hour, ranked by fit.
          </li>
          <li className="flex items-start gap-2">
            <Check className="h-4 w-4 mt-0.5 text-brand-600 shrink-0" />
            Only employers you approve can message you.
          </li>
        </ul>
      </div>

      <label className="flex items-start gap-3 cursor-pointer">
        <input
          type="checkbox"
          checked={form.agree}
          onChange={(e) => setField("agree", e.target.checked)}
          className="h-4 w-4 accent-brand-600 mt-0.5"
        />
        <span className="text-sm text-slate-700">
          I agree to Vizarto's <a href="#" className="text-brand-700 underline">Terms</a> and{" "}
          <a href="#" className="text-brand-700 underline">Privacy Policy</a>.
        </span>
      </label>
      {errors.agree && <p className="text-xs text-red-600">{errors.agree}</p>}
    </div>
  );
};

export default CandidateSignupPage;
