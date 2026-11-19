// Client-side calls to os.polishstation.lk's public intake endpoints
// (/api/public/*). These are cross-origin, unauthenticated, and expected to
// be rate-limited + honeypot-checked server-side - this file only shapes the
// request and normalizes the response, it does no validation of its own.
//
// The contact form does not use this file - it writes directly to the OS's
// Firestore project instead (see src/lib/api/inquiries.ts).

export type ApiResult = { ok: true } | { ok: false; error: string };

// VITE_POS_API_BASE_URL is the setting's old name, still accepted so an older
// build configuration keeps working.
const OS_BASE_URL = (import.meta.env.VITE_OS_API_BASE_URL ??
  import.meta.env.VITE_POS_API_BASE_URL) as string | undefined;

async function postToOs(path: string, payload: Record<string, unknown>): Promise<ApiResult> {
  if (!OS_BASE_URL) {
    return {
      ok: false,
      error: "Online submission isn't set up yet - please call or WhatsApp us instead.",
    };
  }

  try {
    const res = await fetch(`${OS_BASE_URL}${path}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    const data = (await res.json().catch(() => null)) as { ok?: boolean; error?: string } | null;
    if (res.ok && data?.ok) return { ok: true };
    return {
      ok: false,
      error: data?.error ?? "Something went wrong - please try again or WhatsApp us.",
    };
  } catch {
    return { ok: false, error: "Network error - please try again or WhatsApp us." };
  }
}

export function createNewsletterSubscriber(payload: { email: string; company?: string }) {
  return postToOs("/api/public/newsletter", payload);
}

export function createBooking(payload: {
  name: string;
  phone: string;
  email: string;
  vehicle: string;
  services: string[];
  otherService: string;
  preferredDate: string;
  notes: string;
  company: string;
}) {
  return postToOs("/api/public/booking", payload);
}
