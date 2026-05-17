import { motion, type Variants } from "framer-motion";
import { Link } from "wouter";
import { ArrowRight } from "lucide-react";
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

const POSTS = [
  {
    slug: "#",
    tag: "Strategy",
    date: "May 12, 2026",
    title: "Stop applying to 200 jobs. Here is what actually works.",
    excerpt: "Volume is not a strategy. The engineers who land exceptional roles apply to fewer opportunities — and they convert at dramatically higher rates. Here is the data and the method.",
    readTime: "6 min read",
  },
  {
    slug: "#",
    tag: "Resume",
    date: "May 7, 2026",
    title: "The resume signal: how top engineers think about tailoring",
    excerpt: "A one-size-fits-all resume is a signal that you did not do your homework. Here is how to adapt your narrative without losing your voice — and why ATS optimization is only half the story.",
    readTime: "8 min read",
  },
  {
    slug: "#",
    tag: "Hiring",
    date: "Apr 29, 2026",
    title: "ATS scoring demystified: what hiring systems actually measure",
    excerpt: "Most ATS advice on the internet is outdated or wrong. We analyzed patterns across hundreds of job descriptions to understand what modern applicant tracking systems actually penalize.",
    readTime: "5 min read",
  },
  {
    slug: "#",
    tag: "Career",
    date: "Apr 20, 2026",
    title: "Interview pipeline management for senior roles",
    excerpt: "Managing five simultaneous interview processes is a skill in itself. How to coordinate timelines, create competitive tension, and avoid letting a single process define your outcome.",
    readTime: "7 min read",
  },
  {
    slug: "#",
    tag: "Product",
    date: "Apr 11, 2026",
    title: "Why your match score matters more than your intuition",
    excerpt: "We have a systematic bias toward roles that feel familiar. Match scoring surfaces the roles where you are objectively strong — which are often not the ones you would have applied to on instinct.",
    readTime: "4 min read",
  },
  {
    slug: "#",
    tag: "Strategy",
    date: "Apr 3, 2026",
    title: "The two-week job search: a framework for senior engineers",
    excerpt: "A concentrated, deliberate job search beats a prolonged passive one. Here is a framework for compressing your timeline without sacrificing quality of applications or process.",
    readTime: "9 min read",
  },
];

export default function Blog() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <PublicNav />

      <section className="max-w-5xl mx-auto px-6 pt-12 pb-8">
        <motion.div initial="hidden" animate="show" variants={stagger}>
          <motion.p variants={fadeUp} className="text-xs font-medium text-muted-foreground uppercase tracking-widest mb-3">Blog</motion.p>
          <motion.h1 variants={fadeUp} className="text-4xl font-bold tracking-tight mb-3">Career intelligence, written plainly.</motion.h1>
          <motion.p variants={fadeUp} className="text-muted-foreground">No fluff. No generic advice. Just sharp thinking on how senior hires are actually made.</motion.p>
        </motion.div>
      </section>

      <section className="max-w-5xl mx-auto px-6 pb-16">
        <motion.div initial="hidden" animate="show" variants={stagger} className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {POSTS.map((post, i) => (
            <motion.article key={i} variants={fadeUp} className="border border-border rounded-xl bg-card hover:border-foreground/20 transition-colors overflow-hidden group">
              <Link href={post.slug} className="block p-5">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-xs font-medium text-accent bg-accent/8 border border-accent/20 px-2 py-0.5 rounded-full">{post.tag}</span>
                  <span className="text-xs text-muted-foreground">{post.date}</span>
                </div>
                <h2 className="text-sm font-semibold leading-snug mb-2 group-hover:text-accent transition-colors">{post.title}</h2>
                <p className="text-xs text-muted-foreground leading-relaxed mb-4 line-clamp-3">{post.excerpt}</p>
                <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                  <span>{post.readTime}</span>
                  <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                </div>
              </Link>
            </motion.article>
          ))}
        </motion.div>
      </section>

      <PublicFooter />
    </div>
  );
}
