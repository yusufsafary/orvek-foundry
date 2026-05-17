import { motion, type Variants } from "framer-motion";
import { Link } from "wouter";
import { MapPin, Clock, ArrowRight } from "lucide-react";
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

const OPENINGS = [
  { title: "Founding Engineer", team: "Engineering", location: "Remote", type: "Full-time", desc: "Own core systems end to end. You will design the match scoring engine, resume tailoring pipeline, and the API contracts that tie them together. We want someone who can go from architecture decision to deployed feature in the same week." },
  { title: "Head of Design", team: "Design", location: "Remote", type: "Full-time", desc: "Define the visual and interaction language of Orvek Foundry. You will own the design system, prototype new features at high fidelity, and make deliberate choices that separate us from generic SaaS tools." },
  { title: "Growth Lead", team: "Growth", location: "Remote", type: "Full-time", desc: "Build the engine that puts Orvek Foundry in front of engineers who need it. Content, community, partnerships — you decide the mix. Data-driven and comfortable operating without a playbook." },
  { title: "AI / ML Engineer", team: "Engineering", location: "Remote", type: "Full-time", desc: "Improve and own the intelligence layer: match scoring accuracy, resume tailoring quality, and the reasoning models behind them. Comfortable with LLM fine-tuning, RAG pipelines, and evaluation frameworks." },
];

const VALUES = [
  { label: "Small team, big scope", desc: "You will own entire domains, not sprints. Every person here has direct influence on the product." },
  { label: "Remote, async first", desc: "We optimize for deep work. Meetings are rare and intentional. Timezones are respected." },
  { label: "Outcome over process", desc: "We care about what ships and who it helps — not standups, story points, or performance theatre." },
  { label: "Honest about what we do not know", desc: "We are building something new. We move fast, we learn, we change course when the data says to." },
];

export default function Careers() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <PublicNav />

      <section className="max-w-4xl mx-auto px-6 pt-12 pb-8">
        <motion.div initial="hidden" animate="show" variants={stagger}>
          <motion.p variants={fadeUp} className="text-xs font-medium text-muted-foreground uppercase tracking-widest mb-3">Careers</motion.p>
          <motion.h1 variants={fadeUp} className="text-4xl font-bold tracking-tight mb-3">Build the future of deliberate hiring.</motion.h1>
          <motion.p variants={fadeUp} className="text-muted-foreground max-w-2xl leading-relaxed">We are a small team with a clear thesis: the best career moves are made with precision, not volume. If that resonates and you want to build the tools that make it possible, we want to talk.</motion.p>
        </motion.div>
      </section>

      <section className="border-t border-border bg-muted/20">
        <div className="max-w-4xl mx-auto px-6 py-10">
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={stagger}>
            <motion.h2 variants={fadeUp} className="text-xl font-bold tracking-tight mb-6">How we work</motion.h2>
            <motion.div variants={stagger} className="grid sm:grid-cols-2 gap-4">
              {VALUES.map((v, i) => (
                <motion.div key={i} variants={fadeUp} className="border border-border rounded-lg p-4 bg-card">
                  <h3 className="text-sm font-semibold mb-1.5">{v.label}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{v.desc}</p>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-6 py-12">
        <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={stagger}>
          <motion.h2 variants={fadeUp} className="text-xl font-bold tracking-tight mb-6">Open roles</motion.h2>
          <motion.div variants={stagger} className="space-y-4">
            {OPENINGS.map((job, i) => (
              <motion.div key={i} variants={fadeUp} className="border border-border rounded-xl bg-card p-5 hover:border-foreground/20 transition-colors group">
                <div className="flex items-start justify-between gap-4 mb-3">
                  <div>
                    <h3 className="text-sm font-semibold mb-1">{job.title}</h3>
                    <div className="flex items-center gap-3 text-xs text-muted-foreground">
                      <span className="bg-accent/8 text-accent border border-accent/20 px-2 py-0.5 rounded-full font-medium">{job.team}</span>
                      <span className="flex items-center gap-1"><MapPin className="w-3 h-3" />{job.location}</span>
                      <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{job.type}</span>
                    </div>
                  </div>
                  <Link href="#" className="flex-shrink-0 text-xs text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1 group-hover:text-accent">
                    Apply <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">{job.desc}</p>
              </motion.div>
            ))}
          </motion.div>

          <motion.div variants={fadeUp} className="mt-8 border border-border rounded-xl bg-muted/40 p-6 text-center">
            <p className="text-sm font-medium mb-1">Do not see a fit?</p>
            <p className="text-sm text-muted-foreground mb-4">We always want to hear from exceptional people, even if there is no open role that matches.</p>
            <a href="mailto:careers@orvekfoundry.com" className="inline-flex items-center gap-1.5 text-sm text-accent hover:opacity-80 transition-opacity font-medium">
              careers@orvekfoundry.com <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </motion.div>
        </motion.div>
      </section>

      <PublicFooter />
    </div>
  );
}
