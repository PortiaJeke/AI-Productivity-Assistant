import { createFileRoute } from "@tanstack/react-router";
import { ShieldCheck, AlertTriangle, Lock, Users, Eye, Heart } from "lucide-react";

import { AppShell } from "@/components/app-shell";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

export const Route = createFileRoute("/responsible-ai")({
  head: () => ({ meta: [{ title: "Responsible AI — AI Workplace" }] }),
  component: ResponsibleAI,
});

const principles = [
  {
    icon: AlertTriangle,
    title: "AI has limitations",
    color: "text-warning",
    body: "AI-generated content can be inaccurate, outdated, or biased. Always review outputs critically before acting on them — especially for legal, medical, financial, or hiring decisions.",
  },
  {
    icon: Lock,
    title: "Your privacy matters",
    color: "text-primary",
    body: "Avoid pasting sensitive personal data, confidential business information, or credentials into AI tools. Treat AI inputs the way you'd treat anything sent to a third party.",
  },
  {
    icon: Eye,
    title: "Transparency",
    color: "text-accent",
    body: "Disclose AI-assisted content to colleagues, clients, and customers where appropriate. Trust is built on knowing what's human-authored and what's machine-assisted.",
  },
  {
    icon: Users,
    title: "Humans stay in the loop",
    color: "text-success",
    body: "Use AI to augment your judgment, not replace it. You remain accountable for the work — review, edit, and verify before sharing or publishing anything.",
  },
  {
    icon: Heart,
    title: "Fairness & inclusion",
    color: "text-destructive",
    body: "AI models can reflect societal biases. Watch for stereotyped or exclusionary language and rewrite outputs to be inclusive and respectful of all audiences.",
  },
  {
    icon: ShieldCheck,
    title: "Responsible use",
    color: "text-primary",
    body: "Don't use AI to deceive, harass, or manipulate. Avoid generating misinformation, impersonating real people, or producing content that violates laws or policies.",
  },
];

function ResponsibleAI() {
  return (
    <AppShell title="Responsible AI">
      <div className="space-y-6">
        <Card className="overflow-hidden border-0 gradient-brand text-primary-foreground">
          <CardContent className="p-6 sm:p-8">
            <div className="flex items-start gap-4">
              <div className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-white/15 backdrop-blur">
                <ShieldCheck className="h-6 w-6" />
              </div>
              <div className="min-w-0">
                <h2 className="text-2xl font-bold sm:text-3xl">Using AI responsibly</h2>
                <p className="mt-2 max-w-2xl text-sm text-primary-foreground/90 sm:text-base">
                  AI is a powerful tool — and powerful tools deserve thoughtful use. These principles guide how we built this product and how we hope you'll use it.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid gap-4 md:grid-cols-2">
          {principles.map((p) => (
            <Card key={p.title}>
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="grid h-10 w-10 place-items-center rounded-lg bg-muted">
                    <p.icon className={`h-5 w-5 ${p.color}`} />
                  </div>
                  <CardTitle className="text-base">{p.title}</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">{p.body}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card>
          <CardHeader>
            <CardTitle>A note on this assistant</CardTitle>
            <CardDescription>What you should know about how it works.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3 text-sm text-muted-foreground">
            <p>This assistant generates suggestions based on patterns learned from large amounts of text. It does not "understand" the world the way a human does and may produce confident-sounding but incorrect answers.</p>
            <p>Outputs are starting points, not final answers. Edit, fact-check, and apply your own expertise before relying on anything the AI produces.</p>
            <p>If you spot harmful, biased, or unsafe output, please report it so we can improve the system.</p>
          </CardContent>
        </Card>
      </div>
    </AppShell>
  );
}
