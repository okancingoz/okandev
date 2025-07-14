"use client";

import { ReactNode } from "react";

interface AdminLayoutProps {
  children: ReactNode;
  activeKey: string;
  setActiveKey: (key: string) => void;
}

export function AdminLayout({
  children,
  activeKey,
  setActiveKey,
}: AdminLayoutProps) {
  const navItems = [
    { label: "Dashboard", key: "dashboard" },
    { label: "Projects", key: "projects" },
    { label: "Messages", key: "messages" },
  ];

  return (
    <div className="flex h-screen bg-gray-900 text-white">
      <nav className="w-60 bg-gray-800 p-4 flex flex-col">
        <h1 className="text-2xl font-bold mb-8">Admin Panel</h1>

        {navItems.map((item) => (
          <button
            key={item.key}
            onClick={() => setActiveKey(item.key)}
            className={`mb-3 p-3 rounded text-left hover:bg-gray-700 transition ${
              activeKey === item.key ? "bg-gray-700 font-semibold" : ""
            }`}
          >
            {item.label}
          </button>
        ))}
      </nav>

      <main className="flex-1 p-8 overflow-auto">{children}</main>
    </div>
  );
}
