"use client";

import { useEffect, useState } from "react";
import { useError } from "@/hooks/useError";
import http from "@/services/http";
import dynamic from "next/dynamic";

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
    return (
      <p className="text-gray-700 text-center mt-20 select-none">Loading...</p>
    );

  return (
    <section
      id="about"
      className="w-full min-h-[100vh] py-16 px-4 bg-[#f6f6f6] flex items-center justify-center"
    >
      <div className="max-w-[1280px] w-full mx-auto flex flex-col md:flex-row items-center gap-10 md:gap-16 px-2 md:px-0">
        {/* Animasyon - Mobilde üstte, geniş ekranda solda */}
        <div className="flex-1 flex justify-center items-center order-2 md:order-1 max-w-full max-h-96 md:max-h-[400px]">
          <LottieAnimation />
        </div>

        {/* İçerik */}
        <div
          className="
            flex-1
            p-6
            rounded-2xl
            shadow-lg
            text-left
            order-1 md:order-2
            max-w-full
            md:max-w-xl
          "
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-6 font-russo text-gray-800 select-none">
            About Me
          </h2>

          {error && <p className="text-red-600 mb-4">{error}</p>}

          <p className="text-base md:text-lg text-gray-600 text-justify font-roboto leading-relaxed">
            {content}
          </p>
        </div>
      </div>
    </section>
  );
}
