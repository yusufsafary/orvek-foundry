import { motion, type Variants } from "framer-motion";
import PublicNav from "@/components/public-nav";
import PublicFooter from "@/components/public-footer";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};
const stagger: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07 } },
};

const CHANGES = [
  {
    version: "v1.4",
    date: "May 2026",
    tag: "New",
    items: [
      { type: "feat", text: "PWA support — install Orvek Foundry on your home screen for instant access" },
      { type: "feat", text: "Cookie Policy, Legal, and About pages added for full compliance" },
      { type: "feat", text: "New multi-column footer with product, company, and support navigation" },
      { type: "feat", text: "GitHub Actions typecheck workflow — every commit is validated automatically" },
      { type: "improve", text: "Branded logomark replacing generic placeholder icon" },
      { type: "improve", text: "Tighter spacing across all public pages — less whitespace, more signal" },
    ],
  },
  {
    version: "v1.3",
    date: "May 2026",
    tag: "Improvement",
    items: [
      { type: "feat", text: "Resume AI v2 — improved tailoring quality with more granular job description parsing" },
      { type: "feat", text: "Match score breakdown — see exactly which factors drive your score" },
      { type: "fix", text: "Fixed Vercel deployment pipeline — PORT and BASE_PATH environment handling" },
      { type: "improve", text: "Dashboard performance — scores now load 40% faster" },
    ],
  },
  {
    version: "v1.2",
    date: "April 2026",
    tag: "Improvement",
    items: [
      { type: "feat", text: "Dashboard redesign — cleaner information hierarchy, score-first layout" },
      { type: "feat", text: "Job detail page with full match analysis and tailoring shortcut" },
      { type: "improve", text: "Mobile navigation improvements — persistent bottom bar on small screens" },
      { type: "fix", text: "Fixed edge case where resume upload would timeout on large PDFs" },
    ],
  },
  {
    version: "v1.1",
    date: "March 2026",
    tag: "Fix",
    items: [
      { type: "feat", text: "Onboarding flow — guided setup for new users in under five minutes" },
      { type: "feat", text: "Settings page — update resume, target role, and notification preferences" },
      { type: "improve", text: "Score accuracy improvements based on beta user feedback" },
      { type: "fix", text: "Authentication session persistence across browser refreshes" },
    ],
  },
  {
    version: "v1.0",
    date: "March 2026",
    tag: "Launch",
    items: [
      { type: "feat", text: "Initial public beta launch" },
      { type: "feat", text: "AI match scoring: 0-100 score for every job against your profile" },
      { type: "feat", text: "Resume tailoring: paste any JD, get a tailored version in 2 minutes" },
      { type: "feat", text: "Precision dashboard: track your pipeline by match score" },
      { type: "feat", text: "Secure authentication and profile management" },
    ],
  },
];

const TYPE_STYLES: Record<string, string> = {
  feat: "bg-accent/10 text-accent border border-accent/20",
  improve: "bg-blue-50 text-blue-700 border border-blue-200",
  fix: "bg-amber-50 text-amber-700 border border-amber-200",
};

const TAG_STYLES: Record<string, string> = {
  New: "bg-accent text-white",
  Improvement: "bg-blue-600 text-white",
  Fix: "bg-amber-500 text-white",
  Launch: "bg-primary text-primary-foreground",
};

export default function Changelog() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <PublicNav />

      <section className="max-w-3xl mx-auto px-6 pt-12 pb-8">
        <motion.div initial="hidden" animate="show" variants={stagger}>
          <motion.p variants={fadeUp} className="text-xs font-medium text-muted-foreground uppercase tracking-widest mb-3">Changelog</motion.p>
          <motion.h1 variants={fadeUp} className="text-4xl font-bold tracking-tight mb-3">What we have shipped.</motion.h1>
          <motion.p variants={fadeUp} className="text-muted-foreground">Every meaningful update to Orvek Foundry, documented plainly.</motion.p>
        </motion.div>
      </section>

      <section className="max-w-3xl mx-auto px-6 pb-16">
        <motion.div initial="hidden" animate="show" variants={stagger} className="relative">
          <div className="absolute left-20 top-0 bottom-0 w-px bg-border hidden sm:block" />
          {CHANGES.map((release, i) => (
            <motion.div key={i} variants={fadeUp} className="flex gap-8 mb-10">
              <div className="hidden sm:flex flex-col items-end w-16 flex-shrink-0 pt-1 gap-1">
                <span className="text-xs font-mono font-semibold text-foreground">{release.version}</span>
                <span className="text-xs text-muted-foreground">{release.date}</span>
              </div>
              <div className="flex-1 border border-border rounded-xl bg-card p-5">
                <div className="flex items-center gap-2 mb-4 sm:hidden">
                  <span className="text-xs font-mono font-semibold">{release.version}</span>
                  <span className="text-xs text-muted-foreground">{release.date}</span>
                </div>
                <div className="flex items-center gap-2 mb-4">
                  <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${TAG_STYLES[release.tag] || "bg-muted text-muted-foreground"}`}>
                    {release.tag}
                  </span>
                </div>
                <ul className="space-y-2">
                  {release.items.map((item, j) => (
                    <li key={j} className="flex items-start gap-2.5">
                      <span className={`flex-shrink-0 text-xs px-1.5 py-0.5 rounded font-mono font-medium mt-0.5 ${TYPE_STYLES[item.type] || ""}`}>
                        {item.type}
                      </span>
                      <span className="text-sm text-muted-foreground">{item.text}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      <PublicFooter />
    </div>
  );
}
