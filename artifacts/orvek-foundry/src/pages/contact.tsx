import { motion, type Variants } from "framer-motion";
import { Mail, MessageSquare, Briefcase, Shield } from "lucide-react";
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

const CONTACTS = [
  { icon: MessageSquare, label: "General enquiries", email: "hello@orvekfoundry.com", desc: "Questions about the product, partnerships, or anything else." },
  { icon: Mail, label: "Help & support", email: "help@orvekfoundry.com", desc: "Account issues, billing questions, or anything broken. We respond within one business day." },
  { icon: Briefcase, label: "Press", email: "press@orvekfoundry.com", desc: "Journalists, podcasters, and media. Brand assets available on request." },
  { icon: Shield, label: "Security", email: "security@orvekfoundry.com", desc: "Responsible disclosure of security vulnerabilities. We review all reports within 48 hours." },
];

export default function Contact() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <PublicNav />

      <section className="max-w-3xl mx-auto px-6 pt-12 pb-8">
        <motion.div initial="hidden" animate="show" variants={stagger}>
          <motion.p variants={fadeUp} className="text-xs font-medium text-muted-foreground uppercase tracking-widest mb-3">Contact</motion.p>
          <motion.h1 variants={fadeUp} className="text-4xl font-bold tracking-tight mb-3">Get in touch</motion.h1>
          <motion.p variants={fadeUp} className="text-muted-foreground">We are a small team. Every message goes to a real person and we aim to respond within one business day.</motion.p>
        </motion.div>
      </section>

      <section className="max-w-3xl mx-auto px-6 pb-16">
        <motion.div initial="hidden" animate="show" variants={stagger} className="grid sm:grid-cols-2 gap-4">
          {CONTACTS.map((c, i) => (
            <motion.div key={i} variants={fadeUp} className="border border-border rounded-xl bg-card p-5 hover:border-foreground/20 transition-colors">
              <c.icon className="w-4 h-4 text-accent mb-3" />
              <h3 className="text-sm font-semibold mb-1">{c.label}</h3>
              <p className="text-xs text-muted-foreground leading-relaxed mb-3">{c.desc}</p>
              <a href={`mailto:${c.email}`} className="text-sm text-accent hover:underline font-medium">{c.email}</a>
            </motion.div>
          ))}
        </motion.div>
      </section>

      <PublicFooter />
    </div>
  );
}
