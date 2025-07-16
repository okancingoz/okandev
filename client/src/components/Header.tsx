"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { FiHome, FiUser, FiFolder, FiMail, FiMenu, FiX } from "react-icons/fi";
import styles from "@/styles/components/header.module.css";

const navItems = [
  { label: "Home", href: "#home", icon: <FiHome size={18} /> },
  { label: "About me", href: "#about", icon: <FiUser size={18} /> },
  { label: "Projects", href: "#projects", icon: <FiFolder size={18} /> },
  { label: "Contact me", href: "#contact", icon: <FiMail size={18} /> },
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  // Body scroll
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "auto";
  }, [menuOpen]);

  return (
    <header
      className="fixed z-50 top-10 left-4 right-4 mx-auto max-w-screen-xl px-6 py-4 md:px-10 flex items-center justify-between rounded-[32px] transition-all duration-300"
      style={{
        background: "#f5f5f5",
        boxShadow:
          "inset 20px 20px 60px #c5c5c5, inset -20px -20px 60px #ffffff",
      }}
    >
      <div
        className="text-xl md:text-2xl font-semibold text-[#111] select-none"
        style={{ textShadow: "1px 1px 2px rgba(0,0,0,0.05)" }}
      >
        okandev
      </div>

      {/* Desktop & Tablet Nav */}
      <nav className="hidden md:flex items-center gap-6 lg:gap-8">
        {navItems.map((item) => (
          <Link key={item.href} href={item.href} className={styles.navItem}>
            <div className={styles.navBox}>
              <span className={styles.icon}>{item.icon}</span>
              <span className={styles.label}>{item.label}</span>
            </div>
          </Link>
        ))}
      </nav>

      {/* Hamburger Button */}
      <button
        className={`md:hidden p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400 transition-transform duration-300 ${
          menuOpen ? "rotate-90" : ""
        }`}
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label={menuOpen ? "Close menu" : "Open menu"}
      >
        {menuOpen ? <FiX size={28} /> : <FiMenu size={28} />}
      </button>

      {/* Mobile Menu Overlay */}
      <div
        className={`mobileMenuOverlay fixed inset-0 bg-[#e8e8e8] bg-opacity-95 backdrop-blur-sm flex flex-col items-center justify-center space-y-10 z-60 rounded-[50px] mx-4 my-20 shadow-lg transition-transform duration-300 ease-in-out ${
          menuOpen
            ? "opacity-100 scale-100 pointer-events-auto"
            : "opacity-0 scale-95 pointer-events-none"
        }`}
        style={{
          boxShadow:
            "inset 20px 20px 60px #c5c5c5, inset -20px -20px 60px #ffffff",
          maxWidth: "calc(100vw - 40px)",
          marginLeft: "auto",
          marginRight: "auto",
          width: "400px",
          maxHeight: "calc(100vh - 80px)",
        }}
      >
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            onClick={() => setMenuOpen(false)}
            className={`${styles.navItem} text-3xl w-full text-center`}
          >
            <div className={styles.navBox} style={{ justifyContent: "center" }}>
              <span className={styles.icon}>{item.icon}</span>
              <span className={styles.label}>{item.label}</span>
            </div>
          </Link>
        ))}
      </div>
    </header>
  );
}
