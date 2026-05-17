import { motion, type Variants } from "framer-motion";
import { Link } from "wouter";
import { ArrowRight, CheckCircle2, TrendingUp, Target, FileText, Zap } from "lucide-react";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const stagger: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};

const JOBS_PREVIEW = [
  { title: "Staff Software Engineer", company: "Linear", score: 91 },
  { title: "Principal Engineer, Platform", company: "Vercel", score: 87 },
  { title: "Staff Engineer, Product Infrastructure", company: "Figma", score: 83 },
];

function ScoreBadge({ score }: { score: number }) {
  const color =
    score >= 80
      ? "text-emerald-700 bg-emerald-50 border-emerald-200"
      : score >= 60
      ? "text-amber-700 bg-amber-50 border-amber-200"
      : "text-red-700 bg-red-50 border-red-200";
  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded border text-xs font-mono font-medium ${color}`}>
      {score}
    </span>
  );
}

export default function Landing() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Nav */}
      <nav className="border-b border-border bg-background/95 sticky top-0 z-50 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">
          <span className="font-semibold tracking-tight text-sm">Orvek Foundry</span>
          <div className="flex items-center gap-3">
            <Link
              href="/auth"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              data-testid="link-login"
            >
              Sign in
            </Link>
            <Link
              href="/auth"
              className="text-sm bg-primary text-primary-foreground px-4 py-1.5 rounded hover:opacity-90 transition-opacity font-medium"
              data-testid="link-get-started"
            >
              Get access
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="max-w-6xl mx-auto px-6 pt-24 pb-20">
        <motion.div initial="hidden" animate="show" variants={stagger}>
          <motion.div variants={fadeUp} className="mb-6">
            <span className="inline-flex items-center gap-2 text-xs font-medium text-accent border border-accent/30 bg-accent/5 px-3 py-1 rounded-full">
              <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
              Intelligent Career System
            </span>
          </motion.div>

          <motion.h1
            variants={fadeUp}
            className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.05] mb-6 max-w-4xl"
          >
            Stop applying
            <br />
            <span className="text-accent">blindly.</span>
          </motion.h1>

          <motion.p
            variants={fadeUp}
            className="text-lg text-muted-foreground max-w-xl leading-relaxed mb-10"
          >
            Orvek Foundry scores every role against your profile, rewrites your resume for each application, and shows you exactly where you stand before you spend an hour on a cover letter.
          </motion.p>

          <motion.div variants={fadeUp} className="flex flex-col sm:flex-row gap-3">
            <Link
              href="/auth"
              className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded font-medium hover:opacity-90 transition-opacity"
              data-testid="button-hero-cta"
            >
              Start moving with precision
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/auth"
              className="inline-flex items-center gap-2 border border-border px-6 py-3 rounded font-medium text-muted-foreground hover:text-foreground hover:border-foreground/30 transition-all"
            >
              See how it works
            </Link>
          </motion.div>
        </motion.div>
      </section>

      {/* Job preview */}
      <section className="border-t border-border bg-muted/30">
        <div className="max-w-6xl mx-auto px-6 py-16">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={stagger}
          >
            <motion.p variants={fadeUp} className="text-xs font-medium text-muted-foreground uppercase tracking-widest mb-6">
              Your signal, not the noise
            </motion.p>
            <motion.div variants={stagger} className="space-y-3">
              {JOBS_PREVIEW.map((job, i) => (
                <motion.div
                  key={i}
                  variants={fadeUp}
                  className="flex items-center justify-between bg-card border border-border rounded-lg px-5 py-4 hover:border-foreground/20 transition-colors"
                >
                  <div>
                    <p className="text-sm font-medium text-foreground">{job.title}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">{job.company}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-xs text-muted-foreground hidden sm:block">Match score</span>
                    <ScoreBadge score={job.score} />
                  </div>
                </motion.div>
              ))}
            </motion.div>
            <motion.p variants={fadeUp} className="mt-4 text-xs text-muted-foreground">
              Every role scored. Every move deliberate.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Features */}
      <section className="max-w-6xl mx-auto px-6 py-20">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          variants={stagger}
        >
          <motion.h2 variants={fadeUp} className="text-3xl font-bold tracking-tight mb-3">
            Move with signal, not noise.
          </motion.h2>
          <motion.p variants={fadeUp} className="text-muted-foreground mb-12 max-w-lg">
            Three capabilities. One system. Built for people who treat their career like a product.
          </motion.p>

          <motion.div variants={stagger} className="grid sm:grid-cols-3 gap-6">
            {[
              {
                icon: Target,
                title: "AI Match Scoring",
                desc: "Every job scored 0 to 100 against your resume. Understand exactly where you fit before you apply. No guessing, no wasted afternoons.",
              },
              {
                icon: FileText,
                title: "Resume Tailoring",
                desc: "Paste any job description. Get a version of your resume rewritten to match. ATS-friendly, specific, and grounded in what you actually did.",
              },
              {
                icon: TrendingUp,
                title: "Precision Dashboard",
                desc: "Track your pipeline by match score, not just status. See your top opportunities at a glance and focus your energy where it actually counts.",
              },
            ].map((f, i) => (
              <motion.div key={i} variants={fadeUp} className="border border-border rounded-lg p-6 bg-card hover:border-foreground/20 transition-colors">
                <f.icon className="w-5 h-5 text-accent mb-4" />
                <h3 className="font-semibold text-sm mb-2">{f.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </section>

      {/* How it works */}
      <section className="border-t border-border bg-muted/20">
        <div className="max-w-6xl mx-auto px-6 py-20">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={stagger}
          >
            <motion.h2 variants={fadeUp} className="text-3xl font-bold tracking-tight mb-12">
              Four steps to clarity.
            </motion.h2>
            <motion.div variants={stagger} className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                { step: "01", label: "Upload your resume", desc: "Paste or upload your current resume. We use it as your baseline." },
                { step: "02", label: "Set your target", desc: "Tell us your target role and experience level. That's all we need." },
                { step: "03", label: "Review your matches", desc: "Every job in our database is scored against your profile in real time." },
                { step: "04", label: "Apply with precision", desc: "Use the AI rewriter to tailor your resume to each role before applying." },
              ].map((s, i) => (
                <motion.div key={i} variants={fadeUp}>
                  <p className="text-xs font-mono text-muted-foreground mb-3">{s.step}</p>
                  <h3 className="font-semibold text-sm mb-2">{s.label}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{s.desc}</p>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Why section */}
      <section className="max-w-6xl mx-auto px-6 py-20">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          variants={stagger}
          className="grid lg:grid-cols-2 gap-16 items-center"
        >
          <motion.div variants={fadeUp}>
            <h2 className="text-3xl font-bold tracking-tight mb-6">
              Built for people who do not apply to 200 jobs.
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-8">
              Volume is not a strategy. The engineers and product leaders who land well do not spray applications. They identify five to ten high-fit roles, understand exactly why they are a match, and show up prepared. Orvek Foundry is the system that makes that possible.
            </p>
            <div className="space-y-3">
              {[
                "Know your match score before you apply",
                "Tailor your resume in under two minutes",
                "Focus on roles where you are already strong",
                "No spray-and-pray, no guesswork",
              ].map((point, i) => (
                <div key={i} className="flex items-start gap-3">
                  <CheckCircle2 className="w-4 h-4 text-accent mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-muted-foreground">{point}</span>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div variants={fadeUp} className="space-y-4">
            <div className="bg-card border border-border rounded-lg p-6">
              <div className="flex items-center gap-2 mb-4">
                <Zap className="w-4 h-4 text-accent" />
                <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Match Analysis</span>
              </div>
              <div className="flex items-end gap-3 mb-2">
                <span className="text-4xl font-bold font-mono">91</span>
                <span className="text-sm text-muted-foreground mb-1">/ 100</span>
              </div>
              <p className="text-sm text-foreground font-medium mb-1">Staff Software Engineer at Linear</p>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Strong TypeScript and systems design alignment. Your real-time sync experience maps directly to their core infrastructure needs.
              </p>
            </div>
            <div className="grid grid-cols-3 gap-3 text-center">
              {[
                { label: "Jobs tracked", value: "6" },
                { label: "Avg score", value: "76" },
                { label: "Applied", value: "2" },
              ].map((stat, i) => (
                <div key={i} className="bg-card border border-border rounded-lg p-4">
                  <p className="text-xl font-bold font-mono">{stat.value}</p>
                  <p className="text-xs text-muted-foreground mt-1">{stat.label}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* CTA */}
      <section className="border-t border-border bg-primary text-primary-foreground">
        <div className="max-w-6xl mx-auto px-6 py-16 text-center">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={stagger}
          >
            <motion.h2 variants={fadeUp} className="text-3xl font-bold tracking-tight mb-4">
              Precision over volume.
            </motion.h2>
            <motion.p variants={fadeUp} className="text-primary-foreground/70 mb-8 max-w-md mx-auto">
              Join engineers and product leaders who have stopped applying blindly and started moving with intention.
            </motion.p>
            <motion.div variants={fadeUp}>
              <Link
                href="/auth"
                className="inline-flex items-center gap-2 bg-primary-foreground text-primary px-8 py-3 rounded font-semibold hover:opacity-90 transition-opacity"
                data-testid="button-footer-cta"
              >
                Get started now
                <ArrowRight className="w-4 h-4" />
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <footer className="border-t border-border">
        <div className="max-w-6xl mx-auto px-6 py-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <span className="text-sm text-muted-foreground font-medium">Orvek Foundry</span>
          <div className="flex items-center gap-6 text-xs text-muted-foreground">
            <Link href="/about" className="hover:text-foreground transition-colors">About</Link>
            <Link href="/how-to" className="hover:text-foreground transition-colors">How it works</Link>
            <Link href="/legal" className="hover:text-foreground transition-colors">Legal</Link>
            <Link href="/cookies" className="hover:text-foreground transition-colors">Cookies</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
