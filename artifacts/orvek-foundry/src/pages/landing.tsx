import { useState, useEffect, useRef } from "react";
import { motion, type Variants, AnimatePresence } from "framer-motion";
import { Link } from "wouter";
import {
  ArrowRight, CheckCircle2, TrendingUp, Target, FileText, Zap,
  Search, Bell, User, CheckCircle, AlertCircle, BarChart2,
  ChevronDown, ChevronUp, Activity, Clock, Sparkles,
} from "lucide-react";
import PublicNav from "@/components/public-nav";
import PublicFooter from "@/components/public-footer";

/* ─── animation variants ─── */
const fadeUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45 } },
};
const stagger: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};

/* ─── data ─── */
const PARTNERS = [
  "Stripe","Linear","Vercel","Figma","Notion","Anthropic",
  "GitHub","Shopify","Airbnb","Datadog","Cloudflare","Rippling",
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
    posted: "2 days ago",
    skills: [
      { name: "TypeScript", match: true, yours: 95, required: 80 },
      { name: "Systems Design", match: true, yours: 88, required: 85 },
      { name: "Real-time Sync", match: true, yours: 82, required: 75 },
      { name: "React", match: true, yours: 90, required: 70 },
      { name: "Rust", match: false, yours: 10, required: 60 },
    ],
    summary: "Strong TypeScript and systems design alignment. Your real-time sync experience maps directly to their core infrastructure needs.",
    gap: "Rust experience preferred. Not a hard blocker — mention your C++ systems background.",
    tag: "Top Match",
    tagColor: "text-emerald-700 bg-emerald-50 border-emerald-200",
  },
  {
    id: 2,
    title: "Principal Engineer, Platform",
    company: "Vercel",
    location: "Remote",
    type: "Full-time",
    score: 87,
    salary: "$240k–$310k",
    posted: "1 day ago",
    skills: [
      { name: "Node.js", match: true, yours: 92, required: 80 },
      { name: "Edge Computing", match: true, yours: 78, required: 70 },
      { name: "CI/CD", match: true, yours: 85, required: 75 },
      { name: "Go", match: false, yours: 20, required: 65 },
      { name: "Kubernetes", match: false, yours: 35, required: 70 },
    ],
    summary: "Your deployment pipeline and edge computing experience aligns well. Node.js depth is a clear match for their platform work.",
    gap: "Go and Kubernetes are differentiators. Invest 4–6 weeks here for a stronger application.",
    tag: "Strong Fit",
    tagColor: "text-emerald-700 bg-emerald-50 border-emerald-200",
  },
  {
    id: 3,
    title: "Staff Engineer, Product Infra",
    company: "Figma",
    location: "New York, NY",
    type: "Full-time",
    score: 83,
    salary: "$200k–$260k",
    posted: "3 days ago",
    skills: [
      { name: "React", match: true, yours: 90, required: 80 },
      { name: "Performance", match: true, yours: 80, required: 75 },
      { name: "Cross-platform", match: true, yours: 72, required: 65 },
      { name: "C++", match: false, yours: 25, required: 70 },
      { name: "WebAssembly", match: false, yours: 15, required: 60 },
    ],
    summary: "Frontend performance and cross-platform strength is solid. Deep C++ expected for sub-teams working on the editor core.",
    gap: "C++ and WebAssembly are hard differentiators. Focus on teams not working on the core engine.",
    tag: "Good Fit",
    tagColor: "text-sky-700 bg-sky-50 border-sky-200",
  },
  {
    id: 4,
    title: "Senior Engineer, Payments",
    company: "Stripe",
    location: "Remote",
    type: "Full-time",
    score: 74,
    salary: "$190k–$250k",
    posted: "5 days ago",
    skills: [
      { name: "Distributed Systems", match: true, yours: 85, required: 80 },
      { name: "API Design", match: true, yours: 88, required: 75 },
      { name: "PostgreSQL", match: true, yours: 76, required: 70 },
      { name: "Ruby", match: false, yours: 15, required: 70 },
      { name: "Financial Systems", match: false, yours: 20, required: 75 },
    ],
    summary: "Distributed systems and API design are strong signals. Ruby and fintech domain experience are meaningful gaps here.",
    gap: "Ruby proficiency and financial domain context are both required. Consider if this is worth the ramp time.",
    tag: "Worth Considering",
    tagColor: "text-amber-700 bg-amber-50 border-amber-200",
  },
];

const RESUME_SCRIPT = [
  { delay: 0,    text: "$ orvek analyze --job='Staff SWE @ Linear'", type: "cmd" },
  { delay: 600,  text: "Scanning resume against job requirements...", type: "info" },
  { delay: 1300, text: "TypeScript (5 yrs) ········ Required: 4 yrs ✓ MATCH", type: "match" },
  { delay: 2000, text: "Systems Design ············ Required: Senior ✓ MATCH", type: "match" },
  { delay: 2600, text: "Real-time Sync ············ 2 projects detected ✓ MATCH", type: "match" },
  { delay: 3200, text: "React ····················· Required: 3 yrs ✓ MATCH", type: "match" },
  { delay: 3800, text: "Rust ······················ Not found in profile △ GAP", type: "gap" },
  { delay: 4500, text: "", type: "blank" },
  { delay: 4600, text: "$ orvek rewrite --tailor --ats-optimized", type: "cmd" },
  { delay: 5300, text: "Generating tailored resume bullets...", type: "info" },
  { delay: 6100, text: "→ 'Led real-time sync architecture serving 4M+ active users'", type: "out" },
  { delay: 6900, text: "→ 'Reduced API p99 latency 38% via query batching & caching'", type: "out" },
  { delay: 7600, text: "→ 'Designed event-sourcing system handling 50K writes/sec'", type: "out" },
  { delay: 8300, text: "", type: "blank" },
  { delay: 8400, text: "ATS Score: 96/100   Match Score: 91/100   Time saved: ~2h", type: "result" },
  { delay: 8900, text: "✓ Resume ready to download", type: "done" },
];

const PIPELINE = [
  { title: "Staff SWE", company: "Linear", score: 91, status: "Interview", statusColor: "text-emerald-600 bg-emerald-50 border-emerald-200", activity: "Interview scheduled for Tue 10am" },
  { title: "Principal Eng", company: "Vercel", score: 87, status: "Applied", statusColor: "text-blue-600 bg-blue-50 border-blue-200", activity: "Application viewed 3× by recruiter" },
  { title: "Staff Eng", company: "Figma", score: 83, status: "Applied", statusColor: "text-blue-600 bg-blue-50 border-blue-200", activity: "Under review — Day 3" },
  { title: "Senior Eng", company: "Stripe", score: 74, status: "Drafting", statusColor: "text-amber-600 bg-amber-50 border-amber-200", activity: "Resume tailoring in progress" },
];

const ACTIVITY_FEED = [
  { icon: "🔍", text: "New match: Staff SWE @ Notion (score 79)", time: "12m ago" },
  { icon: "👁", text: "Linear recruiter viewed your application", time: "1h ago" },
  { icon: "✅", text: "Resume tailored for Vercel — ATS 94/100", time: "3h ago" },
  { icon: "📊", text: "Weekly report: avg score up 4 pts", time: "Yesterday" },
];

/* ─── small helpers ─── */
function ScoreBadge({ score }: { score: number }) {
  const c =
    score >= 80 ? "text-emerald-700 bg-emerald-50 border-emerald-200"
    : score >= 65 ? "text-amber-700 bg-amber-50 border-amber-200"
    : "text-red-700 bg-red-50 border-red-200";
  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded border text-xs font-mono font-semibold ${c}`}>
      {score}
    </span>
  );
}

function AnimatedCounter({ target, duration = 900 }: { target: number; duration?: number }) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    setVal(0);
    let start: number | null = null;
    const tick = (ts: number) => {
      if (!start) start = ts;
      const p = Math.min((ts - start) / duration, 1);
      setVal(Math.floor(p * target));
      if (p < 1) requestAnimationFrame(tick);
    };
    const id = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(id);
  }, [target, duration]);
  return <>{val}</>;
}

function useTypewriter(text: string, speed = 55, startDelay = 0) {
  const [displayed, setDisplayed] = useState("");
  const [done, setDone] = useState(false);
  useEffect(() => {
    setDisplayed("");
    setDone(false);
    let i = 0;
    const start = setTimeout(() => {
      const id = setInterval(() => {
        i++;
        setDisplayed(text.slice(0, i));
        if (i >= text.length) { clearInterval(id); setDone(true); }
      }, speed);
      return () => clearInterval(id);
    }, startDelay);
    return () => clearTimeout(start);
  }, [text, speed, startDelay]);
  return { displayed, done };
}

/* ─── Typewriter headline ─── */
function HeroHeadline() {
  const line1 = "Stop applying";
  const { displayed: d1, done: done1 } = useTypewriter(line1, 60, 300);
  const { displayed: d2, done: done2 } = useTypewriter("blindly.", 75, done1 ? 100 : 99999);
  return (
    <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.05] mb-5 max-w-4xl min-h-[1.1em]">
      <span>{d1}</span>
      {done1 && <><br /><span className="text-accent">{d2}</span></>}
      {(!done2 || !done1) && (
        <motion.span
          animate={{ opacity: [1, 0] }}
          transition={{ duration: 0.5, repeat: Infinity }}
          className="inline-block w-0.5 h-[0.85em] bg-current ml-1 align-middle"
        />
      )}
    </h1>
  );
}

/* ─── DEMO SHELL ─── */
function InteractiveDemo() {
  const [tab, setTab] = useState<"jobs" | "resume" | "dashboard">("jobs");
  const [selectedJob, setSelectedJob] = useState(DEMO_JOBS[0]);
  const [search, setSearch] = useState("");
  const [minScore, setMinScore] = useState(0);
  const [terminalLines, setTerminalLines] = useState(0);
  const [running, setRunning] = useState(false);
  const [expandedRow, setExpandedRow] = useState<number | null>(null);

  const filtered = DEMO_JOBS.filter(
    (j) =>
      j.score >= minScore &&
      (j.title.toLowerCase().includes(search.toLowerCase()) ||
        j.company.toLowerCase().includes(search.toLowerCase()))
  );

  const runAnalysis = () => {
    if (running) return;
    setTerminalLines(0);
    setRunning(true);
    RESUME_SCRIPT.forEach((_, i) => {
      setTimeout(() => setTerminalLines(i + 1), RESUME_SCRIPT[i].delay);
    });
    const last = RESUME_SCRIPT[RESUME_SCRIPT.length - 1];
    setTimeout(() => setRunning(false), last.delay + 600);
  };

  useEffect(() => { if (tab === "resume") { setTerminalLines(0); setRunning(false); } }, [tab]);

  const TABS = [
    { key: "jobs" as const, label: "Job Matches", icon: Search },
    { key: "resume" as const, label: "Resume AI", icon: Sparkles },
    { key: "dashboard" as const, label: "Dashboard", icon: BarChart2 },
  ];

  return (
    <div className="w-full max-w-5xl mx-auto">
      {/* Browser chrome frame */}
      <div className="rounded-2xl border border-border bg-card shadow-2xl overflow-hidden">

        {/* Window titlebar */}
        <div className="flex items-center gap-3 px-4 py-3 bg-muted/70 border-b border-border select-none">
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded-full bg-red-400/80 hover:bg-red-500 transition-colors cursor-default" />
            <div className="w-3 h-3 rounded-full bg-amber-400/80 hover:bg-amber-500 transition-colors cursor-default" />
            <div className="w-3 h-3 rounded-full bg-emerald-400/80 hover:bg-emerald-500 transition-colors cursor-default" />
          </div>
          <div className="flex-1 flex justify-center">
            <div className="flex items-center gap-2 bg-background/70 border border-border/60 rounded-md px-3 py-1 text-xs text-muted-foreground font-mono">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 flex-shrink-0" />
              app.ovrekfoundry.com
            </div>
          </div>
          <div className="flex items-center gap-3 text-muted-foreground/50">
            <Bell className="w-3.5 h-3.5" />
            <div className="w-6 h-6 rounded-full bg-accent/20 border border-accent/30 flex items-center justify-center">
              <User className="w-3 h-3 text-accent" />
            </div>
          </div>
        </div>

        {/* Tab bar */}
        <div className="flex items-center border-b border-border bg-muted/40 px-4">
          {TABS.map((t) => (
            <button
              key={t.key}
              onClick={() => setTab(t.key)}
              className={`flex items-center gap-1.5 px-4 py-2.5 text-xs font-medium border-b-2 transition-all whitespace-nowrap ${
                tab === t.key
                  ? "border-accent text-foreground"
                  : "border-transparent text-muted-foreground hover:text-foreground hover:bg-muted/40"
              }`}
            >
              <t.icon className="w-3.5 h-3.5" />
              {t.label}
            </button>
          ))}
          <div className="ml-auto flex items-center gap-2 py-2">
            <span className="text-[10px] bg-accent/10 text-accent border border-accent/20 px-2 py-0.5 rounded font-medium">
              LIVE DEMO
            </span>
          </div>
        </div>

        {/* Panel content */}
        <div className="min-h-[460px]">
          <AnimatePresence mode="wait">

            {/* ══ JOB MATCHES ══ */}
            {tab === "jobs" && (
              <motion.div key="jobs" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.15 }} className="flex h-full min-h-[460px]">

                {/* Sidebar */}
                <div className="w-full sm:w-[240px] flex-shrink-0 border-r border-border flex flex-col">
                  {/* Search + filter */}
                  <div className="p-3 border-b border-border space-y-2">
                    <div className="relative">
                      <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3 h-3 text-muted-foreground" />
                      <input
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder="Search roles…"
                        className="w-full pl-7 pr-3 py-1.5 text-xs bg-muted/40 border border-border rounded-md focus:outline-none focus:ring-1 focus:ring-accent/40 placeholder:text-muted-foreground/50"
                      />
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] text-muted-foreground whitespace-nowrap">Min score</span>
                      <input
                        type="range" min={0} max={90} step={10} value={minScore}
                        onChange={(e) => setMinScore(Number(e.target.value))}
                        className="flex-1 h-1 accent-emerald-500 cursor-pointer"
                      />
                      <span className="text-[10px] font-mono text-foreground w-5 text-right">{minScore}</span>
                    </div>
                  </div>

                  {/* Job list */}
                  <div className="overflow-y-auto flex-1 divide-y divide-border">
                    {filtered.length === 0 && (
                      <p className="text-xs text-muted-foreground p-4 text-center">No roles match your filters</p>
                    )}
                    {filtered.map((job) => (
                      <button
                        key={job.id}
                        onClick={() => setSelectedJob(job)}
                        className={`w-full text-left px-3 py-3 transition-all hover:bg-muted/40 ${
                          selectedJob.id === job.id
                            ? "bg-muted/70 border-l-2 border-l-accent"
                            : "border-l-2 border-l-transparent"
                        }`}
                      >
                        <div className="flex items-start justify-between gap-1 mb-1">
                          <p className="text-xs font-semibold text-foreground leading-tight truncate">{job.title}</p>
                          <ScoreBadge score={job.score} />
                        </div>
                        <p className="text-[10px] text-muted-foreground">{job.company} · {job.location}</p>
                        <div className="flex items-center justify-between mt-1.5">
                          <span className={`text-[9px] font-medium px-1.5 py-0.5 rounded border ${job.tagColor}`}>{job.tag}</span>
                          <span className="text-[9px] text-muted-foreground">{job.posted}</span>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Detail panel */}
                <div className="hidden sm:flex flex-col flex-1 overflow-hidden">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={selectedJob.id}
                      initial={{ opacity: 0, x: 12 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -12 }}
                      transition={{ duration: 0.2 }}
                      className="flex flex-col h-full p-5 gap-4 overflow-y-auto"
                    >
                      {/* Header */}
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <h3 className="text-sm font-bold text-foreground">{selectedJob.title}</h3>
                          <p className="text-xs text-muted-foreground mt-0.5">{selectedJob.company} · {selectedJob.type} · {selectedJob.salary}</p>
                        </div>
                        <div className="text-right flex-shrink-0">
                          <div className="text-4xl font-bold font-mono leading-none text-foreground">
                            <AnimatedCounter key={selectedJob.id} target={selectedJob.score} />
                          </div>
                          <p className="text-[10px] text-muted-foreground">/ 100 match</p>
                        </div>
                      </div>

                      {/* Score bar */}
                      <div>
                        <div className="flex justify-between text-[10px] text-muted-foreground mb-1">
                          <span>Overall fit</span>
                          <span>{selectedJob.score}%</span>
                        </div>
                        <div className="w-full bg-muted rounded-full h-2">
                          <motion.div
                            key={selectedJob.id}
                            initial={{ width: 0 }}
                            animate={{ width: `${selectedJob.score}%` }}
                            transition={{ duration: 0.8, ease: "easeOut" }}
                            className={`h-2 rounded-full ${selectedJob.score >= 80 ? "bg-emerald-500" : selectedJob.score >= 65 ? "bg-amber-400" : "bg-red-400"}`}
                          />
                        </div>
                      </div>

                      {/* Skill breakdown */}
                      <div>
                        <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-widest mb-2.5">Skill Breakdown</p>
                        <div className="space-y-2">
                          {selectedJob.skills.map((s, i) => (
                            <motion.div
                              key={s.name}
                              initial={{ opacity: 0, x: -8 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: i * 0.06 }}
                              className="space-y-1"
                            >
                              <div className="flex items-center justify-between">
                                <div className="flex items-center gap-1.5">
                                  {s.match
                                    ? <CheckCircle className="w-3 h-3 text-emerald-500 flex-shrink-0" />
                                    : <AlertCircle className="w-3 h-3 text-amber-400 flex-shrink-0" />}
                                  <span className="text-[11px] font-medium text-foreground">{s.name}</span>
                                </div>
                                <div className="flex items-center gap-2 text-[10px] text-muted-foreground">
                                  <span>You: <span className={s.match ? "text-emerald-600 font-semibold" : "text-amber-600 font-semibold"}>{s.yours}</span></span>
                                  <span>Need: {s.required}</span>
                                </div>
                              </div>
                              <div className="relative h-1 bg-muted rounded-full overflow-hidden">
                                <div
                                  className="absolute inset-y-0 left-0 rounded-full bg-border"
                                  style={{ width: `${s.required}%` }}
                                />
                                <motion.div
                                  initial={{ width: 0 }}
                                  animate={{ width: `${Math.min(s.yours, 100)}%` }}
                                  transition={{ delay: 0.1 + i * 0.06, duration: 0.7 }}
                                  className={`absolute inset-y-0 left-0 rounded-full ${s.match ? "bg-emerald-500" : "bg-amber-400"}`}
                                />
                              </div>
                            </motion.div>
                          ))}
                        </div>
                      </div>

                      {/* AI summary */}
                      <div className="bg-muted/50 border border-border rounded-lg p-3.5">
                        <div className="flex items-center gap-1.5 mb-2">
                          <Sparkles className="w-3 h-3 text-accent" />
                          <span className="text-[10px] font-semibold text-accent uppercase tracking-widest">AI Analysis</span>
                        </div>
                        <p className="text-xs text-foreground leading-relaxed">{selectedJob.summary}</p>
                      </div>

                      {/* Gap */}
                      <div className="bg-amber-50/60 border border-amber-200/70 rounded-lg p-3">
                        <p className="text-[10px] font-semibold text-amber-700 uppercase tracking-widest mb-1">Gap to Address</p>
                        <p className="text-xs text-amber-800 leading-relaxed">{selectedJob.gap}</p>
                      </div>

                      {/* Actions */}
                      <div className="flex gap-2 mt-auto pt-1">
                        <button
                          onClick={() => setTab("resume")}
                          className="flex-1 bg-primary text-primary-foreground text-xs font-semibold py-2.5 rounded hover:opacity-90 transition-opacity flex items-center justify-center gap-1.5"
                        >
                          <Sparkles className="w-3.5 h-3.5" />
                          Tailor Resume →
                        </button>
                        <button className="border border-border text-xs font-medium px-4 py-2.5 rounded text-muted-foreground hover:text-foreground hover:border-foreground/30 transition-all">
                          Save
                        </button>
                      </div>
                    </motion.div>
                  </AnimatePresence>
                </div>
              </motion.div>
            )}

            {/* ══ RESUME AI ══ */}
            {tab === "resume" && (
              <motion.div key="resume" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.15 }} className="p-5 flex flex-col gap-4 min-h-[460px]">

                <div className="flex items-center justify-between flex-wrap gap-3">
                  <div>
                    <p className="text-sm font-bold text-foreground flex items-center gap-1.5">
                      <Sparkles className="w-4 h-4 text-accent" /> Resume AI
                    </p>
                    <p className="text-xs text-muted-foreground">Tailors and rewrites your resume for each role in real time</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="bg-muted/50 border border-border rounded-md px-3 py-1.5 text-xs text-muted-foreground">
                      Target: <span className="text-foreground font-medium">Staff SWE @ Linear</span>
                    </div>
                    <button
                      onClick={runAnalysis}
                      disabled={running}
                      className={`inline-flex items-center gap-1.5 text-xs font-semibold px-4 py-1.5 rounded transition-all ${
                        running ? "bg-muted text-muted-foreground cursor-not-allowed" : "bg-primary text-primary-foreground hover:opacity-90"
                      }`}
                    >
                      {running ? (
                        <>
                          <motion.span
                            animate={{ rotate: 360 }}
                            transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
                            className="inline-block w-3 h-3 border border-current border-t-transparent rounded-full"
                          />
                          Analyzing…
                        </>
                      ) : (
                        <>▶&nbsp; Run</>
                      )}
                    </button>
                  </div>
                </div>

                {/* Terminal */}
                <div className="bg-[#0d0d0d] rounded-xl border border-zinc-800 overflow-hidden flex-1">
                  <div className="flex items-center gap-2 px-4 py-2.5 border-b border-zinc-800 bg-zinc-900/60">
                    <div className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                    <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
                    <div className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
                    <span className="ml-2 text-[10px] font-mono text-zinc-500 flex-1">orvek resume-ai — bash</span>
                    <span className="text-[10px] text-zinc-600 font-mono">zsh</span>
                  </div>
                  <div className="p-4 min-h-[300px] space-y-1">
                    {terminalLines === 0 && !running && (
                      <p className="text-xs font-mono text-zinc-600 italic">Press ▶ Run to see live resume analysis and AI tailoring…</p>
                    )}
                    {RESUME_SCRIPT.slice(0, terminalLines).map((line, i) => {
                      if (line.type === "blank") return <div key={i} className="h-2" />;
                      const color =
                        line.type === "cmd"    ? "text-white font-semibold" :
                        line.type === "match"  ? "text-emerald-400" :
                        line.type === "gap"    ? "text-amber-400" :
                        line.type === "out"    ? "text-sky-400" :
                        line.type === "result" ? "text-purple-300 font-semibold" :
                        line.type === "done"   ? "text-emerald-300 font-bold" :
                        "text-zinc-500";
                      return (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, x: -6 }}
                          animate={{ opacity: 1, x: 0 }}
                          className={`text-xs font-mono leading-relaxed ${color}`}
                        >
                          {line.text}
                        </motion.div>
                      );
                    })}
                    {running && terminalLines < RESUME_SCRIPT.length && (
                      <motion.span
                        animate={{ opacity: [1, 0] }}
                        transition={{ duration: 0.5, repeat: Infinity }}
                        className="inline-block w-2 h-4 bg-emerald-400 align-middle"
                      />
                    )}
                  </div>
                </div>

                {/* Metrics row */}
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { label: "Skills Matched", value: "4/5", color: "text-emerald-600" },
                    { label: "ATS Score", value: "96/100", color: "text-emerald-600" },
                    { label: "Time Saved", value: "~2 hrs", color: "text-accent" },
                  ].map((s) => (
                    <div key={s.label} className="bg-muted/40 border border-border rounded-lg p-3 text-center">
                      <p className={`text-lg font-bold font-mono ${s.color}`}>{s.value}</p>
                      <p className="text-[10px] text-muted-foreground mt-0.5">{s.label}</p>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* ══ DASHBOARD ══ */}
            {tab === "dashboard" && (
              <motion.div key="dashboard" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.15 }} className="p-5 flex flex-col gap-4 min-h-[460px]">

                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-bold text-foreground">Your Pipeline</p>
                    <p className="text-xs text-muted-foreground">All active roles tracked by match score</p>
                  </div>
                  <div className="flex items-center gap-1.5 text-[10px] text-emerald-600 bg-emerald-50 border border-emerald-200 px-2 py-1 rounded">
                    <Activity className="w-3 h-3" />
                    Live
                  </div>
                </div>

                {/* Stat cards */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {[
                    { label: "Jobs Tracked", value: 12, sub: "+3 this week", color: "text-foreground" },
                    { label: "Avg Match Score", value: 81, sub: "Top quartile", color: "text-emerald-600" },
                    { label: "Applied", value: 4, sub: "2 in review", color: "text-sky-600" },
                    { label: "Interviews", value: 2, sub: "1 scheduled Tue", color: "text-accent" },
                  ].map((s, i) => (
                    <motion.div
                      key={s.label}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.07 }}
                      className="bg-card border border-border rounded-lg p-3 hover:border-foreground/20 transition-colors"
                    >
                      <p className={`text-2xl font-bold font-mono ${s.color}`}>
                        <AnimatedCounter key={tab} target={s.value} duration={700} />
                      </p>
                      <p className="text-[10px] font-semibold text-foreground/70 mt-0.5">{s.label}</p>
                      <p className="text-[10px] text-muted-foreground">{s.sub}</p>
                    </motion.div>
                  ))}
                </div>

                {/* Pipeline rows — expandable */}
                <div>
                  <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-widest mb-2">Active Roles</p>
                  <div className="border border-border rounded-lg overflow-hidden divide-y divide-border">
                    {PIPELINE.map((row, i) => (
                      <div key={i}>
                        <button
                          onClick={() => setExpandedRow(expandedRow === i ? null : i)}
                          className="w-full flex items-center justify-between px-4 py-3 hover:bg-muted/30 transition-colors text-left"
                        >
                          <div className="flex items-center gap-3 min-w-0">
                            <div className="min-w-0">
                              <p className="text-xs font-semibold text-foreground truncate">{row.title}</p>
                              <p className="text-[10px] text-muted-foreground">{row.company}</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-3 flex-shrink-0">
                            <ScoreBadge score={row.score} />
                            <span className={`text-[10px] font-medium px-2 py-0.5 rounded border hidden sm:inline ${row.statusColor}`}>
                              {row.status}
                            </span>
                            {expandedRow === i
                              ? <ChevronUp className="w-3.5 h-3.5 text-muted-foreground" />
                              : <ChevronDown className="w-3.5 h-3.5 text-muted-foreground" />}
                          </div>
                        </button>
                        <AnimatePresence>
                          {expandedRow === i && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.2 }}
                              className="overflow-hidden"
                            >
                              <div className="px-4 pb-3 flex items-center gap-2 text-xs text-muted-foreground bg-muted/20">
                                <Clock className="w-3 h-3 flex-shrink-0" />
                                <span>{row.activity}</span>
                                <button
                                  onClick={() => setTab("resume")}
                                  className="ml-auto text-accent hover:underline text-[11px] font-medium whitespace-nowrap"
                                >
                                  Tailor Resume →
                                </button>
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Score bar chart + activity feed side by side */}
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-widest mb-2">Score Distribution</p>
                    <div className="flex items-end gap-2 h-20 bg-muted/20 border border-border rounded-lg px-4 py-3">
                      {PIPELINE.map((row, i) => (
                        <div key={i} className="flex-1 flex flex-col items-center gap-1 h-full justify-end">
                          <p className="text-[9px] font-mono text-muted-foreground">{row.score}</p>
                          <motion.div
                            initial={{ height: 0 }}
                            animate={{ height: `${(row.score / 100) * 44}px` }}
                            transition={{ delay: 0.15 + i * 0.08, duration: 0.6, ease: "easeOut" }}
                            className={`w-full rounded-t ${row.score >= 80 ? "bg-emerald-500" : row.score >= 65 ? "bg-amber-400" : "bg-muted-foreground/40"}`}
                            style={{ minHeight: 4 }}
                          />
                          <p className="text-[9px] text-muted-foreground truncate w-full text-center">{row.company}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-widest mb-2">Recent Activity</p>
                    <div className="border border-border rounded-lg divide-y divide-border overflow-hidden bg-card">
                      {ACTIVITY_FEED.map((a, i) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, x: 8 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.1 + i * 0.07 }}
                          className="flex items-start gap-2.5 px-3 py-2 hover:bg-muted/30 transition-colors"
                        >
                          <span className="text-xs mt-0.5">{a.icon}</span>
                          <div className="min-w-0">
                            <p className="text-[11px] text-foreground leading-tight">{a.text}</p>
                            <p className="text-[10px] text-muted-foreground mt-0.5">{a.time}</p>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

          </AnimatePresence>
        </div>
      </div>

      <p className="text-center text-xs text-muted-foreground mt-3">
        Interactive demo &mdash;{" "}
        <Link href="/auth" className="text-accent hover:underline font-medium">
          sign up for the real thing →
        </Link>
      </p>
    </div>
  );
}

/* ─── Social icons ─── */
function TelegramIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
      <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
    </svg>
  );
}
function XIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.748l7.73-8.835L1.254 2.25H8.08l4.259 5.629L18.244 2.25zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77z"/>
    </svg>
  );
}
function SocialFollowButtons() {
  return (
    <div className="flex items-center gap-2 mb-5 flex-wrap">
      <a href="https://x.com/ovrefoundry" target="_blank" rel="noopener noreferrer"
        className="inline-flex items-center gap-2 bg-[#0f0f0f] text-white text-sm font-semibold px-4 py-2 rounded-full hover:bg-[#2a2a2a] transition-colors whitespace-nowrap">
        <XIcon />Follow @ovrefoundry
      </a>
      <a href="https://t.me/ovrekfoundry" target="_blank" rel="noopener noreferrer"
        className="inline-flex items-center gap-2 bg-[#0f0f0f] text-white text-sm font-semibold px-4 py-2 rounded-full hover:bg-[#2a2a2a] transition-colors whitespace-nowrap">
        <TelegramIcon />Join Telegram
      </a>
    </div>
  );
}

/* ─── PAGE ─── */
export default function Landing() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <PublicNav />

      {/* Hero */}
      <section className="max-w-6xl mx-auto px-6 pt-16 pb-10">
        <motion.div initial="hidden" animate="show" variants={stagger}>
          <motion.div variants={fadeUp}><SocialFollowButtons /></motion.div>

          <motion.div variants={fadeUp}>
            <HeroHeadline />
          </motion.div>

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

          {/* Demo — visible immediately on load */}
          <motion.div variants={fadeUp}>
            <p className="text-xs font-medium text-muted-foreground uppercase tracking-widest mb-4 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 inline-block" />
              Try the product — no sign up required
            </p>
            <InteractiveDemo />
          </motion.div>
        </motion.div>
      </section>

      {/* Partners */}
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

      {/* Testimonials */}
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
                <p className="text-xs font-semibold text-foreground">{t.name}</p>
                <p className="text-xs text-muted-foreground">{t.role}</p>
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
