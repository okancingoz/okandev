"use client";

import SectionTitle from "@/components/SectionTitle";
import { Icon } from "@iconify/react";

import ContactForm from "./ContactForm";

const ContactSection: React.FC = () => {
  return (
    <section
      id="contact"
      className="bg-[#f6f6f6] min-h-[40vh] flex flex-col items-center justify-center px-6 py-12 relative z-10 border-t border-gray-300"
    >
      <SectionTitle className="text-4xl">Contact Me</SectionTitle>

      <ContactForm />

      <div className="flex gap-8 mt-10 mb-4">
        <a
          href="https://github.com/okancingoz"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="GitHub"
          className="text-gray-600 hover:text-gray-900 transition-colors text-3xl flex items-center"
          title="GitHub"
        >
          <Icon icon="mdi:github" width={24} />
        </a>
        <a
          href="https://linkedin.com/in/okancingoz"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="LinkedIn"
          className="text-gray-600 hover:text-gray-900 transition-colors text-3xl flex items-center"
          title="LinkedIn"
        >
          <Icon icon="mdi:linkedin" width={24} />
        </a>
        <a
          href="mailto:okanc.ngoz@gmail.com"
          aria-label="Email"
          className="text-gray-600 hover:text-gray-900 transition-colors text-3xl flex items-center"
          title="Email"
        >
          <Icon icon="mdi:email" width={24} />
        </a>
      </div>

      <p className="text-gray-500 text-sm select-none">
        © 2025 by Okan Cingöz. All rights reserved.
      </p>
    </section>
  );
};

export default ContactSection;
