"use client";

import { useEffect, useRef, useState } from "react";

export default function SplineViewer() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [shouldLoad, setShouldLoad] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if ("requestIdleCallback" in window) {
            requestIdleCallback(() => setShouldLoad(true), { timeout: 2000 });
          } else {
            setShouldLoad(true);
          }
          observer.disconnect();
        }
      },
      {
        threshold: 0.1,
        rootMargin: "200px",
      }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!shouldLoad) return;

    if (document.head.querySelector('script[data-spline="true"]')) return;

    const script = document.createElement("script");
    script.type = "module";
    script.src = "https://unpkg.com/@splinetool/viewer/build/spline-viewer.js";
    script.setAttribute("data-spline", "true");

    script.onload = () => {
      if (
        containerRef.current &&
        !containerRef.current.querySelector("spline-viewer")
      ) {
        const viewer = document.createElement("spline-viewer");

        viewer.setAttribute("url", "/home.splinecode");
        viewer.setAttribute("loading-anim-type", "spinner-small-dark");

        Object.assign(viewer.style, {
          width: "100%",
          height: "100vh",
          display: "block",
        });

        containerRef.current.appendChild(viewer);

        setTimeout(() => {
          const logo = viewer.shadowRoot?.querySelector("a");
          if (logo) {
            logo.style.opacity = "0";
            logo.style.pointerEvents = "none";
          }
        }, 10);

        // Drag Events
        let isDragging = false;

        const updatePosition = (e: MouseEvent | Touch) => {
          const mouseEvent = new MouseEvent("mousemove", {
            clientX: e.clientX,
            clientY: e.clientY,
            bubbles: true,
            cancelable: true,
            view: window,
          });
          viewer.dispatchEvent(mouseEvent);
        };

        viewer.addEventListener("pointerdown", (e) => {
          isDragging = true;
          updatePosition(e);
        });
        viewer.addEventListener("pointermove", (e) => {
          if (isDragging) updatePosition(e);
        });
        viewer.addEventListener("pointerup", () => (isDragging = false));
        viewer.addEventListener("pointerleave", () => (isDragging = false));

        viewer.addEventListener(
          "touchstart",
          (e) => {
            isDragging = true;
            updatePosition(e.touches[0]);
          },
          { passive: true }
        );
        viewer.addEventListener(
          "touchmove",
          (e) => {
            if (isDragging) updatePosition(e.touches[0]);
          },
          { passive: true }
        );
        viewer.addEventListener("touchend", () => (isDragging = false));
      }
    };

    document.head.appendChild(script);

    return () => {
      containerRef.current?.replaceChildren();
    };
  }, [shouldLoad]);

  return (
    <div ref={containerRef} className="w-full h-screen">
      {!shouldLoad && (
        <div className="w-full h-full animate-pulse bg-neutral-900 text-white flex items-center justify-center">
          Loading 3D scene...
        </div>
      )}
    </div>
  );
}
