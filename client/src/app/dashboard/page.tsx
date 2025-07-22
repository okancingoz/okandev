"use client";

import { useFetch } from "@/hooks/useFetch";
import { getToken } from "@/utils/tokenUtils"; 
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import AboutMeContent from "@/modules/admin/AboutMeContent";
import { AdminLayout } from "@/modules/admin/AdminLayout";
import DashboardContent from "@/modules/admin/DashboardContent";
import MessageContent from "@/modules/admin/MessageContent";
import ProjectsContent from "@/modules/admin/ProjectsContent";

export default function DashboardPage() {
  const router = useRouter();
  const { loading, error } = useFetch<{ message: string }>("/dashboard");
  const [activeKey, setActiveKey] = useState("dashboard");

  useEffect(() => {
    const token = getToken();
    if (!token) {
      router.push("/login");
    }
  }, [router]);

  useEffect(() => {
    if (error) {
      console.error("Authorization error:", error);
      router.push("/login");
    }
  }, [error, router]);

  if (loading) return <p>Loading...</p>;

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
    case "about":
      content = <AboutMeContent />;
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
