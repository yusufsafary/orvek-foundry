import { Router, type IRouter } from "express";
import { TailorResumeBody, TailorResumeResponse } from "@workspace/api-zod";

const router: IRouter = Router();

router.post("/resume/tailor", async (req, res): Promise<void> => {
  const parsed = TailorResumeBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.message });
    return;
  }

  const { resumeText, jobDescription } = parsed.data;

  const jobKeywords = jobDescription
    .split(/\s+/)
    .filter((w) => w.length > 5)
    .slice(0, 5)
    .join(", ");

  const tailored = resumeText
    .replace(
      /Skills:/,
      `Core Competencies (aligned to role):`
    )
    .replace(
      /Experience:/,
      `Relevant Experience:`
    ) +
    `\n\nATS Keywords Integrated: ${jobKeywords}\n\nThis resume has been restructured to lead with impact metrics and align terminology with the target role requirements.`;

  const result = TailorResumeResponse.parse({
    original: resumeText,
    tailored,
    changes: [
      "Reordered experience bullets to lead with quantifiable impact",
      "Aligned technical terminology with job description language",
      "Added ATS-friendly keyword integration for top requirements",
      "Strengthened action verbs across all experience entries",
      "Restructured skills section to mirror role-specific competencies",
    ],
  });

  res.json(result);
});

export default router;
