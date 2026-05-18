"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import * as z from "zod";
import { trackEvent } from "@/lib/analytics";

export default function ContactForm() {
  const t = useTranslations("contactForm");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    type: "success" | "error" | null;
    message: string;
  }>({ type: null, message: "" });

  const contactSchema = z.object({
    name: z.string().min(2, t("nameError")),
    email: z.string().email(t("emailError")),
    company: z.string().optional(),
    message: z.string().min(10, t("messageError")),
  });

  type ContactFormData = z.infer<typeof contactSchema>;

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  const [honeypot, setHoneypot] = useState("");

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    setSubmitStatus({ type: null, message: "" });

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...data, website: honeypot }),
      });

      if (response.ok) {
        trackEvent("contact_form_submit_success", { source: "contact_form" });
        setSubmitStatus({
          type: "success",
          message: t("success"),
        });
        reset();
      } else {
        const error = await response.json();
        setSubmitStatus({
          type: "error",
          message: error.message || t("errorGeneral"),
        });
      }
    } catch {
      setSubmitStatus({
        type: "error",
        message: t("errorNetwork"),
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* Name Field */}
      <div>
        <label
          htmlFor="name"
          className="mb-2 block text-[13px] font-medium text-[var(--ink-secondary)]"
        >
          {t("nameLabel")}
        </label>
        <input
          {...register("name")}
          type="text"
          id="name"
          className={`min-h-10 w-full rounded-[var(--radius-sm)] border bg-white px-3 py-2 text-[15px] text-[var(--ink)] outline-none transition-colors focus:border-[var(--primary)] focus:ring-2 focus:ring-[rgba(249,115,22,0.18)] ${
            errors.name ? "border-[var(--ruby)]" : "border-[var(--hairline-input)]"
          }`}
          placeholder={t("namePlaceholder")}
        />
        {errors.name && (
          <p className="mt-1 text-[13px] text-[var(--ruby)]">{errors.name.message}</p>
        )}
      </div>

      {/* Email Field */}
      <div>
        <label
          htmlFor="email"
          className="mb-2 block text-[13px] font-medium text-[var(--ink-secondary)]"
        >
          {t("emailLabel")}
        </label>
        <input
          {...register("email")}
          type="email"
          id="email"
          className={`min-h-10 w-full rounded-[var(--radius-sm)] border bg-white px-3 py-2 text-[15px] text-[var(--ink)] outline-none transition-colors focus:border-[var(--primary)] focus:ring-2 focus:ring-[rgba(249,115,22,0.18)] ${
            errors.email ? "border-[var(--ruby)]" : "border-[var(--hairline-input)]"
          }`}
          placeholder={t("emailPlaceholder")}
        />
        {errors.email && (
          <p className="mt-1 text-[13px] text-[var(--ruby)]">{errors.email.message}</p>
        )}
      </div>

      {/* Company Field */}
      <div>
        <label
          htmlFor="company"
          className="mb-2 block text-[13px] font-medium text-[var(--ink-secondary)]"
        >
          {t("companyLabel")}
        </label>
        <input
          {...register("company")}
          type="text"
          id="company"
          className="min-h-10 w-full rounded-[var(--radius-sm)] border border-[var(--hairline-input)] bg-white px-3 py-2 text-[15px] text-[var(--ink)] outline-none transition-colors focus:border-[var(--primary)] focus:ring-2 focus:ring-[rgba(249,115,22,0.18)]"
          placeholder={t("companyPlaceholder")}
        />
      </div>

      {/* Message Field */}
      <div>
        <label
          htmlFor="message"
          className="mb-2 block text-[13px] font-medium text-[var(--ink-secondary)]"
        >
          {t("messageLabel")}
        </label>
        <textarea
          {...register("message")}
          id="message"
          rows={6}
          className={`w-full resize-none rounded-[var(--radius-sm)] border bg-white px-3 py-2 text-[15px] text-[var(--ink)] outline-none transition-colors focus:border-[var(--primary)] focus:ring-2 focus:ring-[rgba(249,115,22,0.18)] ${
            errors.message ? "border-[var(--ruby)]" : "border-[var(--hairline-input)]"
          }`}
          placeholder={t("messagePlaceholder")}
        />
        {errors.message && (
          <p className="mt-1 text-[13px] text-[var(--ruby)]">{errors.message.message}</p>
        )}
      </div>

      {/* Honeypot */}
      <div className="absolute opacity-0 top-0 left-0 h-0 w-0 -z-10 overflow-hidden" aria-hidden="true">
        <label htmlFor="website">{t("honeypotLabel")}</label>
        <input
          type="text"
          id="website"
          name="website"
          value={honeypot}
          onChange={(e) => setHoneypot(e.target.value)}
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isSubmitting}
        className="button-primary-pill focus-ring w-full disabled:cursor-not-allowed disabled:opacity-50"
      >
        {isSubmitting ? t("submitting") : t("submit")}
      </button>

      {/* Status Messages */}
      {submitStatus.type && (
        <div
          className={`rounded-[var(--radius-md)] border p-4 text-[15px] ${
            submitStatus.type === "success"
              ? "bg-green-50 text-green-800 border border-green-200"
              : "bg-red-50 text-red-800 border border-red-200"
          }`}
        >
          {submitStatus.message}
        </div>
      )}
    </form>
  );
}
