"use client";

import Link from "next/link";

const navItems = [
  { label: "Home", href: "#home" },
  { label: "About me", href: "#about" },
  { label: "Projects", href: "#projects" },
  { label: "Contact me", href: "#contact" },
];

export default function Header() {
  return (
    <header className="fixed top-0 left-0 w-full z-50 flex items-center justify-between px-6 py-4">
      <div className="text-xl font-bold">Okan Cingöz</div>

      <nav className="space-x-6">
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="text-sm font-medium hover:underline"
          >
            {item.label}
          </Link>
        ))}
      </nav>
    </header>
  );
}
