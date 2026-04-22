"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion, useReducedMotion } from "framer-motion";
import { contactSchema, type ContactPayload } from "@/lib/contact-schema";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

type Status =
  | { kind: "idle" }
  | { kind: "submitting" }
  | { kind: "success"; echo: ContactPayload }
  | { kind: "error"; message: string };

export function ContactForm() {
  const [status, setStatus] = useState<Status>({ kind: "idle" });
  const reduced = useReducedMotion();

  const form = useForm<ContactPayload>({
    resolver: zodResolver(contactSchema),
    defaultValues: { name: "", email: "", message: "", website: "" },
    mode: "onBlur",
  });

  const onSubmit = async (data: ContactPayload) => {
    setStatus({ kind: "submitting" });
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const body = await res.json().catch(() => ({}));
      if (!res.ok) {
        const message =
          body?.message ??
          (res.status === 429
            ? "Too many sends — wait a minute."
            : "Something went wrong sending that. Try again?");
        setStatus({ kind: "error", message });
        return;
      }
      setStatus({ kind: "success", echo: data });
      form.reset();
    } catch {
      setStatus({
        kind: "error",
        message: "Network hiccup. Try again or email me directly.",
      });
    }
  };

  if (status.kind === "success") {
    return (
      <motion.div
        initial={reduced ? false : { opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-lg border border-signal bg-signal/10 p-6"
      >
        <h3 className="font-display text-2xl leading-tight">
          Sent. I&apos;ll reply from this address.
        </h3>
        <dl className="mt-4 space-y-2 font-mono text-sm">
          <div>
            <dt className="inline text-muted-foreground">to: </dt>
            <dd className="inline">{status.echo.email}</dd>
          </div>
          <div>
            <dt className="inline text-muted-foreground">re: </dt>
            <dd className="inline whitespace-pre-wrap">
              {status.echo.message.slice(0, 140)}
              {status.echo.message.length > 140 ? "…" : ""}
            </dd>
          </div>
        </dl>
        <button
          type="button"
          onClick={() => setStatus({ kind: "idle" })}
          className="mt-6 font-mono text-xs uppercase tracking-wider link-underline"
        >
          send another →
        </button>
      </motion.div>
    );
  }

  return (
    <form
      onSubmit={form.handleSubmit(onSubmit)}
      noValidate
      className="space-y-6"
    >
      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <Label htmlFor="name" className="font-mono text-xs uppercase tracking-wider">
            name
          </Label>
          <Input
            id="name"
            autoComplete="name"
            {...form.register("name")}
            aria-invalid={!!form.formState.errors.name}
            className="mt-2"
          />
          {form.formState.errors.name && (
            <p className="mt-1 font-mono text-xs text-destructive">
              {form.formState.errors.name.message}
            </p>
          )}
        </div>

        <div>
          <Label htmlFor="email" className="font-mono text-xs uppercase tracking-wider">
            email
          </Label>
          <Input
            id="email"
            type="email"
            autoComplete="email"
            {...form.register("email")}
            aria-invalid={!!form.formState.errors.email}
            className="mt-2"
          />
          {form.formState.errors.email && (
            <p className="mt-1 font-mono text-xs text-destructive">
              {form.formState.errors.email.message}
            </p>
          )}
        </div>
      </div>

      <div>
        <Label htmlFor="message" className="font-mono text-xs uppercase tracking-wider">
          message
        </Label>
        <Textarea
          id="message"
          rows={6}
          {...form.register("message")}
          aria-invalid={!!form.formState.errors.message}
          className="mt-2 resize-none"
        />
        {form.formState.errors.message && (
          <p className="mt-1 font-mono text-xs text-destructive">
            {form.formState.errors.message.message}
          </p>
        )}
      </div>

      {/* Honeypot: hidden from users, visible to bots. If filled → drop silently. */}
      <div className="sr-only" aria-hidden="true">
        <label>
          If you are a human, leave this blank.
          <input
            type="text"
            tabIndex={-1}
            autoComplete="off"
            {...form.register("website")}
          />
        </label>
      </div>

      <div className="flex items-center gap-4">
        <button
          type="submit"
          disabled={status.kind === "submitting"}
          className="rounded-md border border-foreground bg-foreground px-6 py-2.5 font-mono text-xs uppercase tracking-wider text-background transition-colors hover:bg-signal hover:text-signal-foreground hover:border-signal disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {status.kind === "submitting" ? "sending…" : "send →"}
        </button>
        {status.kind === "error" && (
          <p role="alert" className="font-mono text-xs text-destructive">
            {status.message}
          </p>
        )}
      </div>
    </form>
  );
}
