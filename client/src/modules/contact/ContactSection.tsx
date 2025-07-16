"use client";

import ContactForm from "./ContactForm";
import { FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa";

const ContactSection: React.FC = () => {
  return (
    <section
      id="contact"
      className="bg-[#f6f6f6] min-h-[40vh] flex flex-col items-center justify-center px-6 py-12 relative z-10 border-t border-gray-300"
    >
      <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-10 text-center">
        Contact Me
      </h2>

      <ContactForm />

      <div className="flex gap-8 mt-10 mb-4">
        <a
          href="https://github.com/okancingoz"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="GitHub"
          className="text-gray-600 hover:text-gray-900 transition-colors text-3xl"
        >
          <FaGithub />
        </a>
        <a
          href="https://linkedin.com/in/okancingoz"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="LinkedIn"
          className="text-gray-600 hover:text-gray-900 transition-colors text-3xl"
        >
          <FaLinkedin />
        </a>
        <a
          href="mailto:okancingoz@example.com"
          aria-label="Email"
          className="text-gray-600 hover:text-gray-900 transition-colors text-3xl"
        >
          <FaEnvelope />
        </a>
      </div>

      <p className="text-gray-500 text-sm select-none">
        © 2025 by Okan Cingöz. All rights reserved.
      </p>
    </section>
  );
};

export default ContactSection;
