import { useState } from "react";
import { motion } from "framer-motion";
import { useParams, useLocation } from "wouter";
import { useGetJob, useGetProfile, useMatchJob, getGetJobQueryKey } from "@workspace/api-client-react";
import { ArrowLeft, MapPin, Briefcase, CheckCircle2, XCircle, Zap, ExternalLink } from "lucide-react";
import AppShell from "@/components/app-shell";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

function ScoreRing({ score }: { score: number }) {
  const color = score >= 80 ? "#15803d" : score >= 60 ? "#b45309" : "#dc2626";
  const radius = 28;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (score / 100) * circumference;
  return (
    <div className="relative w-20 h-20 flex-shrink-0">
      <svg className="w-20 h-20 -rotate-90" viewBox="0 0 72 72">
        <circle cx="36" cy="36" r={radius} fill="none" stroke="hsl(var(--muted))" strokeWidth="5" />
        <circle
          cx="36" cy="36" r={radius} fill="none"
          stroke={color} strokeWidth="5"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          style={{ transition: "stroke-dashoffset 0.8s ease" }}
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-lg font-bold font-mono" style={{ color }}>{score}</span>
      </div>
    </div>
  );
}

export default function JobDetail() {
  const params = useParams<{ id: string }>();
  const id = params.id;
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const [applied, setApplied] = useState(false);

  const { data: job, isLoading } = useGetJob(id, {
    query: { enabled: !!id, queryKey: getGetJobQueryKey(id) },
  });
  const { data: profile } = useGetProfile();
  const matchMutation = useMatchJob();

  const handleRunMatch = () => {
    matchMutation.mutate(
      { id, data: { resumeText: profile?.resumeText ?? "No resume provided" } },
      {
        onSuccess: () => {
          toast({ title: "Match analysis complete", description: "Score updated for this role." });
        },
      }
    );
  };

  const handleApply = () => {
    setApplied(true);
    toast({ title: "Application tracked", description: `Marked as applied to ${job?.company}.` });
  };

  if (isLoading) {
    return (
      <AppShell>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 space-y-4">
          <Skeleton className="h-8 w-1/3" />
          <Skeleton className="h-48 rounded-lg" />
          <Skeleton className="h-48 rounded-lg" />
        </div>
      </AppShell>
    );
  }

  if (!job) {
    return (
      <AppShell>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
          <p className="text-muted-foreground">Role not found.</p>
        </div>
      </AppShell>
    );
  }

  const matchData = matchMutation.data;

  return (
    <AppShell>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
        <button
          onClick={() => setLocation("/dashboard")}
          className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors mb-6"
          data-testid="button-back"
        >
          <ArrowLeft className="w-4 h-4" /> Back to dashboard
        </button>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-start gap-4 mb-6">
            <div className="flex-1">
              <h1 className="text-2xl font-bold tracking-tight" data-testid="text-job-title">{job.title}</h1>
              <p className="text-muted-foreground mt-0.5" data-testid="text-job-company">{job.company}</p>
              <div className="flex items-center gap-4 mt-3">
                <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
                  <MapPin className="w-3.5 h-3.5" />{job.location}
                </span>
                <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
                  <Briefcase className="w-3.5 h-3.5" />{job.type}
                </span>
                <span className="text-xs text-muted-foreground capitalize">{job.level}</span>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Button
                variant="outline"
                size="sm"
                onClick={handleRunMatch}
                disabled={matchMutation.isPending}
                data-testid="button-run-match"
              >
                <Zap className="w-3.5 h-3.5 mr-1.5" />
                {matchMutation.isPending ? "Analyzing..." : "Re-analyze"}
              </Button>
              <Button
                size="sm"
                onClick={handleApply}
                disabled={applied}
                data-testid="button-apply"
              >
                <ExternalLink className="w-3.5 h-3.5 mr-1.5" />
                {applied ? "Applied" : "Apply"}
              </Button>
            </div>
          </div>

          {/* AI match score */}
          <div className="bg-card border border-border rounded-lg p-6 mb-4">
            <p className="text-xs font-medium text-muted-foreground uppercase tracking-widest mb-4">AI Match Analysis</p>
            <div className="flex items-start gap-6">
              <ScoreRing score={matchData?.score ?? job.score} />
              <div className="flex-1">
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {matchData?.reasoning ?? job.reasoning}
                </p>
                {matchData && (
                  <div className="grid sm:grid-cols-2 gap-4 mt-5">
                    <div>
                      <p className="text-xs font-medium text-foreground mb-2">Strengths</p>
                      <div className="space-y-1.5">
                        {matchData.strengths.map((s, i) => (
                          <div key={i} className="flex items-start gap-2">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 mt-0.5 flex-shrink-0" />
                            <p className="text-xs text-muted-foreground leading-relaxed">{s}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div>
                      <p className="text-xs font-medium text-foreground mb-2">Gaps</p>
                      <div className="space-y-1.5">
                        {matchData.gaps.map((g, i) => (
                          <div key={i} className="flex items-start gap-2">
                            <XCircle className="w-3.5 h-3.5 text-red-500 mt-0.5 flex-shrink-0" />
                            <p className="text-xs text-muted-foreground leading-relaxed">{g}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="bg-card border border-border rounded-lg p-6 mb-4">
            <p className="text-xs font-medium text-muted-foreground uppercase tracking-widest mb-4">Role Description</p>
            <p className="text-sm leading-relaxed text-muted-foreground">{job.description}</p>
          </div>

          {/* Requirements & Benefits */}
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="bg-card border border-border rounded-lg p-6">
              <p className="text-xs font-medium text-muted-foreground uppercase tracking-widest mb-4">Requirements</p>
              <ul className="space-y-2">
                {job.requirements.map((r, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-accent mt-1.5 text-xs">–</span>
                    <p className="text-sm text-muted-foreground leading-relaxed">{r}</p>
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-card border border-border rounded-lg p-6">
              <p className="text-xs font-medium text-muted-foreground uppercase tracking-widest mb-4">Benefits</p>
              <ul className="space-y-2">
                {job.benefits.map((b, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-accent mt-0.5 flex-shrink-0" />
                    <p className="text-sm text-muted-foreground leading-relaxed">{b}</p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </motion.div>
      </div>
    </AppShell>
  );
}
