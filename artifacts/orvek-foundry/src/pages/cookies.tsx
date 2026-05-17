import { motion, type Variants } from "framer-motion";
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

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <motion.div variants={fadeUp} className="mb-8">
      <h2 className="text-base font-semibold tracking-tight mb-2">{title}</h2>
      <div className="text-sm text-muted-foreground leading-relaxed space-y-2">{children}</div>
    </motion.div>
  );
}

const COOKIE_TYPES = [
  {
    name: "Essential cookies",
    purpose: "Required for the Service to function. These include session authentication tokens and security cookies. They cannot be disabled.",
    examples: "Session token, CSRF token",
    required: true,
  },
  {
    name: "Preference cookies",
    purpose: "Remember your settings across visits, such as display preferences or last-used filters.",
    examples: "Theme preference, dashboard layout",
    required: false,
  },
  {
    name: "Analytics cookies",
    purpose: "Help us understand how users interact with the Service so we can improve it. All data is aggregated and anonymous — we do not track individuals.",
    examples: "Page views, feature engagement, session duration",
    required: false,
  },
];

export default function Cookies() {
  const updated = "May 17, 2026";
  return (
    <div className="min-h-screen bg-background text-foreground">
      <PublicNav />

      <section className="max-w-2xl mx-auto px-6 pt-12 pb-4">
        <motion.div initial="hidden" animate="show" variants={stagger}>
          <motion.p variants={fadeUp} className="text-xs font-medium text-muted-foreground uppercase tracking-widest mb-3">Cookies</motion.p>
          <motion.h1 variants={fadeUp} className="text-3xl font-bold tracking-tight mb-2">Cookie Policy</motion.h1>
          <motion.p variants={fadeUp} className="text-xs text-muted-foreground mb-8">Last updated: {updated}</motion.p>
        </motion.div>
      </section>

      <section className="max-w-2xl mx-auto px-6 pb-16">
        <motion.div initial="hidden" animate="show" variants={stagger}>

          <Section title="What are cookies?">
            <p>Cookies are small text files placed on your device by websites you visit. They are widely used to make websites work efficiently and to provide reporting information. Orvek Foundry uses cookies to keep you signed in, remember your preferences, and understand how the Service is used.</p>
          </Section>

          <Section title="How we use cookies">
            <p>We use cookies for three purposes: keeping your session secure, remembering your preferences, and understanding aggregate usage patterns. We do not use cookies to track you across other websites or to serve advertising.</p>
          </Section>

          <motion.div variants={fadeUp} className="mb-8">
            <h2 className="text-base font-semibold tracking-tight mb-3">Types of cookies we use</h2>
            <div className="space-y-3">
              {COOKIE_TYPES.map((ct, i) => (
                <div key={i} className="border border-border rounded-lg p-4 bg-card">
                  <div className="flex items-start justify-between gap-3 mb-1.5">
                    <h3 className="text-sm font-semibold">{ct.name}</h3>
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium flex-shrink-0 ${ct.required ? "bg-accent/10 text-accent" : "bg-muted text-muted-foreground"}`}>
                      {ct.required ? "Required" : "Optional"}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground mb-1.5">{ct.purpose}</p>
                  <p className="text-xs text-muted-foreground/70">Examples: {ct.examples}</p>
                </div>
              ))}
            </div>
          </motion.div>

          <Section title="Managing cookies">
            <p>You can control optional cookies through your browser settings. Most browsers allow you to view, delete, and block cookies from specific websites. Note that disabling essential cookies will prevent you from signing in and using the Service.</p>
            <ul className="list-none space-y-1 mt-2">
              {[
                "Chrome: Settings > Privacy and security > Cookies",
                "Firefox: Settings > Privacy & Security > Cookies",
                "Safari: Preferences > Privacy > Manage Website Data",
                "Edge: Settings > Cookies and site permissions",
              ].map((item, i) => (
                <li key={i} className="text-xs font-mono bg-muted/60 px-3 py-1.5 rounded">{item}</li>
              ))}
            </ul>
          </Section>

          <Section title="Third-party cookies">
            <p>We use a small number of third-party services that may set their own cookies (such as analytics providers). These services are bound by their own privacy policies and do not receive personally identifiable information from us.</p>
          </Section>

          <Section title="Changes to this policy">
            <p>We may update this Cookie Policy as the Service evolves. We will notify users of significant changes. Continued use of the Service constitutes acceptance of the updated policy.</p>
          </Section>

          <Section title="Contact">
            <p>Questions about cookies? Email us at privacy@orvekfoundry.com. We aim to respond within five business days.</p>
          </Section>

        </motion.div>
      </section>

      <PublicFooter />
    </div>
  );
}
