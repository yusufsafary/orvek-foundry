import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "wouter";
import {
  useListJobs,
  useGetDashboardStats,
  useGetRecentActivity,
} from "@workspace/api-client-react";
import { Search, TrendingUp, Target, Award, FileCheck, Activity } from "lucide-react";
import AppShell from "@/components/app-shell";
import { Skeleton } from "@/components/ui/skeleton";
import { Input } from "@/components/ui/input";

function ScoreBadge({ score }: { score: number }) {
  if (score >= 80) return (
    <span className="inline-flex items-center px-2 py-0.5 rounded border text-xs font-mono font-semibold text-emerald-700 bg-emerald-50 border-emerald-200">
      {score}
    </span>
  );
  if (score >= 60) return (
    <span className="inline-flex items-center px-2 py-0.5 rounded border text-xs font-mono font-semibold text-amber-700 bg-amber-50 border-amber-200">
      {score}
    </span>
  );
  return (
    <span className="inline-flex items-center px-2 py-0.5 rounded border text-xs font-mono font-semibold text-red-700 bg-red-50 border-red-200">
      {score}
    </span>
  );
}

const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.07 } } };
const fadeUp = { hidden: { opacity: 0, y: 12 }, show: { opacity: 1, y: 0, transition: { duration: 0.35 } } };

export default function Dashboard() {
  const [search, setSearch] = useState("");
  const [levelFilter, setLevelFilter] = useState("");

  const { data: jobs, isLoading: jobsLoading } = useListJobs(
    { search: search || undefined, level: levelFilter || undefined },
    { query: { queryKey: ["listJobs", search, levelFilter] } }
  );
  const { data: stats, isLoading: statsLoading } = useGetDashboardStats();
  const { data: activity, isLoading: activityLoading } = useGetRecentActivity();

  const LEVELS = ["", "junior", "mid", "senior", "staff", "principal", "manager"];

  return (
    <AppShell>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
        {/* Stats */}
        <motion.div
          initial="hidden" animate="show" variants={stagger}
          className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-8"
        >
          {statsLoading
            ? Array.from({ length: 4 }).map((_, i) => (
                <Skeleton key={i} className="h-24 rounded-lg" />
              ))
            : [
                { icon: Target, label: "Roles tracked", value: stats?.totalJobs ?? 0 },
                { icon: TrendingUp, label: "Avg match score", value: stats?.avgScore ?? 0 },
                { icon: Award, label: "Top score", value: stats?.topScore ?? 0 },
                { icon: FileCheck, label: "Applied", value: stats?.appliedCount ?? 0 },
              ].map((stat, i) => (
                <motion.div
                  key={i}
                  variants={fadeUp}
                  className="bg-card border border-border rounded-lg p-4"
                  data-testid={`stat-card-${i}`}
                >
                  <stat.icon className="w-4 h-4 text-muted-foreground mb-3" />
                  <p className="text-2xl font-bold font-mono">{stat.value}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">{stat.label}</p>
                </motion.div>
              ))}
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Jobs list */}
          <div className="lg:col-span-2">
            <div className="flex flex-col sm:flex-row gap-3 mb-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search roles or companies..."
                  className="pl-9 bg-card"
                  data-testid="input-search-jobs"
                />
              </div>
              <select
                value={levelFilter}
                onChange={(e) => setLevelFilter(e.target.value)}
                className="border border-border bg-card rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-ring"
                data-testid="select-level-filter"
              >
                {LEVELS.map((l) => (
                  <option key={l} value={l}>{l ? l.charAt(0).toUpperCase() + l.slice(1) : "All levels"}</option>
                ))}
              </select>
            </div>

            <motion.div initial="hidden" animate="show" variants={stagger} className="space-y-2">
              {jobsLoading
                ? Array.from({ length: 4 }).map((_, i) => (
                    <Skeleton key={i} className="h-24 rounded-lg" />
                  ))
                : jobs?.map((job) => (
                    <motion.div key={job.id} variants={fadeUp}>
                      <Link href={`/job/${job.id}`}>
                        <a
                          className="block bg-card border border-border rounded-lg px-5 py-4 hover:border-foreground/20 transition-colors group"
                          data-testid={`card-job-${job.id}`}
                        >
                          <div className="flex items-start justify-between gap-3">
                            <div className="min-w-0">
                              <p className="font-medium text-sm text-foreground group-hover:text-accent transition-colors truncate">
                                {job.title}
                              </p>
                              <p className="text-xs text-muted-foreground mt-0.5">{job.company}</p>
                              <p className="text-xs text-muted-foreground mt-2 leading-relaxed line-clamp-2">
                                {job.reasoning}
                              </p>
                            </div>
                            <div className="flex-shrink-0 flex flex-col items-end gap-2">
                              <ScoreBadge score={job.score} />
                              <span className="text-xs text-muted-foreground">{job.level}</span>
                            </div>
                          </div>
                          <div className="flex items-center gap-3 mt-3">
                            <span className="text-xs text-muted-foreground">{job.location}</span>
                            <span className="text-xs text-muted-foreground">·</span>
                            <span className="text-xs text-muted-foreground">{job.type}</span>
                          </div>
                        </a>
                      </Link>
                    </motion.div>
                  ))}
              {!jobsLoading && jobs?.length === 0 && (
                <div className="text-center py-12 text-muted-foreground text-sm">
                  No roles match your current filters.
                </div>
              )}
            </motion.div>
          </div>

          {/* Activity feed */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Activity className="w-4 h-4 text-muted-foreground" />
              <h3 className="text-sm font-medium">Recent activity</h3>
            </div>
            <div className="space-y-2">
              {activityLoading
                ? Array.from({ length: 4 }).map((_, i) => (
                    <Skeleton key={i} className="h-16 rounded-lg" />
                  ))
                : activity?.map((item) => (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="bg-card border border-border rounded-lg px-4 py-3"
                      data-testid={`activity-item-${item.id}`}
                    >
                      <p className="text-xs text-foreground leading-relaxed">{item.label}</p>
                      <p className="text-xs text-muted-foreground mt-1.5">
                        {new Date(item.timestamp).toLocaleDateString("en-US", {
                          month: "short", day: "numeric",
                        })}
                      </p>
                    </motion.div>
                  ))}
            </div>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
