import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  ArrowUp,
  Code2,
  Compass,
  Mail,
  MapPin,
  MessageSquare,
  Send,
} from "lucide-react";
import { logo } from "../../../assets";
import { HobbyThemeToggle } from "../context/HobbyThemeContext";
import { sendContactEmail } from "../../../utils/sendContactEmail";

const exploreLinks = [
  { label: "3D Journey Atlas", hash: "#journeys" },
  { label: "Curated Gallery", hash: "#gallery" },
  { label: "Featured Films", hash: "#films" },
  { label: "Destination Films", hash: "#stories" },
  { label: "Contact & Dispatch", hash: "#contact" },
  { label: "Full Photo Archive", to: "/hobby/gallery" },
  { label: "Engineering Portfolio", to: "/" },
];

const socialChannels = [
  { label: "Instagram", href: "https://www.instagram.com/zamanarbin/" },
  { label: "YouTube", href: "https://www.youtube.com/@zamanarbin" },
  { label: "Facebook", href: "https://www.facebook.com/zamanarbin/" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/zamanarbin/" },
  { label: "GitHub", href: "https://github.com/arbinzaman" },
];

const HobbyFooter = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const isMainHobbyPage = location.pathname === "/hobby";

  const [contactOpen, setContactOpen] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sending, setSending] = useState(false);
  const [feedback, setFeedback] = useState(null); // { type: "success" | "error", text: string }

  const handleHashJump = (event, hash) => {
    event.preventDefault();
    if (isMainHobbyPage) {
      const target = document.querySelector(hash);
      if (target) {
        target.scrollIntoView({ behavior: "smooth" });
        return;
      }
    }
    navigate(`/hobby${hash}`);
  };

  const handleContactSubmit = async (event) => {
    event.preventDefault();
    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      setFeedback({
        type: "error",
        text: "Please enter your name, email address, and message.",
      });
      return;
    }

    setSending(true);
    setFeedback(null);
    try {
      const result = await sendContactEmail({
        name: form.name,
        email: form.email,
        message: form.message,
        source: "Travel & Visual Stories Portfolio",
      });
      setSending(false);
      setFeedback({
        type: "success",
        text: result.dualEmailSent
          ? "Message sent to arbinzmn@gmail.com! A confirmation copy has also been sent to your email."
          : "Message sent! Arbin will reply to your email soon.",
      });
      setForm({ name: "", email: "", message: "" });
    } catch (error) {
      setSending(false);
      setFeedback({
        type: "error",
        text:
          error?.code === "MISSING_GMAIL_APP_PASSWORD"
            ? "Add GMAIL_APP_PASSWORD in your .env file to activate Gmail sending."
            : error?.message ||
              "Could not send right now — please click arbinzmn@gmail.com to email directly.",
      });
    }
  };

  return (
    <footer className="border-t border-[#17231f]/10 bg-[#fbfaf7] pt-16 pb-12 text-[#17231f] transition-colors duration-300 sm:pt-20 sm:pb-14">
      <div className="mx-auto max-w-7xl px-6 sm:px-12">
        {/* Editorial CTA & Travel Map Banner Card */}
        <div className="relative overflow-hidden rounded-[2rem] border border-[#17231f]/10 bg-[#f3f0e8] p-7 shadow-[0_10px_0_0_#ded9cc,0_20px_40px_-15px_rgba(23,35,31,0.12)] sm:p-10">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full border border-[#36745e]/15"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -bottom-24 -left-16 h-64 w-64 rounded-full border border-[#36745e]/10"
          />

          <div className="relative flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-center">
            <div className="max-w-2xl">
              <div className="inline-flex flex-wrap items-center gap-2.5">
                <span className="inline-flex items-center gap-2 rounded-full border border-[#36745e]/30 bg-white/75 px-3.5 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#36745e]">
                  <span className="h-2 w-2 animate-pulse rounded-full bg-[#36745e]" />
                  Notes from the road
                </span>
                <span className="inline-flex items-center gap-1 text-xs font-medium text-[#17231f]/60">
                  <MapPin size={13} className="text-[#36745e]" />
                  Dhaka, Bangladesh
                </span>
              </div>

              <h3 className="mt-4 text-3xl font-semibold tracking-[-0.05em] text-[#17231f] sm:text-4xl">
                Every journey leaves a story worth keeping.
              </h3>
              <p className="mt-3 max-w-xl text-sm leading-7 text-[#17231f]/65 sm:text-base">
                Create your custom 64-district Bangladesh or 176-country World
                Travel Map, explore the full photography archive, or switch over
                to my software engineering portfolio.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={() => setContactOpen((open) => !open)}
                className="inline-flex items-center gap-2 rounded-full bg-[#36745e] px-5 py-3 text-xs font-semibold uppercase tracking-[0.15em] text-white shadow-[0_4px_0_0_#1b3f31] transition hover:bg-[#245741]"
              >
                <MessageSquare size={15} />
                <span>{contactOpen ? "Close Contact Form" : "Send a Message"}</span>
              </button>
              <a
                href="mailto:arbinzmn@gmail.com"
                className="inline-flex items-center gap-2 rounded-full border border-[#17231f]/15 bg-white/80 px-5 py-3 text-xs font-semibold tracking-[0.04em] text-[#17231f] transition hover:border-[#36745e] hover:text-[#36745e]"
              >
                <Mail size={15} className="text-[#36745e]" />
                <span>arbinzmn@gmail.com</span>
              </a>
              <Link
                to="/"
                className="inline-flex items-center gap-2 rounded-full border border-[#17231f]/15 bg-white/80 px-5 py-3 text-xs font-semibold uppercase tracking-[0.15em] text-[#17231f] transition hover:border-[#36745e] hover:text-[#36745e]"
              >
                <Code2 size={15} className="text-[#36745e]" />
                <span>Coding Portfolio</span>
              </Link>
            </div>
          </div>

          {/* Expandable Direct Gmail Contact Form (Notifies both Arbin & Visitor) */}
          {contactOpen && (
            <form
              onSubmit={handleContactSubmit}
              className="relative mt-8 border-t border-[#17231f]/10 pt-7"
            >
              <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#36745e]">
                  Direct Message · Sends confirmation to both you &amp; arbinzmn@gmail.com
                </p>
              </div>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <label className="block">
                  <span className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[#17231f]/65">
                    Your Name
                  </span>
                  <input
                    type="text"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    placeholder="Enter your name"
                    required
                    className="mt-1.5 w-full rounded-xl border border-[#17231f]/15 bg-white px-4 py-2.5 text-sm text-[#17231f] outline-none transition placeholder:text-[#17231f]/40 focus:border-[#36745e]"
                  />
                </label>
                <label className="block">
                  <span className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[#17231f]/65">
                    Your Email (receives confirmation)
                  </span>
                  <input
                    type="email"
                    value={form.email}
                    onChange={(e) =>
                      setForm({ ...form, email: e.target.value })
                    }
                    placeholder="you@example.com"
                    required
                    className="mt-1.5 w-full rounded-xl border border-[#17231f]/15 bg-white px-4 py-2.5 text-sm text-[#17231f] outline-none transition placeholder:text-[#17231f]/40 focus:border-[#36745e]"
                  />
                </label>
              </div>
              <label className="mt-4 block">
                <span className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[#17231f]/65">
                  Message
                </span>
                <textarea
                  rows={3}
                  value={form.message}
                  onChange={(e) =>
                    setForm({ ...form, message: e.target.value })
                  }
                  placeholder="Write your message, collaboration idea, or travel question..."
                  required
                  className="mt-1.5 w-full rounded-xl border border-[#17231f]/15 bg-white px-4 py-2.5 text-sm text-[#17231f] outline-none transition placeholder:text-[#17231f]/40 focus:border-[#36745e]"
                />
              </label>

              {feedback && (
                <p
                  className={`mt-3 text-xs font-medium ${
                    feedback.type === "success"
                      ? "text-[#36745e]"
                      : "text-red-500"
                  }`}
                >
                  {feedback.text}
                </p>
              )}

              <div className="mt-4 flex items-center justify-end">
                <button
                  type="submit"
                  disabled={sending}
                  className="inline-flex items-center gap-2 rounded-full bg-[#36745e] px-6 py-2.5 text-xs font-semibold uppercase tracking-[0.15em] text-white shadow-[0_3px_0_0_#1b3f31] transition hover:bg-[#245741] disabled:opacity-60"
                >
                  <Send size={13} />
                  <span>{sending ? "Sending..." : "Send Message"}</span>
                </button>
              </div>
            </form>
          )}
        </div>

        {/* Main 12-Column Footer Directory */}
        <div className="mt-14 grid grid-cols-1 gap-10 border-t border-[#17231f]/10 pt-12 md:grid-cols-12">
          {/* Column 1: Brand Identity & Quick Stats */}
          <div className="md:col-span-5">
            <button
              type="button"
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="group inline-flex items-center gap-3 text-left"
            >
              <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-[#17231f]/15 bg-[#f3f0e8] shadow-sm transition group-hover:border-[#36745e]">
                <img
                  src={logo}
                  alt="Arbin Zaman logo"
                  className="h-6 w-6 object-contain"
                />
              </span>
              <div>
                <span className="block text-base font-semibold tracking-tight text-[#17231f] transition group-hover:text-[#36745e]">
                  Arbin Zaman
                </span>
                <span className="block text-[11px] font-medium uppercase tracking-[0.16em] text-[#17231f]/55">
                  Traveller · Visual Storyteller · Engineer
                </span>
              </div>
            </button>

            <p className="mt-4 max-w-sm text-sm leading-6 text-[#17231f]/65">
              Documenting landscapes, mountain roads, rivers, and heritage across
              Bangladesh, India, and beyond.
            </p>

            <div className="mt-5 flex flex-wrap gap-2">
              <span className="rounded-full border border-[#17231f]/10 bg-[#f3f0e8] px-3 py-1 text-[11px] font-medium text-[#17231f]/75">
                27 / 64 BD Districts
              </span>
              <span className="rounded-full border border-[#17231f]/10 bg-[#f3f0e8] px-3 py-1 text-[11px] font-medium text-[#17231f]/75">
                90+ Original Frames
              </span>
              <span className="rounded-full border border-[#17231f]/10 bg-[#f3f0e8] px-3 py-1 text-[11px] font-medium text-[#17231f]/75">
                176-Country World Map
              </span>
            </div>
          </div>

          {/* Column 2: Explore Navigation */}
          <div className="md:col-span-3">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#36745e]">
              Explore
            </p>
            <ul className="mt-4 space-y-2.5 text-sm">
              {exploreLinks.map((item) => (
                <li key={item.label}>
                  {item.hash ? (
                    <a
                      href={item.hash}
                      onClick={(e) => handleHashJump(e, item.hash)}
                      className="text-[#17231f]/70 transition hover:text-[#36745e]"
                    >
                      {item.label}
                    </a>
                  ) : (
                    <Link
                      to={item.to}
                      className="text-[#17231f]/70 transition hover:text-[#36745e]"
                    >
                      {item.label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Contact, Social Channels & Theme / Back-to-Top Controls */}
          <div className="flex flex-col justify-between gap-6 md:col-span-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#36745e]">
                Contact &amp; Follow Along
              </p>
              <a
                href="mailto:arbinzmn@gmail.com"
                className="mt-3 inline-flex items-center gap-2 rounded-full border border-[#36745e]/30 bg-[#f3f0e8] px-4 py-2 text-xs font-semibold text-[#36745e] transition hover:bg-[#36745e] hover:text-white"
              >
                <Mail size={14} />
                <span>arbinzmn@gmail.com</span>
              </a>
              <div className="mt-3 flex flex-wrap gap-2">
                {socialChannels.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1 rounded-full border border-[#17231f]/12 bg-[#f3f0e8] px-3.5 py-1.5 text-xs font-medium text-[#17231f]/75 transition hover:border-[#36745e] hover:text-[#36745e]"
                  >
                    <span>{social.label}</span>
                    <span aria-hidden="true" className="text-[10px] opacity-60">
                      ↗
                    </span>
                  </a>
                ))}
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
              <HobbyThemeToggle />
              <button
                type="button"
                onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                aria-label="Back to top of page"
                className="group inline-flex items-center gap-2 rounded-full border border-[#17231f]/15 bg-[#f3f0e8] px-4 py-2 text-xs font-semibold uppercase tracking-[0.14em] text-[#17231f] transition hover:border-[#36745e] hover:bg-[#36745e] hover:text-white"
              >
                <span>Back to top</span>
                <ArrowUp
                  size={14}
                  className="transition-transform group-hover:-translate-y-0.5"
                />
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Copyright & Signature Bar */}
        <div className="mt-10 flex flex-col justify-between gap-3 border-t border-[#17231f]/10 pt-6 text-xs text-[#17231f]/50 sm:flex-row sm:items-center">
          <p>
            © {new Date().getFullYear()} Arbin Zaman · Travel &amp; Visual
            Stories · All rights reserved
          </p>
          <Link
            to="/"
            className="font-medium text-[#36745e] transition hover:text-[#17231f]"
          >
            Designed &amp; engineered by Arbin Zaman →
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default HobbyFooter;

