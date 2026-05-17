import { motion, type Variants } from "framer-motion";
import { Link } from "wouter";
import { ChevronDown } from "lucide-react";
import { useState } from "react";
import PublicNav from "@/components/public-nav";
import PublicFooter from "@/components/public-footer";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};
const stagger: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.06 } },
};

const FAQS = [
  {
    category: "Getting started",
    items: [
      { q: "How long does setup take?", a: "Under five minutes. Create an account, paste or upload your resume, set your target role, and you have your first match scores within ten minutes." },
      { q: "What resume formats are supported?", a: "You can paste plain text directly, or upload a PDF or DOCX file. We extract the content automatically. For best results, use a clean, text-based format without heavy tables or graphics." },
      { q: "Can I update my resume after setup?", a: "Yes. Head to Settings at any time to update your resume. All match scores will refresh automatically against your updated profile." },
    ],
  },
  {
    category: "Match scores",
    items: [
      { q: "How accurate are the match scores?", a: "Match scores are calibrated against a combination of keyword alignment, experience depth, and role-level fit. They are a strong signal, not a perfect prediction. Scores above 80 are reliably strong fits; below 50 are typically weak fits. Use them to prioritize, not to disqualify." },
      { q: "Why is my score lower than I expected?", a: "The most common reasons are: (1) your resume uses different terminology than the job description, (2) you are targeting a more senior level than your resume currently supports, or (3) there are relevant skills in your experience that are not reflected in your resume text. Updating your resume often resolves this." },
      { q: "Can I see what is driving my score?", a: "Yes. Each score card includes a breakdown of the key alignment factors and specific gaps. Click into any job from your dashboard to see the full analysis." },
    ],
  },
  {
    category: "Resume tailoring",
    items: [
      { q: "Is the AI-tailored resume safe to submit?", a: "Always review AI output before submitting. The tailoring is grounded in your actual experience — we do not invent accomplishments — but you should confirm the language is accurate and reads naturally in your voice." },
      { q: "How many resumes can I tailor?", a: "There is no limit. You can tailor your resume for every role you apply to." },
      { q: "Will the tailored resume look different each time?", a: "Yes. Each tailored version is optimized for the specific job description. The core accomplishments remain yours; the framing and emphasis shift to match each role's priorities." },
    ],
  },
  {
    category: "Privacy & data",
    items: [
      { q: "Is my resume data shared with employers?", a: "No. Your data is never shared with employers or recruiters. Orvek Foundry is a tool for you — not a sourcing platform for companies." },
      { q: "Can I delete my account and data?", a: "Yes. Go to Settings > Account and select Delete Account. All your data is removed within 30 days. See our Privacy Policy for details." },
      { q: "Is my data used to train AI models?", a: "We do not use your personal resume data to train general-purpose AI models without your explicit consent." },
    ],
  },
];

function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-border last:border-0">
      <button
        className="w-full flex items-center justify-between py-4 text-left gap-4"
        onClick={() => setOpen(!open)}
      >
        <span className="text-sm font-medium">{q}</span>
        <ChevronDown className={`w-4 h-4 text-muted-foreground flex-shrink-0 transition-transform ${open ? "rotate-180" : ""}`} />
      </button>
      {open && (
        <div className="pb-4 text-sm text-muted-foreground leading-relaxed">{a}</div>
      )}
    </div>
  );
}

export default function Help() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <PublicNav />

      <section className="max-w-3xl mx-auto px-6 pt-12 pb-8">
        <motion.div initial="hidden" animate="show" variants={stagger}>
          <motion.p variants={fadeUp} className="text-xs font-medium text-muted-foreground uppercase tracking-widest mb-3">Help & FAQ</motion.p>
          <motion.h1 variants={fadeUp} className="text-4xl font-bold tracking-tight mb-3">Frequently asked questions</motion.h1>
          <motion.p variants={fadeUp} className="text-muted-foreground">Everything you need to know about Orvek Foundry. If you do not see your question here, email us at <a href="mailto:help@orvekfoundry.com" className="text-accent hover:underline">help@orvekfoundry.com</a>.</motion.p>
        </motion.div>
      </section>

      <section className="max-w-3xl mx-auto px-6 pb-16">
        <motion.div initial="hidden" animate="show" variants={stagger} className="space-y-8">
          {FAQS.map((section, i) => (
            <motion.div key={i} variants={fadeUp}>
              <h2 className="text-xs font-semibold text-muted-foreground uppercase tracking-widest mb-1">{section.category}</h2>
              <div className="border border-border rounded-xl bg-card divide-y divide-border px-5">
                {section.items.map((item, j) => (
                  <FAQItem key={j} {...item} />
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp}
          className="mt-10 border border-border rounded-xl bg-muted/40 p-6 text-center"
        >
          <p className="text-sm font-medium mb-1">Still have questions?</p>
          <p className="text-sm text-muted-foreground mb-4">We read every message and aim to respond within one business day.</p>
          <a href="mailto:help@orvekfoundry.com" className="text-sm text-accent hover:underline font-medium">help@orvekfoundry.com</a>
        </motion.div>
      </section>

      <PublicFooter />
    </div>
  );
}
