/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { sendMessage } from "@/services/contact.service";
import { useState } from "react";

interface FormData {
  name: string;
  email: string;
  message: string;
}

const initalFormData: FormData = {
  name: "",
  email: "",
  message: "",
};

const ContactForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>(initalFormData);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateEmail = (email: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(false);

    if (!formData.name.trim()) {
      setError("Name is required!");
      return;
    }

    if (!validateEmail(formData.email)) {
      setError("Valid email is required!");
      return;
    }

    if (!formData.message.trim()) {
      setError("Message is required!");
      return;
    }

    try {
      setLoading(true);
      await sendMessage(formData);
      setSuccess(true);
      setFormData(initalFormData);
    } catch (_err) {
      setError("Something went wrong. Please try again! ");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-4 max-w-lg mx-auto"
    >
      <input
        type="text"
        name="name"
        placeholder="Your name"
        value={formData.name}
        onChange={handleChange}
        className="px-4 py-2 rounded bg-gray-800 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        disabled={loading}
      />

      <input
        type="email"
        name="email"
        placeholder="Your email"
        value={formData.email}
        onChange={handleChange}
        className="px-4 py-2 rounded bg-gray-800 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        disabled={loading}
      />

      <textarea
        name="message"
        placeholder="Your message"
        value={formData.message}
        onChange={handleChange}
        rows={5}
        className="px-4 py-2 rounded bg-gray-800 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        disabled={loading}
      />

      {error && <p className="text-red-500">{error}</p>}
      {success && <p className="text-green-500">Message sent successfully!</p>}

      <button
        type="submit"
        disabled={loading}
        className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-6 rounded transition disabled:opacity-50"
      >
        {loading ? "Sending..." : "Send Message"}
      </button>
    </form>
  );
};
export default ContactForm;
