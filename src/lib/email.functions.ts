import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const Schema = z.object({
  name: z.string().min(1).max(200),
  email: z.string().email().max(200),
  message: z.string().min(10).max(5000),
});

export const sendContactEmail = createServerFn({ method: "POST" })
  .inputValidator((input: { name: string; email: string; message: string }) => Schema.parse(input))
  .handler(async ({ data }) => {
    const apiKey = process.env.RESEND_API_KEY;
    const recipient = process.env.CONTACT_EMAIL_RECIPIENT || "vjai5894@gmail.com";

    if (!apiKey) {
      console.log("[Email] (no RESEND_API_KEY) Would send:", { ...data, to: recipient });
      return { success: true, message: "Logged (dev mode). Configure RESEND_API_KEY to send emails." };
    }

    try {
      const { Resend } = await import("resend");
      const resend = new Resend(apiKey);
      const result = await resend.emails.send({
        from: "onboarding@resend.dev",
        to: recipient,
        replyTo: data.email,
        subject: `New Portfolio Contact: ${data.name}`,
        html: `<p><b>Name:</b> ${data.name}</p><p><b>Email:</b> ${data.email}</p><p>${data.message.replace(/\n/g, "<br/>")}</p>`,
      });
      if (result.error) return { success: false, error: result.error.message };
      return { success: true, message: "Message sent successfully!" };
    } catch (e: any) {
      return { success: false, error: e?.message || "Failed to send" };
    }
  });
