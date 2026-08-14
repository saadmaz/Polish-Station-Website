// Client-side form submission. The site is deployed as a fully static build
// (see .cpanel.yml / dist/client/.htaccess) with no Node server behind it in
// production, so there's nowhere to run a createServerFn handler. Web3Forms
// accepts the POST directly from the browser using a public access key
// (unlike a secret API key, this is meant to be client-visible).

export type FormSubmitResult = { ok: true } | { ok: false; error: string };

const WEB3FORMS_ENDPOINT = "https://api.web3forms.com/submit";

export async function submitToWeb3Forms(
  payload: Record<string, unknown>,
): Promise<FormSubmitResult> {
  const accessKey = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY as string | undefined;

  if (!accessKey) {
    return {
      ok: false,
      error: "Online submission isn't set up yet - please call or WhatsApp us instead.",
    };
  }

  try {
    const res = await fetch(WEB3FORMS_ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({ access_key: accessKey, ...payload }),
    });
    const data = (await res.json()) as { success?: boolean; message?: string };
    if (data.success) return { ok: true };
    return {
      ok: false,
      error: data.message ?? "Something went wrong - please try again or WhatsApp us.",
    };
  } catch {
    return { ok: false, error: "Network error - please try again or WhatsApp us." };
  }
}
