"use client";

import { useEffect, useState } from "react";
import { useError } from "@/hooks/useError";
import http from "@/services/http";
import dynamic from "next/dynamic";

// Dinamik import, ssr kapalı
const LottieAnimation = dynamic(() => import("@/app/lib/LottieAnimation"), {
  ssr: false,
  loading: () => <p>Loading animation...</p>,
});

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
        setError("Failed to load about me content.");
      } finally {
        setLoading(false);
      }
    }

    fetchAbout();
  }, [setError]);

  if (loading)
    return <p className="text-gray-800 text-center mt-20">Loading...</p>;

  return (
    <section
      id="about"
      className="w-full min-h-screen py-20 px-6 flex justify-center items-center"
      style={{
        background: "#f6f6f6",
      }}
    >
      <div className="max-w-[1280px] w-full mx-auto flex flex-col md:flex-row items-center gap-12">
        {/* Lottie solda */}
        <div className="flex-1 flex justify-center items-center order-2 md:order-1">
          <LottieAnimation />
        </div>

        {/* About Me container sağda */}
        <div
          className="
            flex-1
            p-8
            rounded-2xl
            shadow-[0_10px_15px_rgba(0,0,0,0.15),0_4px_6px_rgba(0,0,0,0.1)]
            text-left
            order-1 md:order-2
          "
          style={{ maxWidth: "600px" }}
        >
          <h2 className="text-4xl font-bold mb-6 font-russo text-gray-800">
            About Me
          </h2>
          {error && <p className="text-red-500 mb-6">{error}</p>}
          <p className="text-[16px] text-gray-600 text-justify font-roboto leading-7 px-1">
            {content}
          </p>
        </div>
      </div>
    </section>
  );
}
