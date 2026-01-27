"use client";

import { useState, FormEvent } from "react";

interface NotifyFormProps {
  productName: string;
  productSlug: string;
}

export default function NotifyForm({ productName, productSlug }: NotifyFormProps) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [newsletter, setNewsletter] = useState(false);
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("loading");
    setMessage("");

    try {
      const response = await fetch("/api/notify", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ firstName, lastName, email, productName, productSlug, newsletter }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Failed to register");
      }

      setStatus("success");
      setMessage(result.message || "We'll notify you when available!");
      setEmail("");
    } catch (error) {
      setStatus("error");
      setMessage(
        error instanceof Error
          ? error.message
          : "Something went wrong. Please try again."
      );

      setTimeout(() => {
        setStatus("idle");
        setMessage("");
      }, 5000);
    }
  };

  if (status === "success") {
    return (
      <div className="py-6">
        <div className="flex items-center gap-3">
          <svg
            className="w-6 h-6 text-green-600 flex-shrink-0"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 13l4 4L19 7"
            />
          </svg>
          <p className="font-sans text-lg text-black/80">{message}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="py-6">
      <h3 className="font-display text-2xl md:text-3xl text-black mb-2">
        Get notified.
      </h3>
      <p className="font-sans text-black/70 mb-6">
        Be the first to know when it&apos;s available.
      </p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex flex-col gap-3">
          <div className="flex gap-3">
            <input
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              placeholder="First name"
              required
              disabled={status === "loading"}
              className="w-full px-4 py-3 bg-white border border-black/20 text-black placeholder:text-black/40 focus:outline-none focus:border-brand-red transition-colors rounded-full"
            />
            <input
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              placeholder="Last name"
              required
              disabled={status === "loading"}
              className="w-full px-4 py-3 bg-white border border-black/20 text-black placeholder:text-black/40 focus:outline-none focus:border-brand-red transition-colors rounded-full"
            />
          </div>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            required
            disabled={status === "loading"}
            className="w-full px-4 py-3 bg-white border border-black/20 text-black placeholder:text-black/40 focus:outline-none focus:border-brand-red transition-colors rounded-full"
          />
          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={newsletter}
              onChange={(e) => setNewsletter(e.target.checked)}
              disabled={status === "loading"}
              className="w-5 h-5 rounded border-black/20 text-brand-red focus:ring-brand-red focus:ring-offset-2"
            />
            <span className="text-black/70">Subscribe to our newsletter for updates</span>
          </label>
          <button
            type="submit"
            disabled={status === "loading"}
            className="w-full sm:w-auto px-8 py-3 bg-brand-red text-white font-medium hover:bg-brand-red/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed rounded-full"
          >
            {status === "loading" ? "..." : "Notify Me"}
          </button>
        </div>

        {message && status === "error" && (
          <p className="text-red-600 text-sm" role="alert">
            {message}
          </p>
        )}
      </form>
    </div>
  );
}
