"use client";

import type { LottiePlayer } from "lottie-web";
import React, { useEffect, useRef } from "react";

type LottieAnimationProps = {
  animPath: string;
  loop?: boolean;
  autoplay?: boolean;
  className?: string;
};

const LottieAnimationComponent = ({
  animPath,
  loop = true,
  autoplay = true,
  className = "w-full h-full",
}: LottieAnimationProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const lottieInstance = useRef<LottiePlayer | null>(null);
  const animRef = useRef<any>(null); 

  useEffect(() => {
    let isMounted = true;

    const load = async () => {
      if (!lottieInstance.current) {
        const mod = await import("lottie-web");
        lottieInstance.current = mod.default;
      }

      if (isMounted && ref.current && lottieInstance.current) {
        animRef.current = lottieInstance.current.loadAnimation({
          container: ref.current,
          renderer: "svg",
          loop,
          autoplay,
          path: animPath,
        });
      }
    };

    load();

    return () => {
      isMounted = false;
      if (animRef.current) {
        animRef.current.destroy();
      }
    };
  }, [animPath, loop, autoplay]);

  return <div ref={ref} className={className} />;
};

export const LottieAnimation = React.memo(LottieAnimationComponent);
