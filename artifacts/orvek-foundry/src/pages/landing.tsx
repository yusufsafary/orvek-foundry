import { useState, useEffect, useRef } from "react";
import { motion, type Variants, AnimatePresence } from "framer-motion";
import { Link } from "wouter";
import {
  ArrowRight, CheckCircle2, TrendingUp, Target, FileText, Zap,
  Search, Bell, User, CheckCircle, AlertCircle, BarChart2,
  ChevronDown, ChevronUp, Activity, Clock, Sparkles,
} from "lucide-react";
import PublicNav from "@/components/public-nav";
import PublicFooter from "@/components/public-footer";

/* ─── animation variants ─── */
const fadeUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45 } },
};
const stagger: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};

/* ─── data ─── */
const SOCIAL_PROOF = [
  { value: 4200, suffix: "+", label: "Engineers onboarded" },
  { value: 89,   suffix: "%", label: "Avg match score accuracy" },
  { value: 3,    suffix: "×", label: "More interviews vs blind applying" },
  { value: 8,    suffix: "min", label: "Avg time to tailor a resume" },
];

function PartnerLogos() {
  const logos: { name: string; svg: React.ReactNode }[] = [
    {
      name: "Stripe",
      svg: (
        <svg viewBox="0 0 60 25" className="h-5 w-auto" fill="currentColor">
          <path d="M59.64 14.28h-8.06c.19 1.93 1.6 2.55 3.2 2.55 1.64 0 2.96-.37 4.05-.95v3.32a8.33 8.33 0 0 1-4.56 1.1c-4.01 0-6.83-2.5-6.83-7.48 0-4.19 2.39-7.52 6.3-7.52 3.92 0 5.96 3.28 5.96 7.5 0 .4-.04 1.26-.06 1.48zm-5.92-5.62c-1.03 0-2.17.73-2.17 2.58h4.23c0-1.85-1.07-2.58-2.06-2.58zM40.95 20.3c-1.44 0-2.32-.6-2.9-1.04l-.02 4.63-4.45.94V5.2h3.96l.1 1.05c.56-.69 1.63-1.29 3.1-1.29 2.78 0 5.37 2.43 5.37 7.58 0 5.37-2.5 7.76-5.16 7.76zm-.86-11.45c-.94 0-1.54.34-1.96.81l.02 6.12c.4.44.98.78 1.94.78 1.52 0 2.54-1.65 2.54-3.87 0-2.15-1.04-3.84-2.54-3.84zM28.24 5.02c1.44 0 2.35 1 2.35 2.43 0 1.44-.91 2.43-2.35 2.43-1.43 0-2.35-.99-2.35-2.43 0-1.43.92-2.43 2.35-2.43zm2.22 14.7H26V5.35h4.46V19.72zm-6.67 0H19.3V11.3c0-1.4-.5-2.1-1.54-2.1-1.06 0-1.58.7-1.58 2.1v8.42H11.7V5.35h4.37l.07 1.16c.57-.83 1.6-1.4 3-1.4 2.62 0 4.65 1.62 4.65 5.35v9.26zM7.22 19.72H2.77V5.35H7.22V19.72zM4.99 3.4C3.55 3.4 2.5 2.38 2.5.97 2.5-.43 3.55-1.45 4.99-1.45c1.44 0 2.49 1.02 2.49 2.42C7.48 2.38 6.43 3.4 4.99 3.4z"/>
        </svg>
      ),
    },
    {
      name: "Linear",
      svg: (
        <svg viewBox="0 0 100 100" className="h-5 w-5" fill="currentColor">
          <path d="M1.22541 61.5228c-.2225-.9485.90748-1.5459 1.59306-.8604L39.0619 97.1921c.6856.6856.0881 1.8183-.8604 1.5958C20.0117 94.4522 5.54765 79.9882 1.22541 61.5228zM.00189135 46.8891c-.01764375.2833.08887635.5599.28957535.7606L52.3503 99.7085c.2007.2007.4773.3072.7606.2896 2.3692-.1476 4.6938-.46 6.9624-.9259.7645-.157 1.0301-1.0963.4782-1.6481L2.57595 39.4485c-.55186-.5519-1.49117-.2863-1.648174.4782-.465974 2.2686-.779338 4.5932-.926915 6.9624zM4.21093 29.7054c-.16649.3738-.08169.8106.20765 1.1l64.77602 64.776c.2894.2894.7262.3742 1.1.2077 1.7861-.7956 3.5171-1.6927 5.1855-2.684.5521-.328.6373-1.0867.1832-1.5407L7.89459 24.5199c-.45408-.4541-1.21271-.3689-1.54074.1832-.99132 1.6684-1.88843 3.3994-2.68392 5.1823zM12.6587 18.074c-.3701-.3701-.393-.9637-.0443-1.3541C21.7795 6.45931 35.1114 0 49.9519 0 77.5927 0 100 22.4073 100 50.0481c0 14.8405-6.4593 28.1724-16.7199 37.3375-.3904.3487-.984.3258-1.3541-.0443L12.6587 18.074z"/>
        </svg>
      ),
    },
    {
      name: "Vercel",
      svg: (
        <svg viewBox="0 0 4438 3752" className="h-5 w-auto" fill="currentColor">
          <path d="M2219 0L4438 3752H0L2219 0z"/>
        </svg>
      ),
    },
    {
      name: "Figma",
      svg: (
        <svg viewBox="0 0 38 57" className="h-6 w-auto" fill="currentColor">
          <path d="M19 28.5a9.5 9.5 0 1 1 19 0 9.5 9.5 0 0 1-19 0z"/>
          <path d="M0 47.5A9.5 9.5 0 0 1 9.5 38H19v9.5a9.5 9.5 0 0 1-19 0z"/>
          <path d="M19 0v19h9.5a9.5 9.5 0 0 0 0-19H19z"/>
          <path d="M0 9.5A9.5 9.5 0 0 0 9.5 19H19V0H9.5A9.5 9.5 0 0 0 0 9.5z"/>
          <path d="M0 28.5A9.5 9.5 0 0 0 9.5 38H19V19H9.5A9.5 9.5 0 0 0 0 28.5z"/>
        </svg>
      ),
    },
    {
      name: "Notion",
      svg: (
        <svg viewBox="0 0 100 100" className="h-5 w-5" fill="currentColor">
          <path d="M6.017 4.313l55.333-4.087c6.797-.583 8.543-.19 12.817 2.917l17.663 12.443c2.913 2.14 3.883 2.723 3.883 5.053v68.243c0 4.277-1.553 6.807-6.99 7.193L24.467 99.967c-4.08.193-6.023-.39-8.16-3.113L3.507 79.913C1.173 76.80 0 74.077 0 70.983V11.113c0-3.497 1.553-6.413 6.017-6.8z"/>
          <path fill="white" d="M61.35.227L6.017 4.313C1.553 4.7 0 7.617 0 11.113v59.87c0 3.094 1.173 5.817 3.507 8.93l12.8 16.943c2.137 2.723 4.08 3.307 8.16 3.113l64.257-3.89c5.433-.39 6.99-2.917 6.99-7.193V17.64c0-2.21-.873-2.847-3.3-4.617L74.167 3.143C69.893.033 68.147-.36 61.35.227zm-6.26 20.943l-30.987 2.04v-.003c-1.46.097-1.75-.973-.587-1.557l6.443-4.083c1.167-.777 3.307-.97 4.863-1.067l28.847-1.94c2.527-.193 3.503.58 2.527 1.75l-5.47 3.887c-.777.583-2.333.973-5.633.973zM17.607 25.99v53.607c0 2.917-.973 4.277-3.11 4.473-2.14.193-3.303-1.167-3.303-4.083V26.57c0-2.917 1.163-4.473 3.5-4.277 2.333.197 2.913 1.75 2.913 3.697zm65.08 3.11l-50.66 3.303c-2.527.193-3.307-.973-3.307-2.917v-2.527c0-2.14.973-3.307 3.5-3.5l50.66-3.11c2.333-.193 3.5.97 3.5 2.917v2.527c0 2.14-.97 3.307-3.693 3.307zm-50.66 14.607l50.66-3.11c2.723-.193 3.693.97 3.693 3.11v2.527c0 2.14-.97 3.11-3.5 3.303l-50.66 3.11c-2.527.193-3.5-.97-3.5-3.11v-2.527c0-2.14.973-3.11 3.307-3.303zm0 18.48l50.66-3.11c2.723-.193 3.693.97 3.693 3.11v2.527c0 2.14-.97 3.11-3.5 3.303l-50.66 3.11c-2.527.193-3.5-.97-3.5-3.11v-2.527c0-2.14.973-3.11 3.307-3.303z"/>
        </svg>
      ),
    },
    {
      name: "Anthropic",
      svg: (
        <svg viewBox="0 0 241 64" className="h-4 w-auto" fill="currentColor">
          <path d="M137.197 0h-19.737L89.936 64h18.401l5.461-15.112h29.538L148.797 64h18.401L137.197 0zm-18.004 34.624L129.329 7.44l10.136 27.184h-20.272zM55.498 0H0v64h17.59V41.11h37.908c14.906 0 23.77-9.136 23.77-20.706C79.268 8.834 70.404 0 55.498 0zm-2.043 26.845H17.59V14.154h35.865c5.097 0 8.222 2.87 8.222 6.346 0 3.476-3.125 6.345-8.222 6.345zM88.558 64h17.59V0H88.558v64zm93.886 0h17.59V14.154H241V0h-99.99v14.154h41.434V64z"/>
        </svg>
      ),
    },
    {
      name: "GitHub",
      svg: (
        <svg viewBox="0 0 98 96" className="h-5 w-5" fill="currentColor">
          <path d="M48.854 0C21.839 0 0 22 0 49.217c0 21.756 13.993 40.172 33.405 46.69 2.427.49 3.316-1.059 3.316-2.362 0-1.141-.08-5.052-.08-9.127-13.59 2.934-16.42-5.867-16.42-5.867-2.184-5.704-5.42-7.17-5.42-7.17-4.448-3.015.324-3.015.324-3.015 4.934.326 7.523 5.052 7.523 5.052 4.367 7.496 11.404 5.378 14.235 4.074.404-3.178 1.699-5.378 3.074-6.6-10.839-1.141-22.243-5.378-22.243-24.283 0-5.378 1.94-9.778 5.014-13.2-.485-1.222-2.184-6.275.486-13.038 0 0 4.125-1.304 13.426 5.052a46.97 46.97 0 0 1 12.214-1.63c4.125 0 8.33.571 12.213 1.63 9.302-6.356 13.427-5.052 13.427-5.052 2.67 6.763.97 11.816.485 13.038 3.155 3.422 5.015 7.822 5.015 13.2 0 18.905-11.404 23.06-22.324 24.283 1.78 1.548 3.316 4.481 3.316 9.126 0 6.6-.08 11.897-.08 13.526 0 1.304.89 2.853 3.316 2.364 19.412-6.52 33.405-24.935 33.405-46.691C97.707 22 75.788 0 48.854 0z"/>
        </svg>
      ),
    },
    {
      name: "Shopify",
      svg: (
        <svg viewBox="0 0 109.5 124.5" className="h-5 w-auto" fill="currentColor">
          <path d="M74.7 14.8s-.3 0-.8.2c-.5-1.4-1.4-2.7-2.5-3.8-1.8-1.9-4.3-2.9-6.8-2.7-.2-.3-.4-.5-.6-.8-1.2-1.4-3-2.1-5.3-2-4.1.1-8.2 3.1-11.5 8.4-2.3 3.7-4.1 8.3-4.6 11.9l-12.4 3.8c0 .1 0 .1 0 0l-3.8 1.2-3.7 112.5h87.1L108 31.4 74.7 14.8zm-20.4 7.4c-.4 2.9-1.1 5.8-2 8.5l-10 3.1c1.9-7.3 5.5-10.9 7.8-12.2.5-.4 1.1-.7 1.7-.9.2-.3.4-.6.6-.8.6-.7 1.3-1.1 2-1.2-.1 1.1-.1 2.2-.1 3.5zm7.1 4.4l-13.9 4.3c1.5-5.7 4.2-9 6.5-10.4-.1 1.6-.1 3.3.3 5 .3 1.1.7 1.9 1.1 2.7 1.6-2.4 3.9-3.2 6-3.3v1.7zm-1.5-11.5c.1-.1.2-.1.3-.2-.2.1-.3.1-.3.2z"/>
        </svg>
      ),
    },
    {
      name: "Airbnb",
      svg: (
        <svg viewBox="0 0 1000 1000" className="h-5 w-5" fill="currentColor">
          <path d="M499.3 736.7c-51-64-81-120.1-91-168.1-10-39-6-70 11-93 18-27 45-40 80-40s62 13 80 40c17 23 21 54 11 93-11 49-41 105-91 168.1zm362.2 43c-7 47-39 86-83 105-85 37-169.1-22-241.1-102 119.1-149.1 141.1-265.1 90-340.2-30-43-73-64-128-64-111 0-172.1 94-148.1 203.1 14 59 51 126.1 108 200.1-37 41-75 72-114.1 93-34 18-69 26-103 23-46-4-86-28-112-65-26-37-33-83-19-127l6-18L339.4 98h66l86 215.1h204.1L781.7 98h66l152.1 552.7 6 18c14 44 8 90-18 127-10 15-22 28-37 38-7 5-15 9-22 13zm-576.2 79c28 0 59-7 91-23 42-20 84-53 126-97 73 82 155.1 144.1 241.1 144.1 28 0 57-6 85-19 59-26 101-79 111-139l3-19L783.7 17H659.6L573.5 232H425.4L339.4 17H215.3L7.1 823.7l3 19c10 60 52 113 111 139 28 13 57 19 85 19l79-3z"/>
        </svg>
      ),
    },
    {
      name: "Datadog",
      svg: (
        <svg viewBox="0 0 248 248" className="h-5 w-5" fill="currentColor">
          <path d="M236.67 181.72c-.08-.19-8.58-19.12-16.17-30.18l-.14-.2a130.47 130.47 0 0 0 4.92-15.81c8.43-38.61-.23-77.54-23.94-106.8C178.56 0 144.51 0 143.06 0h-.25a1.56 1.56 0 0 0-1.56 1.43L139.08 26a147.4 147.4 0 0 0-26.49-4.34l-1.42-25.14a1.56 1.56 0 0 0-1.56-1.49H109c-1.53 0-37.15.15-59.5 28.25a105.84 105.84 0 0 0-21.33 80.62 123 123 0 0 0 5.6 23.55c-6.07 9.33-15.79 30.05-15.88 30.24a1.56 1.56 0 0 0 .11 1.54l18.71 27.15a1.56 1.56 0 0 0 2.43.14l13.36-15.78a122.42 122.42 0 0 0 5.3 3.54l-8.75 18.93a1.56 1.56 0 0 0 .59 2l29.52 17.29a1.56 1.56 0 0 0 2.15-.7l8-17.33a140.35 140.35 0 0 0 14.82 1.63l1.83 18.88a1.56 1.56 0 0 0 1.55 1.41h.15l33.87-3.3a1.56 1.56 0 0 0 1.41-1.55v-.14l-1.69-18.88a139.48 139.48 0 0 0 14.21-3.26l8.53 16.71a1.56 1.56 0 0 0 2.05.66l30.76-15.51a1.56 1.56 0 0 0 .69-2l-8.16-18.34a121.6 121.6 0 0 0 4.66-3.57l13.87 15.35a1.56 1.56 0 0 0 2.43-.18l18.16-27.52a1.56 1.56 0 0 0 .09-1.51z"/>
        </svg>
      ),
    },
    {
      name: "Cloudflare",
      svg: (
        <svg viewBox="0 0 109 44" className="h-4 w-auto" fill="currentColor">
          <path d="M86.5 17.2c-.4 0-.8 0-1.3.1-.1-.5-.2-1.1-.4-1.6-1.5-5.8-6.8-10.1-13.1-10.1-5.2 0-9.7 2.8-12.2 7-1.3-.9-2.8-1.4-4.5-1.4-4.1 0-7.5 3.4-7.5 7.5 0 .2 0 .4.1.6C43 19.8 39 24.3 39 29.7c0 5.8 4.7 10.5 10.5 10.5h37c5.2 0 9.5-4.3 9.5-9.5-.1-5.3-4.3-9.5-9.5-9.5z"/>
          <path fill="white" d="M71.4 30.3l.2-.8c.1-.3 0-.7-.2-.9-.2-.2-.5-.4-.8-.4l-16-.1c-.2 0-.4-.1-.5-.3-.1-.2-.1-.4.1-.6l.3-.5c.4-.7 1.2-1.2 2.1-1.2l4.5.1c.3 0 .6-.1.8-.4.2-.2.3-.5.2-.8l-.1-.4c-.5-2.5-2.7-4.4-5.3-4.4-2 0-3.8 1.1-4.8 2.8-.4-.6-1.1-1-1.9-1-1.3 0-2.4 1.1-2.4 2.4 0 .1 0 .1 0 .2-1.8.4-3.1 2-3.1 3.9 0 2.2 1.8 4 4 4h21.9c.3 0 .5-.1.7-.3.1-.2.2-.5.1-.7l-.8-.6z"/>
        </svg>
      ),
    },
    {
      name: "Rippling",
      svg: (
        <svg viewBox="0 0 200 40" className="h-4 w-auto" fill="currentColor">
          <text x="0" y="32" fontSize="36" fontWeight="700" fontFamily="system-ui, sans-serif">Rippling</text>
        </svg>
      ),
    },
  ];

  return (
    <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-6 gap-px bg-border/40 border border-border/40 rounded-xl overflow-hidden">
      {logos.map(({ name, svg }) => (
        <div
          key={name}
          className="flex flex-col items-center justify-center gap-1.5 bg-background py-5 px-4 hover:bg-muted/40 transition-colors group"
        >
          <div className="text-muted-foreground/50 group-hover:text-muted-foreground transition-colors flex items-center justify-center h-6">
            {svg}
          </div>
          <span className="text-[9px] font-medium text-muted-foreground/40 group-hover:text-muted-foreground/60 transition-colors tracking-wide uppercase">{name}</span>
        </div>
      ))}
    </div>
  );
}

const DEMO_JOBS = [
  {
    id: 1,
    title: "Staff Software Engineer",
    company: "Linear",
    location: "San Francisco, CA",
    type: "Full-time",
    score: 91,
    salary: "$220k–$280k",
    posted: "2 days ago",
    skills: [
      { name: "TypeScript", match: true, yours: 95, required: 80 },
      { name: "Systems Design", match: true, yours: 88, required: 85 },
      { name: "Real-time Sync", match: true, yours: 82, required: 75 },
      { name: "React", match: true, yours: 90, required: 70 },
      { name: "Rust", match: false, yours: 10, required: 60 },
    ],
    summary: "Strong TypeScript and systems design alignment. Your real-time sync experience maps directly to their core infrastructure needs.",
    gap: "Rust experience preferred. Not a hard blocker — mention your C++ systems background.",
    tag: "Top Match",
    tagColor: "text-emerald-700 bg-emerald-50 border-emerald-200",
  },
  {
    id: 2,
    title: "Principal Engineer, Platform",
    company: "Vercel",
    location: "Remote",
    type: "Full-time",
    score: 87,
    salary: "$240k–$310k",
    posted: "1 day ago",
    skills: [
      { name: "Node.js", match: true, yours: 92, required: 80 },
      { name: "Edge Computing", match: true, yours: 78, required: 70 },
      { name: "CI/CD", match: true, yours: 85, required: 75 },
      { name: "Go", match: false, yours: 20, required: 65 },
      { name: "Kubernetes", match: false, yours: 35, required: 70 },
    ],
    summary: "Your deployment pipeline and edge computing experience aligns well. Node.js depth is a clear match for their platform work.",
    gap: "Go and Kubernetes are differentiators. Invest 4–6 weeks here for a stronger application.",
    tag: "Strong Fit",
    tagColor: "text-emerald-700 bg-emerald-50 border-emerald-200",
  },
  {
    id: 3,
    title: "Staff Engineer, Product Infra",
    company: "Figma",
    location: "New York, NY",
    type: "Full-time",
    score: 83,
    salary: "$200k–$260k",
    posted: "3 days ago",
    skills: [
      { name: "React", match: true, yours: 90, required: 80 },
      { name: "Performance", match: true, yours: 80, required: 75 },
      { name: "Cross-platform", match: true, yours: 72, required: 65 },
      { name: "C++", match: false, yours: 25, required: 70 },
      { name: "WebAssembly", match: false, yours: 15, required: 60 },
    ],
    summary: "Frontend performance and cross-platform strength is solid. Deep C++ expected for sub-teams working on the editor core.",
    gap: "C++ and WebAssembly are hard differentiators. Focus on teams not working on the core engine.",
    tag: "Good Fit",
    tagColor: "text-sky-700 bg-sky-50 border-sky-200",
  },
  {
    id: 4,
    title: "Senior Engineer, Payments",
    company: "Stripe",
    location: "Remote",
    type: "Full-time",
    score: 74,
    salary: "$190k–$250k",
    posted: "5 days ago",
    skills: [
      { name: "Distributed Systems", match: true, yours: 85, required: 80 },
      { name: "API Design", match: true, yours: 88, required: 75 },
      { name: "PostgreSQL", match: true, yours: 76, required: 70 },
      { name: "Ruby", match: false, yours: 15, required: 70 },
      { name: "Financial Systems", match: false, yours: 20, required: 75 },
    ],
    summary: "Distributed systems and API design are strong signals. Ruby and fintech domain experience are meaningful gaps here.",
    gap: "Ruby proficiency and financial domain context are both required. Consider if this is worth the ramp time.",
    tag: "Worth Considering",
    tagColor: "text-amber-700 bg-amber-50 border-amber-200",
  },
];

const RESUME_SCRIPT = [
  { delay: 0,    text: "$ orvek analyze --job='Staff SWE @ Linear'", type: "cmd" },
  { delay: 600,  text: "Scanning resume against job requirements...", type: "info" },
  { delay: 1300, text: "TypeScript (5 yrs) ········ Required: 4 yrs ✓ MATCH", type: "match" },
  { delay: 2000, text: "Systems Design ············ Required: Senior ✓ MATCH", type: "match" },
  { delay: 2600, text: "Real-time Sync ············ 2 projects detected ✓ MATCH", type: "match" },
  { delay: 3200, text: "React ····················· Required: 3 yrs ✓ MATCH", type: "match" },
  { delay: 3800, text: "Rust ······················ Not found in profile △ GAP", type: "gap" },
  { delay: 4500, text: "", type: "blank" },
  { delay: 4600, text: "$ orvek rewrite --tailor --ats-optimized", type: "cmd" },
  { delay: 5300, text: "Generating tailored resume bullets...", type: "info" },
  { delay: 6100, text: "→ 'Led real-time sync architecture serving 4M+ active users'", type: "out" },
  { delay: 6900, text: "→ 'Reduced API p99 latency 38% via query batching & caching'", type: "out" },
  { delay: 7600, text: "→ 'Designed event-sourcing system handling 50K writes/sec'", type: "out" },
  { delay: 8300, text: "", type: "blank" },
  { delay: 8400, text: "ATS Score: 96/100   Match Score: 91/100   Time saved: ~2h", type: "result" },
  { delay: 8900, text: "✓ Resume ready to download", type: "done" },
];

const PIPELINE = [
  { title: "Staff SWE", company: "Linear", score: 91, status: "Interview", statusColor: "text-emerald-600 bg-emerald-50 border-emerald-200", activity: "Interview scheduled for Tue 10am" },
  { title: "Principal Eng", company: "Vercel", score: 87, status: "Applied", statusColor: "text-blue-600 bg-blue-50 border-blue-200", activity: "Application viewed 3× by recruiter" },
  { title: "Staff Eng", company: "Figma", score: 83, status: "Applied", statusColor: "text-blue-600 bg-blue-50 border-blue-200", activity: "Under review — Day 3" },
  { title: "Senior Eng", company: "Stripe", score: 74, status: "Drafting", statusColor: "text-amber-600 bg-amber-50 border-amber-200", activity: "Resume tailoring in progress" },
];

const ACTIVITY_FEED = [
  { icon: "🔍", text: "New match: Staff SWE @ Notion (score 79)", time: "12m ago" },
  { icon: "👁", text: "Linear recruiter viewed your application", time: "1h ago" },
  { icon: "✅", text: "Resume tailored for Vercel — ATS 94/100", time: "3h ago" },
  { icon: "📊", text: "Weekly report: avg score up 4 pts", time: "Yesterday" },
];

/* ─── small helpers ─── */
function ScoreBadge({ score }: { score: number }) {
  const c =
    score >= 80 ? "text-emerald-700 bg-emerald-50 border-emerald-200"
    : score >= 65 ? "text-amber-700 bg-amber-50 border-amber-200"
    : "text-red-700 bg-red-50 border-red-200";
  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded border text-xs font-mono font-semibold ${c}`}>
      {score}
    </span>
  );
}

function AnimatedCounter({ target, duration = 900 }: { target: number; duration?: number }) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    setVal(0);
    let start: number | null = null;
    const tick = (ts: number) => {
      if (!start) start = ts;
      const p = Math.min((ts - start) / duration, 1);
      setVal(Math.floor(p * target));
      if (p < 1) requestAnimationFrame(tick);
    };
    const id = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(id);
  }, [target, duration]);
  return <>{val}</>;
}

function useTypewriter(text: string, speed = 55, startDelay = 0) {
  const [displayed, setDisplayed] = useState("");
  const [done, setDone] = useState(false);
  useEffect(() => {
    setDisplayed("");
    setDone(false);
    let i = 0;
    const start = setTimeout(() => {
      const id = setInterval(() => {
        i++;
        setDisplayed(text.slice(0, i));
        if (i >= text.length) { clearInterval(id); setDone(true); }
      }, speed);
      return () => clearInterval(id);
    }, startDelay);
    return () => clearTimeout(start);
  }, [text, speed, startDelay]);
  return { displayed, done };
}

/* ─── Typewriter headline ─── */
function HeroHeadline() {
  const line1 = "Stop applying";
  const { displayed: d1, done: done1 } = useTypewriter(line1, 60, 300);
  const { displayed: d2, done: done2 } = useTypewriter("blindly.", 75, done1 ? 100 : 99999);
  return (
    <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.05] mb-5 max-w-4xl min-h-[1.1em]">
      <span>{d1}</span>
      {done1 && <><br /><span className="text-accent">{d2}</span></>}
      {(!done2 || !done1) && (
        <motion.span
          animate={{ opacity: [1, 0] }}
          transition={{ duration: 0.5, repeat: Infinity }}
          className="inline-block w-0.5 h-[0.85em] bg-current ml-1 align-middle"
        />
      )}
    </h1>
  );
}

/* ─── DEMO SHELL ─── */
function InteractiveDemo() {
  const [tab, setTab] = useState<"jobs" | "resume" | "dashboard">("jobs");
  const [selectedJob, setSelectedJob] = useState(DEMO_JOBS[0]);
  const [search, setSearch] = useState("");
  const [minScore, setMinScore] = useState(0);
  const [terminalLines, setTerminalLines] = useState(0);
  const [running, setRunning] = useState(false);
  const [expandedRow, setExpandedRow] = useState<number | null>(null);

  const filtered = DEMO_JOBS.filter(
    (j) =>
      j.score >= minScore &&
      (j.title.toLowerCase().includes(search.toLowerCase()) ||
        j.company.toLowerCase().includes(search.toLowerCase()))
  );

  const runAnalysis = () => {
    if (running) return;
    setTerminalLines(0);
    setRunning(true);
    RESUME_SCRIPT.forEach((_, i) => {
      setTimeout(() => setTerminalLines(i + 1), RESUME_SCRIPT[i].delay);
    });
    const last = RESUME_SCRIPT[RESUME_SCRIPT.length - 1];
    setTimeout(() => setRunning(false), last.delay + 600);
  };

  useEffect(() => { if (tab === "resume") { setTerminalLines(0); setRunning(false); } }, [tab]);

  const TABS = [
    { key: "jobs" as const, label: "Job Matches", icon: Search },
    { key: "resume" as const, label: "Resume AI", icon: Sparkles },
    { key: "dashboard" as const, label: "Dashboard", icon: BarChart2 },
  ];

  return (
    <div className="w-full max-w-5xl mx-auto">
      {/* Browser chrome frame */}
      <div className="rounded-2xl border border-border bg-card shadow-2xl overflow-hidden">

        {/* Window titlebar */}
        <div className="flex items-center gap-3 px-4 py-3 bg-muted/70 border-b border-border select-none">
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded-full bg-red-400/80 hover:bg-red-500 transition-colors cursor-default" />
            <div className="w-3 h-3 rounded-full bg-amber-400/80 hover:bg-amber-500 transition-colors cursor-default" />
            <div className="w-3 h-3 rounded-full bg-emerald-400/80 hover:bg-emerald-500 transition-colors cursor-default" />
          </div>
          <div className="flex-1 flex justify-center">
            <div className="flex items-center gap-2 bg-background/70 border border-border/60 rounded-md px-3 py-1 text-xs text-muted-foreground font-mono">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 flex-shrink-0" />
              app.ovrekfoundry.com
            </div>
          </div>
          <div className="flex items-center gap-3 text-muted-foreground/50">
            <Bell className="w-3.5 h-3.5" />
            <div className="w-6 h-6 rounded-full bg-accent/20 border border-accent/30 flex items-center justify-center">
              <User className="w-3 h-3 text-accent" />
            </div>
          </div>
        </div>

        {/* Tab bar */}
        <div className="flex items-center border-b border-border bg-muted/40 px-4">
          {TABS.map((t) => (
            <button
              key={t.key}
              onClick={() => setTab(t.key)}
              className={`flex items-center gap-1.5 px-4 py-2.5 text-xs font-medium border-b-2 transition-all whitespace-nowrap ${
                tab === t.key
                  ? "border-accent text-foreground"
                  : "border-transparent text-muted-foreground hover:text-foreground hover:bg-muted/40"
              }`}
            >
              <t.icon className="w-3.5 h-3.5" />
              {t.label}
            </button>
          ))}
          <div className="ml-auto flex items-center gap-2 py-2">
            <span className="text-[10px] bg-accent/10 text-accent border border-accent/20 px-2 py-0.5 rounded font-medium">
              LIVE DEMO
            </span>
          </div>
        </div>

        {/* Panel content */}
        <div className="min-h-[460px]">
          <AnimatePresence mode="wait">

            {/* ══ JOB MATCHES ══ */}
            {tab === "jobs" && (
              <motion.div key="jobs" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.15 }} className="flex h-full min-h-[460px]">

                {/* Sidebar */}
                <div className="w-full sm:w-[240px] flex-shrink-0 border-r border-border flex flex-col">
                  {/* Search + filter */}
                  <div className="p-3 border-b border-border space-y-2">
                    <div className="relative">
                      <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3 h-3 text-muted-foreground" />
                      <input
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder="Search roles…"
                        className="w-full pl-7 pr-3 py-1.5 text-xs bg-muted/40 border border-border rounded-md focus:outline-none focus:ring-1 focus:ring-accent/40 placeholder:text-muted-foreground/50"
                      />
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] text-muted-foreground whitespace-nowrap">Min score</span>
                      <input
                        type="range" min={0} max={90} step={10} value={minScore}
                        onChange={(e) => setMinScore(Number(e.target.value))}
                        className="flex-1 h-1 accent-emerald-500 cursor-pointer"
                      />
                      <span className="text-[10px] font-mono text-foreground w-5 text-right">{minScore}</span>
                    </div>
                  </div>

                  {/* Job list */}
                  <div className="overflow-y-auto flex-1 divide-y divide-border">
                    {filtered.length === 0 && (
                      <p className="text-xs text-muted-foreground p-4 text-center">No roles match your filters</p>
                    )}
                    {filtered.map((job) => (
                      <button
                        key={job.id}
                        onClick={() => setSelectedJob(job)}
                        className={`w-full text-left px-3 py-3 transition-all hover:bg-muted/40 ${
                          selectedJob.id === job.id
                            ? "bg-muted/70 border-l-2 border-l-accent"
                            : "border-l-2 border-l-transparent"
                        }`}
                      >
                        <div className="flex items-start justify-between gap-1 mb-1">
                          <p className="text-xs font-semibold text-foreground leading-tight truncate">{job.title}</p>
                          <ScoreBadge score={job.score} />
                        </div>
                        <p className="text-[10px] text-muted-foreground">{job.company} · {job.location}</p>
                        <div className="flex items-center justify-between mt-1.5">
                          <span className={`text-[9px] font-medium px-1.5 py-0.5 rounded border ${job.tagColor}`}>{job.tag}</span>
                          <span className="text-[9px] text-muted-foreground">{job.posted}</span>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Detail panel */}
                <div className="hidden sm:flex flex-col flex-1 overflow-hidden">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={selectedJob.id}
                      initial={{ opacity: 0, x: 12 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -12 }}
                      transition={{ duration: 0.2 }}
                      className="flex flex-col h-full p-5 gap-4 overflow-y-auto"
                    >
                      {/* Header */}
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <h3 className="text-sm font-bold text-foreground">{selectedJob.title}</h3>
                          <p className="text-xs text-muted-foreground mt-0.5">{selectedJob.company} · {selectedJob.type} · {selectedJob.salary}</p>
                        </div>
                        <div className="text-right flex-shrink-0">
                          <div className="text-4xl font-bold font-mono leading-none text-foreground">
                            <AnimatedCounter key={selectedJob.id} target={selectedJob.score} />
                          </div>
                          <p className="text-[10px] text-muted-foreground">/ 100 match</p>
                        </div>
                      </div>

                      {/* Score bar */}
                      <div>
                        <div className="flex justify-between text-[10px] text-muted-foreground mb-1">
                          <span>Overall fit</span>
                          <span>{selectedJob.score}%</span>
                        </div>
                        <div className="w-full bg-muted rounded-full h-2">
                          <motion.div
                            key={selectedJob.id}
                            initial={{ width: 0 }}
                            animate={{ width: `${selectedJob.score}%` }}
                            transition={{ duration: 0.8, ease: "easeOut" }}
                            className={`h-2 rounded-full ${selectedJob.score >= 80 ? "bg-emerald-500" : selectedJob.score >= 65 ? "bg-amber-400" : "bg-red-400"}`}
                          />
                        </div>
                      </div>

                      {/* Skill breakdown */}
                      <div>
                        <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-widest mb-2.5">Skill Breakdown</p>
                        <div className="space-y-2">
                          {selectedJob.skills.map((s, i) => (
                            <motion.div
                              key={s.name}
                              initial={{ opacity: 0, x: -8 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: i * 0.06 }}
                              className="space-y-1"
                            >
                              <div className="flex items-center justify-between">
                                <div className="flex items-center gap-1.5">
                                  {s.match
                                    ? <CheckCircle className="w-3 h-3 text-emerald-500 flex-shrink-0" />
                                    : <AlertCircle className="w-3 h-3 text-amber-400 flex-shrink-0" />}
                                  <span className="text-[11px] font-medium text-foreground">{s.name}</span>
                                </div>
                                <div className="flex items-center gap-2 text-[10px] text-muted-foreground">
                                  <span>You: <span className={s.match ? "text-emerald-600 font-semibold" : "text-amber-600 font-semibold"}>{s.yours}</span></span>
                                  <span>Need: {s.required}</span>
                                </div>
                              </div>
                              <div className="relative h-1 bg-muted rounded-full overflow-hidden">
                                <div
                                  className="absolute inset-y-0 left-0 rounded-full bg-border"
                                  style={{ width: `${s.required}%` }}
                                />
                                <motion.div
                                  initial={{ width: 0 }}
                                  animate={{ width: `${Math.min(s.yours, 100)}%` }}
                                  transition={{ delay: 0.1 + i * 0.06, duration: 0.7 }}
                                  className={`absolute inset-y-0 left-0 rounded-full ${s.match ? "bg-emerald-500" : "bg-amber-400"}`}
                                />
                              </div>
                            </motion.div>
                          ))}
                        </div>
                      </div>

                      {/* AI summary */}
                      <div className="bg-muted/50 border border-border rounded-lg p-3.5">
                        <div className="flex items-center gap-1.5 mb-2">
                          <Sparkles className="w-3 h-3 text-accent" />
                          <span className="text-[10px] font-semibold text-accent uppercase tracking-widest">AI Analysis</span>
                        </div>
                        <p className="text-xs text-foreground leading-relaxed">{selectedJob.summary}</p>
                      </div>

                      {/* Gap */}
                      <div className="bg-amber-50/60 border border-amber-200/70 rounded-lg p-3">
                        <p className="text-[10px] font-semibold text-amber-700 uppercase tracking-widest mb-1">Gap to Address</p>
                        <p className="text-xs text-amber-800 leading-relaxed">{selectedJob.gap}</p>
                      </div>

                      {/* Actions */}
                      <div className="flex gap-2 mt-auto pt-1">
                        <button
                          onClick={() => setTab("resume")}
                          className="flex-1 bg-primary text-primary-foreground text-xs font-semibold py-2.5 rounded hover:opacity-90 transition-opacity flex items-center justify-center gap-1.5"
                        >
                          <Sparkles className="w-3.5 h-3.5" />
                          Tailor Resume →
                        </button>
                        <button className="border border-border text-xs font-medium px-4 py-2.5 rounded text-muted-foreground hover:text-foreground hover:border-foreground/30 transition-all">
                          Save
                        </button>
                      </div>
                    </motion.div>
                  </AnimatePresence>
                </div>
              </motion.div>
            )}

            {/* ══ RESUME AI ══ */}
            {tab === "resume" && (
              <motion.div key="resume" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.15 }} className="p-5 flex flex-col gap-4 min-h-[460px]">

                <div className="flex items-center justify-between flex-wrap gap-3">
                  <div>
                    <p className="text-sm font-bold text-foreground flex items-center gap-1.5">
                      <Sparkles className="w-4 h-4 text-accent" /> Resume AI
                    </p>
                    <p className="text-xs text-muted-foreground">Tailors and rewrites your resume for each role in real time</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="bg-muted/50 border border-border rounded-md px-3 py-1.5 text-xs text-muted-foreground">
                      Target: <span className="text-foreground font-medium">Staff SWE @ Linear</span>
                    </div>
                    <button
                      onClick={runAnalysis}
                      disabled={running}
                      className={`inline-flex items-center gap-1.5 text-xs font-semibold px-4 py-1.5 rounded transition-all ${
                        running ? "bg-muted text-muted-foreground cursor-not-allowed" : "bg-primary text-primary-foreground hover:opacity-90"
                      }`}
                    >
                      {running ? (
                        <>
                          <motion.span
                            animate={{ rotate: 360 }}
                            transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
                            className="inline-block w-3 h-3 border border-current border-t-transparent rounded-full"
                          />
                          Analyzing…
                        </>
                      ) : (
                        <>▶&nbsp; Run</>
                      )}
                    </button>
                  </div>
                </div>

                {/* Terminal */}
                <div className="bg-[#0d0d0d] rounded-xl border border-zinc-800 overflow-hidden flex-1">
                  <div className="flex items-center gap-2 px-4 py-2.5 border-b border-zinc-800 bg-zinc-900/60">
                    <div className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                    <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
                    <div className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
                    <span className="ml-2 text-[10px] font-mono text-zinc-500 flex-1">orvek resume-ai — bash</span>
                    <span className="text-[10px] text-zinc-600 font-mono">zsh</span>
                  </div>
                  <div className="p-4 min-h-[300px] space-y-1">
                    {terminalLines === 0 && !running && (
                      <p className="text-xs font-mono text-zinc-600 italic">Press ▶ Run to see live resume analysis and AI tailoring…</p>
                    )}
                    {RESUME_SCRIPT.slice(0, terminalLines).map((line, i) => {
                      if (line.type === "blank") return <div key={i} className="h-2" />;
                      const color =
                        line.type === "cmd"    ? "text-white font-semibold" :
                        line.type === "match"  ? "text-emerald-400" :
                        line.type === "gap"    ? "text-amber-400" :
                        line.type === "out"    ? "text-sky-400" :
                        line.type === "result" ? "text-purple-300 font-semibold" :
                        line.type === "done"   ? "text-emerald-300 font-bold" :
                        "text-zinc-500";
                      return (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, x: -6 }}
                          animate={{ opacity: 1, x: 0 }}
                          className={`text-xs font-mono leading-relaxed ${color}`}
                        >
                          {line.text}
                        </motion.div>
                      );
                    })}
                    {running && terminalLines < RESUME_SCRIPT.length && (
                      <motion.span
                        animate={{ opacity: [1, 0] }}
                        transition={{ duration: 0.5, repeat: Infinity }}
                        className="inline-block w-2 h-4 bg-emerald-400 align-middle"
                      />
                    )}
                  </div>
                </div>

                {/* Metrics row */}
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { label: "Skills Matched", value: "4/5", color: "text-emerald-600" },
                    { label: "ATS Score", value: "96/100", color: "text-emerald-600" },
                    { label: "Time Saved", value: "~2 hrs", color: "text-accent" },
                  ].map((s) => (
                    <div key={s.label} className="bg-muted/40 border border-border rounded-lg p-3 text-center">
                      <p className={`text-lg font-bold font-mono ${s.color}`}>{s.value}</p>
                      <p className="text-[10px] text-muted-foreground mt-0.5">{s.label}</p>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* ══ DASHBOARD ══ */}
            {tab === "dashboard" && (
              <motion.div key="dashboard" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.15 }} className="p-5 flex flex-col gap-4 min-h-[460px]">

                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-bold text-foreground">Your Pipeline</p>
                    <p className="text-xs text-muted-foreground">All active roles tracked by match score</p>
                  </div>
                  <div className="flex items-center gap-1.5 text-[10px] text-emerald-600 bg-emerald-50 border border-emerald-200 px-2 py-1 rounded">
                    <Activity className="w-3 h-3" />
                    Live
                  </div>
                </div>

                {/* Stat cards */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {[
                    { label: "Jobs Tracked", value: 12, sub: "+3 this week", color: "text-foreground" },
                    { label: "Avg Match Score", value: 81, sub: "Top quartile", color: "text-emerald-600" },
                    { label: "Applied", value: 4, sub: "2 in review", color: "text-sky-600" },
                    { label: "Interviews", value: 2, sub: "1 scheduled Tue", color: "text-accent" },
                  ].map((s, i) => (
                    <motion.div
                      key={s.label}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.07 }}
                      className="bg-card border border-border rounded-lg p-3 hover:border-foreground/20 transition-colors"
                    >
                      <p className={`text-2xl font-bold font-mono ${s.color}`}>
                        <AnimatedCounter key={tab} target={s.value} duration={700} />
                      </p>
                      <p className="text-[10px] font-semibold text-foreground/70 mt-0.5">{s.label}</p>
                      <p className="text-[10px] text-muted-foreground">{s.sub}</p>
                    </motion.div>
                  ))}
                </div>

                {/* Pipeline rows — expandable */}
                <div>
                  <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-widest mb-2">Active Roles</p>
                  <div className="border border-border rounded-lg overflow-hidden divide-y divide-border">
                    {PIPELINE.map((row, i) => (
                      <div key={i}>
                        <button
                          onClick={() => setExpandedRow(expandedRow === i ? null : i)}
                          className="w-full flex items-center justify-between px-4 py-3 hover:bg-muted/30 transition-colors text-left"
                        >
                          <div className="flex items-center gap-3 min-w-0">
                            <div className="min-w-0">
                              <p className="text-xs font-semibold text-foreground truncate">{row.title}</p>
                              <p className="text-[10px] text-muted-foreground">{row.company}</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-3 flex-shrink-0">
                            <ScoreBadge score={row.score} />
                            <span className={`text-[10px] font-medium px-2 py-0.5 rounded border hidden sm:inline ${row.statusColor}`}>
                              {row.status}
                            </span>
                            {expandedRow === i
                              ? <ChevronUp className="w-3.5 h-3.5 text-muted-foreground" />
                              : <ChevronDown className="w-3.5 h-3.5 text-muted-foreground" />}
                          </div>
                        </button>
                        <AnimatePresence>
                          {expandedRow === i && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.2 }}
                              className="overflow-hidden"
                            >
                              <div className="px-4 pb-3 flex items-center gap-2 text-xs text-muted-foreground bg-muted/20">
                                <Clock className="w-3 h-3 flex-shrink-0" />
                                <span>{row.activity}</span>
                                <button
                                  onClick={() => setTab("resume")}
                                  className="ml-auto text-accent hover:underline text-[11px] font-medium whitespace-nowrap"
                                >
                                  Tailor Resume →
                                </button>
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Score bar chart + activity feed side by side */}
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-widest mb-2">Score Distribution</p>
                    <div className="flex items-end gap-2 h-20 bg-muted/20 border border-border rounded-lg px-4 py-3">
                      {PIPELINE.map((row, i) => (
                        <div key={i} className="flex-1 flex flex-col items-center gap-1 h-full justify-end">
                          <p className="text-[9px] font-mono text-muted-foreground">{row.score}</p>
                          <motion.div
                            initial={{ height: 0 }}
                            animate={{ height: `${(row.score / 100) * 44}px` }}
                            transition={{ delay: 0.15 + i * 0.08, duration: 0.6, ease: "easeOut" }}
                            className={`w-full rounded-t ${row.score >= 80 ? "bg-emerald-500" : row.score >= 65 ? "bg-amber-400" : "bg-muted-foreground/40"}`}
                            style={{ minHeight: 4 }}
                          />
                          <p className="text-[9px] text-muted-foreground truncate w-full text-center">{row.company}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-widest mb-2">Recent Activity</p>
                    <div className="border border-border rounded-lg divide-y divide-border overflow-hidden bg-card">
                      {ACTIVITY_FEED.map((a, i) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, x: 8 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.1 + i * 0.07 }}
                          className="flex items-start gap-2.5 px-3 py-2 hover:bg-muted/30 transition-colors"
                        >
                          <span className="text-xs mt-0.5">{a.icon}</span>
                          <div className="min-w-0">
                            <p className="text-[11px] text-foreground leading-tight">{a.text}</p>
                            <p className="text-[10px] text-muted-foreground mt-0.5">{a.time}</p>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

          </AnimatePresence>
        </div>
      </div>

      <p className="text-center text-xs text-muted-foreground mt-3">
        Interactive demo &mdash;{" "}
        <Link href="/auth" className="text-accent hover:underline font-medium">
          sign up for the real thing →
        </Link>
      </p>
    </div>
  );
}

/* ─── Social icons ─── */
function TelegramIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
      <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
    </svg>
  );
}
function XIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.748l7.73-8.835L1.254 2.25H8.08l4.259 5.629L18.244 2.25zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77z"/>
    </svg>
  );
}
function SocialFollowButtons() {
  return (
    <div className="flex items-center gap-2 mb-5 flex-wrap">
      <a href="https://x.com/ovrefoundry" target="_blank" rel="noopener noreferrer"
        className="inline-flex items-center gap-2 bg-[#0f0f0f] text-white text-sm font-semibold px-4 py-2 rounded-full hover:bg-[#2a2a2a] transition-colors whitespace-nowrap">
        <XIcon />Follow @ovrefoundry
      </a>
      <a href="https://t.me/ovrekfoundry" target="_blank" rel="noopener noreferrer"
        className="inline-flex items-center gap-2 bg-[#0f0f0f] text-white text-sm font-semibold px-4 py-2 rounded-full hover:bg-[#2a2a2a] transition-colors whitespace-nowrap">
        <TelegramIcon />Join Telegram
      </a>
    </div>
  );
}

/* ─── PAGE ─── */
export default function Landing() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <PublicNav />

      {/* Hero */}
      <section className="max-w-6xl mx-auto px-6 pt-16 pb-10">
        <motion.div initial="hidden" animate="show" variants={stagger}>
          <motion.div variants={fadeUp}><SocialFollowButtons /></motion.div>

          <motion.div variants={fadeUp}>
            <HeroHeadline />
          </motion.div>

          <motion.p variants={fadeUp} className="text-lg text-muted-foreground max-w-xl leading-relaxed mb-8">
            Orvek Foundry scores every role against your profile, rewrites your resume for each application, and shows you exactly where you stand before you spend an hour on a cover letter.
          </motion.p>

          <motion.div variants={fadeUp} className="flex flex-col sm:flex-row gap-3 mb-12">
            <Link href="/auth" className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-2.5 rounded font-medium hover:opacity-90 transition-opacity" data-testid="button-hero-cta">
              Start moving with precision <ArrowRight className="w-4 h-4" />
            </Link>
            <Link href="/how-to" className="inline-flex items-center gap-2 border border-border px-6 py-2.5 rounded font-medium text-muted-foreground hover:text-foreground hover:border-foreground/30 transition-all">
              See how it works
            </Link>
          </motion.div>

          {/* Demo — visible immediately on load */}
          <motion.div variants={fadeUp}>
            <p className="text-xs font-medium text-muted-foreground uppercase tracking-widest mb-4 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 inline-block" />
              Try the product — no sign up required
            </p>
            <InteractiveDemo />
          </motion.div>
        </motion.div>
      </section>

      {/* Social proof counters */}
      <section className="border-t border-border bg-muted/20 mt-12">
        <div className="max-w-6xl mx-auto px-6 py-10">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={stagger}
            className="grid grid-cols-2 sm:grid-cols-4 gap-6 text-center"
          >
            {SOCIAL_PROOF.map((s, i) => (
              <motion.div key={i} variants={fadeUp}>
                <p className="text-3xl sm:text-4xl font-bold font-mono text-foreground tabular-nums">
                  <AnimatedCounter key={s.label} target={s.value} duration={1200} />{s.suffix}
                </p>
                <p className="text-xs text-muted-foreground mt-1.5 leading-snug">{s.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Partner logos */}
      <section className="border-y border-border bg-muted/30 py-10">
        <div className="max-w-6xl mx-auto px-6">
          <p className="text-xs font-medium text-muted-foreground uppercase tracking-widest text-center mb-7">
            Engineers from these companies trust Orvek Foundry
          </p>
          <PartnerLogos />
        </div>
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

      {/* Testimonials */}
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
                <p className="text-xs font-semibold text-foreground">{t.name}</p>
                <p className="text-xs text-muted-foreground">{t.role}</p>
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
