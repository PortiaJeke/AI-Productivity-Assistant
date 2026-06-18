import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { FileText, Sparkles, CheckCircle2, Calendar, Gavel } from "lucide-react";
import { toast } from "sonner";

import { AppShell } from "@/components/app-shell";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/meetings")({
  head: () => ({ meta: [{ title: "Meeting Notes Summarizer — AI Workplace" }] }),
  component: MeetingsPage,
});

type Result = {
  summary: string;
  actionItems: string[];
  decisions: string[];
  deadlines: { item: string; due: string }[];
};

function MeetingsPage() {
  const [notes, setNotes] = useState("");
  const [result, setResult] = useState<Result | null>(null);
  const [loading, setLoading] = useState(false);

  const summarize = () => {
    if (!notes.trim()) return toast.error("Paste meeting notes first");
    setLoading(true);
    setTimeout(() => {
      setResult({
        summary:
          "The team reviewed Q4 priorities, aligned on the launch timeline for the new analytics dashboard, and discussed resourcing for the upcoming customer research initiative. Engineering will lead the technical scoping while design completes the v2 mockups.",
        actionItems: [
          "Sarah to finalize dashboard mockups by end of week",
          "Eng team to scope backend changes for the new metrics",
          "Marketing to draft launch announcement and review with leadership",
          "Schedule customer interviews for the research initiative",
        ],
        decisions: [
          "Launch the analytics dashboard in early December",
          "Use existing event pipeline; defer migration to next quarter",
          "Hire one additional designer for the research initiative",
        ],
        deadlines: [
          { item: "Design v2 mockups", due: "Fri, Nov 8" },
          { item: "Backend scoping doc", due: "Wed, Nov 13" },
          { item: "Launch announcement draft", due: "Mon, Nov 25" },
        ],
      });
      setLoading(false);
      toast.success("Meeting summarized");
    }, 700);
  };

  return (
    <AppShell title="Meeting Notes Summarizer">
      <div className="grid gap-6 lg:grid-cols-5">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><FileText className="h-4 w-4 text-primary" /> Meeting notes</CardTitle>
            <CardDescription>Paste raw notes or a transcript.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Notes</Label>
              <Textarea rows={14} value={notes} onChange={(e) => setNotes(e.target.value)} placeholder="Paste your meeting transcript or rough notes here..." />
            </div>
            <Button onClick={summarize} disabled={loading} className="w-full">
              <Sparkles className="mr-2 h-4 w-4" /> {loading ? "Summarizing..." : "Summarize Meeting"}
            </Button>
          </CardContent>
        </Card>

        <div className="space-y-6 lg:col-span-3">
          <Card>
            <CardHeader><CardTitle>Summary</CardTitle></CardHeader>
            <CardContent>
              <Textarea
                rows={5}
                value={result?.summary ?? ""}
                onChange={(e) => result && setResult({ ...result, summary: e.target.value })}
                placeholder="AI summary will appear here..."
              />
            </CardContent>
          </Card>

          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader><CardTitle className="flex items-center gap-2 text-base"><CheckCircle2 className="h-4 w-4 text-success" /> Action Items</CardTitle></CardHeader>
              <CardContent>
                {result ? (
                  <ul className="space-y-2 text-sm">
                    {result.actionItems.map((a, i) => (
                      <li key={i} className="flex gap-2 rounded-md border p-2"><span className="text-muted-foreground">{i + 1}.</span><span>{a}</span></li>
                    ))}
                  </ul>
                ) : <p className="text-sm text-muted-foreground">No items yet</p>}
              </CardContent>
            </Card>
            <Card>
              <CardHeader><CardTitle className="flex items-center gap-2 text-base"><Gavel className="h-4 w-4 text-primary" /> Decisions</CardTitle></CardHeader>
              <CardContent>
                {result ? (
                  <ul className="space-y-2 text-sm">
                    {result.decisions.map((d, i) => <li key={i} className="rounded-md border p-2">{d}</li>)}
                  </ul>
                ) : <p className="text-sm text-muted-foreground">No decisions yet</p>}
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader><CardTitle className="flex items-center gap-2 text-base"><Calendar className="h-4 w-4 text-accent" /> Deadlines</CardTitle></CardHeader>
            <CardContent>
              {result ? (
                <div className="space-y-2">
                  {result.deadlines.map((d, i) => (
                    <div key={i} className="flex items-center justify-between gap-2 rounded-md border p-3 text-sm">
                      <span>{d.item}</span>
                      <span className="rounded-full bg-warning/15 px-2 py-0.5 text-xs font-medium text-warning">{d.due}</span>
                    </div>
                  ))}
                </div>
              ) : <p className="text-sm text-muted-foreground">No deadlines yet</p>}
            </CardContent>
          </Card>
        </div>
      </div>
    </AppShell>
  );
}
