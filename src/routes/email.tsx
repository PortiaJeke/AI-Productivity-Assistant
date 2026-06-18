import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Mail, Sparkles, Copy } from "lucide-react";
import { toast } from "sonner";

import { AppShell } from "@/components/app-shell";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export const Route = createFileRoute("/email")({
  head: () => ({ meta: [{ title: "Smart Email Generator — AI Workplace" }] }),
  component: EmailPage,
});

function EmailPage() {
  const [recipient, setRecipient] = useState("");
  const [subject, setSubject] = useState("");
  const [purpose, setPurpose] = useState("");
  const [tone, setTone] = useState("professional");
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);

  const generate = () => {
    if (!recipient || !purpose) {
      toast.error("Please fill in recipient and purpose");
      return;
    }
    setLoading(true);
    setTimeout(() => {
      const greeting = tone === "formal" ? "Dear" : "Hi";
      setOutput(
        `${greeting} ${recipient},

I hope this message finds you well. I'm reaching out regarding ${subject || "our recent discussion"}.

${purpose}

I'd love to hear your thoughts and would be happy to set up a quick call if helpful. Please let me know what works best for your schedule.

Thanks so much for your time.

Best regards,
Alex`,
      );
      setLoading(false);
      toast.success("Email drafted");
    }, 700);
  };

  return (
    <AppShell title="Smart Email Generator">
      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><Mail className="h-4 w-4 text-primary" /> Compose</CardTitle>
            <CardDescription>Tell the AI what you want to say.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Recipient</Label>
              <Input value={recipient} onChange={(e) => setRecipient(e.target.value)} placeholder="e.g. Sarah from Marketing" />
            </div>
            <div className="space-y-2">
              <Label>Subject</Label>
              <Input value={subject} onChange={(e) => setSubject(e.target.value)} placeholder="e.g. Q4 campaign kickoff" />
            </div>
            <div className="space-y-2">
              <Label>Purpose / key points</Label>
              <Textarea rows={5} value={purpose} onChange={(e) => setPurpose(e.target.value)} placeholder="What should this email accomplish?" />
            </div>
            <div className="space-y-2">
              <Label>Tone</Label>
              <Select value={tone} onValueChange={setTone}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="professional">Professional</SelectItem>
                  <SelectItem value="friendly">Friendly</SelectItem>
                  <SelectItem value="formal">Formal</SelectItem>
                  <SelectItem value="persuasive">Persuasive</SelectItem>
                  <SelectItem value="concise">Concise</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button onClick={generate} disabled={loading} className="w-full">
              <Sparkles className="mr-2 h-4 w-4" /> {loading ? "Generating..." : "Generate Email"}
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Draft</CardTitle>
                <CardDescription>Edit before sending.</CardDescription>
              </div>
              <Button variant="ghost" size="icon" onClick={() => { navigator.clipboard.writeText(output); toast.success("Copied"); }} disabled={!output}>
                <Copy className="h-4 w-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <Textarea
              rows={16}
              value={output}
              onChange={(e) => setOutput(e.target.value)}
              placeholder="Your AI-generated email will appear here..."
              className="font-mono text-sm"
            />
          </CardContent>
        </Card>
      </div>
    </AppShell>
  );
}
