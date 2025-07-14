"use client";

import { useFetch } from "@/hooks/useFetch";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function DashboardPage() {
  const router = useRouter();
  const { data, loading, error } = useFetch<{ message: string }>("/dashboard");

  useEffect(() => {
    if (error) {
      console.error("Authorization error:", error);
      router.push("/login");
    }
  }, [error, router]);

  if (loading) return <p>Loading...</p>;

  if (error) return null; // veya hata mesajı göster

  return (
    <div className="p-10 text-white">
      <h1 className="text-2xl font-bold">Admin Panel</h1>
      <p>{data?.message}</p>
    </div>
  );
}
