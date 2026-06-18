import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Mail,
  FileText,
  ListTodo,
  Search,
  MessageSquare,
  TrendingUp,
  Clock,
  Sparkles,
  Zap,
  CheckCircle2,
  Lightbulb,
} from "lucide-react";

import { AppShell } from "@/components/app-shell";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Dashboard — AI Workplace" },
      { name: "description", content: "Your AI productivity command center." },
    ],
  }),
  component: Dashboard,
});

const stats = [
  { label: "Tasks Completed", value: "128", change: "+12%", icon: CheckCircle2, color: "text-success" },
  { label: "AI Actions", value: "1,420", change: "+24%", icon: Sparkles, color: "text-primary" },
  { label: "Time Saved", value: "37h", change: "+8%", icon: Clock, color: "text-accent" },
  { label: "Productivity", value: "92%", change: "+5%", icon: TrendingUp, color: "text-warning" },
];

const quickActions = [
  { title: "Smart Email", desc: "Draft a polished email", url: "/email", icon: Mail },
  { title: "Meeting Notes", desc: "Summarize a meeting", url: "/meetings", icon: FileText },
  { title: "Task Planner", desc: "Plan your day", url: "/tasks", icon: ListTodo },
  { title: "Research", desc: "Investigate any topic", url: "/research", icon: Search },
  { title: "Chatbot", desc: "Ask anything", url: "/chat", icon: MessageSquare },
];

const activity = [
  { action: "Drafted email to Marketing team", time: "2 min ago", tag: "Email" },
  { action: "Summarized Q4 planning meeting", time: "1 hour ago", tag: "Meetings" },
  { action: "Generated weekly task plan", time: "3 hours ago", tag: "Tasks" },
  { action: "Researched 'AI in healthcare'", time: "Yesterday", tag: "Research" },
];

const tips = [
  "Start your day by letting the AI Task Planner organize your top 3 priorities.",
  "Paste raw meeting transcripts into the Summarizer to extract action items instantly.",
  "Use the Email Generator's tone control to match your audience — formal, friendly, or persuasive.",
];

function Dashboard() {
  return (
    <AppShell title="Dashboard">
      <div className="space-y-6">
        {/* Welcome banner */}
        <Card className="overflow-hidden border-0 gradient-brand text-primary-foreground">
          <CardContent className="relative p-6 sm:p-8">
            <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4">
              <div className="min-w-0">
                <Badge variant="secondary" className="mb-3 bg-white/20 text-primary-foreground hover:bg-white/30">
                  <Sparkles className="mr-1 h-3 w-3" /> AI-powered
                </Badge>
                <h2 className="truncate text-2xl font-bold sm:text-3xl">Welcome back, Alex 👋</h2>
                <p className="mt-2 max-w-xl text-sm text-primary-foreground/90 sm:text-base">
                  Your AI assistant is ready to help you write, plan, summarize, and research — so you can focus on what matters.
                </p>
              </div>
              <div className="hidden shrink-0 sm:block">
                <div className="grid h-20 w-20 place-items-center rounded-2xl bg-white/15 backdrop-blur">
                  <Zap className="h-10 w-10" />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Stats */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((s) => (
            <Card key={s.label}>
              <CardContent className="p-5">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">{s.label}</span>
                  <s.icon className={`h-4 w-4 ${s.color}`} />
                </div>
                <div className="mt-3 flex items-baseline gap-2">
                  <span className="text-2xl font-bold">{s.value}</span>
                  <span className="text-xs text-success">{s.change}</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Quick actions */}
        <Card>
          <CardHeader>
            <CardTitle>Quick actions</CardTitle>
            <CardDescription>Jump straight into your favorite AI tools.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
              {quickActions.map((a) => (
                <Link key={a.url} to={a.url} className="group">
                  <div className="flex h-full flex-col gap-2 rounded-xl border bg-card p-4 transition hover:border-primary/50 hover:shadow-md">
                    <div className="grid h-10 w-10 place-items-center rounded-lg bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition">
                      <a.icon className="h-5 w-5" />
                    </div>
                    <div className="font-medium">{a.title}</div>
                    <div className="text-xs text-muted-foreground">{a.desc}</div>
                  </div>
                </Link>
              ))}
            </div>
          </CardContent>
        </Card>

        <div className="grid gap-6 lg:grid-cols-3">
          {/* Recent activity */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Recent activity</CardTitle>
              <CardDescription>Your latest AI-assisted work.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {activity.map((a, i) => (
                <div key={i} className="flex items-center justify-between gap-3 rounded-lg border p-3">
                  <div className="flex min-w-0 items-center gap-3">
                    <div className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-muted">
                      <Sparkles className="h-4 w-4 text-primary" />
                    </div>
                    <div className="min-w-0">
                      <div className="truncate text-sm font-medium">{a.action}</div>
                      <div className="text-xs text-muted-foreground">{a.time}</div>
                    </div>
                  </div>
                  <Badge variant="secondary" className="shrink-0">{a.tag}</Badge>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Tips */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Lightbulb className="h-4 w-4 text-warning" /> AI Productivity Tips
              </CardTitle>
              <CardDescription>Get more from your AI assistant.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {tips.map((t, i) => (
                <div key={i} className="rounded-lg bg-muted/50 p-3 text-sm">
                  {t}
                </div>
              ))}
              <Button variant="outline" className="w-full">View all tips</Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </AppShell>
  );
}
