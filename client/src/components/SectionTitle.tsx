import React from "react";

interface SectionTitleProps {
  children: React.ReactNode;
  className?: string;
}

const SectionTitle: React.FC<SectionTitleProps> = ({ children, className }) => {
  return (
    <h2
      className={`text-3xl md:text-4xl font-bold text-gray-400 mb-8 text-center select-none tracking-wide 
        font-['Roboto'] 
        shadow-[inset_4px_4px_6px_rgba(208,208,208,0.6),
        ${className ?? ""}`}
      style={{
        WebkitFontSmoothing: "antialiased",
        MozOsxFontSmoothing: "grayscale",
        padding: "0.25rem 0.5rem",
      }}
    >
      {children}
    </h2>
  );
};

export default SectionTitle;
