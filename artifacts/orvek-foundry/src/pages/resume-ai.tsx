import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTailorResume, useGetProfile } from "@workspace/api-client-react";
import { Wand2, CheckCircle2, ChevronDown, ChevronUp } from "lucide-react";
import AppShell from "@/components/app-shell";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

export default function ResumeAI() {
  const { data: profile } = useGetProfile();
  const [resumeText, setResumeText] = useState(profile?.resumeText ?? "");
  const [jobDescription, setJobDescription] = useState("");
  const [showOriginal, setShowOriginal] = useState(false);
  const tailorMutation = useTailorResume();
  const { toast } = useToast();

  const handleTailor = () => {
    if (!resumeText.trim() || !jobDescription.trim()) {
      toast({ title: "Missing input", description: "Add both your resume and the job description.", variant: "destructive" });
      return;
    }
    tailorMutation.mutate(
      { data: { resumeText, jobDescription } },
      {
        onSuccess: () => toast({ title: "Resume tailored", description: "Review the optimized version below." }),
        onError: () => toast({ title: "Something went wrong", description: "Try again.", variant: "destructive" }),
      }
    );
  };

  const result = tailorMutation.data;

  return (
    <AppShell>
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8">
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
          <div className="mb-8">
            <h1 className="text-2xl font-bold tracking-tight mb-1">Resume AI</h1>
            <p className="text-muted-foreground text-sm">
              Paste your resume and a job description. Get a version rewritten to match. ATS-ready, specific, grounded in what you actually did.
            </p>
          </div>

          {!result ? (
            <div className="grid lg:grid-cols-2 gap-5">
              <div>
                <label className="text-xs font-medium text-muted-foreground uppercase tracking-widest block mb-2">
                  Your resume
                </label>
                <Textarea
                  value={resumeText}
                  onChange={(e) => setResumeText(e.target.value)}
                  placeholder="Paste your current resume here..."
                  className="min-h-80 bg-card font-mono text-sm resize-none"
                  data-testid="input-resume"
                />
              </div>
              <div>
                <label className="text-xs font-medium text-muted-foreground uppercase tracking-widest block mb-2">
                  Job description
                </label>
                <Textarea
                  value={jobDescription}
                  onChange={(e) => setJobDescription(e.target.value)}
                  placeholder="Paste the full job description here..."
                  className="min-h-80 bg-card text-sm resize-none"
                  data-testid="input-job-description"
                />
              </div>
              <div className="lg:col-span-2 flex justify-end">
                <Button
                  onClick={handleTailor}
                  disabled={tailorMutation.isPending}
                  size="lg"
                  data-testid="button-tailor-resume"
                >
                  <Wand2 className="w-4 h-4 mr-2" />
                  {tailorMutation.isPending ? "Tailoring..." : "Tailor my resume"}
                </Button>
              </div>
            </div>
          ) : (
            <AnimatePresence>
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="space-y-5"
              >
                {/* Changes */}
                <div className="bg-accent/5 border border-accent/20 rounded-lg p-5">
                  <p className="text-xs font-medium text-accent uppercase tracking-widest mb-3">What changed</p>
                  <ul className="space-y-2">
                    {result.changes.map((c, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-accent mt-0.5 flex-shrink-0" />
                        <p className="text-sm text-foreground">{c}</p>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Tailored */}
                <div>
                  <label className="text-xs font-medium text-muted-foreground uppercase tracking-widest block mb-2">
                    Tailored resume
                  </label>
                  <Textarea
                    value={result.tailored}
                    readOnly
                    className="min-h-96 bg-card font-mono text-sm resize-none"
                    data-testid="text-tailored-resume"
                  />
                </div>

                {/* Toggle original */}
                <button
                  onClick={() => setShowOriginal((v) => !v)}
                  className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors"
                  data-testid="button-toggle-original"
                >
                  {showOriginal ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                  {showOriginal ? "Hide" : "Show"} original
                </button>

                <AnimatePresence>
                  {showOriginal && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                    >
                      <label className="text-xs font-medium text-muted-foreground uppercase tracking-widest block mb-2">
                        Original resume
                      </label>
                      <Textarea
                        value={result.original}
                        readOnly
                        className="min-h-80 bg-muted/40 font-mono text-sm resize-none opacity-60"
                        data-testid="text-original-resume"
                      />
                    </motion.div>
                  )}
                </AnimatePresence>

                <div className="flex justify-end">
                  <Button
                    variant="outline"
                    onClick={() => tailorMutation.reset()}
                    data-testid="button-tailor-again"
                  >
                    Tailor again
                  </Button>
                </div>
              </motion.div>
            </AnimatePresence>
          )}
        </motion.div>
      </div>
    </AppShell>
  );
}
