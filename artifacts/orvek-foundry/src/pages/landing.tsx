import { motion, type Variants } from "framer-motion";
import { Link } from "wouter";
import { ArrowRight, CheckCircle2, TrendingUp, Target, FileText, Zap } from "lucide-react";
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

const JOBS_PREVIEW = [
  { title: "Staff Software Engineer", company: "Linear", score: 91 },
  { title: "Principal Engineer, Platform", company: "Vercel", score: 87 },
  { title: "Staff Engineer, Product Infrastructure", company: "Figma", score: 83 },
];

const PARTNERS = [
  "Stripe", "Linear", "Vercel", "Figma", "Notion", "Anthropic",
  "GitHub", "Shopify", "Airbnb", "Datadog", "Cloudflare", "Rippling",
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
      <PublicNav />

      {/* Hero */}
      <section className="max-w-6xl mx-auto px-6 pt-16 pb-14">
        <motion.div initial="hidden" animate="show" variants={stagger}>
          <motion.div variants={fadeUp} className="mb-5">
            <span className="inline-flex items-center gap-2 text-xs font-medium text-accent border border-accent/30 bg-accent/5 px-3 py-1 rounded-full">
              <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
              Intelligent Career System
            </span>
          </motion.div>
          <motion.h1 variants={fadeUp} className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.05] mb-5 max-w-4xl">
            Stop applying<br /><span className="text-accent">blindly.</span>
          </motion.h1>
          <motion.p variants={fadeUp} className="text-lg text-muted-foreground max-w-xl leading-relaxed mb-8">
            Orvek Foundry scores every role against your profile, rewrites your resume for each application, and shows you exactly where you stand before you spend an hour on a cover letter.
          </motion.p>
          <motion.div variants={fadeUp} className="flex flex-col sm:flex-row gap-3">
            <Link href="/auth" className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-2.5 rounded font-medium hover:opacity-90 transition-opacity" data-testid="button-hero-cta">
              Start moving with precision <ArrowRight className="w-4 h-4" />
            </Link>
            <Link href="/how-to" className="inline-flex items-center gap-2 border border-border px-6 py-2.5 rounded font-medium text-muted-foreground hover:text-foreground hover:border-foreground/30 transition-all">
              See how it works
            </Link>
          </motion.div>
        </motion.div>
      </section>

      {/* Partner logos */}
      <section className="border-y border-border bg-muted/30 py-8">
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

      {/* Job preview */}
      <section className="max-w-6xl mx-auto px-6 py-12">
        <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={stagger}>
          <motion.p variants={fadeUp} className="text-xs font-medium text-muted-foreground uppercase tracking-widest mb-5">Your signal, not the noise</motion.p>
          <motion.div variants={stagger} className="space-y-2">
            {JOBS_PREVIEW.map((job, i) => (
              <motion.div key={i} variants={fadeUp} className="flex items-center justify-between bg-card border border-border rounded-lg px-5 py-3.5 hover:border-foreground/20 transition-colors">
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
          <motion.p variants={fadeUp} className="mt-3 text-xs text-muted-foreground">Every role scored. Every move deliberate.</motion.p>
        </motion.div>
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
