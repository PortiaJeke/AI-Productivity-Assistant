import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { ListTodo, Sparkles, Plus, Trash2, Clock } from "lucide-react";
import { toast } from "sonner";

import { AppShell } from "@/components/app-shell";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";

export const Route = createFileRoute("/tasks")({
  head: () => ({ meta: [{ title: "AI Task Planner — AI Workplace" }] }),
  component: TasksPage,
});

type Task = { id: string; title: string; priority: "low" | "medium" | "high"; due: string };
type Slot = { time: string; task: string };

const priorityColor: Record<Task["priority"], string> = {
  low: "bg-muted text-muted-foreground",
  medium: "bg-primary/15 text-primary",
  high: "bg-destructive/15 text-destructive",
};

function TasksPage() {
  const [title, setTitle] = useState("");
  const [priority, setPriority] = useState<Task["priority"]>("medium");
  const [due, setDue] = useState("");
  const [tasks, setTasks] = useState<Task[]>([
    { id: "1", title: "Review Q4 budget", priority: "high", due: "Today" },
    { id: "2", title: "Prep team standup", priority: "medium", due: "Tomorrow" },
  ]);
  const [schedule, setSchedule] = useState<Slot[]>([]);

  const addTask = () => {
    if (!title) return toast.error("Enter a task");
    setTasks([...tasks, { id: crypto.randomUUID(), title, priority, due: due || "—" }]);
    setTitle(""); setDue("");
  };

  const removeTask = (id: string) => setTasks(tasks.filter((t) => t.id !== id));

  const planDay = () => {
    if (tasks.length === 0) return toast.error("Add tasks first");
    const sorted = [...tasks].sort((a, b) => {
      const order = { high: 0, medium: 1, low: 2 };
      return order[a.priority] - order[b.priority];
    });
    const times = ["9:00 AM", "10:30 AM", "12:00 PM", "2:00 PM", "3:30 PM", "4:30 PM"];
    setSchedule(sorted.slice(0, 6).map((t, i) => ({ time: times[i], task: t.title })));
    toast.success("Daily schedule generated");
  };

  return (
    <AppShell title="AI Task Planner">
      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><ListTodo className="h-4 w-4 text-primary" /> Your tasks</CardTitle>
            <CardDescription>Add tasks and let AI plan your day.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-3 sm:grid-cols-[1fr_auto_auto_auto]">
              <Input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Task title" />
              <Select value={priority} onValueChange={(v) => setPriority(v as Task["priority"])}>
                <SelectTrigger className="w-32"><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">Low</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                </SelectContent>
              </Select>
              <Input className="w-32" type="text" value={due} onChange={(e) => setDue(e.target.value)} placeholder="Due" />
              <Button onClick={addTask} size="icon"><Plus className="h-4 w-4" /></Button>
            </div>

            <div className="space-y-2">
              {tasks.map((t) => (
                <div key={t.id} className="flex items-center justify-between gap-2 rounded-lg border p-3">
                  <div className="min-w-0 flex-1">
                    <div className="truncate text-sm font-medium">{t.title}</div>
                    <div className="text-xs text-muted-foreground">Due {t.due}</div>
                  </div>
                  <Badge className={priorityColor[t.priority]}>{t.priority}</Badge>
                  <Button variant="ghost" size="icon" onClick={() => removeTask(t.id)}><Trash2 className="h-4 w-4" /></Button>
                </div>
              ))}
              {tasks.length === 0 && <p className="text-center text-sm text-muted-foreground py-6">No tasks yet</p>}
            </div>

            <Button onClick={planDay} className="w-full"><Sparkles className="mr-2 h-4 w-4" /> Plan My Day</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><Clock className="h-4 w-4 text-accent" /> Today's schedule</CardTitle>
            <CardDescription>AI-optimized by priority.</CardDescription>
          </CardHeader>
          <CardContent>
            {schedule.length === 0 ? (
              <p className="text-center text-sm text-muted-foreground py-12">Click "Plan My Day" to generate your schedule.</p>
            ) : (
              <div className="space-y-3">
                {schedule.map((s, i) => (
                  <div key={i} className="flex gap-4 rounded-lg border p-3">
                    <div className="w-24 shrink-0 text-sm font-medium text-primary">{s.time}</div>
                    <div className="text-sm">{s.task}</div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </AppShell>
  );
}
