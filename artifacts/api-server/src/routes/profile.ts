import { Router, type IRouter } from "express";
import {
  GetProfileResponse,
  UpdateProfileBody,
  UpdateProfileResponse,
} from "@workspace/api-zod";

const router: IRouter = Router();

let mockProfile = {
  userId: "user-001",
  resumeText: `Jane Doe — Senior Product Engineer
5 years building developer tools and internal platforms at Series B–D startups.

Experience:
- Lead Engineer at Vercel (2022–present): Shipped edge config, reduced cold start by 40%
- Software Engineer at Linear (2020–2022): Built real-time sync engine for project management
- Full Stack at Loom (2019–2020): Video recording pipeline, reduced upload latency by 60%

Skills: TypeScript, React, Node.js, PostgreSQL, Redis, AWS, Go
Education: BS Computer Science, UC Berkeley 2019`,
  targetRole: "Staff Engineer",
  experienceLevel: "senior",
};

router.get("/profile", async (_req, res): Promise<void> => {
  res.json(GetProfileResponse.parse(mockProfile));
});

router.put("/profile", async (req, res): Promise<void> => {
  const parsed = UpdateProfileBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.message });
    return;
  }

  mockProfile = { ...mockProfile, ...parsed.data };
  res.json(UpdateProfileResponse.parse(mockProfile));
});

export default router;
