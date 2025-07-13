"use client";

import { useError } from "@/hooks/useError";
import http from "@/services/http";
import { useEffect, useState } from "react";

export default function AboutMe() {
  const [content, setContent] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const { error, setError } = useError();

  useEffect(() => {
    async function fetchAbout() {
      try {
        const { data } = await http.get("/about");
        setContent(data.data.about.content);
        setError(null);
      } catch (_error) {
        setError("Failed to laod about me content.");
      } finally {
        setLoading(false);
      }
    }

    fetchAbout();
  }, [setError]);

  if (loading) return <p>Loading...</p>;

  return (
    <section
      id="about"
      className="min-h-screen flex flex-col justify-center items-center px-6 text-white bg-black"
    >
      <h2 className="text-3xl font-bold mb-4">About Me</h2>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <p className="max-w-2xl text-center whitespace-pre-line">{content}</p>
    </section>
  );
}
