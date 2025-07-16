"use client";

import dynamic from "next/dynamic";

const Lottie = dynamic(() => import("lottie-react"), { ssr: false });

import robotAnim from "@/assets/lottie/robot3d.json";

export default function LottieAnimation() {
  return (
    <div className="w-full h-full flex justify-center items-center">
      <Lottie
        animationData={robotAnim}
        loop
        autoplay
        style={{ width: "100%", maxWidth: "640px", height: "auto" }}
      />
    </div>
  );
}
