"use client";
import { useServerFn } from "@tanstack/react-start";
import { sendContactEmail as serverSendContactEmail } from "@/lib/email.functions";

export async function sendContactEmail(data: { name: string; email: string; message: string }) {
  return serverSendContactEmail({ data });
}
export { useServerFn };
