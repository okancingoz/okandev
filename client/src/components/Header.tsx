"use client";

import Link from "next/link";
import { FiHome, FiUser, FiFolder, FiMail } from "react-icons/fi";
import styles from "@/styles/components/header.module.css";

const navItems = [
  { label: "Home", href: "#home", icon: <FiHome size={18} /> },
  { label: "About me", href: "#about", icon: <FiUser size={18} /> },
  { label: "Projects", href: "#projects", icon: <FiFolder size={18} /> },
  { label: "Contact me", href: "#contact", icon: <FiMail size={18} /> },
];

export default function Header() {
  return (
    <header
  className="fixed z-50 top-10 left-0 right-0 mx-auto max-w-screen-xl px-6 py-4 md:px-10 flex items-center justify-between rounded-[32px]"
  style={{
    background: "rgba(232, 232, 232, 0.95)",
    boxShadow: "inset 20px 20px 60px #c5c5c5, inset -20px -20px 60px #ffffff",
  }}
>
      <div
        className="text-xl md:text-2xl font-semibold text-[#111] select-none"
        style={{ textShadow: "1px 1px 2px rgba(0,0,0,0.05)" }}
      >
        okandev
      </div>

      <nav className="flex items-center gap-4 md:gap-6 lg:gap-8">
        {navItems.map((item) => (
          <Link key={item.href} href={item.href} className={styles.navItem}>
            <div className={styles.navBox}>
              <span className={styles.icon}>{item.icon}</span>
              <span className={styles.label}>{item.label}</span>
            </div>
          </Link>
        ))}
      </nav>
    </header>
  );
}
