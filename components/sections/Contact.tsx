"use client";

import { profile } from "@/lib/data";
import { ScrollAnimator } from "@/components/ScrollAnimator";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Mail,
  Phone,
  Linkedin,
  Globe,
  MapPin,
  Send,
  Loader2,
} from "lucide-react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

const contactSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Invalid email"),
  subject: z.string().min(2, "Subject is required"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

type ContactFormData = z.infer<typeof contactSchema>;

const contactLinks = [
  {
    icon: Mail,
    label: "Email",
    value: profile.email,
    href: `mailto:${profile.email}`,
  },
  {
    icon: Phone,
    label: "Phone",
    value: profile.phone,
    href: `tel:${profile.phone}`,
  },
  {
    icon: Linkedin,
    label: "LinkedIn",
    value: "cristianrobert-iosef",
    href: profile.linkedin,
    external: true,
  },
  {
    icon: Globe,
    label: "Website",
    value: "criosef-resume.info",
    href: profile.website,
    external: true,
  },
  {
    icon: MapPin,
    label: "Location",
    value: profile.location,
  },
] as const;

export function Contact() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactFormData) => {
    try {
      const formspreeId = process.env.NEXT_PUBLIC_FORMSPREE_ID;
      if (!formspreeId) {
        toast.error("Contact form is not configured yet.");
        return;
      }
      const res = await fetch(`https://formspree.io/f/${formspreeId}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("Failed to send");
      toast.success("Message sent! I'll get back to you soon.");
      reset();
    } catch {
      toast.error(
        "Something went wrong. Please try again or email me directly."
      );
    }
  };

  return (
    <section
      id="contact"
      className="relative px-4 py-24 sm:px-6 sm:py-32 lg:px-8"
    >
      <div className="mx-auto max-w-5xl">
        {/* Section heading */}
        <ScrollAnimator animation="fadeInUp">
          <h2 className="mb-4 text-center text-3xl font-bold tracking-tight sm:text-4xl">
            <span className="text-gradient-cyan">Get in Touch</span>
          </h2>
          <p className="mx-auto mb-12 max-w-lg text-center text-[var(--muted-foreground)]">
            Have a question or want to work together? Drop me a message.
          </p>
        </ScrollAnimator>

        {/* Two-column layout */}
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-16">
          {/* Left side — Contact Info */}
          <div className="space-y-4">
            {contactLinks.map((item, index) => {
              const Icon = item.icon;
              const content = (
                <div className="glass noise relative flex items-center gap-4 rounded-xl px-5 py-4 transition-all duration-300 hover:scale-[1.02] hover:border-[var(--accent-cyan-dim)]/40">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[var(--accent-cyan)]/10">
                    <Icon className="h-5 w-5 text-[var(--accent-cyan)]" />
                  </span>
                  <div className="min-w-0">
                    <p className="text-xs font-medium uppercase tracking-wider text-[var(--muted-foreground)]">
                      {item.label}
                    </p>
                    <p className="truncate text-sm font-semibold text-foreground">
                      {item.value}
                    </p>
                  </div>
                </div>
              );

              return (
                <ScrollAnimator
                  key={item.label}
                  animation="fadeInLeft"
                  delay={index * 100}
                >
                  {"href" in item && item.href ? (
                    <a
                      href={item.href}
                      {...("external" in item && item.external
                        ? { target: "_blank", rel: "noopener noreferrer" }
                        : {})}
                      className="block"
                    >
                      {content}
                    </a>
                  ) : (
                    content
                  )}
                </ScrollAnimator>
              );
            })}
          </div>

          {/* Right side — Contact Form */}
          <ScrollAnimator animation="fadeInRight" delay={200}>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="glass noise relative space-y-5 rounded-2xl p-6 sm:p-8"
            >
              {/* Name */}
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  placeholder="Your name"
                  className="h-10 border-[var(--accent-cyan-dim)]/20 bg-transparent focus-visible:border-[var(--accent-cyan)] focus-visible:ring-[var(--accent-cyan)]/30"
                  aria-invalid={errors.name ? "true" : undefined}
                  {...register("name")}
                />
                {errors.name && (
                  <p className="text-xs text-destructive">
                    {errors.name.message}
                  </p>
                )}
              </div>

              {/* Email */}
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="your@email.com"
                  className="h-10 border-[var(--accent-cyan-dim)]/20 bg-transparent focus-visible:border-[var(--accent-cyan)] focus-visible:ring-[var(--accent-cyan)]/30"
                  aria-invalid={errors.email ? "true" : undefined}
                  {...register("email")}
                />
                {errors.email && (
                  <p className="text-xs text-destructive">
                    {errors.email.message}
                  </p>
                )}
              </div>

              {/* Subject */}
              <div className="space-y-2">
                <Label htmlFor="subject">Subject</Label>
                <Input
                  id="subject"
                  placeholder="What's this about?"
                  className="h-10 border-[var(--accent-cyan-dim)]/20 bg-transparent focus-visible:border-[var(--accent-cyan)] focus-visible:ring-[var(--accent-cyan)]/30"
                  aria-invalid={errors.subject ? "true" : undefined}
                  {...register("subject")}
                />
                {errors.subject && (
                  <p className="text-xs text-destructive">
                    {errors.subject.message}
                  </p>
                )}
              </div>

              {/* Message */}
              <div className="space-y-2">
                <Label htmlFor="message">Message</Label>
                <Textarea
                  id="message"
                  placeholder="Tell me more..."
                  rows={5}
                  className="border-[var(--accent-cyan-dim)]/20 bg-transparent focus-visible:border-[var(--accent-cyan)] focus-visible:ring-[var(--accent-cyan)]/30"
                  aria-invalid={errors.message ? "true" : undefined}
                  {...register("message")}
                />
                {errors.message && (
                  <p className="text-xs text-destructive">
                    {errors.message.message}
                  </p>
                )}
              </div>

              {/* Submit */}
              <Button
                type="submit"
                disabled={isSubmitting}
                size="lg"
                className="w-full bg-[var(--accent-cyan)] font-semibold text-[oklch(0.13_0.005_260)] transition-all duration-300 hover:bg-[var(--accent-cyan-bright)] hover:shadow-lg hover:shadow-[var(--glow-cyan)] disabled:opacity-50"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Sending...
                  </>
                ) : (
                  <>
                    <Send className="mr-2 h-4 w-4" />
                    Send Message
                  </>
                )}
              </Button>
            </form>
          </ScrollAnimator>
        </div>
      </div>
    </section>
  );
}
