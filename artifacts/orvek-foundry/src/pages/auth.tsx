import { useState } from "react";
import { motion } from "framer-motion";
import { useLocation } from "wouter";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useLogin, useRegister } from "@workspace/api-client-react";
import { useAuth } from "@/hooks/use-auth";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const schema = z.object({
  email: z.string().email("Enter a valid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});
type FormData = z.infer<typeof schema>;

export default function Auth() {
  const [mode, setMode] = useState<"login" | "register">("login");
  const [, setLocation] = useLocation();
  const { isAuthenticated, login } = useAuth();

  if (isAuthenticated) {
    setLocation("/dashboard");
    return null;
  }

  const loginMutation = useLogin();
  const registerMutation = useRegister();

  const form = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { email: "", password: "" },
  });

  const isPending = loginMutation.isPending || registerMutation.isPending;

  const onSubmit = (data: FormData) => {
    const mutation = mode === "login" ? loginMutation : registerMutation;
    mutation.mutate(
      { data },
      {
        onSuccess: (result) => {
          login(result.token, result.user);
          setLocation("/dashboard");
        },
        onError: () => {
          form.setError("password", { message: "Invalid credentials. Try any email and password." });
        },
      }
    );
  };

  return (
    <div className="min-h-screen bg-background flex">
      {/* Left panel */}
      <div className="hidden lg:flex flex-col justify-between w-1/2 bg-primary text-primary-foreground p-12">
        <span className="font-semibold text-sm tracking-tight">Orvek Foundry</span>
        <div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-4xl font-bold tracking-tight leading-tight mb-4"
          >
            Every role scored.
            <br />
            Every move deliberate.
          </motion.h1>
          <p className="text-primary-foreground/60 text-sm leading-relaxed max-w-sm">
            Stop spending hours applying to roles that were never a fit. Use signal instead.
          </p>
        </div>
        <p className="text-xs text-primary-foreground/40">Precision over volume.</p>
      </div>

      {/* Right panel */}
      <div className="flex-1 flex items-center justify-center px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="w-full max-w-sm"
        >
          <div className="mb-8">
            <h2 className="text-2xl font-bold tracking-tight mb-1">
              {mode === "login" ? "Sign in" : "Create account"}
            </h2>
            <p className="text-sm text-muted-foreground">
              {mode === "login"
                ? "Welcome back. Move with precision."
                : "Start tracking roles that actually fit."}
            </p>
          </div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                      Email
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="email"
                        placeholder="you@company.com"
                        className="bg-muted/40"
                        data-testid="input-email"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                      Password
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="password"
                        placeholder="Min. 6 characters"
                        className="bg-muted/40"
                        data-testid="input-password"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button
                type="submit"
                className="w-full"
                disabled={isPending}
                data-testid="button-submit-auth"
              >
                {isPending
                  ? "Processing..."
                  : mode === "login"
                  ? "Sign in"
                  : "Create account"}
              </Button>
            </form>
          </Form>

          <div className="mt-6 text-center">
            <button
              onClick={() => setMode(mode === "login" ? "register" : "login")}
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              data-testid="button-toggle-auth-mode"
            >
              {mode === "login"
                ? "No account? Create one"
                : "Already have an account? Sign in"}
            </button>
          </div>

          <p className="mt-8 text-xs text-muted-foreground text-center">
            Demo: use any email and password to sign in.
          </p>
        </motion.div>
      </div>
    </div>
  );
}
