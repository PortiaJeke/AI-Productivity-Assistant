import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Search, Sparkles, Lightbulb, Target } from "lucide-react";
import { toast } from "sonner";

import { AppShell } from "@/components/app-shell";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

export const Route = createFileRoute("/research")({
  head: () => ({ meta: [{ title: "AI Research Assistant — AI Workplace" }] }),
  component: ResearchPage,
});

type Result = { overview: string; insights: string[]; recommendations: string[] };

function ResearchPage() {
  const [topic, setTopic] = useState("");
  const [result, setResult] = useState<Result | null>(null);
  const [loading, setLoading] = useState(false);

  const research = () => {
    if (!topic) return toast.error("Enter a topic");
    setLoading(true);
    setTimeout(() => {
      setResult({
        overview: `${topic} is a rapidly evolving area shaped by recent technological advances, shifting consumer expectations, and a more competitive regulatory landscape. Organizations adopting it early are reporting measurable gains in efficiency, customer satisfaction, and innovation velocity, though challenges around adoption, ethics, and integration remain real considerations.`,
        insights: [
          "Adoption is accelerating across mid-market and enterprise segments",
          "Cost-of-entry has dropped meaningfully in the past 18 months",
          "Talent and change-management remain the top inhibitors",
          "Early movers are seeing 2-3x productivity gains in core workflows",
        ],
        recommendations: [
          `Run a 30-day pilot focused on a single high-impact use case in ${topic}`,
          "Identify 1-2 internal champions and invest in enablement",
          "Set clear success metrics before scaling — measure outcomes, not activity",
          "Establish lightweight governance to manage risk without slowing experimentation",
        ],
      });
      setLoading(false);
      toast.success("Research complete");
    }, 800);
  };

  return (
    <AppShell title="AI Research Assistant">
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><Search className="h-4 w-4 text-primary" /> Research a topic</CardTitle>
            <CardDescription>Get an instant briefing with insights and recommendations.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-3 sm:grid-cols-[1fr_auto]">
              <Input value={topic} onChange={(e) => setTopic(e.target.value)} placeholder="e.g. AI in customer support" />
              <Button onClick={research} disabled={loading}>
                <Sparkles className="mr-2 h-4 w-4" /> {loading ? "Researching..." : "Research"}
              </Button>
            </div>
          </CardContent>
        </Card>

        {result && (
          <>
            <Card>
              <CardHeader><CardTitle>Overview</CardTitle></CardHeader>
              <CardContent>
                <Textarea
                  rows={5}
                  value={result.overview}
                  onChange={(e) => setResult({ ...result, overview: e.target.value })}
                />
              </CardContent>
            </Card>

            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-base"><Lightbulb className="h-4 w-4 text-warning" /> Key Insights</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm">
                    {result.insights.map((insight, i) => (
                      <li key={i} className="flex gap-3 rounded-md border p-3">
                        <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-warning/15 text-xs font-semibold text-warning">{i + 1}</span>
                        <span>{insight}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-base"><Target className="h-4 w-4 text-success" /> Recommendations</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm">
                    {result.recommendations.map((rec, i) => (
                      <li key={i} className="flex gap-3 rounded-md border p-3">
                        <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-success/15 text-xs font-semibold text-success">{i + 1}</span>
                        <span>{rec}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>
          </>
        )}
      </div>
    </AppShell>
  );
}
