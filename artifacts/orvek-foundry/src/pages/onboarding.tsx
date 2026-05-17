import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLocation } from "wouter";
import { useUpdateProfile } from "@workspace/api-client-react";
import { ChevronRight, FileText, Target, BarChart3 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";

const STEPS = [
  { id: 1, label: "Resume", icon: FileText, title: "What have you built?", desc: "Paste your resume. We use this as your baseline for all match scoring and tailoring." },
  { id: 2, label: "Target", icon: Target, title: "Where are you headed?", desc: "Tell us your target role title. Be specific. Not 'engineer' but 'staff engineer' or 'principal product manager'." },
  { id: 3, label: "Level", icon: BarChart3, title: "Where are you now?", desc: "Your experience level helps calibrate match scores so you see roles that match your actual career stage." },
];

const LEVELS = [
  { value: "junior", label: "Junior", years: "0 to 2 years" },
  { value: "mid", label: "Mid-level", years: "2 to 5 years" },
  { value: "senior", label: "Senior", years: "5 to 8 years" },
  { value: "staff", label: "Staff", years: "8 to 12 years" },
  { value: "principal", label: "Principal", years: "12+ years" },
  { value: "manager", label: "Manager", years: "People leadership" },
];

export default function Onboarding() {
  const [, setLocation] = useLocation();
  const [step, setStep] = useState(1);
  const [resumeText, setResumeText] = useState("");
  const [targetRole, setTargetRole] = useState("");
  const [experienceLevel, setExperienceLevel] = useState("");
  const updateProfile = useUpdateProfile();

  const canProceed =
    step === 1 ? resumeText.trim().length > 20 :
    step === 2 ? targetRole.trim().length > 2 :
    experienceLevel.length > 0;

  const handleNext = () => {
    if (step < 3) {
      setStep((s) => s + 1);
    } else {
      updateProfile.mutate(
        { data: { resumeText, targetRole, experienceLevel } },
        {
          onSuccess: () => setLocation("/dashboard"),
          onError: () => setLocation("/dashboard"),
        }
      );
    }
  };

  const current = STEPS[step - 1];

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <div className="border-b border-border px-6 py-4 flex items-center justify-between">
        <span className="font-semibold text-sm tracking-tight">Orvek Foundry</span>
        <div className="flex items-center gap-2">
          {STEPS.map((s) => (
            <div key={s.id} className="flex items-center gap-2">
              <div
                className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium transition-colors ${
                  s.id === step
                    ? "bg-primary text-primary-foreground"
                    : s.id < step
                    ? "bg-accent text-accent-foreground"
                    : "bg-muted text-muted-foreground"
                }`}
              >
                {s.id < step ? "✓" : s.id}
              </div>
              <span className={`text-xs hidden sm:block ${s.id === step ? "text-foreground font-medium" : "text-muted-foreground"}`}>
                {s.label}
              </span>
              {s.id < STEPS.length && (
                <ChevronRight className="w-3 h-3 text-muted-foreground" />
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="flex-1 flex items-center justify-center px-6">
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="w-full max-w-2xl"
          >
            <div className="flex items-center gap-2 mb-6">
              <current.icon className="w-4 h-4 text-accent" />
              <span className="text-xs font-medium text-muted-foreground uppercase tracking-widest">
                Step {step} of {STEPS.length}
              </span>
            </div>

            <h1 className="text-3xl font-bold tracking-tight mb-2">{current.title}</h1>
            <p className="text-muted-foreground mb-8 leading-relaxed">{current.desc}</p>

            {step === 1 && (
              <Textarea
                value={resumeText}
                onChange={(e) => setResumeText(e.target.value)}
                placeholder="Paste your resume here. Plain text works best. Include experience, skills, and education..."
                className="min-h-64 bg-card font-mono text-sm resize-none"
                data-testid="input-resume-text"
              />
            )}

            {step === 2 && (
              <Input
                value={targetRole}
                onChange={(e) => setTargetRole(e.target.value)}
                placeholder="e.g. Staff Engineer, Senior Product Manager, Principal Designer"
                className="bg-card text-base h-12"
                data-testid="input-target-role"
              />
            )}

            {step === 3 && (
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {LEVELS.map((level) => (
                  <button
                    key={level.value}
                    onClick={() => setExperienceLevel(level.value)}
                    className={`text-left p-4 border rounded-lg transition-all ${
                      experienceLevel === level.value
                        ? "border-accent bg-accent/5 text-foreground"
                        : "border-border bg-card text-muted-foreground hover:border-foreground/30 hover:text-foreground"
                    }`}
                    data-testid={`button-level-${level.value}`}
                  >
                    <p className="font-medium text-sm">{level.label}</p>
                    <p className="text-xs mt-0.5 opacity-70">{level.years}</p>
                  </button>
                ))}
              </div>
            )}

            <div className="flex justify-end mt-8">
              <Button
                onClick={handleNext}
                disabled={!canProceed || updateProfile.isPending}
                data-testid="button-onboarding-next"
              >
                {step === 3
                  ? updateProfile.isPending
                    ? "Saving..."
                    : "Go to dashboard"
                  : "Continue"}
                <ChevronRight className="w-4 h-4 ml-1" />
              </Button>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
