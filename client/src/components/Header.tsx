"use client";

import styles from "@/styles/components/header.module.css";
import { Code, Folder, Home, Mail, MenuIcon, User, XIcon } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

const navItems = [
  { label: "Home", href: "#home", icon: <Home size={18} /> },
  { label: "About", href: "#about", icon: <User size={18} /> },
  { label: "Projects", href: "#projects", icon: <Folder size={18} /> },
  { label: "Techs", href: "#techstacks", icon: <Code size={18} /> },
  { label: "Contact", href: "#contact", icon: <Mail size={18} /> },
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "auto";
  }, [menuOpen]);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 w-full px-4 mt-6">
      <div
        className="max-w-[1280px] mx-auto p-4 flex items-center justify-between rounded-[32px] backdrop-blur-md bg-white/70"
        style={{
          boxShadow:
            "inset 20px 20px 60px #c5c5c5, inset -20px -20px 60px #ffffff",
        }}
      >
        <h2 className="text-xl md:text-2xl font-semibold text-cyan-950">
          okandev
        </h2>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-4 lg:gap-8">
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
          {menuOpen ? <XIcon size={28} /> : <MenuIcon size={28} />}
        </button>
      </div>

      {/* Mobile Overlay */}
      <div
        className={`fixed inset-0 z-40 transition-opacity duration-300 ${
          menuOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
      >
        {/* Background Blur & Close on Click */}
        <div
          className="absolute inset-0 bg-black/30 backdrop-blur-sm"
          onClick={() => setMenuOpen(false)}
        ></div>

        {/* Slide-in Menu */}
        <div
          className={`absolute top-0 right-0 h-full w-[70%] max-w-sm bg-[#f3f3f3] shadow-lg z-50 p-8 transform transition-transform duration-300 ${
            menuOpen ? "translate-x-0" : "translate-x-full"
          } rounded-l-[32px]`}
          style={{
            boxShadow:
              "inset 20px 20px 60px #c5c5c5, inset -20px -20px 60px #ffffff",
          }}
        >
          <nav className="flex flex-col justify-center h-full space-y-8">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMenuOpen(false)}
                className="w-full"
              >
                <div
                  className={`${styles.navBox} flex items-center justify-center gap-4 text-xl w-full`}
                >
                  <span className={styles.icon}>{item.icon}</span>
                  <span className={styles.label}>{item.label}</span>
                </div>
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </header>
  );
}
