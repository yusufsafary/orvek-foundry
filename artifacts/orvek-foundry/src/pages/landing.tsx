import { useState, useEffect } from "react";
import { motion, type Variants, AnimatePresence } from "framer-motion";
import { Link } from "wouter";
import { ArrowRight, CheckCircle2, TrendingUp, Target, FileText, Zap, ChevronRight, Circle, Minus, X as XClose, BarChart2, Briefcase, Search, Bell, User, Star, AlertCircle, CheckCircle } from "lucide-react";
import PublicNav from "@/components/public-nav";
import PublicFooter from "@/components/public-footer";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45 } },
};
const stagger: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};

const PARTNERS = [
  "Stripe", "Linear", "Vercel", "Figma", "Notion", "Anthropic",
  "GitHub", "Shopify", "Airbnb", "Datadog", "Cloudflare", "Rippling",
];

const DEMO_JOBS = [
  {
    id: 1,
    title: "Staff Software Engineer",
    company: "Linear",
    location: "San Francisco, CA",
    type: "Full-time",
    score: 91,
    salary: "$220k–$280k",
    skills: [
      { name: "TypeScript", match: true },
      { name: "Systems Design", match: true },
      { name: "Real-time Sync", match: true },
      { name: "React", match: true },
      { name: "Rust", match: false },
    ],
    summary: "Strong TypeScript and systems design alignment. Your real-time sync experience maps directly to their core infrastructure needs.",
    gap: "Rust experience preferred but not required.",
  },
  {
    id: 2,
    title: "Principal Engineer, Platform",
    company: "Vercel",
    location: "Remote",
    type: "Full-time",
    score: 87,
    salary: "$240k–$310k",
    skills: [
      { name: "Node.js", match: true },
      { name: "Edge Computing", match: true },
      { name: "CI/CD", match: true },
      { name: "Go", match: false },
      { name: "Kubernetes", match: false },
    ],
    summary: "Your deployment pipeline and edge experience aligns well. Node.js depth is a clear match.",
    gap: "Go and Kubernetes would strengthen candidacy — not blockers.",
  },
  {
    id: 3,
    title: "Staff Engineer, Product Infra",
    company: "Figma",
    location: "New York, NY",
    type: "Full-time",
    score: 83,
    salary: "$200k–$260k",
    skills: [
      { name: "C++", match: false },
      { name: "WebAssembly", match: false },
      { name: "React", match: true },
      { name: "Performance", match: true },
      { name: "Cross-platform", match: true },
    ],
    summary: "Frontend performance and cross-platform strength is solid. Deep C++ expected for some sub-teams.",
    gap: "C++ and WebAssembly are differentiators here.",
  },
  {
    id: 4,
    title: "Senior Engineer, Payments",
    company: "Stripe",
    location: "Remote",
    type: "Full-time",
    score: 74,
    salary: "$190k–$250k",
    skills: [
      { name: "Ruby", match: false },
      { name: "Distributed Systems", match: true },
      { name: "API Design", match: true },
      { name: "PostgreSQL", match: true },
      { name: "Financial Systems", match: false },
    ],
    summary: "Distributed systems and API design are strong signals. Ruby and fintech context are gaps to address.",
    gap: "Ruby proficiency and financial domain experience are key.",
  },
];

const RESUME_LINES = [
  { delay: 0, text: "Analyzing your resume against job requirements...", type: "info" },
  { delay: 900, text: "TypeScript (5 yrs) — Strong match ✓", type: "match" },
  { delay: 1700, text: "React + Performance (4 yrs) — Strong match ✓", type: "match" },
  { delay: 2400, text: "Systems Design — Detected from project descriptions ✓", type: "match" },
  { delay: 3100, text: "Real-time Sync — 2 projects identified ✓", type: "match" },
  { delay: 3800, text: "Rust — Not found in profile △", type: "gap" },
  { delay: 4500, text: "Rewriting resume for Staff Software Engineer at Linear...", type: "info" },
  { delay: 5400, text: "Tailored bullet 1: 'Led real-time sync architecture serving 4M+ users' ✓", type: "output" },
  { delay: 6200, text: "Tailored bullet 2: 'Reduced API p99 latency by 38% via query batching' ✓", type: "output" },
  { delay: 7000, text: "Resume ready. Match score: 91/100", type: "result" },
];

const DASHBOARD_STATS = [
  { label: "Jobs Tracked", value: "12", sub: "+3 this week" },
  { label: "Avg Match Score", value: "81", sub: "Top quartile" },
  { label: "Applied", value: "4", sub: "2 in review" },
  { label: "Interviews", value: "2", sub: "1 scheduled" },
];

const PIPELINE = [
  { title: "Staff SWE", company: "Linear", score: 91, status: "Interview", statusColor: "text-emerald-600 bg-emerald-50 border-emerald-200" },
  { title: "Principal Eng", company: "Vercel", score: 87, status: "Applied", statusColor: "text-blue-600 bg-blue-50 border-blue-200" },
  { title: "Staff Eng", company: "Figma", score: 83, status: "Applied", statusColor: "text-blue-600 bg-blue-50 border-blue-200" },
  { title: "Senior Eng", company: "Stripe", score: 74, status: "Drafting", statusColor: "text-amber-600 bg-amber-50 border-amber-200" },
];

function ScoreBadge({ score, size = "sm" }: { score: number; size?: "sm" | "lg" }) {
  const color =
    score >= 80
      ? "text-emerald-700 bg-emerald-50 border-emerald-200"
      : score >= 60
      ? "text-amber-700 bg-amber-50 border-amber-200"
      : "text-red-700 bg-red-50 border-red-200";
  const cls = size === "lg" ? "px-3 py-1 text-2xl font-bold" : "px-2 py-0.5 text-xs font-mono font-semibold";
  return (
    <span className={`inline-flex items-center rounded border ${color} ${cls}`}>
      {score}
    </span>
  );
}

function AnimatedScore({ target }: { target: number }) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    setVal(0);
    let start: number | null = null;
    const duration = 900;
    const step = (ts: number) => {
      if (!start) start = ts;
      const progress = Math.min((ts - start) / duration, 1);
      setVal(Math.floor(progress * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    const id = requestAnimationFrame(step);
    return () => cancelAnimationFrame(id);
  }, [target]);
  return <>{val}</>;
}

function TerminalLine({ text, type, visible }: { text: string; type: string; visible: boolean }) {
  const color =
    type === "match" ? "text-emerald-400" :
    type === "gap" ? "text-amber-400" :
    type === "output" ? "text-sky-400" :
    type === "result" ? "text-white font-semibold" :
    "text-zinc-400";
  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, x: -8 }}
          animate={{ opacity: 1, x: 0 }}
          className={`text-xs font-mono leading-relaxed ${color}`}
        >
          {type !== "info" && <span className="mr-2 opacity-40">›</span>}
          {text}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function InteractiveDemo() {
  const [activeTab, setActiveTab] = useState<"jobs" | "resume" | "dashboard">("jobs");
  const [selectedJob, setSelectedJob] = useState(DEMO_JOBS[0]);
  const [visibleLines, setVisibleLines] = useState<number>(0);
  const [resumeRunning, setResumeRunning] = useState(false);

  const runResume = () => {
    if (resumeRunning) return;
    setVisibleLines(0);
    setResumeRunning(true);
    RESUME_LINES.forEach((line, i) => {
      setTimeout(() => setVisibleLines(i + 1), line.delay);
    });
    setTimeout(() => setResumeRunning(false), 7500);
  };

  useEffect(() => {
    if (activeTab === "resume") {
      setVisibleLines(0);
      setResumeRunning(false);
    }
  }, [activeTab]);

  const TABS = [
    { key: "jobs", label: "Job Matches", icon: Search },
    { key: "resume", label: "Resume AI", icon: FileText },
    { key: "dashboard", label: "Dashboard", icon: BarChart2 },
  ] as const;

  return (
    <div className="w-full max-w-5xl mx-auto">
      {/* Browser chrome */}
      <div className="rounded-2xl border border-border bg-card shadow-2xl overflow-hidden">
        {/* Window bar */}
        <div className="flex items-center gap-3 px-4 py-3 bg-muted/60 border-b border-border">
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded-full bg-red-400/80" />
            <div className="w-3 h-3 rounded-full bg-amber-400/80" />
            <div className="w-3 h-3 rounded-full bg-emerald-400/80" />
          </div>
          <div className="flex-1 flex justify-center">
            <div className="flex items-center gap-2 bg-background/60 border border-border/60 rounded-md px-3 py-1 text-xs text-muted-foreground font-mono">
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              app.ovrekfoundry.com
            </div>
          </div>
          <div className="flex items-center gap-3 text-muted-foreground/40">
            <Bell className="w-3.5 h-3.5" />
            <User className="w-3.5 h-3.5" />
          </div>
        </div>

        {/* App tabs */}
        <div className="flex items-center gap-0 border-b border-border bg-muted/30 px-4">
          {TABS.map((t) => (
            <button
              key={t.key}
              onClick={() => setActiveTab(t.key)}
              className={`flex items-center gap-1.5 px-4 py-2.5 text-xs font-medium border-b-2 transition-all ${
                activeTab === t.key
                  ? "border-accent text-foreground"
                  : "border-transparent text-muted-foreground hover:text-foreground"
              }`}
            >
              <t.icon className="w-3.5 h-3.5" />
              {t.label}
            </button>
          ))}
          <div className="ml-auto text-xs text-muted-foreground py-2.5 pr-1 hidden sm:block">
            <span className="bg-accent/10 text-accent border border-accent/20 px-2 py-0.5 rounded text-[10px] font-medium">DEMO</span>
          </div>
        </div>

        {/* Content */}
        <div className="min-h-[420px]">
          <AnimatePresence mode="wait">

            {/* ── JOB MATCHES TAB ── */}
            {activeTab === "jobs" && (
              <motion.div
                key="jobs"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="flex h-full"
              >
                {/* Job list */}
                <div className="w-full sm:w-2/5 border-r border-border">
                  <div className="px-4 py-3 border-b border-border">
                    <p className="text-xs font-semibold text-muted-foreground uppercase tracking-widest">Matched Roles</p>
                    <p className="text-[10px] text-muted-foreground/60 mt-0.5">Sorted by fit score</p>
                  </div>
                  <div className="divide-y divide-border">
                    {DEMO_JOBS.map((job) => (
                      <button
                        key={job.id}
                        onClick={() => setSelectedJob(job)}
                        className={`w-full text-left px-4 py-3.5 transition-colors hover:bg-muted/40 ${
                          selectedJob.id === job.id ? "bg-muted/60 border-l-2 border-l-accent" : ""
                        }`}
                      >
                        <div className="flex items-start justify-between gap-2">
                          <div className="min-w-0">
                            <p className="text-xs font-semibold text-foreground truncate">{job.title}</p>
                            <p className="text-[11px] text-muted-foreground mt-0.5">{job.company} · {job.location}</p>
                          </div>
                          <ScoreBadge score={job.score} />
                        </div>
                        <p className="text-[10px] text-muted-foreground mt-1.5">{job.salary}</p>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Job detail */}
                <div className="hidden sm:flex flex-col flex-1 p-5">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={selectedJob.id}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      transition={{ duration: 0.2 }}
                      className="flex flex-col gap-4"
                    >
                      <div>
                        <div className="flex items-start justify-between gap-3 mb-1">
                          <div>
                            <h3 className="text-sm font-bold text-foreground">{selectedJob.title}</h3>
                            <p className="text-xs text-muted-foreground">{selectedJob.company} · {selectedJob.type}</p>
                          </div>
                          <div className="text-center">
                            <div className="text-3xl font-bold font-mono text-foreground leading-none">
                              <AnimatedScore key={selectedJob.id} target={selectedJob.score} />
                            </div>
                            <p className="text-[10px] text-muted-foreground mt-0.5">/ 100</p>
                          </div>
                        </div>
                        <div className="w-full bg-muted rounded-full h-1.5 mt-3">
                          <motion.div
                            key={selectedJob.id}
                            initial={{ width: 0 }}
                            animate={{ width: `${selectedJob.score}%` }}
                            transition={{ duration: 0.9, ease: "easeOut" }}
                            className={`h-1.5 rounded-full ${
                              selectedJob.score >= 80 ? "bg-emerald-500" :
                              selectedJob.score >= 60 ? "bg-amber-500" : "bg-red-500"
                            }`}
                          />
                        </div>
                      </div>

                      <div>
                        <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-widest mb-2">Skill Match</p>
                        <div className="flex flex-wrap gap-1.5">
                          {selectedJob.skills.map((s) => (
                            <span
                              key={s.name}
                              className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-medium border ${
                                s.match
                                  ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                                  : "bg-muted text-muted-foreground border-border"
                              }`}
                            >
                              {s.match
                                ? <CheckCircle className="w-2.5 h-2.5" />
                                : <AlertCircle className="w-2.5 h-2.5" />
                              }
                              {s.name}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="bg-muted/40 border border-border rounded-lg p-3">
                        <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-widest mb-1.5">AI Analysis</p>
                        <p className="text-xs text-foreground leading-relaxed">{selectedJob.summary}</p>
                      </div>

                      {selectedJob.gap && (
                        <div className="bg-amber-50/50 border border-amber-200/60 rounded-lg p-3">
                          <p className="text-[10px] font-semibold text-amber-700 uppercase tracking-widest mb-1">Gap to Address</p>
                          <p className="text-xs text-amber-800 leading-relaxed">{selectedJob.gap}</p>
                        </div>
                      )}

                      <div className="flex gap-2 mt-auto">
                        <button className="flex-1 bg-primary text-primary-foreground text-xs font-medium py-2 rounded hover:opacity-90 transition-opacity">
                          Tailor Resume →
                        </button>
                        <button className="border border-border text-xs font-medium px-3 py-2 rounded text-muted-foreground hover:text-foreground transition-colors">
                          Save
                        </button>
                      </div>
                    </motion.div>
                  </AnimatePresence>
                </div>
              </motion.div>
            )}

            {/* ── RESUME AI TAB ── */}
            {activeTab === "resume" && (
              <motion.div
                key="resume"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="p-5 flex flex-col gap-4"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-bold text-foreground">Resume AI</p>
                    <p className="text-xs text-muted-foreground">Auto-tailors your resume for each role</p>
                  </div>
                  <button
                    onClick={runResume}
                    disabled={resumeRunning}
                    className={`inline-flex items-center gap-1.5 text-xs font-semibold px-4 py-2 rounded transition-all ${
                      resumeRunning
                        ? "bg-muted text-muted-foreground cursor-not-allowed"
                        : "bg-primary text-primary-foreground hover:opacity-90"
                    }`}
                  >
                    {resumeRunning ? (
                      <>
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                          className="w-3 h-3 border border-current border-t-transparent rounded-full"
                        />
                        Analyzing…
                      </>
                    ) : (
                      <>▶ Run Analysis</>
                    )}
                  </button>
                </div>

                {/* Terminal */}
                <div className="bg-zinc-950 rounded-xl border border-zinc-800 overflow-hidden">
                  <div className="flex items-center gap-2 px-4 py-2.5 border-b border-zinc-800">
                    <div className="w-2 h-2 rounded-full bg-red-400/80" />
                    <div className="w-2 h-2 rounded-full bg-amber-400/80" />
                    <div className="w-2 h-2 rounded-full bg-emerald-400/80" />
                    <span className="ml-2 text-[10px] font-mono text-zinc-500">orvek-resume-ai ~ analysis</span>
                  </div>
                  <div className="p-4 min-h-[260px] space-y-1.5">
                    {visibleLines === 0 && !resumeRunning && (
                      <p className="text-xs font-mono text-zinc-600">Press ▶ Run Analysis to see AI resume tailoring in action…</p>
                    )}
                    {RESUME_LINES.slice(0, visibleLines).map((line, i) => (
                      <TerminalLine key={i} text={line.text} type={line.type} visible={true} />
                    ))}
                    {resumeRunning && visibleLines < RESUME_LINES.length && (
                      <motion.span
                        animate={{ opacity: [1, 0] }}
                        transition={{ duration: 0.6, repeat: Infinity }}
                        className="inline-block w-1.5 h-3.5 bg-emerald-400 ml-1"
                      />
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-3">
                  {[
                    { label: "Skills Matched", value: "4/5", color: "text-emerald-600" },
                    { label: "ATS Score", value: "96%", color: "text-emerald-600" },
                    { label: "Time Saved", value: "~2h", color: "text-accent" },
                  ].map((s) => (
                    <div key={s.label} className="bg-muted/40 border border-border rounded-lg p-3 text-center">
                      <p className={`text-xl font-bold font-mono ${s.color}`}>{s.value}</p>
                      <p className="text-[10px] text-muted-foreground mt-0.5">{s.label}</p>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* ── DASHBOARD TAB ── */}
            {activeTab === "dashboard" && (
              <motion.div
                key="dashboard"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="p-5 flex flex-col gap-4"
              >
                <div>
                  <p className="text-sm font-bold text-foreground">Your Pipeline</p>
                  <p className="text-xs text-muted-foreground">All roles tracked by match score</p>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {DASHBOARD_STATS.map((s, i) => (
                    <motion.div
                      key={s.label}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.08 }}
                      className="bg-card border border-border rounded-lg p-3"
                    >
                      <p className="text-2xl font-bold font-mono text-foreground">{s.value}</p>
                      <p className="text-[10px] font-semibold text-foreground/70 mt-0.5">{s.label}</p>
                      <p className="text-[10px] text-muted-foreground">{s.sub}</p>
                    </motion.div>
                  ))}
                </div>

                {/* Pipeline table */}
                <div className="border border-border rounded-lg overflow-hidden">
                  <div className="grid grid-cols-4 px-4 py-2 bg-muted/40 border-b border-border">
                    <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider col-span-2">Role</p>
                    <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider text-center">Score</p>
                    <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider text-right">Status</p>
                  </div>
                  <div className="divide-y divide-border">
                    {PIPELINE.map((row, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, x: -8 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.1 + i * 0.07 }}
                        className="grid grid-cols-4 px-4 py-3 hover:bg-muted/30 transition-colors items-center"
                      >
                        <div className="col-span-2">
                          <p className="text-xs font-medium text-foreground">{row.title}</p>
                          <p className="text-[10px] text-muted-foreground">{row.company}</p>
                        </div>
                        <div className="flex justify-center">
                          <ScoreBadge score={row.score} />
                        </div>
                        <div className="flex justify-end">
                          <span className={`text-[10px] font-medium px-2 py-0.5 rounded border ${row.statusColor}`}>
                            {row.status}
                          </span>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Score bar chart */}
                <div>
                  <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-widest mb-2">Match Score Distribution</p>
                  <div className="flex items-end gap-2 h-16">
                    {PIPELINE.map((row, i) => (
                      <div key={i} className="flex-1 flex flex-col items-center gap-1">
                        <motion.div
                          initial={{ height: 0 }}
                          animate={{ height: `${(row.score / 100) * 56}px` }}
                          transition={{ delay: 0.2 + i * 0.08, duration: 0.6, ease: "easeOut" }}
                          className={`w-full rounded-t ${row.score >= 80 ? "bg-emerald-500" : row.score >= 70 ? "bg-amber-400" : "bg-muted-foreground/40"}`}
                          style={{ minHeight: 4 }}
                        />
                        <p className="text-[9px] text-muted-foreground truncate w-full text-center">{row.company}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      <p className="text-center text-xs text-muted-foreground mt-3">
        Interactive demo — <Link href="/auth" className="text-accent hover:underline">sign up for the real thing</Link>
      </p>
    </div>
  );
}

function TelegramIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
      <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
    </svg>
  );
}

function XIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.748l7.73-8.835L1.254 2.25H8.08l4.259 5.629L18.244 2.25zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77z"/>
    </svg>
  );
}

function SocialFollowButtons() {
  return (
    <div className="flex items-center gap-2 mb-5 flex-wrap">
      <a
        href="https://x.com/ovrefoundry"
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 bg-[#0f0f0f] text-white text-sm font-semibold px-4 py-2 rounded-full hover:bg-[#2a2a2a] transition-colors whitespace-nowrap"
      >
        <XIcon />
        Follow @ovrefoundry
      </a>
      <a
        href="https://t.me/ovrekfoundry"
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 bg-[#0f0f0f] text-white text-sm font-semibold px-4 py-2 rounded-full hover:bg-[#2a2a2a] transition-colors whitespace-nowrap"
      >
        <TelegramIcon />
        Join Telegram
      </a>
    </div>
  );
}

export default function Landing() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <PublicNav />

      {/* Hero */}
      <section className="max-w-6xl mx-auto px-6 pt-16 pb-10">
        <motion.div initial="hidden" animate="show" variants={stagger}>
          <motion.div variants={fadeUp}>
            <SocialFollowButtons />
          </motion.div>
          <motion.h1 variants={fadeUp} className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.05] mb-5 max-w-4xl">
            Stop applying<br /><span className="text-accent">blindly.</span>
          </motion.h1>
          <motion.p variants={fadeUp} className="text-lg text-muted-foreground max-w-xl leading-relaxed mb-8">
            Orvek Foundry scores every role against your profile, rewrites your resume for each application, and shows you exactly where you stand before you spend an hour on a cover letter.
          </motion.p>
          <motion.div variants={fadeUp} className="flex flex-col sm:flex-row gap-3 mb-12">
            <Link href="/auth" className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-2.5 rounded font-medium hover:opacity-90 transition-opacity" data-testid="button-hero-cta">
              Start moving with precision <ArrowRight className="w-4 h-4" />
            </Link>
            <Link href="/how-to" className="inline-flex items-center gap-2 border border-border px-6 py-2.5 rounded font-medium text-muted-foreground hover:text-foreground hover:border-foreground/30 transition-all">
              See how it works
            </Link>
          </motion.div>

          {/* Interactive Demo — visible immediately */}
          <motion.div variants={fadeUp}>
            <p className="text-xs font-medium text-muted-foreground uppercase tracking-widest mb-4">Try the product — no sign up required</p>
            <InteractiveDemo />
          </motion.div>
        </motion.div>
      </section>

      {/* Partner logos */}
      <section className="border-y border-border bg-muted/30 py-8 mt-12">
        <div className="max-w-6xl mx-auto px-6">
          <p className="text-xs font-medium text-muted-foreground uppercase tracking-widest text-center mb-6">
            Engineers from these companies trust Orvek Foundry
          </p>
          <div className="grid grid-cols-4 sm:grid-cols-6 lg:grid-cols-12 gap-0">
            {PARTNERS.map((name) => (
              <div key={name} className="flex items-center justify-center py-2 px-3 border border-border/40 hover:bg-muted/60 transition-colors">
                <span className="text-xs font-semibold text-muted-foreground/70 tracking-tight whitespace-nowrap">{name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="border-t border-border bg-muted/20">
        <div className="max-w-6xl mx-auto px-6 py-14">
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={stagger}>
            <motion.h2 variants={fadeUp} className="text-3xl font-bold tracking-tight mb-2">Move with signal, not noise.</motion.h2>
            <motion.p variants={fadeUp} className="text-muted-foreground mb-10 max-w-lg">Three capabilities. One system. Built for people who treat their career like a product.</motion.p>
            <motion.div variants={stagger} className="grid sm:grid-cols-3 gap-5">
              {[
                { icon: Target, title: "AI Match Scoring", desc: "Every job scored 0 to 100 against your resume. Understand exactly where you fit before you apply." },
                { icon: FileText, title: "Resume Tailoring", desc: "Paste any job description. Get a version of your resume rewritten to match. ATS-friendly and specific." },
                { icon: TrendingUp, title: "Precision Dashboard", desc: "Track your pipeline by match score. Focus your energy where it actually counts." },
              ].map((f, i) => (
                <motion.div key={i} variants={fadeUp} className="border border-border rounded-lg p-5 bg-card hover:border-foreground/20 transition-colors">
                  <f.icon className="w-4 h-4 text-accent mb-3" />
                  <h3 className="font-semibold text-sm mb-1.5">{f.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* How it works */}
      <section className="max-w-6xl mx-auto px-6 py-14">
        <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={stagger}>
          <motion.h2 variants={fadeUp} className="text-3xl font-bold tracking-tight mb-10">Four steps to clarity.</motion.h2>
          <motion.div variants={stagger} className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { step: "01", label: "Upload your resume", desc: "Paste or upload your current resume. We use it as your baseline." },
              { step: "02", label: "Set your target", desc: "Tell us your target role and experience level." },
              { step: "03", label: "Review your matches", desc: "Every job in our database is scored against your profile in real time." },
              { step: "04", label: "Apply with precision", desc: "Tailor your resume to each role before applying." },
            ].map((s, i) => (
              <motion.div key={i} variants={fadeUp}>
                <p className="text-xs font-mono text-muted-foreground mb-2">{s.step}</p>
                <h3 className="font-semibold text-sm mb-1.5">{s.label}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{s.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </section>

      {/* Why section */}
      <section className="border-t border-border bg-muted/20">
        <div className="max-w-6xl mx-auto px-6 py-14">
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={stagger} className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div variants={fadeUp}>
              <h2 className="text-3xl font-bold tracking-tight mb-5">Built for people who do not apply to 200 jobs.</h2>
              <p className="text-muted-foreground leading-relaxed mb-6">Volume is not a strategy. The engineers and product leaders who land well identify five to ten high-fit roles, understand exactly why they are a match, and show up prepared.</p>
              <div className="space-y-2.5">
                {[
                  "Know your match score before you apply",
                  "Tailor your resume in under two minutes",
                  "Focus on roles where you are already strong",
                  "No spray-and-pray, no guesswork",
                ].map((point, i) => (
                  <div key={i} className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-accent mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-muted-foreground">{point}</span>
                  </div>
                ))}
              </div>
            </motion.div>
            <motion.div variants={fadeUp} className="space-y-3">
              <div className="bg-card border border-border rounded-lg p-5">
                <div className="flex items-center gap-2 mb-3">
                  <Zap className="w-4 h-4 text-accent" />
                  <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Match Analysis</span>
                </div>
                <div className="flex items-end gap-3 mb-2">
                  <span className="text-4xl font-bold font-mono">91</span>
                  <span className="text-sm text-muted-foreground mb-1">/ 100</span>
                </div>
                <p className="text-sm text-foreground font-medium mb-1">Staff Software Engineer at Linear</p>
                <p className="text-xs text-muted-foreground leading-relaxed">Strong TypeScript and systems design alignment. Your real-time sync experience maps directly to their core infrastructure needs.</p>
              </div>
              <div className="grid grid-cols-3 gap-3 text-center">
                {[
                  { label: "Jobs tracked", value: "6" },
                  { label: "Avg score", value: "76" },
                  { label: "Applied", value: "2" },
                ].map((stat, i) => (
                  <div key={i} className="bg-card border border-border rounded-lg p-3">
                    <p className="text-xl font-bold font-mono">{stat.value}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">{stat.label}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Testimonials mock */}
      <section className="max-w-6xl mx-auto px-6 py-14">
        <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={stagger}>
          <motion.h2 variants={fadeUp} className="text-2xl font-bold tracking-tight mb-8">What engineers are saying</motion.h2>
          <motion.div variants={stagger} className="grid sm:grid-cols-3 gap-5">
            {[
              { quote: "Applied to 6 roles, got 4 interviews. Highest hit rate I've ever had. The match scores are genuinely predictive.", name: "M.K.", role: "Staff Engineer, ex-Airbnb" },
              { quote: "I used to spend 3 hours tailoring a resume. With Orvek it takes 8 minutes and the output is better than anything I wrote manually.", name: "P.A.", role: "Senior Engineer, ex-Stripe" },
              { quote: "Finally a tool that helps me focus instead of spray-and-pray. My applications are smaller in volume but much higher quality.", name: "R.T.", role: "Principal Engineer, ex-Shopify" },
            ].map((t, i) => (
              <motion.div key={i} variants={fadeUp} className="border border-border rounded-lg p-5 bg-card">
                <p className="text-sm text-foreground leading-relaxed mb-4">"{t.quote}"</p>
                <div>
                  <p className="text-xs font-semibold text-foreground">{t.name}</p>
                  <p className="text-xs text-muted-foreground">{t.role}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </section>

      {/* CTA */}
      <section className="border-t border-border bg-primary text-primary-foreground">
        <div className="max-w-6xl mx-auto px-6 py-14 text-center">
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={stagger}>
            <motion.h2 variants={fadeUp} className="text-3xl font-bold tracking-tight mb-3">Precision over volume.</motion.h2>
            <motion.p variants={fadeUp} className="text-primary-foreground/70 mb-7 max-w-md mx-auto">Join engineers and product leaders who have stopped applying blindly and started moving with intention.</motion.p>
            <motion.div variants={fadeUp}>
              <Link href="/auth" className="inline-flex items-center gap-2 bg-primary-foreground text-primary px-8 py-3 rounded font-semibold hover:opacity-90 transition-opacity" data-testid="button-footer-cta">
                Get started now <ArrowRight className="w-4 h-4" />
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <PublicFooter />
    </div>
  );
}
