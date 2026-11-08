/**
 * Sends a contact inquiry via our custom Gmail backend (/api/contact),
 * which delivers two emails directly from arbinzmn@gmail.com (NO EmailJS):
 *  1) Notification email to Arbin Zaman (arbinzmn@gmail.com)
 *  2) Auto-reply confirmation email to the visitor (email)
 */
export async function sendContactEmail({
  name,
  email,
  message,
  source = "Software Engineering Portfolio",
}) {
  const response = await fetch("/api/contact", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: name.trim(),
      email: email.trim(),
      message: message.trim(),
      source,
    }),
  });

  const data = await response.json().catch(() => ({}));

  if (response.ok && data?.ok) {
    return {
      ok: true,
      dualEmailSent: true,
      message:
        data.message ||
        "Message sent! Check your email for a confirmation from arbinzmn@gmail.com.",
    };
  }

  const error = new Error(
    data?.details
      ? `${data.error || "Failed to send message via Gmail SMTP."} (${data.details})`
      : data?.error || "Failed to send message via Gmail SMTP.",
  );
  error.code = data?.code;
  throw error;
}
