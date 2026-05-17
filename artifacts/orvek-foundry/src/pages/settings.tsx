import { useEffect } from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useGetProfile, useUpdateProfile, getGetProfileQueryKey } from "@workspace/api-client-react";
import { useQueryClient } from "@tanstack/react-query";
import AppShell from "@/components/app-shell";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/use-auth";

const schema = z.object({
  resumeText: z.string().min(10, "Resume is too short"),
  targetRole: z.string().min(2, "Enter a target role"),
  experienceLevel: z.string().min(1, "Select an experience level"),
});
type FormData = z.infer<typeof schema>;

const LEVELS = ["junior", "mid", "senior", "staff", "principal", "manager"];

export default function Settings() {
  const { data: profile, isLoading } = useGetProfile();
  const updateProfile = useUpdateProfile();
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const { user } = useAuth();

  const form = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { resumeText: "", targetRole: "", experienceLevel: "" },
  });

  useEffect(() => {
    if (profile) {
      form.reset({
        resumeText: profile.resumeText ?? "",
        targetRole: profile.targetRole,
        experienceLevel: profile.experienceLevel,
      });
    }
  }, [profile, form]);

  const onSubmit = (data: FormData) => {
    updateProfile.mutate(
      { data },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: getGetProfileQueryKey() });
          toast({ title: "Profile updated", description: "Your changes have been saved." });
        },
        onError: () => {
          toast({ title: "Update failed", description: "Try again.", variant: "destructive" });
        },
      }
    );
  };

  return (
    <AppShell>
      <div className="max-w-2xl mx-auto px-4 sm:px-6 py-8">
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
          <div className="mb-8">
            <h1 className="text-2xl font-bold tracking-tight mb-1">Settings</h1>
            <p className="text-sm text-muted-foreground">
              {user?.email && <span className="font-mono text-xs">{user.email}</span>}
            </p>
          </div>

          {isLoading ? (
            <div className="space-y-4">
              <Skeleton className="h-10 rounded-lg" />
              <Skeleton className="h-10 rounded-lg" />
              <Skeleton className="h-64 rounded-lg" />
            </div>
          ) : (
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="targetRole"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                        Target Role
                      </FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="e.g. Staff Engineer, Principal PM"
                          className="bg-card"
                          data-testid="input-target-role"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="experienceLevel"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                        Experience Level
                      </FormLabel>
                      <FormControl>
                        <div className="grid grid-cols-3 gap-2">
                          {LEVELS.map((level) => (
                            <button
                              key={level}
                              type="button"
                              onClick={() => field.onChange(level)}
                              className={`text-sm py-2 px-3 border rounded transition-all ${
                                field.value === level
                                  ? "border-accent bg-accent/5 text-foreground font-medium"
                                  : "border-border bg-card text-muted-foreground hover:border-foreground/30 hover:text-foreground"
                              }`}
                              data-testid={`button-level-${level}`}
                            >
                              {level.charAt(0).toUpperCase() + level.slice(1)}
                            </button>
                          ))}
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="resumeText"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                        Resume
                      </FormLabel>
                      <FormControl>
                        <Textarea
                          {...field}
                          placeholder="Paste your resume here..."
                          className="min-h-64 bg-card font-mono text-sm resize-none"
                          data-testid="input-resume-text"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="flex justify-end">
                  <Button
                    type="submit"
                    disabled={updateProfile.isPending}
                    data-testid="button-save-settings"
                  >
                    {updateProfile.isPending ? "Saving..." : "Save changes"}
                  </Button>
                </div>
              </form>
            </Form>
          )}
        </motion.div>
      </div>
    </AppShell>
  );
}
