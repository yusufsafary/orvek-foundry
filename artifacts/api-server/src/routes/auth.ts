import { Router, type IRouter } from "express";
import {
  LoginBody,
  LoginResponse,
  RegisterBody,
} from "@workspace/api-zod";

const router: IRouter = Router();

const MOCK_USER = {
  id: "user-001",
  email: "demo@orvek.io",
};

const MOCK_TOKEN = "mock-jwt-token-orvek-2025";

router.post("/auth/login", async (req, res): Promise<void> => {
  const parsed = LoginBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.message });
    return;
  }

  const { email, password } = parsed.data;
  if (!email || !password) {
    res.status(401).json({ error: "Invalid credentials" });
    return;
  }

  const result = LoginResponse.parse({ token: MOCK_TOKEN, user: { id: MOCK_USER.id, email } });
  res.json(result);
});

router.post("/auth/register", async (req, res): Promise<void> => {
  const parsed = RegisterBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.message });
    return;
  }

  const { email } = parsed.data;
  const result = LoginResponse.parse({ token: MOCK_TOKEN, user: { id: MOCK_USER.id, email } });
  res.status(201).json(result);
});

router.post("/auth/logout", async (_req, res): Promise<void> => {
  res.json({ message: "Logged out" });
});

export default router;
