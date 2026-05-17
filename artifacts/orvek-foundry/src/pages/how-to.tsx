import { motion, type Variants } from "framer-motion";
import { Link } from "wouter";
import { Upload, Target, BarChart2, FileText, ChevronRight } from "lucide-react";
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

const STEPS = [
  {
    icon: Upload,
    step: "01",
    title: "Upload your resume",
    detail: "Paste or upload your current resume in plain text or PDF. This becomes your baseline profile — the foundation for every match score and resume rewrite. You can update it anytime from Settings.",
    tips: [
      "Include specific accomplishments, not just responsibilities",
      "Quantify impact where possible (e.g. reduced latency by 40%)",
      "Keep it current — stale resumes produce lower scores",
    ],
  },
  {
    icon: Target,
    step: "02",
    title: "Set your target role",
    detail: "Tell us your target title and experience level. This calibrates the scoring model to your specific career stage. A Staff Engineer and a Senior Engineer are graded against different benchmarks.",
    tips: [
      "Be specific — \"Staff Engineer, Product Infrastructure\" beats \"Engineer\"",
      "You can set multiple targets across different domains",
      "Update your target as your search evolves",
    ],
  },
  {
    icon: BarChart2,
    step: "03",
    title: "Review your match scores",
    detail: "Every job in our database is scored 0 to 100 against your profile in real time. Scores above 80 are strong candidates for your short list. Read the reasoning — it tells you exactly where you are strong or weak.",
    tips: [
      "Focus your energy on roles scoring 75 and above",
      "Low scores on interesting roles can highlight skill gaps worth addressing",
      "Filter by score range to keep your dashboard clean",
    ],
  },
  {
    icon: FileText,
    step: "04",
    title: "Tailor your resume and apply",
    detail: "Paste any job description into the Resume AI tool. In under two minutes, you get a version of your resume rewritten to match that specific role — ATS-optimized, grounded in your actual experience.",
    tips: [
      "Always review the AI output before submitting",
      "Keep the original language of your accomplishments wherever possible",
      "Apply to roles in batches of three to five for manageable follow-up",
    ],
  },
];

export default function HowTo() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <PublicNav />

      <section className="max-w-3xl mx-auto px-6 pt-12 pb-8">
        <motion.div initial="hidden" animate="show" variants={stagger}>
          <motion.p variants={fadeUp} className="text-xs font-medium text-muted-foreground uppercase tracking-widest mb-3">How it works</motion.p>
          <motion.h1 variants={fadeUp} className="text-4xl sm:text-5xl font-bold tracking-tight leading-tight mb-4">
            Four steps to clarity.
          </motion.h1>
          <motion.p variants={fadeUp} className="text-lg text-muted-foreground leading-relaxed">
            From setup to your first tailored application — the complete walkthrough.
          </motion.p>
        </motion.div>
      </section>

      <section className="max-w-3xl mx-auto px-6 pb-14">
        <motion.div initial="hidden" animate="show" variants={stagger} className="space-y-5">
          {STEPS.map((s, i) => (
            <motion.div key={i} variants={fadeUp} className="border border-border rounded-xl bg-card overflow-hidden">
              <div className="p-5 sm:p-6">
                <div className="flex items-start gap-5">
                  <div className="flex-shrink-0 w-9 h-9 rounded-lg bg-accent/10 flex items-center justify-center">
                    <s.icon className="w-4 h-4 text-accent" />
                  </div>
                  <div className="flex-1">
                    <p className="text-xs font-mono text-muted-foreground mb-1">{s.step}</p>
                    <h2 className="text-lg font-bold tracking-tight mb-2">{s.title}</h2>
                    <p className="text-sm text-muted-foreground leading-relaxed mb-4">{s.detail}</p>
                    <div className="space-y-1.5">
                      <p className="text-xs font-medium text-foreground uppercase tracking-widest mb-2">Tips</p>
                      {s.tips.map((tip, j) => (
                        <div key={j} className="flex items-start gap-2">
                          <ChevronRight className="w-3 h-3 text-accent mt-0.5 flex-shrink-0" />
                          <span className="text-xs text-muted-foreground">{tip}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      <section className="border-t border-border bg-muted/20">
        <div className="max-w-3xl mx-auto px-6 py-10 text-center">
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={stagger}>
            <motion.h2 variants={fadeUp} className="text-2xl font-bold tracking-tight mb-3">Ready to start?</motion.h2>
            <motion.p variants={fadeUp} className="text-muted-foreground mb-5 text-sm">Setup takes under five minutes. Your first match score in ten.</motion.p>
            <motion.div variants={fadeUp}>
              <Link href="/auth" className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-2.5 rounded font-semibold hover:opacity-90 transition-opacity text-sm">
                Get started
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <PublicFooter />
    </div>
  );
}
