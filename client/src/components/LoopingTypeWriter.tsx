"use client";

import { useEffect, useState } from "react";

interface LoopingTypewriterProps {
  texts: string[];
  typingSpeed?: number;  // ms per character
  pauseDuration?: number; // ms after full text
}

export default function LoopingTypewriter({
  texts,
  typingSpeed = 100,
  pauseDuration = 1500,
}: LoopingTypewriterProps) {
  const [index, setIndex] = useState(0);
  const [display, setDisplay] = useState("");
  const [mode, setMode] = useState<"typing" | "pausing" | "deleting">("typing");

  useEffect(() => {
    const currentText = texts[index];
    let timeout: NodeJS.Timeout;

    if (mode === "typing") {
      if (display.length < currentText.length) {
        timeout = setTimeout(() => {
          setDisplay(currentText.slice(0, display.length + 1));
        }, typingSpeed);
      } else {
        timeout = setTimeout(() => setMode("pausing"), pauseDuration);
      }
    } else if (mode === "deleting") {
      if (display.length > texts[0].length) {
        timeout = setTimeout(() => {
          setDisplay(currentText.slice(0, display.length - 1));
        }, typingSpeed / 2);
      } else {
        setMode("typing");
        setIndex((i) => (i + 1) % texts.length);
      }
    } else if (mode === "pausing") {
      timeout = setTimeout(() => setMode("deleting"), pauseDuration);
    }

    return () => clearTimeout(timeout);
  }, [display, mode, index, texts, typingSpeed, pauseDuration]);

  return (
    <h1 className="text-4xl md:text-6xl font-bold text-gray-900">
      <span>{texts[0]}</span>
      <span>{display.slice(texts[0].length)}</span>
      <span className="blink">|</span>
    </h1>
  );
}
