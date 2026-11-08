import React, { useState } from "react";
import {
  Check,
  Compass,
  Copy,
  Film,
  Globe2,
  Mail,
  MapPin,
  Send,
  Sparkles,
} from "lucide-react";
import { sendContactEmail } from "../../../utils/sendContactEmail";

const DISPATCH_TOPICS = [
  { id: "map", label: "Travel Map Creator", icon: Globe2 },
  { id: "film", label: "Videography & Film", icon: Film },
  { id: "collab", label: "Travel Collaboration", icon: Compass },
  { id: "hello", label: "Just Saying Hi", icon: Sparkles },
];

const HobbyContactSection = () => {
  const [selectedTopic, setSelectedTopic] = useState("Travel Map Creator");
  const [form, setForm] = useState({
    name: "",
    email: "",
    location: "",
    message: "",
  });
  const [sending, setSending] = useState(false);
  const [copied, setCopied] = useState(false);
  const [feedback, setFeedback] = useState(null);

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText("arbinzmn@gmail.com");
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2200);
    } catch {
      // Ignore clipboard fallback
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      setFeedback({
        type: "error",
        text: "Please fill in your name, email address, and message before sending.",
      });
      return;
    }

    setSending(true);
    setFeedback(null);

    const formattedMessage = [
      selectedTopic ? `[Topic: ${selectedTopic}]` : null,
      form.location.trim() ? `[From: ${form.location.trim()}]` : null,
      "",
      form.message.trim(),
    ]
      .filter((line) => line !== null)
      .join("\n");

    try {
      const result = await sendContactEmail({
        name: form.name.trim(),
        email: form.email.trim(),
        message: formattedMessage,
        source: "Travel & Visual Stories Portfolio",
      });

      setSending(false);
      setFeedback({
        type: "success",
        text: result.dualEmailSent
          ? "Postcard delivered! Both you and arbinzmn@gmail.com have received a confirmation email."
          : "Postcard delivered! Arbin will reply to your email soon.",
      });
      setForm({ name: "", email: "", location: "", message: "" });
    } catch (error) {
      setSending(false);
      setFeedback({
        type: "error",
        text:
          error?.code === "MISSING_GMAIL_APP_PASSWORD"
            ? "Please add GMAIL_APP_PASSWORD in your .env file to activate Gmail sending."
            : error?.message ||
              "Could not send right now — please email arbinzmn@gmail.com directly.",
      });
    }
  };

  return (
    <section
      id="contact"
      className="mx-auto max-w-7xl px-6 py-20 sm:px-12 sm:py-28"
    >
      <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:items-start">
        {/* Left Column — Editorial Dispatch Info & Coordinates */}
        <div className="lg:col-span-5">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#36745e]/30 bg-[#36745e]/10 px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-[0.22em] text-[#36745e]">
            <Compass size={13} />
            <span>Postcard &amp; Dispatch Desk</span>
          </div>

          <h2 className="mt-5 text-4xl font-semibold tracking-[-0.05em] text-[#17231f] sm:text-5xl">
            Send a note from your corner of the world.
          </h2>

          <p className="mt-4 text-sm leading-7 text-[#17231f]/70 sm:text-base">
            Whether you want to collaborate on a travel film, share feedback on
            the interactive Bangladesh 64-district &amp; World Travel Map
            Creator, swap route notes across the hills and haors, or simply say
            hello — drop a message here.
          </p>

          {/* Direct Email & Coordinates Cards */}
          <div className="mt-8 space-y-4">
            <div className="rounded-[1.5rem] border border-[#17231f]/10 bg-[#f3f0e8] p-5 shadow-[0_6px_0_0_#ded9cc]">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-3.5">
                  <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#36745e] text-white shadow-[0_3px_0_0_#1b3f31]">
                    <Mail size={18} />
                  </span>
                  <div>
                    <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#17231f]/55">
                      Direct Dispatch Email
                    </p>
                    <a
                      href="mailto:arbinzmn@gmail.com"
                      className="mt-0.5 block text-base font-semibold tracking-[-0.02em] text-[#17231f] transition hover:text-[#36745e]"
                    >
                      arbinzmn@gmail.com
                    </a>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleCopyEmail}
                  className="inline-flex items-center gap-1.5 rounded-full border border-[#17231f]/15 bg-white/80 px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-[#17231f] transition hover:border-[#36745e] hover:text-[#36745e]"
                >
                  {copied ? (
                    <>
                      <Check size={13} className="text-[#36745e]" />
                      <span>Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy size={13} className="text-[#36745e]" />
                      <span>Copy</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            <div className="rounded-[1.5rem] border border-[#17231f]/10 bg-[#f3f0e8] p-5 shadow-[0_6px_0_0_#ded9cc]">
              <div className="flex items-center gap-3.5">
                <span className="flex h-11 w-11 items-center justify-center rounded-2xl border border-[#36745e]/25 bg-white/80 text-[#36745e]">
                  <MapPin size={18} />
                </span>
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#17231f]/55">
                    Home Base &amp; Coordinates
                  </p>
                  <p className="mt-0.5 text-sm font-semibold text-[#17231f]">
                    Dhaka, Bangladesh &middot; 23.8103&deg; N, 90.4125&deg; E
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Instant Dual Confirmation Note */}
          <div className="mt-6 flex items-start gap-3 rounded-2xl border border-[#36745e]/20 bg-[#36745e]/8 px-4 py-3.5 text-xs leading-relaxed text-[#17231f]/75">
            <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-[#36745e]" />
            <p>
              <strong className="font-semibold text-[#17231f]">
                Instant Receipt:
              </strong>{" "}
              Sending a message here delivers your note straight to{" "}
              <span className="font-semibold text-[#36745e]">
                arbinzmn@gmail.com
              </span>{" "}
              and sends an automatic confirmation copy to your inbox.
            </p>
          </div>
        </div>

        {/* Right Column — 3D Postcard Contact Form */}
        <div className="lg:col-span-7">
          <div className="relative overflow-hidden rounded-[2rem] border border-[#17231f]/12 bg-[#f3f0e8] p-6 shadow-[0_12px_0_0_#ded9cc,0_24px_50px_-15px_rgba(23,35,31,0.14)] sm:p-10">
            {/* Decorative Postmark / Stamp Header */}
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#17231f]/10 pb-6">
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[#36745e]">
                  Traveler&apos;s Postcard
                </p>
                <h3 className="mt-1 text-2xl font-semibold tracking-[-0.04em] text-[#17231f]">
                  Write to Arbin Zaman
                </h3>
              </div>

              {/* Stylized Postage Stamp */}
              <div className="flex items-center gap-2.5 rounded-2xl border-2 border-dashed border-[#36745e]/35 bg-white/75 px-3.5 py-2 text-right">
                <Globe2 size={18} className="text-[#36745e]" />
                <div>
                  <p className="font-mono text-[9px] font-bold uppercase tracking-[0.2em] text-[#36745e]">
                    AIR MAIL &middot; PRIORITY
                  </p>
                  <p className="font-mono text-[10px] font-semibold text-[#17231f]/70">
                    BD-64 &bull; WORLD-176
                  </p>
                </div>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="mt-6 space-y-5">
              {/* Topic Selector Pills */}
              <div>
                <span className="block text-[11px] font-semibold uppercase tracking-[0.16em] text-[#17231f]/65">
                  What is your note about?
                </span>
                <div className="mt-2.5 flex flex-wrap gap-2">
                  {DISPATCH_TOPICS.map(({ id, label, icon: Icon }) => {
                    const active = selectedTopic === label;
                    return (
                      <button
                        key={id}
                        type="button"
                        onClick={() => setSelectedTopic(label)}
                        className={`inline-flex items-center gap-2 rounded-full px-3.5 py-2 text-xs font-semibold transition ${
                          active
                            ? "bg-[#36745e] text-white shadow-[0_3px_0_0_#1b3f31]"
                            : "border border-[#17231f]/15 bg-white/80 text-[#17231f]/75 hover:border-[#36745e]/50 hover:text-[#36745e]"
                        }`}
                      >
                        <Icon size={13} />
                        <span>{label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Name & Email Row */}
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <label className="block">
                  <span className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#17231f]/65">
                    Your Name *
                  </span>
                  <input
                    type="text"
                    required
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    placeholder="e.g. Tariq Hasan"
                    className="mt-2 w-full rounded-xl border border-[#17231f]/15 bg-white px-4 py-3 text-sm text-[#17231f] outline-none transition placeholder:text-[#17231f]/40 focus:border-[#36745e]"
                  />
                </label>

                <label className="block">
                  <span className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#17231f]/65">
                    Your Email Address *
                  </span>
                  <input
                    type="email"
                    required
                    value={form.email}
                    onChange={(e) =>
                      setForm({ ...form, email: e.target.value })
                    }
                    placeholder="you@example.com"
                    className="mt-2 w-full rounded-xl border border-[#17231f]/15 bg-white px-4 py-3 text-sm text-[#17231f] outline-none transition placeholder:text-[#17231f]/40 focus:border-[#36745e]"
                  />
                </label>
              </div>

              {/* Optional City / Country Input */}
              <label className="block">
                <span className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#17231f]/65">
                  Where are you writing from?{" "}
                  <span className="font-normal lowercase opacity-60">
                    (optional)
                  </span>
                </span>
                <input
                  type="text"
                  value={form.location}
                  onChange={(e) =>
                    setForm({ ...form, location: e.target.value })
                  }
                  placeholder="e.g. Sylhet, Bangladesh or Kolkata, India"
                  className="mt-2 w-full rounded-xl border border-[#17231f]/15 bg-white px-4 py-3 text-sm text-[#17231f] outline-none transition placeholder:text-[#17231f]/40 focus:border-[#36745e]"
                />
              </label>

              {/* Message Textarea */}
              <label className="block">
                <span className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#17231f]/65">
                  Your Message *
                </span>
                <textarea
                  rows={4}
                  required
                  value={form.message}
                  onChange={(e) =>
                    setForm({ ...form, message: e.target.value })
                  }
                  placeholder="Share your travel story, collaboration idea, or feedback on the 3D Map Creator..."
                  className="mt-2 w-full rounded-xl border border-[#17231f]/15 bg-white px-4 py-3 text-sm text-[#17231f] outline-none transition placeholder:text-[#17231f]/40 focus:border-[#36745e]"
                />
              </label>

              {/* Submit Row */}
              <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
                <button
                  type="submit"
                  disabled={sending}
                  className="inline-flex items-center gap-2.5 rounded-full bg-[#36745e] px-7 py-3.5 text-xs font-semibold uppercase tracking-[0.16em] text-white shadow-[0_5px_0_0_#1b3f31] transition hover:bg-[#245741] active:translate-y-[2px] disabled:opacity-60"
                >
                  <Send size={15} />
                  <span>{sending ? "Sending Postcard..." : "Send Postcard"}</span>
                </button>

                <span className="text-xs text-[#17231f]/60">
                  Replies directly from{" "}
                  <strong className="font-semibold text-[#17231f]">
                    arbinzmn@gmail.com
                  </strong>
                </span>
              </div>

              {feedback && (
                <div
                  role="status"
                  className={`rounded-2xl border px-4 py-3 text-xs font-medium leading-relaxed ${
                    feedback.type === "success"
                      ? "border-[#36745e]/35 bg-[#36745e]/10 text-[#36745e]"
                      : "border-[#d35f3f]/35 bg-[#d35f3f]/10 text-[#d35f3f]"
                  }`}
                >
                  {feedback.text}
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HobbyContactSection;

