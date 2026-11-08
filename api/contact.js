import tls from "node:tls";
import fs from "node:fs";
import path from "node:path";

const DEFAULT_GMAIL_USER = "arbinzmn@gmail.com";
const ARBIN_PROFILE_IMAGE_URL = "https://i.ibb.co/zhjfpq71/arbinzaman.jpg";

const toBase64Mime = (input) =>
  Buffer.from(String(input), "utf8")
    .toString("base64")
    .replace(/(.{76})/g, "$1\r\n");

function readLocalDotEnv() {
  try {
    const envPath = path.resolve(process.cwd(), ".env");
    if (!fs.existsSync(envPath)) return {};
    const raw = fs.readFileSync(envPath, "utf8");
    const parsed = {};
    for (const line of raw.split(/\r?\n/)) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith("#")) continue;
      const eqIdx = trimmed.indexOf("=");
      if (eqIdx === -1) continue;
      const key = trimmed.slice(0, eqIdx).trim();
      const val = trimmed
        .slice(eqIdx + 1)
        .trim()
        .replace(/^['"]|['"]$/g, "");
      parsed[key] = val;
    }
    return parsed;
  } catch {
    return {};
  }
}

const escapeHtml = (value = "") =>
  String(value).replace(
    /[&<>"']/g,
    (char) =>
      ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;",
      })[char],
  );

const encodeMimeHeader = (text = "") =>
  `=?UTF-8?B?${Buffer.from(String(text), "utf8").toString("base64")}?=`;

/**
 * Minimal, zero-dependency RFC-5321 SMTP client over TLS (smtp.gmail.com:465).
 * Sends one or more MIME emails over a single authenticated TLS session.
 */
function buildMimeMessage({ cleanUser, fromName, to, replyTo, subject, text, html }) {
  const boundary = `----=_Boundary_${Date.now()}_${Math.random().toString(36).slice(2)}`;
  const messageId = `<${Date.now()}.${Math.random().toString(36).slice(2)}@gmail.com>`;
  const dateHeader = new Date().toUTCString();

  return [
    `From: ${encodeMimeHeader(fromName)} <${cleanUser}>`,
    `To: <${to}>`,
    replyTo ? `Reply-To: ${replyTo}` : null,
    `Subject: ${encodeMimeHeader(subject)}`,
    `Date: ${dateHeader}`,
    `Message-ID: ${messageId}`,
    "MIME-Version: 1.0",
    `Content-Type: multipart/alternative; boundary="${boundary}"`,
    "",
    `--${boundary}`,
    "Content-Type: text/plain; charset=UTF-8",
    "Content-Transfer-Encoding: base64",
    "",
    toBase64Mime(text),
    "",
    `--${boundary}`,
    "Content-Type: text/html; charset=UTF-8",
    "Content-Transfer-Encoding: base64",
    "",
    toBase64Mime(html),
    "",
    `--${boundary}--`,
    "",
  ]
    .filter((line) => line !== null)
    .join("\r\n");
}

function sendGmailSmtp({ user, appPassword, ...msg }) {
  return sendGmailSmtpBatch({ user, appPassword, messages: [msg] });
}

function sendGmailSmtpBatch({ user, appPassword, messages }) {
  return new Promise((resolve, reject) => {
    const cleanUser = String(user).replace(/['"\s]+/g, "");
    const cleanPass = String(appPassword).replace(/['"\s]+/g, "");
    const socket = tls.connect(
      {
        host: "smtp.gmail.com",
        port: 465,
        servername: "smtp.gmail.com",
        family: 4,
        rejectUnauthorized: true,
      },
      () => {},
    );

    socket.setTimeout(9500);
    socket.on("timeout", () => {
      socket.destroy();
      reject(new Error("SMTP connection timed out"));
    });
    socket.on("error", (err) => reject(err));

    const steps = [
      { expect: "220", cmd: "EHLO arbin.me" },
      { expect: "250", cmd: "AUTH LOGIN" },
      { expect: "334", cmd: Buffer.from(cleanUser, "utf8").toString("base64") },
      { expect: "334", cmd: Buffer.from(cleanPass, "utf8").toString("base64") },
    ];

    messages.forEach((msg, index) => {
      const mimeMessage = buildMimeMessage({ cleanUser, ...msg });
      steps.push({
        expect: index === 0 ? "235" : "250",
        cmd: `MAIL FROM:<${cleanUser}>`,
      });
      steps.push({ expect: "250", cmd: `RCPT TO:<${msg.to}>` });
      steps.push({ expect: "250", cmd: "DATA" });
      steps.push({ expect: "354", cmd: `${mimeMessage}\r\n.` });
    });

    steps.push({ expect: "250", cmd: "QUIT" });

    let stepIndex = 0;
    let buffer = "";

    socket.on("data", (chunk) => {
      buffer += chunk.toString("utf8");
      const lines = buffer.split("\r\n");
      buffer = lines.pop() || "";

      for (const line of lines) {
        if (!line) continue;
        // Multi-line SMTP response continues if 4th char is '-'
        if (line.length >= 4 && line[3] === "-") continue;

        const currentStep = steps[stepIndex];
        if (!currentStep) {
          socket.end();
          resolve();
          return;
        }

        if (!line.startsWith(currentStep.expect)) {
          socket.destroy();
          reject(
            new Error(
              `SMTP error at step ${stepIndex} (expected ${currentStep.expect}): ${line}`,
            ),
          );
          return;
        }

        stepIndex += 1;
        socket.write(`${currentStep.cmd}\r\n`);

        if (stepIndex >= steps.length) {
          socket.end();
          resolve();
          return;
        }
      }
    });
  });
}

function buildOwnerEmail({ name, email, message, source, timeFormatted }) {
  const safeName = escapeHtml(name);
  const safeEmail = escapeHtml(email);
  const safeSource = escapeHtml(source);
  const safeMessage = escapeHtml(message).replace(/\n/g, "<br/>");
  const initials =
    escapeHtml(
      name
        .trim()
        .split(/\s+/)
        .slice(0, 2)
        .map((part) => part[0]?.toUpperCase() || "")
        .join(""),
    ) || "AZ";

  const text = [
    `NEW INQUIRY FROM ${name.toUpperCase()}`,
    `==================================================`,
    `Source  : ${source}`,
    `Sender  : ${name} <${email}>`,
    `Time    : ${timeFormatted} (BST)`,
    `--------------------------------------------------`,
    `Message :`,
    message,
    `==================================================`,
    `Reply directly to this email to respond to ${name}.`,
  ].join("\n");

  const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>New Portfolio Inquiry from ${safeName}</title>
</head>
<body style="margin:0;padding:0;background-color:#050816;font-family:'Segoe UI',-apple-system,BlinkMacSystemFont,Roboto,Helvetica,Arial,sans-serif;-webkit-font-smoothing:antialiased;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background-color:#050816;padding:32px 14px;">
    <tr>
      <td align="center">
        <!-- 3D Exploded Outer Plate Card -->
        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="max-width:620px;background-color:#0b0e22;border:1px solid #2d265a;border-right:4px solid #1e1842;border-bottom:8px solid #3b1d7a;border-radius:24px;overflow:hidden;box-shadow:0 28px 60px rgba(0,0,0,0.65);">
          
          <!-- Top 3D Accent Rim -->
          <tr>
            <td style="height:5px;background:linear-gradient(90deg,#915EFF 0%,#22d3ee 50%,#36745e 100%);font-size:0;line-height:0;">&nbsp;</td>
          </tr>

          <!-- 3D Hero Header Deck -->
          <tr>
            <td style="padding:30px 32px 26px;background:linear-gradient(145deg,#17133a 0%,#0d1229 60%,#112623 100%);border-bottom:2px solid #251f4d;">
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
                <tr>
                  <td width="64" valign="middle" style="padding-right:16px;">
                    <img src="${ARBIN_PROFILE_IMAGE_URL}" alt="Arbin Zaman" width="56" height="56"
                         style="display:block;width:56px;height:56px;border-radius:16px;border:2px solid #a78bfa;border-bottom:4px solid #3b1d7a;object-fit:cover;" />
                  </td>
                  <td valign="middle">
                    <!-- 3D Status Keycap Tag -->
                    <span style="display:inline-block;background-color:#110e29;border:1px solid #6d4aff;border-bottom:3px solid #4827b0;border-radius:8px;padding:5px 12px;font-family:Consolas,monospace;font-size:11px;font-weight:700;letter-spacing:1.8px;text-transform:uppercase;color:#c4b5fd;">
                      &#9679; INCOMING DISPATCH &middot; ${safeSource}
                    </span>
                    <p style="margin:7px 0 0;font-size:13px;font-weight:700;color:#e2e8f0;">
                      Arbin Zaman &middot; Portfolio Inbox
                    </p>
                  </td>
                </tr>
                <tr>
                  <td colspan="2" style="padding-top:16px;">
                    <h1 style="margin:0;font-size:26px;line-height:1.25;font-weight:800;letter-spacing:-0.5px;color:#ffffff;text-shadow:2px 3px 0 #1b1438;">
                      New Message from ${safeName}
                    </h1>
                    <p style="margin:6px 0 0;font-size:13px;color:#a5b4fc;">
                      Received on ${escapeHtml(timeFormatted)} (Dhaka Time) &middot; Hit <strong>Reply</strong> to respond directly
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Body Content Area -->
          <tr>
            <td style="padding:28px 32px;">
              <!-- 3D Sender Identity Plate -->
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background-color:#111530;border:1px solid #2b305c;border-bottom:5px solid #070917;border-radius:18px;padding:18px 20px;margin-bottom:22px;">
                <tr>
                  <td width="54" valign="middle" style="padding-right:16px;">
                    <div style="width:50px;height:50px;line-height:50px;text-align:center;border-radius:14px;background:linear-gradient(135deg,#915EFF,#4f46e5);border:1px solid #c4b5fd;border-bottom:4px solid #2e1065;color:#ffffff;font-size:18px;font-weight:800;">
                      ${initials}
                    </div>
                  </td>
                  <td valign="middle">
                    <p style="margin:0;font-size:11px;font-weight:700;letter-spacing:1.5px;text-transform:uppercase;color:#94a3b8;">
                      Sender Profile
                    </p>
                    <p style="margin:3px 0 4px;font-size:17px;font-weight:700;color:#ffffff;">
                      ${safeName}
                    </p>
                    <a href="mailto:${safeEmail}" style="font-size:13px;font-weight:600;color:#67e8f9;text-decoration:none;">
                      ${safeEmail} &#8599;
                    </a>
                  </td>
                </tr>
              </table>

              <!-- 3D Recessed Message Well -->
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background-color:#070a19;border:1px solid #252b52;border-top:4px solid #03050d;border-left:4px solid #915EFF;border-radius:16px;padding:22px 24px;">
                <tr>
                  <td>
                    <p style="margin:0 0 10px;font-family:Consolas,monospace;font-size:11px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:#a78bfa;">
                      Message Payload
                    </p>
                    <div style="margin:0;font-size:15px;line-height:1.75;color:#eef2ff;">
                      ${safeMessage}
                    </div>
                  </td>
                </tr>
              </table>

              <!-- 3D Keycap Action Buttons -->
              <table role="presentation" cellspacing="0" cellpadding="0" border="0" style="margin-top:26px;">
                <tr>
                  <td style="padding-right:12px;">
                    <a href="mailto:${safeEmail}?subject=${encodeURIComponent(`Re: Your message to Arbin Zaman`)}"
                       style="display:inline-block;background:linear-gradient(135deg,#915EFF 0%,#6d28d9 100%);color:#ffffff;text-decoration:none;padding:13px 24px;border-radius:14px;border:1px solid #c4b5fd;border-bottom:5px solid #3b1d7a;font-size:12px;font-weight:700;letter-spacing:1.2px;text-transform:uppercase;">
                      Reply to ${safeName} &#8599;
                    </a>
                  </td>
                  <td>
                    <a href="https://arbin.me"
                       style="display:inline-block;background-color:#131836;color:#e2e8f0;text-decoration:none;padding:13px 20px;border-radius:14px;border:1px solid #333c6e;border-bottom:5px solid #070a18;font-size:12px;font-weight:700;letter-spacing:1.2px;text-transform:uppercase;">
                      View Portfolio
                    </a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- 3D Footer Bar -->
          <tr>
            <td style="padding:18px 32px;background-color:#080b1b;border-top:1px solid #1e2447;font-size:11px;color:#64748b;text-align:center;">
              Direct Gmail SMTP Notification &middot; <strong style="color:#94a3b8;">Arbin Zaman Portfolio</strong> (<a href="mailto:arbinzmn@gmail.com" style="color:#a78bfa;text-decoration:none;">arbinzmn@gmail.com</a>)
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;

  return { text, html };
}

function buildVisitorAutoReply({ name, message, source, timeFormatted }) {
  const safeName = escapeHtml(name);
  const safeSource = escapeHtml(source || "Portfolio");
  const safeMessage = escapeHtml(message).replace(/\n/g, "<br/>");

  const text = [
    `Hi ${name},`,
    ``,
    `Thank you for reaching out! This is a confirmation that I have received your message via my ${source || "portfolio"}.`,
    `I will review your note and get back to you personally as soon as possible.`,
    ``,
    `--- YOUR MESSAGE RECEIPT (${timeFormatted}) ---`,
    `"${message}"`,
    `------------------------------------------------`,
    ``,
    `Warm regards,`,
    `Arbin Zaman`,
    `Software Engineer · Traveller & Visual Storyteller`,
    `Web: https://arbin.me | Travel: https://arbin.vercel.app/hobby`,
    `Email: arbinzmn@gmail.com`,
  ].join("\n");

  const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Thank you for reaching out — Arbin Zaman</title>
</head>
<body style="margin:0;padding:0;background-color:#050816;font-family:'Segoe UI',-apple-system,BlinkMacSystemFont,Roboto,Helvetica,Arial,sans-serif;-webkit-font-smoothing:antialiased;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background-color:#050816;padding:32px 14px;">
    <tr>
      <td align="center">
        <!-- 3D Exploded Plate Container -->
        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="max-width:620px;background-color:#0b1022;border:1px solid #283655;border-right:4px solid #182338;border-bottom:8px solid #1b3f31;border-radius:24px;overflow:hidden;box-shadow:0 28px 60px rgba(0,0,0,0.65);">
          
          <!-- Top 3D Spectrum Bar -->
          <tr>
            <td style="height:5px;background:linear-gradient(90deg,#36745e 0%,#4eb88e 50%,#915EFF 100%);font-size:0;line-height:0;">&nbsp;</td>
          </tr>

          <!-- 3D Hero Header with Profile Identity -->
          <tr>
            <td style="padding:30px 32px 26px;background:linear-gradient(145deg,#121833 0%,#0f2222 55%,#183b30 100%);border-bottom:2px solid #203833;">
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
                <tr>
                  <td width="64" valign="middle" style="padding-right:16px;">
                    <img src="${ARBIN_PROFILE_IMAGE_URL}" alt="Arbin Zaman" width="58" height="58"
                         style="display:block;width:58px;height:58px;border-radius:16px;border:2px solid #5bc49b;border-bottom:4px solid #173c2d;object-fit:cover;" />
                  </td>
                  <td valign="middle">
                    <span style="display:inline-block;background-color:#0d1f1a;border:1px solid #4eb88e;border-bottom:3px solid #1b3f31;border-radius:8px;padding:4px 10px;font-family:Consolas,monospace;font-size:10px;font-weight:700;letter-spacing:1.6px;text-transform:uppercase;color:#86efac;">
                      &#10003; MESSAGE RECEIVED
                    </span>
                    <p style="margin:8px 0 0;font-size:18px;font-weight:800;color:#ffffff;letter-spacing:-0.3px;">
                      Arbin Zaman
                    </p>
                    <p style="margin:2px 0 0;font-size:12px;color:#9bc6ad;font-weight:500;">
                      Software Engineer &middot; Traveller &amp; Visual Storyteller
                    </p>
                  </td>
                </tr>
              </table>

              <h1 style="margin:22px 0 0;font-size:25px;line-height:1.3;font-weight:800;letter-spacing:-0.5px;color:#ffffff;text-shadow:2px 3px 0 #091410;">
                Thank you for reaching out, ${safeName}!
              </h1>
            </td>
          </tr>

          <!-- Main Confirmation Body -->
          <tr>
            <td style="padding:28px 32px;">
              <p style="margin:0 0 14px;font-size:15px;line-height:1.75;color:#e2e8f0;">
                Hi <strong style="color:#ffffff;">${safeName}</strong>,
              </p>
              <p style="margin:0 0 22px;font-size:15px;line-height:1.75;color:#cbd5e1;">
                Thank you for connecting with me through my <strong style="color:#eef2ff;">${safeSource}</strong>. Your message has been delivered directly to my personal inbox (<a href="mailto:arbinzmn@gmail.com" style="color:#5bc49b;text-decoration:none;font-weight:600;">arbinzmn@gmail.com</a>), and I will get back to you personally as soon as possible.
              </p>

              <!-- 3D Recessed Message Receipt Box -->
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background-color:#070b18;border:1px solid #223831;border-top:4px solid #04060e;border-left:4px solid #4eb88e;border-radius:16px;padding:20px 22px;margin:22px 0;">
                <tr>
                  <td>
                    <p style="margin:0 0 8px;font-family:Consolas,monospace;font-size:11px;font-weight:700;letter-spacing:1.8px;text-transform:uppercase;color:#5bc49b;">
                      Your Message Receipt &middot; ${escapeHtml(timeFormatted)}
                    </p>
                    <div style="margin:0;font-size:14px;line-height:1.75;color:#e2e8f0;">
                      ${safeMessage}
                    </div>
                  </td>
                </tr>
              </table>

              <!-- 3D Keycap Links Row -->
              <p style="margin:24px 0 12px;font-size:11px;font-weight:700;letter-spacing:1.8px;text-transform:uppercase;color:#94a3b8;">
                Explore While You Wait
              </p>
              <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                <tr>
                  <td style="padding-bottom:10px;">
                    <a href="https://arbin.me"
                       style="display:inline-block;background:linear-gradient(135deg,#915EFF 0%,#6d28d9 100%);color:#ffffff;text-decoration:none;padding:11px 18px;border-radius:12px;border:1px solid #c4b5fd;border-bottom:4px solid #3b1d7a;font-size:12px;font-weight:700;letter-spacing:1px;text-transform:uppercase;margin-right:8px;">
                      Engineering Portfolio &#8599;
                    </a>
                    <a href="https://arbin.vercel.app/hobby"
                       style="display:inline-block;background-color:#1b3f31;color:#ffffff;text-decoration:none;padding:11px 18px;border-radius:12px;border:1px solid #5bc49b;border-bottom:4px solid #0e241b;font-size:12px;font-weight:700;letter-spacing:1px;text-transform:uppercase;margin-right:8px;">
                      3D Travel Atlas &#8599;
                    </a>
                    <a href="https://www.linkedin.com/in/zamanarbin/"
                       style="display:inline-block;background-color:#131933;color:#e2e8f0;text-decoration:none;padding:11px 16px;border-radius:12px;border:1px solid #334155;border-bottom:4px solid #070a17;font-size:12px;font-weight:700;letter-spacing:1px;text-transform:uppercase;">
                      LinkedIn &#8599;
                    </a>
                  </td>
                </tr>
              </table>

              <!-- Signature -->
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="margin-top:22px;border-top:1px solid #1e293b;padding-top:18px;">
                <tr>
                  <td>
                    <p style="margin:0;font-size:14px;font-weight:700;color:#ffffff;">
                      Warm regards,
                    </p>
                    <p style="margin:4px 0 0;font-size:15px;font-weight:800;color:#5bc49b;">
                      Arbin Zaman
                    </p>
                    <p style="margin:2px 0 0;font-size:12px;color:#94a3b8;">
                      Software Engineer &middot; Dhaka, Bangladesh &middot; <a href="mailto:arbinzmn@gmail.com" style="color:#a78bfa;text-decoration:none;">arbinzmn@gmail.com</a>
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Bottom 3D Plate Rim -->
          <tr>
            <td style="padding:16px 32px;background-color:#070a17;border-top:1px solid #19223a;font-size:11px;color:#64748b;text-align:center;">
              &copy; ${new Date().getFullYear()} Arbin Zaman &middot; Automated Confirmation from <a href="mailto:arbinzmn@gmail.com" style="color:#5bc49b;text-decoration:none;">arbinzmn@gmail.com</a>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;

  return { text, html };
}

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.statusCode = 405;
    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify({ ok: false, error: "Method Not Allowed" }));
    return;
  }

  try {
    const body =
      typeof req.body === "string" ? JSON.parse(req.body || "{}") : req.body || {};

    const name = String(body.name || "").trim();
    const email = String(body.email || "").trim();
    const message = String(body.message || "").trim();
    const source = String(body.source || "Portfolio Contact Form").trim();

    if (!name || !email || !message) {
      res.statusCode = 400;
      res.setHeader("Content-Type", "application/json");
      res.end(
        JSON.stringify({
          ok: false,
          error: "Please provide your name, email, and message.",
        }),
      );
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      res.statusCode = 400;
      res.setHeader("Content-Type", "application/json");
      res.end(
        JSON.stringify({
          ok: false,
          error: "Please enter a valid email address.",
        }),
      );
      return;
    }

    const localEnv = readLocalDotEnv();
    const gmailUser =
      process.env.GMAIL_USER ||
      process.env.VITE_GMAIL_USER ||
      localEnv.GMAIL_USER ||
      DEFAULT_GMAIL_USER;
    const gmailAppPassword =
      process.env.GMAIL_APP_PASSWORD ||
      process.env.VITE_GMAIL_APP_PASSWORD ||
      localEnv.GMAIL_APP_PASSWORD;

    if (!gmailAppPassword) {
      res.statusCode = 503;
      res.setHeader("Content-Type", "application/json");
      res.end(
        JSON.stringify({
          ok: false,
          code: "MISSING_GMAIL_APP_PASSWORD",
          error:
            "GMAIL_APP_PASSWORD is not configured on the server yet.",
        }),
      );
      return;
    }

    const timeFormatted = new Date().toLocaleString("en-US", {
      timeZone: "Asia/Dhaka",
      dateStyle: "medium",
      timeStyle: "short",
    });

    const ownerMail = buildOwnerEmail({
      name,
      email,
      message,
      source,
      timeFormatted,
    });

    const visitorMail = buildVisitorAutoReply({
      name,
      message,
      source,
      timeFormatted,
    });

    // Send notification to Arbin (arbinzmn@gmail.com) and auto-reply to the visitor concurrently
    await Promise.all([
      sendGmailSmtp({
        user: gmailUser,
        appPassword: gmailAppPassword,
        fromName: `${name} via Arbin Portfolio`,
        to: DEFAULT_GMAIL_USER,
        replyTo: `${encodeMimeHeader(name)} <${email}>`,
        subject: `✨ New Message from ${name} (${source})`,
        text: ownerMail.text,
        html: ownerMail.html,
      }),
      sendGmailSmtp({
        user: gmailUser,
        appPassword: gmailAppPassword,
        fromName: "Arbin Zaman",
        to: email,
        replyTo: `Arbin Zaman <${DEFAULT_GMAIL_USER}>`,
        subject: `Thank you for reaching out, ${name}! — Arbin Zaman`,
        text: visitorMail.text,
        html: visitorMail.html,
      }),
    ]);

    res.statusCode = 200;
    res.setHeader("Content-Type", "application/json");
    res.end(
      JSON.stringify({
        ok: true,
        message:
          "Message sent to Arbin Zaman and confirmation email sent to your inbox!",
      }),
    );
  } catch (error) {
    console.error("Gmail contact API error:", error);
    res.statusCode = 500;
    res.setHeader("Content-Type", "application/json");
    res.end(
      JSON.stringify({
        ok: false,
        error: "Failed to send email via Gmail SMTP.",
        details: error?.message || "Unknown SMTP error",
      }),
    );
  }
}

