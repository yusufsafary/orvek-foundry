import { Router, type IRouter } from "express";
import {
  ListJobsQueryParams,
  ListJobsResponse,
  GetJobParams,
  GetJobResponse,
  MatchJobParams,
  MatchJobBody,
  MatchJobResponse,
} from "@workspace/api-zod";

const router: IRouter = Router();

const MOCK_JOBS = [
  {
    id: "job-001",
    title: "Staff Software Engineer",
    company: "Linear",
    level: "staff",
    location: "Remote (US)",
    type: "Full-time",
    score: 91,
    reasoning: "Strong TypeScript and systems design alignment. Your real-time sync experience maps directly to their core infrastructure needs.",
    postedAt: "2025-05-15T10:00:00Z",
    description: "Linear is looking for a Staff Software Engineer to help build the future of project management. You will work on core infrastructure, real-time collaboration, and developer experience at scale. You will own large technical surface areas and drive architectural decisions across teams.",
    requirements: [
      "7+ years of software engineering experience",
      "Deep expertise in TypeScript and Node.js",
      "Experience with real-time systems and WebSockets",
      "Strong understanding of distributed systems",
      "Proven track record of leading complex technical projects",
    ],
    benefits: [
      "Competitive equity package",
      "Remote-first culture",
      "Top-tier health, dental, and vision",
      "$5,000 equipment budget",
      "Unlimited PTO",
    ],
  },
  {
    id: "job-002",
    title: "Principal Engineer, Platform",
    company: "Vercel",
    level: "principal",
    location: "Remote (Global)",
    type: "Full-time",
    score: 87,
    reasoning: "Your edge infrastructure background and cold-start optimization work at Vercel maps closely to this role. Strong organizational fit.",
    postedAt: "2025-05-14T08:00:00Z",
    description: "We are building the infrastructure layer for the modern web. As a Principal Engineer on the Platform team, you will define the technical direction for our edge network and help shape how millions of developers deploy software worldwide.",
    requirements: [
      "10+ years of software engineering, including leadership",
      "Deep experience with edge computing and CDN infrastructure",
      "Expertise in Go, Rust, or C++ for systems programming",
      "Strong background in performance engineering",
      "Excellent cross-functional communication",
    ],
    benefits: [
      "Top-of-market compensation",
      "Significant equity",
      "Global remote with quarterly offsites",
      "Learning and development budget",
      "Premium health coverage",
    ],
  },
  {
    id: "job-003",
    title: "Senior Full Stack Engineer",
    company: "Loom",
    level: "senior",
    location: "San Francisco, CA (Hybrid)",
    type: "Full-time",
    score: 78,
    reasoning: "Your video pipeline work is directly relevant. Good skill match but the hybrid requirement may be a friction point based on your current setup.",
    postedAt: "2025-05-13T12:00:00Z",
    description: "Loom is on a mission to make video the default form of communication at work. As a Senior Full Stack Engineer, you will build features across the recording, editing, and sharing surfaces used by millions of people every day.",
    requirements: [
      "5+ years of full stack engineering experience",
      "Strong React and TypeScript skills",
      "Experience with media processing pipelines",
      "Familiarity with WebRTC or video encoding",
      "Product-minded with strong UX intuition",
    ],
    benefits: [
      "Competitive salary and equity",
      "Hybrid work model (3 days/week SF)",
      "Comprehensive health benefits",
      "$1,500 home office stipend",
      "Catered lunches on-site",
    ],
  },
  {
    id: "job-004",
    title: "Engineering Manager, Developer Experience",
    company: "Stripe",
    level: "manager",
    location: "Remote (US)",
    type: "Full-time",
    score: 64,
    reasoning: "Partial match on technical background. This is a people management role and your profile skews heavily IC. Transferable but requires significant framing.",
    postedAt: "2025-05-12T09:00:00Z",
    description: "Lead a team of engineers building the tools, SDKs, and documentation infrastructure that help millions of developers integrate Stripe. You will define the roadmap, hire top talent, and set standards for what great developer experience means at scale.",
    requirements: [
      "5+ years of engineering experience",
      "2+ years of engineering management",
      "Experience with developer tooling or SDKs",
      "Strong technical judgment with ability to stay hands-on",
      "Excellent written and verbal communication",
    ],
    benefits: [
      "Above-market total compensation",
      "Meaningful equity",
      "Remote-first with team meetups",
      "Generous parental leave",
      "401k with matching",
    ],
  },
  {
    id: "job-005",
    title: "Software Engineer II, Infrastructure",
    company: "Notion",
    level: "mid",
    location: "New York, NY (Hybrid)",
    type: "Full-time",
    score: 55,
    reasoning: "Under-leveled for your experience profile. Skill match is solid but compensation and scope likely do not match where you are in your career.",
    postedAt: "2025-05-11T14:00:00Z",
    description: "Join the infrastructure team at Notion to build the systems that power a product used by tens of millions of people. You will work on data pipelines, reliability engineering, and developer tooling that keeps Notion fast and available globally.",
    requirements: [
      "3+ years of software engineering experience",
      "Experience with cloud infrastructure (AWS, GCP, or Azure)",
      "Strong fundamentals in distributed systems",
      "Familiarity with Kubernetes and containerization",
      "Interest in reliability and observability",
    ],
    benefits: [
      "Competitive salary",
      "Hybrid (3 days NYC office)",
      "Full health coverage",
      "$500/month transportation benefit",
      "Daily catered meals",
    ],
  },
  {
    id: "job-006",
    title: "Staff Engineer, Product Infrastructure",
    company: "Figma",
    level: "staff",
    location: "Remote (US)",
    type: "Full-time",
    score: 83,
    reasoning: "Strong systems design and product sensibility match. Figma values engineers who can bridge infrastructure and user-facing impact, which aligns with your track record.",
    postedAt: "2025-05-10T11:00:00Z",
    description: "Build the foundational infrastructure that makes Figma fast, reliable, and scalable for millions of designers worldwide. This role sits at the intersection of platform engineering and product, owning systems that directly affect the creative workflow of design teams at every major company.",
    requirements: [
      "8+ years of software engineering experience",
      "Deep expertise in TypeScript and Rust or C++",
      "Experience scaling collaborative applications",
      "Strong product intuition for developer-facing features",
      "History of leading cross-team technical initiatives",
    ],
    benefits: [
      "Highly competitive equity and salary",
      "Remote-first with SF HQ option",
      "World-class health benefits",
      "$2,000 annual learning budget",
      "Monthly remote work stipend",
    ],
  },
];

router.get("/jobs", async (req, res): Promise<void> => {
  const query = ListJobsQueryParams.safeParse(req.query);
  let jobs = MOCK_JOBS.map(({ description: _d, requirements: _r, benefits: _b, ...job }) => job);

  if (query.success) {
    const { search, level, minScore } = query.data;
    if (search) {
      const s = search.toLowerCase();
      jobs = jobs.filter(
        (j) =>
          j.title.toLowerCase().includes(s) ||
          j.company.toLowerCase().includes(s)
      );
    }
    if (level) {
      jobs = jobs.filter((j) => j.level === level);
    }
    if (minScore !== undefined) {
      jobs = jobs.filter((j) => j.score >= minScore);
    }
  }

  res.json(ListJobsResponse.parse(jobs));
});

router.get("/jobs/:id", async (req, res): Promise<void> => {
  const params = GetJobParams.safeParse(req.params);
  if (!params.success) {
    res.status(400).json({ error: params.error.message });
    return;
  }

  const job = MOCK_JOBS.find((j) => j.id === params.data.id);
  if (!job) {
    res.status(404).json({ error: "Job not found" });
    return;
  }

  res.json(GetJobResponse.parse(job));
});

router.post("/jobs/:id/match", async (req, res): Promise<void> => {
  const params = MatchJobParams.safeParse(req.params);
  if (!params.success) {
    res.status(400).json({ error: params.error.message });
    return;
  }

  const body = MatchJobBody.safeParse(req.body);
  if (!body.success) {
    res.status(400).json({ error: body.error.message });
    return;
  }

  const job = MOCK_JOBS.find((j) => j.id === params.data.id);
  const score = job?.score ?? 72;

  const result = MatchJobResponse.parse({
    score,
    reasoning: job?.reasoning ?? "Solid alignment across technical skills. Some gaps in domain-specific experience worth addressing in your application.",
    strengths: [
      "TypeScript and Node.js expertise maps directly to their stack",
      "Demonstrated impact at similar-stage companies",
      "Real-time systems experience is directly relevant",
    ],
    gaps: [
      "Limited public evidence of staff-level scope",
      "No explicit mention of distributed systems at scale",
    ],
  });

  res.json(result);
});

export default router;
