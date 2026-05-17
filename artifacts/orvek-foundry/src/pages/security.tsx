import { motion, type Variants } from "framer-motion";
import { Shield, Lock, Eye, Server } from "lucide-react";
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

const PRACTICES = [
  { icon: Lock, title: "Encryption in transit & at rest", desc: "All data is encrypted over TLS 1.3 in transit. Resume content and profile data are encrypted at rest using AES-256." },
  { icon: Eye, title: "No third-party data sharing", desc: "Your resume and profile data are never shared with employers, recruiters, or third-party marketing platforms. Your data is yours." },
  { icon: Server, title: "Minimal data collection", desc: "We collect only what is necessary to provide the Service. No behavioral tracking, no ad profiling, no cross-site tracking." },
  { icon: Shield, title: "Access control", desc: "All systems require authentication. Internal access to user data is role-gated and logged. We use the principle of least privilege throughout." },
];

export default function Security() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <PublicNav />

      <section className="max-w-3xl mx-auto px-6 pt-12 pb-8">
        <motion.div initial="hidden" animate="show" variants={stagger}>
          <motion.p variants={fadeUp} className="text-xs font-medium text-muted-foreground uppercase tracking-widest mb-3">Security</motion.p>
          <motion.h1 variants={fadeUp} className="text-4xl font-bold tracking-tight mb-3">Security at Orvek Foundry</motion.h1>
          <motion.p variants={fadeUp} className="text-muted-foreground leading-relaxed">Your resume and career data are sensitive. We take that seriously. Here is how we protect it.</motion.p>
        </motion.div>
      </section>

      <section className="max-w-3xl mx-auto px-6 pb-12">
        <motion.div initial="hidden" animate="show" variants={stagger} className="grid sm:grid-cols-2 gap-4 mb-10">
          {PRACTICES.map((p, i) => (
            <motion.div key={i} variants={fadeUp} className="border border-border rounded-xl bg-card p-5">
              <p.icon className="w-4 h-4 text-accent mb-3" />
              <h3 className="text-sm font-semibold mb-1.5">{p.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{p.desc}</p>
            </motion.div>
          ))}
        </motion.div>

        <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp} className="border border-border rounded-xl bg-muted/40 p-5">
          <h3 className="text-sm font-semibold mb-2">Report a vulnerability</h3>
          <p className="text-sm text-muted-foreground leading-relaxed mb-3">If you discover a security issue, please disclose it responsibly. We review all security reports and respond within 48 hours.</p>
          <a href="mailto:security@orvekfoundry.com" className="text-sm text-accent hover:underline font-medium">security@orvekfoundry.com</a>
        </motion.div>
      </section>

      <PublicFooter />
    </div>
  );
}
