import { Mail, MessageCircle, Phone } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export default function ContactPage() {
  return (
    <div className="container max-w-4xl py-10 space-y-8">
      <div className="space-y-2 text-center">
        <h1 className="text-3xl font-heading font-bold">Contact & Support</h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Need help with a booking, refund, or schedule? Reach our support team
          and we&apos;ll get back to you shortly.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-[1.2fr,0.8fr] items-start">
        <Card className="glass-card-elevated">
          <CardHeader>
            <CardTitle className="text-base font-medium">
              Send us a message
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <label className="text-xs font-medium text-muted-foreground">
                    Full name
                  </label>
                  <Input placeholder="John Deng" required />
                </div>
                <div>
                  <label className="text-xs font-medium text-muted-foreground">
                    Email
                  </label>
                  <Input type="email" placeholder="you@example.com" required />
                </div>
              </div>
              <div>
                <label className="text-xs font-medium text-muted-foreground">
                  Subject
                </label>
                <Input placeholder="Ticket enquiry, refund, schedule..." />
              </div>
              <div>
                <label className="text-xs font-medium text-muted-foreground">
                  Message
                </label>
                <Textarea
                  rows={4}
                  placeholder="Share details about your issue or question..."
                />
              </div>
              <Button type="submit" className="w-full md:w-auto">
                Send message
              </Button>
              <p className="text-[11px] text-muted-foreground mt-1">
                Demo form only. Hook this up to your helpdesk or email backend
                in production.
              </p>
            </form>
          </CardContent>
        </Card>

        <Card className="glass-card-elevated">
          <CardHeader>
            <CardTitle className="text-base font-medium">
              Other ways to reach us
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-sm">
            <div className="flex gap-3">
              <div className="rounded-lg bg-primary/10 p-2">
                <Phone className="h-4 w-4 text-primary" />
              </div>
              <div>
                <p className="font-medium">Call center</p>
                <p className="text-muted-foreground">
                  +211 912 345 678 <br />
                  Mon – Sun, 6:00 – 22:00
                </p>
              </div>
            </div>
            <div className="flex gap-3">
              <div className="rounded-lg bg-primary/10 p-2">
                <Mail className="h-4 w-4 text-primary" />
              </div>
              <div>
                <p className="font-medium">Email support</p>
                <p className="text-muted-foreground">
                  support@nileticketer.com
                </p>
              </div>
            </div>
            <div className="flex gap-3">
              <div className="rounded-lg bg-primary/10 p-2">
                <MessageCircle className="h-4 w-4 text-primary" />
              </div>
              <div>
                <p className="font-medium">WhatsApp</p>
                <p className="text-muted-foreground">
                  +211 987 654 321 <br />
                  Quick responses for urgent travel queries.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

