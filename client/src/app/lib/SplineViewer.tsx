"use client";

import { useEffect, useRef } from "react";

export default function SplineViewer() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Eğer viewer script'i zaten varsa tekrar ekleme
    if (document.querySelector('script[data-spline="true"]')) return;

    const script = document.createElement("script");
    script.type = "module";
    script.src =
      "https://unpkg.com/@splinetool/viewer@1.10.27/build/spline-viewer.js";
    script.setAttribute("data-spline", "true");

    script.onload = () => {
      if (
        containerRef.current &&
        !containerRef.current.querySelector("spline-viewer")
      ) {
        const viewer = document.createElement("spline-viewer");
        viewer.setAttribute(
          "url",
          "https://prod.spline.design/kctoPbN3HrD-NBdC/scene.splinecode"
        );
        viewer.style.width = "100%";
        viewer.style.height = "100vh";
        viewer.style.display = "block";
        viewer.style.background = "#000";

        containerRef.current.appendChild(viewer);

        // 👇 Logo'yu görünmez ve etkileşimsiz yap
        setTimeout(() => {
          const logo = viewer.shadowRoot?.querySelector("a");
          if (logo) {
            logo.style.opacity = "0";
            logo.style.pointerEvents = "none";
          }
        }, 10); // Logo'nun render edilmesini bekle
      }
    };

    document.body.appendChild(script);

    return () => {
      // Unmount olunca temizle
      if (containerRef.current) {
        containerRef.current.innerHTML = "";
      }
    };
  }, []);

  return <div ref={containerRef} className="w-full h-screen" />;
}
