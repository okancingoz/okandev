"use client";

import { useEffect, useRef } from "react";

export default function SplineViewer() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (document.querySelector('script[data-spline="true"]')) return;

    const script = document.createElement("script");
    script.type = "module";
    script.src =
      "https://unpkg.com/@splinetool/viewer@1.10.30/build/spline-viewer.js";
    script.setAttribute("data-spline", "true");

    let isDragging = false;

    script.onload = () => {
      if (
        containerRef.current &&
        !containerRef.current.querySelector("spline-viewer")
      ) {
        const viewer = document.createElement("spline-viewer");

        viewer.setAttribute(
          "url",
          "https://prod.spline.design/dqmkqQJzQ4MpdKle/scene.splinecode"
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

        // Drag kontrolü için eventler

        // Drag başla
        function onPointerDown(e: PointerEvent) {
          isDragging = true;
          updatePosition(e);
        }

        // Drag bitti
        function onPointerUp() {
          isDragging = false;
        }

        // Pozisyon güncelle (sadece drag sırasında)
        function onPointerMove(e: PointerEvent) {
          if (!isDragging) return;
          updatePosition(e);
        }

        // Pozisyonu viewer'a bildir
        function updatePosition(e: PointerEvent) {
          const viewerRect = viewer.getBoundingClientRect();

          // viewer içindeki relative pozisyonu al (0-1 arası normalize için)
          const x = e.clientX - viewerRect.left;
          const y = e.clientY - viewerRect.top;

          // Burada istersen normalize edip Spline eventine gönderebilirsin
          // Örneğin direkt mousemove eventi yaratabiliriz
          const mouseEvent = new MouseEvent("mousemove", {
            clientX: e.clientX,
            clientY: e.clientY,
            bubbles: true,
            cancelable: true,
            view: window,
          });

          viewer.dispatchEvent(mouseEvent);
        }

        // Pointer event listener ekle
        viewer.addEventListener("pointerdown", onPointerDown);
        viewer.addEventListener("pointerup", onPointerUp);
        viewer.addEventListener("pointercancel", onPointerUp);
        viewer.addEventListener("pointerleave", onPointerUp);
        viewer.addEventListener("pointermove", onPointerMove);

        // Cleanup
        return () => {
          viewer.removeEventListener("pointerdown", onPointerDown);
          viewer.removeEventListener("pointerup", onPointerUp);
          viewer.removeEventListener("pointercancel", onPointerUp);
          viewer.removeEventListener("pointerleave", onPointerUp);
          viewer.removeEventListener("pointermove", onPointerMove);
        };
      }
    };

    document.body.appendChild(script);

    return () => {
      if (containerRef.current) {
        containerRef.current.innerHTML = "";
      }
    };
  }, []);

  return <div ref={containerRef} className="w-full h-screen" />;
}
