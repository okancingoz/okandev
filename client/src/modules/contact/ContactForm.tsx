"use client";

import { FaUser, FaEnvelope, FaComment } from "react-icons/fa";
import { sendMessage } from "@/services/contact.service";
import { useState, useEffect } from "react";

interface FormData {
  name: string;
  email: string;
  message: string;
}

const initialFormData: FormData = {
  name: "",
  email: "",
  message: "",
};

const ContactForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>(initialFormData);
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
      setFormData(initialFormData);
    } catch (_err) {
      setError("Something went wrong. Please try again!");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => setSuccess(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [success]);

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => setError(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [error]);

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-3xl w-full bg-white/50 backdrop-blur-md rounded-xl p-8 shadow-lg mx-auto flex flex-col gap-5"
    >
      {/* Name input with icon */}
      <div className="relative">
        <FaUser className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
        <input
          type="text"
          name="name"
          placeholder="Your name"
          value={formData.name}
          onChange={handleChange}
          className="pl-10 pr-4 py-2 rounded-md bg-white/80 text-gray-900 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition w-full"
          disabled={loading}
        />
      </div>

      {/* Email input with icon */}
      <div className="relative">
        <FaEnvelope className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
        <input
          type="email"
          name="email"
          placeholder="Your email"
          value={formData.email}
          onChange={handleChange}
          className="pl-10 pr-4 py-2 rounded-md bg-white/80 text-gray-900 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition w-full"
          disabled={loading}
        />
      </div>

      {/* Message textarea with icon */}
      <div className="relative">
        <FaComment className="absolute left-3 top-4 text-gray-400 pointer-events-none" />
        <textarea
          name="message"
          placeholder="Your message"
          value={formData.message}
          onChange={handleChange}
          rows={5}
          className="pl-10 pr-4 py-2 rounded-md bg-white/50 text-gray-900 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none transition w-full"
          disabled={loading}
        />
      </div>

      {error && (
        <p className="bg-red-100 text-red-700 rounded-md px-4 py-2 font-semibold transition-opacity duration-500">
          {error}
        </p>
      )}
      {success && (
        <p className="bg-green-100 text-green-700 rounded-md px-4 py-2 font-semibold transition-opacity duration-500">
          Message sent successfully!
        </p>
      )}

      <button
        type="submit"
        disabled={loading}
        className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 rounded-md transition disabled:opacity-50"
      >
        {loading ? "Sending..." : "Send Message"}
      </button>
    </form>
  );
};

export default ContactForm;
