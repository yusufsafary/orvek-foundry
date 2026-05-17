import { Router, type IRouter } from "express";
import { GetDashboardStatsResponse, GetRecentActivityResponse } from "@workspace/api-zod";

const router: IRouter = Router();

router.get("/dashboard/stats", async (_req, res): Promise<void> => {
  const stats = GetDashboardStatsResponse.parse({
    totalJobs: 6,
    avgScore: 76,
    topScore: 91,
    appliedCount: 2,
  });
  res.json(stats);
});

router.get("/dashboard/activity", async (_req, res): Promise<void> => {
  const activity = GetRecentActivityResponse.parse([
    {
      id: "act-001",
      type: "match",
      label: "Match score generated for Staff Software Engineer at Linear",
      timestamp: "2025-05-17T09:30:00Z",
    },
    {
      id: "act-002",
      type: "resume",
      label: "Resume tailored for Principal Engineer at Vercel",
      timestamp: "2025-05-16T14:22:00Z",
    },
    {
      id: "act-003",
      type: "apply",
      label: "Applied to Staff Engineer at Figma",
      timestamp: "2025-05-15T11:05:00Z",
    },
    {
      id: "act-004",
      type: "apply",
      label: "Applied to Staff Software Engineer at Linear",
      timestamp: "2025-05-14T16:40:00Z",
    },
    {
      id: "act-005",
      type: "match",
      label: "Match score generated for Senior Full Stack at Loom",
      timestamp: "2025-05-13T10:15:00Z",
    },
  ]);
  res.json(activity);
});

export default router;
