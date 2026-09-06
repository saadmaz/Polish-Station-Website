// Writes contact-form submissions directly into the POS's Firestore project
// (collection "inquiries"), where they show up on the POS's "Inquiries"
// screen. Security rules only allow unauthenticated `create` on this
// collection, with these exact six fields and length bounds - anything else
// is rejected outright, so validate client-side before calling this.
import { doc, setDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";

export type ApiResult = { ok: true } | { ok: false; error: string };

export async function createInquiry(payload: {
  name: string;
  contactNumber: string;
  email: string | null;
  message: string;
}): Promise<ApiResult> {
  const id = crypto.randomUUID();
  try {
    await setDoc(doc(db, "inquiries", id), {
      id,
      name: payload.name,
      contactNumber: payload.contactNumber,
      email: payload.email,
      message: payload.message,
      createdAt: new Date().toISOString(),
    });
    return { ok: true };
  } catch {
    return {
      ok: false,
      error: "Something went wrong - please try again or call/WhatsApp us instead.",
    };
  }
}
