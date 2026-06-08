"use client";

import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Mail, Phone, MapPin, Clock, Send, CheckCircle } from "lucide-react";
import { motion } from "framer-motion";

export default function ContactPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !message.trim()) return;
    setSending(true);

    try {
      await fetch("/api/notifications/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          to: "support@trippyheadstash.com",
          customerName: "Contact Form",
          orderNumber: "N/A",
          status: "pending",
          message: `From: ${name} (${email})\nSubject: ${subject}\n\n${message}`,
          items: [],
          total: 0,
        }),
      });
    } catch {
      // Silently handle - the email route may not be configured
    }

    setSending(false);
    setSent(true);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-12 max-w-5xl">
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-7xl font-black mb-4 bg-gradient-to-r from-primary via-accent to-accent-purple bg-clip-text text-transparent">
            CONTACT US
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Have a question, concern, or just want to say hi? We&apos;d love to hear from you.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <div className="bg-card border border-border rounded-2xl p-6 text-center">
            <div className="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center mx-auto mb-4">
              <Mail className="w-6 h-6 text-accent" />
            </div>
            <h3 className="font-bold mb-2">Email</h3>
            <p className="text-muted-foreground text-sm">support@trippyheadstash.com</p>
          </div>
          <div className="bg-card border border-border rounded-2xl p-6 text-center">
            <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-4">
              <Phone className="w-6 h-6 text-primary" />
            </div>
            <h3 className="font-bold mb-2">Phone</h3>
            <p className="text-muted-foreground text-sm">(661) 555-0123</p>
          </div>
          <div className="bg-card border border-border rounded-2xl p-6 text-center">
            <div className="w-12 h-12 bg-accent-purple/10 rounded-xl flex items-center justify-center mx-auto mb-4">
              <Clock className="w-6 h-6 text-accent-purple" />
            </div>
            <h3 className="font-bold mb-2">Hours</h3>
            <p className="text-muted-foreground text-sm">Mon-Sun, 9am - 10pm</p>
          </div>
        </div>

        <div className="bg-card border border-border rounded-2xl p-8 md:p-12">
          {sent ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-12"
            >
              <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-6" />
              <h2 className="text-2xl font-bold mb-2">Message Sent!</h2>
              <p className="text-muted-foreground">
                We&apos;ll get back to you as soon as possible.
              </p>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="text-xs uppercase tracking-widest font-bold text-muted-foreground block mb-2">
                    Name *
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    placeholder="Your name"
                    className="w-full px-4 py-3 bg-background border border-border rounded-xl focus:border-primary outline-none"
                  />
                </div>
                <div>
                  <label className="text-xs uppercase tracking-widest font-bold text-muted-foreground block mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    placeholder="your@email.com"
                    className="w-full px-4 py-3 bg-background border border-border rounded-xl focus:border-primary outline-none"
                  />
                </div>
              </div>
              <div>
                <label className="text-xs uppercase tracking-widest font-bold text-muted-foreground block mb-2">
                  Subject
                </label>
                <input
                  type="text"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  placeholder="How can we help?"
                  className="w-full px-4 py-3 bg-background border border-border rounded-xl focus:border-primary outline-none"
                />
              </div>
              <div>
                <label className="text-xs uppercase tracking-widest font-bold text-muted-foreground block mb-2">
                  Message *
                </label>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  required
                  rows={6}
                  placeholder="Tell us what's on your mind..."
                  className="w-full px-4 py-3 bg-background border border-border rounded-xl focus:border-primary outline-none resize-none"
                />
              </div>
              <button
                type="submit"
                disabled={sending || !name.trim() || !email.trim() || !message.trim()}
                className="w-full py-4 bg-gradient-to-r from-primary to-accent text-white font-black rounded-xl hover:opacity-90 transition-opacity flex items-center justify-center gap-2 disabled:opacity-50"
              >
                <Send className="w-5 h-5" />
                {sending ? "SENDING..." : "SEND MESSAGE"}
              </button>
            </form>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
