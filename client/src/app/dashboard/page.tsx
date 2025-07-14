"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useFetch } from "@/hooks/useFetch";

import { AdminLayout } from "@/components/admin/AdminLayout";
import DashboardContent from "@/components/admin/DashboardContent";
import ProjectsContent from "@/components/admin/ProjectsContent";
import MessageContent from "@/components/admin/MessageContent";

export default function DashboardPage() {
  const router = useRouter();
  const { loading, error } = useFetch<{ message: string }>("/dashboard");

  const [activeKey, setActiveKey] = useState("dashboard");

  useEffect(() => {
    if (error) {
      console.error("Authorization error:", error);
      router.push("/login");
    }
  }, [error, router]);

  if (loading) return <p>Loading...</p>;

  // Hata yönetimi
  if (error)
    return (
      <p className="text-red-500">Something went wrong. Please try again.</p>
    );

  let content;
  switch (activeKey) {
    case "projects":
      content = <ProjectsContent />;
      break;
    case "messages":
      content = <MessageContent />;
      break;
    default:
      content = <DashboardContent />;
      break;
  }

  return (
    <AdminLayout activeKey={activeKey} setActiveKey={setActiveKey}>
      {content}
    </AdminLayout>
  );
}
