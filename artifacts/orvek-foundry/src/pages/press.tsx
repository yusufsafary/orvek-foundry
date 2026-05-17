import { motion, type Variants } from "framer-motion";
import { Download, ArrowRight } from "lucide-react";
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

const FACTS = [
  { label: "Founded", value: "2026" },
  { label: "Headquarters", value: "Remote" },
  { label: "Category", value: "Career intelligence" },
  { label: "Users", value: "Invite-only beta" },
  { label: "Focus", value: "Senior engineers & PMs" },
  { label: "Core insight", value: "Precision over volume" },
];

export default function Press() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <PublicNav />

      <section className="max-w-3xl mx-auto px-6 pt-12 pb-8">
        <motion.div initial="hidden" animate="show" variants={stagger}>
          <motion.p variants={fadeUp} className="text-xs font-medium text-muted-foreground uppercase tracking-widest mb-3">Press</motion.p>
          <motion.h1 variants={fadeUp} className="text-4xl font-bold tracking-tight mb-3">Press & media kit</motion.h1>
          <motion.p variants={fadeUp} className="text-muted-foreground">Resources for journalists and media. For press inquiries, contact <a href="mailto:press@orvekfoundry.com" className="text-accent hover:underline">press@orvekfoundry.com</a>.</motion.p>
        </motion.div>
      </section>

      <section className="max-w-3xl mx-auto px-6 pb-6">
        <motion.div initial="hidden" animate="show" variants={stagger}>
          <motion.h2 variants={fadeUp} className="text-base font-semibold mb-4">Company overview</motion.h2>
          <motion.div variants={fadeUp} className="border border-border rounded-xl bg-card p-5 mb-6">
            <p className="text-sm text-muted-foreground leading-relaxed mb-4">Orvek Foundry is an intelligent career system for engineers and product leaders. It scores every job opportunity against a user's profile, tailors their resume for each specific role, and gives them the signal they need to apply with precision instead of volume.</p>
            <p className="text-sm text-muted-foreground leading-relaxed">The platform was built on the observation that the engineers who land exceptional roles do not apply to more jobs — they apply to better-fit jobs, with better-prepared materials. Orvek Foundry makes that approach accessible to anyone serious about their next career move.</p>
          </motion.div>

          <motion.h2 variants={fadeUp} className="text-base font-semibold mb-4">Key facts</motion.h2>
          <motion.div variants={fadeUp} className="border border-border rounded-xl bg-card overflow-hidden mb-6">
            {FACTS.map((f, i) => (
              <div key={i} className={`flex items-center justify-between px-5 py-3 ${i < FACTS.length - 1 ? "border-b border-border" : ""}`}>
                <span className="text-xs text-muted-foreground">{f.label}</span>
                <span className="text-xs font-medium">{f.value}</span>
              </div>
            ))}
          </motion.div>

          <motion.h2 variants={fadeUp} className="text-base font-semibold mb-4">Boilerplate</motion.h2>
          <motion.div variants={fadeUp} className="border border-border rounded-xl bg-muted/40 p-5 mb-6">
            <p className="text-sm text-muted-foreground leading-relaxed italic">"Orvek Foundry is an intelligent career system that helps engineers and product leaders apply with precision, not volume. The platform scores every job against a user's profile, tailors their resume for each role in minutes, and surfaces the signal they need to focus their energy on the opportunities that actually fit."</p>
          </motion.div>

          <motion.div variants={fadeUp} className="border border-border rounded-xl bg-card p-5 flex items-center justify-between">
            <div>
              <p className="text-sm font-medium mb-0.5">Brand assets</p>
              <p className="text-xs text-muted-foreground">Logo, wordmark, color palette, and usage guidelines</p>
            </div>
            <a href="mailto:press@orvekfoundry.com?subject=Brand%20assets%20request" className="flex items-center gap-1.5 text-sm text-accent hover:opacity-80 transition-opacity font-medium">
              Request <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </motion.div>
        </motion.div>
      </section>

      <PublicFooter />
    </div>
  );
}
