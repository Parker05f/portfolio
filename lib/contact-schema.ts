import { z } from "zod";

export const contactSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, "Your name please.")
    .max(120, "That's a lot of name."),
  email: z
    .string()
    .trim()
    .email("Needs to be a real email — that's what I'll reply to."),
  message: z
    .string()
    .trim()
    .min(10, "A little more context?")
    .max(4000, "Break it into two emails."),
  // Honeypot — humans leave this empty
  website: z
    .string()
    .optional()
    .refine((v) => !v, "spam"),
});

export type ContactPayload = z.infer<typeof contactSchema>;
