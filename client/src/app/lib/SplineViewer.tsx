"use client";

import { useEffect, useRef, useState } from "react";

export default function SplineViewer() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [shouldLoad, setShouldLoad] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldLoad(true);
          observer.disconnect(); // Bir kere tetiklenmesi yeterli
        }
      },
      { threshold: 0.1 } // %10 görünür olunca yükle
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    if (!shouldLoad) return;

    if (document.querySelector('script[data-spline="true"]')) return;

    const script = document.createElement("script");
    script.type = "module";
    script.src =
      "https://unpkg.com/@splinetool/viewer@1.10.30/build/spline-viewer.js";
    script.setAttribute("data-spline", "true");

    script.onload = () => {
      if (
        containerRef.current &&
        !containerRef.current.querySelector("spline-viewer")
      ) {
        const viewer = document.createElement("spline-viewer");

        viewer.setAttribute(
          "url",
          "https://prod.spline.design/vXMKbBczk6-YqPAb/scene.splinecode"
        );
        viewer.setAttribute("loading-anim-type", "spinner-small-dark");

        viewer.style.width = "100%";
        viewer.style.height = "100vh";
        viewer.style.display = "block";

        containerRef.current.appendChild(viewer);

        setTimeout(() => {
          const logo = viewer.shadowRoot?.querySelector("a");
          if (logo) {
            logo.style.opacity = "0";
            logo.style.pointerEvents = "none";
          }
        }, 10);

        // Drag işlemleri
        let isDragging = false;

        function updatePosition(e: MouseEvent | Touch) {
          const viewerRect = viewer.getBoundingClientRect();

          const mouseEvent = new MouseEvent("mousemove", {
            clientX: e.clientX,
            clientY: e.clientY,
            bubbles: true,
            cancelable: true,
            view: window,
          });

          viewer.dispatchEvent(mouseEvent);
        }

        function onPointerDown(e: PointerEvent) {
          isDragging = true;
          updatePosition(e);
        }

        function onPointerUp() {
          isDragging = false;
        }

        function onPointerMove(e: PointerEvent) {
          if (!isDragging) return;
          updatePosition(e);
        }

        function onTouchStart(e: TouchEvent) {
          isDragging = true;
          updatePosition(e.touches[0]);
        }

        function onTouchEnd() {
          isDragging = false;
        }

        function onTouchMove(e: TouchEvent) {
          if (!isDragging) return;
          updatePosition(e.touches[0]);
        }

        viewer.addEventListener("pointerdown", onPointerDown);
        viewer.addEventListener("pointerup", onPointerUp);
        viewer.addEventListener("pointercancel", onPointerUp);
        viewer.addEventListener("pointerleave", onPointerUp);
        viewer.addEventListener("pointermove", onPointerMove);

        viewer.addEventListener("touchstart", onTouchStart, { passive: true });
        viewer.addEventListener("touchend", onTouchEnd);
        viewer.addEventListener("touchcancel", onTouchEnd);
        viewer.addEventListener("touchmove", onTouchMove, { passive: true });
      }
    };

    document.body.appendChild(script);

    return () => {
      if (containerRef.current) {
        containerRef.current.innerHTML = "";
      }
    };
  }, [shouldLoad]);

  return (
    <div ref={containerRef} className="w-full h-screen">
      {!shouldLoad && (
        <div className="w-full h-full flex items-center justify-center text-white">
          Loading 3D scene...
        </div>
      )}
    </div>
  );
}
