import { motion, type Variants } from "framer-motion";
import { Link } from "wouter";
import { Target, Zap, CheckCircle2 } from "lucide-react";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45 } },
};
const stagger: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};

export default function About() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <nav className="border-b border-border bg-background/95 sticky top-0 z-50 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">
          <Link href="/" className="font-semibold tracking-tight text-sm">Orvek Foundry</Link>
          <div className="flex items-center gap-3">
            <Link href="/auth" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Sign in</Link>
            <Link href="/auth" className="text-sm bg-primary text-primary-foreground px-4 py-1.5 rounded hover:opacity-90 transition-opacity font-medium">Get access</Link>
          </div>
        </div>
      </nav>

      <section className="max-w-3xl mx-auto px-6 pt-20 pb-16">
        <motion.div initial="hidden" animate="show" variants={stagger}>
          <motion.p variants={fadeUp} className="text-xs font-medium text-muted-foreground uppercase tracking-widest mb-4">About</motion.p>
          <motion.h1 variants={fadeUp} className="text-4xl sm:text-5xl font-bold tracking-tight leading-tight mb-6">
            Built for people who treat their career like a product.
          </motion.h1>
          <motion.p variants={fadeUp} className="text-lg text-muted-foreground leading-relaxed mb-12">
            Most job seekers operate on volume. They send dozens of applications, wait, and wonder. Orvek Foundry was built for the opposite approach — precision over volume, signal over noise.
          </motion.p>
        </motion.div>
      </section>

      <section className="border-t border-border bg-muted/20">
        <div className="max-w-3xl mx-auto px-6 py-16">
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={stagger}>
            <motion.h2 variants={fadeUp} className="text-2xl font-bold tracking-tight mb-8">Why we built this</motion.h2>
            <motion.div variants={stagger} className="space-y-6 text-muted-foreground leading-relaxed">
              <motion.p variants={fadeUp}>
                Engineers and product leaders who land exceptional roles do not apply to 200 jobs. They identify five to ten high-fit opportunities, understand exactly why they are a strong candidate, and show up prepared. The problem is that doing this well — truly understanding your fit for a role — takes significant time and skill.
              </motion.p>
              <motion.p variants={fadeUp}>
                Orvek Foundry is the system that makes it practical. We score every role against your profile, surface the reasoning behind each score, and rewrite your resume for any specific job description in under two minutes. You focus your energy where it actually counts.
              </motion.p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <section className="max-w-3xl mx-auto px-6 py-16">
        <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={stagger}>
          <motion.h2 variants={fadeUp} className="text-2xl font-bold tracking-tight mb-10">Core principles</motion.h2>
          <motion.div variants={stagger} className="grid sm:grid-cols-3 gap-6">
            {[
              { icon: Target, title: "Signal over noise", desc: "Every feature exists to surface relevant information and suppress the irrelevant. We do not optimize for engagement. We optimize for your outcomes." },
              { icon: Zap, title: "Speed without sacrifice", desc: "The best tools are fast. Resume tailoring in two minutes. Match scores in seconds. We believe speed and quality are not opposites." },
              { icon: CheckCircle2, title: "Grounded in what you did", desc: "AI rewrites are grounded in your actual experience — not generic templates. Your accomplishments, reframed for the role. Never invented." },
            ].map((item, i) => (
              <motion.div key={i} variants={fadeUp} className="border border-border rounded-lg p-5 bg-card">
                <item.icon className="w-4 h-4 text-accent mb-3" />
                <h3 className="font-semibold text-sm mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </section>

      <section className="border-t border-border bg-primary text-primary-foreground">
        <div className="max-w-3xl mx-auto px-6 py-12 text-center">
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={stagger}>
            <motion.h2 variants={fadeUp} className="text-2xl font-bold tracking-tight mb-4">Ready to move with precision?</motion.h2>
            <motion.div variants={fadeUp}>
              <Link href="/auth" className="inline-flex items-center gap-2 bg-primary-foreground text-primary px-6 py-2.5 rounded font-semibold hover:opacity-90 transition-opacity text-sm">
                Get started
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <footer className="border-t border-border">
        <div className="max-w-6xl mx-auto px-6 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <span className="text-sm text-muted-foreground">Orvek Foundry</span>
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